/**
 * Home page that shows all of a user's submissions.
 * @author Austen Money
 * @author Avery Hanna
 * @author So Hyun Kim
 */

// Import React
import React, { useEffect, useReducer, useState } from "react";
import { TailSpin } from "react-loader-spinner";

// Import Next
import Link from "next/link";

// Import clerk
import { UserButton, useUser } from "@clerk/nextjs";

// Import components
import ShowSubmissionThumbnails from "@/components/HomePage/ShowSubmissionThumbnails";

// Import types
import Submission from "@/types/Submission";
import Statuses from "@/types/Statuses";

/*------------------------------------------------------------------------*/
/* ------------------------------ Types --------------------------------- */
/*------------------------------------------------------------------------*/

enum FilterType {
    // No filtering of submissions
    None = "None",
    // Filter to just approved submissions
    Approved = "Approved",
    // Filter to just current submissions
    Current = "Current"
}

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
    // How the submissions should be filtered
    filter: FilterType;
    // All user submissions
    allSubmissions: Submission[];
    // Submissions to show on the page
    filteredSubmissions: Submission[];
    // Whether to show loading spinner
    isLoading: boolean;
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
    ChangeFilter = "ChangeFilter",
    UpdateAllSubmissions = "UpdateAllSubmissions",
    ToggleLoadingOn = "ToggleLoadingOn",
    ToggleLoadingOff = "ToggleLoadingOff"
}

// Action definitions
type Action =
    | {
          // Action type
          type: ActionType.ChangeFilter;
          // Filter to change to
          newFilter: FilterType;
      }
    | {
          // Action type
          type: ActionType.UpdateAllSubmissions;
          // Submissions to update to
          newSubmissions: Submission[];
      }
    | {
          // Action type
          type: ActionType.ToggleLoadingOn;
      }
    | {
          // Action type
          type: ActionType.ToggleLoadingOff;
      };

/**
 * Reducer that executes actions
 * @author Austen Money
 * @param state current state
 * @param action action to execute
 * @returns updated state
 */
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.ChangeFilter: {
            const filteredSubmissions = filterSubmissions(
                state.allSubmissions,
                action.newFilter
            );
            return {
                ...state,
                filter: action.newFilter,
                filteredSubmissions
            };
        }
        case ActionType.UpdateAllSubmissions: {
            return {
                ...state,
                allSubmissions: action.newSubmissions
            };
        }
        case ActionType.ToggleLoadingOn: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ActionType.ToggleLoadingOff: {
            return {
                ...state,
                isLoading: false
            };
        }
        default: {
            return state;
        }
    }
};

/*------------------------------------------------------------------------*/
/* --------------------------- Static Helpers --------------------------- */
/*------------------------------------------------------------------------*/

/**
 * Filters given Submission array to just the given type.
 * @author Austen Money
 * @param submissions submissions to filter
 * @param filter how to filter the submissions
 * @returns filtered submissions
 */
const filterSubmissions = (
    submissions: Submission[],
    filter: FilterType
): Submission[] => {
    switch (filter) {
        case FilterType.Approved: {
            return submissions.filter(submission => {
                return submission.status === Statuses.Approved;
            });
        }
        case FilterType.Current: {
            return submissions.filter(submission => {
                return submission.issue === "Spring 2024: letters to self"; //TODO: connect to backend
            });
        }
        case FilterType.None: {
            return submissions;
        }
        default: {
            return submissions;
        }
    }
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

export default function HomePage() {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/

    /* -------------- State ------------- */

    // Initial state
    const initialState: State = {
        filter: FilterType.None,
        allSubmissions: [],
        filteredSubmissions: [],
        isLoading: false
    };

    // Initialize state
    const [state, dispatch] = useReducer(reducer, initialState);

    // Destructure common state
    const { filter, allSubmissions, filteredSubmissions, isLoading } = state;

    const { user } = useUser();

    /**
     * Getting submission for user getting onto the webpage
     * @author So Hyun Kim, Avery Hanna
     * @returns submissions of all users
     */
    const getSubmissions = async () => {
        // Show loading spinner
        dispatch({
            type: ActionType.ToggleLoadingOn
        });

        if (!user) {
            return;
        }
        try {
            // get submissions from database
            const authorId = user?.id;
            const url = `/api/submissions/get-by-user?id=${authorId}`;

            await fetch(url, {
                method: "GET"
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        console.log("Successfully connected to database");
                        dispatch({
                            type: ActionType.UpdateAllSubmissions,
                            newSubmissions: res.data
                                .reverse()
                                .map((data: any) => data.submission)
                        });
                    } else {
                        console.log("Failed to connect to database");
                    }
                })
                .then(() => {
                    // Hide loading spinner
                    dispatch({
                        type: ActionType.ToggleLoadingOff
                    });
                });
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Get submissions when user is loaded or updated
     * @author Avery Hanna, So Hyun Kim
     */
    useEffect(() => {
        (async () => {
            // TODO: fix this hacky way of getting submissions
            await getSubmissions();
            await new Promise(r => setTimeout(r, 2000));
            await getSubmissions();
        })();
    }, [user]);

    /**
     * Filter submissions by current filter whenever all submissions are updated
     * @author Austen Money
     */
    useEffect(() => {
        (() => {
            dispatch({
                type: ActionType.ChangeFilter,
                newFilter: filter
            });
        })();
    }, [allSubmissions]);

    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/

    if (!user) {
        return null;
    }

    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (
        <div className="h-screen w-screen flex flex-col gradient-background">
            <div className="HomePage-top-bar border-b border-primary-blue">
                <div className="m-6 mx-5 flex flex-row justify-between">
                    <div className="flex text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-blue">
                        My Work
                    </div>
                    <li className="flex items-center space-x-4">
                        <button className="HomePage-submit-button lg:text-lg xl:text-xl shadow-md">
                            <Link href="/submit">Submit Work</Link>
                        </button>
                        <div className="ml-4">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </li>
                </div>
                <div className="flex items-end"> {/* ${isOpen ? "is-open" : ""} flex-row justify-around justify-items-stretch top-16 left-20 */}
                    <li className="flex m-5 space-x-8 flex-col sm:flex-row"> {/*pt-4 pl-16 space-x-20*/}
                        <button
                            onClick={() => {
                                dispatch({
                                    type: ActionType.ChangeFilter,
                                    newFilter: FilterType.Current
                                });
                            }}
                            className={
                                `text-primary-blue ${filter === FilterType.Current ? "font-bold " : ""} text-base lg:text-lg xl:text-xl`
                            }
                        >
                            Current Submissions
                        </button>
                        <button
                            onClick={() => {
                                dispatch({
                                    type: ActionType.ChangeFilter,
                                    newFilter: FilterType.None
                                });
                            }}
                            className={
                                `text-primary-blue ${filter === FilterType.None ? "font-bold " : ""} text-base lg:text-lg xl:text-xl`
                            }
                        >
                            All Submissions
                        </button>
                        <button
                            onClick={() => {
                                dispatch({
                                    type: ActionType.ChangeFilter,
                                    newFilter: FilterType.Approved
                                });
                            }}
                            className={
                                `text-primary-blue ${filter === FilterType.Approved ? "font-bold " : ""} text-base lg:text-lg xl:text-xl`
                            }
                        >
                            Approved Works
                        </button>
                        
                    </li>
                </div>
            </div>
            {isLoading ? (
                <div className="flex h-screen">
                    <div className="m-auto">
                        <TailSpin color="#8200B1"></TailSpin>
                    </div>
                </div>
            ) : (
                <div className="flex item-center justify-center overflow-auto mb-8">
                    {filteredSubmissions.length == 0 ? (
                        <div className="relative pt-20">
                            <div className="box-content border border-primary-blue relative w-full md:w-96 h-56 item-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                            <br></br>
                            <div className="text-primary-blue text-center relative left-1/2 bottom-1/12 transform -translate-x-1/2 -translate-y-1/8">
                                You have no submissions
                            </div>
                        </div>
                    ) : (
                        <ShowSubmissionThumbnails
                            submissions={filteredSubmissions}
                        />
                    )}
                </div>
            )}
            <div className="p-1.5 ps-20 pe-20 flex justify-between items-center fixed bottom-0 w-full mr-8 text-primary-blue text-base text-sm lg:text-md">
                <div className="font-semibold">© 2024 BiWomenQuarterly</div>
                <div className="flex items-center">
                    <div className="mr-8">
                        <a href="https://www.biwomenquarterly.com/about/" target="_blank" rel="noopener noreferrer" className="text-base text-sm lg:text-md">About Us</a>
                    </div>
                    <div className="mr-8">
                        <a href="https://www.biwomenquarterly.com/contact/" target="_blank" rel="noopener noreferrer" className="text-base text-sm lg:text-md">Contact Us</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
