/**
 * Home page that shows all of a user's submissions.
 * @author Austen Money
 * @author Avery Hanna 
 * @author So Hyun Kim
 */

// Import React
import React, { useEffect, useReducer } from "react";

// Import Next
import Link from 'next/link';

// Import clerk
import { UserButton, useUser } from "@clerk/nextjs";

// Import components
import ShowSubmissionThumbnails from "@/components/HomePage/ShowSubmissionThumbnails";

// Import types
import Submission from "@/types/Submission";
import PreviewType from "@/types/PreviewType";
import Issues from '@/types/Issues';

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
    submissions: Submission[];
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
    ChangeFilter = "ChangeFilter",
    UpdateSubmissions = "UpdateSubmissions"
}

// Action definitions
type Action =({
    // Action type
    type: ActionType.ChangeFilter;
    // Add description of required payload property
    newFilter: FilterType;
    } | {
    type: ActionType.UpdateSubmissions; 
    newSubmissions: Submission[];
});

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
            return {
                ...state,
                filter: action.newFilter
            };
        }
        case ActionType.UpdateSubmissions: {
            return {
                ...state, 
                submissions: action.newSubmissions
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
                return submission.isApproved;
            });
        }
        case FilterType.Current: {
            return submissions.filter(submission => {
                return submission.issue === Issues.Current; //TODO: connect to backend
            });
        }
        case FilterType.None: {
            return submissions;
        }
        default: {``
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
        submissions: []
    };
    
    // Initialize state
    const [state, dispatch] = useReducer(reducer, initialState);
    
    // Destructure common state
    const { filter, submissions } = state;

    //dispatch({type: ActionType.UpdateSubmissions, newSubmissions:filterSubmissions(submissions, filter)})

    const { user } = useUser();

    //let submissions: Submission[] = [];
    // if (user && user.unsafeMetadata.submissions) {
    //     submissions = user.unsafeMetadata.submissions as Submission[];
    // }
    /**
     * Getting submission for user getting onto the webpage 
     * @author So Hyun Kim, Avery Hanna
     * @returns submissions of all users 
     */
    const getSubmissions = async () => {
        if (!user) {
            console.log("NO USER!"); 
            return; 
        }
        try {
            // get submissions from database
            console.log("Got the user!!!");
            const authorId = user?.id; 
            console.log("printing out author id");
            console.log(authorId); 
            const url = `/api/submissions/get-by-user?id=${authorId}`;

            await fetch(url, {
                method: "GET", 
            })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    console.log(res.data); 
                    dispatch({type: ActionType.UpdateSubmissions, newSubmissions:res.data})
                    console.log("Got submissions from database");
                    //console.log(submissions); 
                } else {
                    console.log("Failed to connect to database");
                }
            });
        } catch (error) {
            console.log(error);
        }
        
    }
    console.log("Right after getSubmissions()"); // dead 
    console.log(submissions); 

    /**
    * Mount
    * @author Avery Hanna, So Hyun Kim 
   */
    useEffect(
        () => {
        (async () => {
            getSubmissions()
            console.log("Printing submission part 2C"); 
            console.log(submissions); 
        })();
        },
        [],
    );

    
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    
    if (!user) {
        return null;
    }

    /**
     * Clear all submissions.
     * @author Austen Money
     */
    const onClearWork = () => {
        try {
            user.update({
                unsafeMetadata: {
                    submissions: []
                }
            });
        } catch (error) {
            console.log(error);
        }
    };


    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (
        <div className="h-screen w-screen flex flex-col">
            <div className="HomePage-top-bar border-b border-gray-300">
                <div className="m-3 mx-5 flex flex-row justify-end">
                    <li className="flex items-center space-x-5">
                        <button 
                            className="HomePage-submit-button shadow-md"
                        >
                            <Link href="/previews">Review Work</Link>
                        </button>
                        <button
                            onClick={onClearWork}
                            className="HomePage-submit-button shadow-md"
                        >
                            Clear Work
                        </button>
                        <button
                            className="HomePage-submit-button shadow-md"
                        >
                            <Link href="/submit">Submit Work</Link>
                        </button>
                        <div className="ml-4">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </li>
                </div>
                <div className="top-16 left-20">
                    <li className="flex pt-4 pl-16 space-x-20">
                        <button
                            onClick={() => {
                                dispatch({
                                    type: ActionType.ChangeFilter,
                                    newFilter: FilterType.None
                                });
                            }}
                            className={filter === FilterType.None ? 'font-bold' : ''}
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
                            className={filter === FilterType.Approved ? 'font-bold' : ''}
                        >
                            Approved Works
                        </button>
                        <button
                            onClick={() => {
                                dispatch({
                                    type: ActionType.ChangeFilter,
                                    newFilter: FilterType.Current
                                });
                            }}
                            className={filter === FilterType.Current ? 'font-bold' : ''}
                        >
                            Current Submissions
                        </button>
                    </li>
                </div>
            </div>
                <div className="flex item-center justify-center">
                    {submissions.length < 1 ? (
                        <div className="relative pt-20">
                            <div className="box-content bg-gray-300 relative w-full md:w-96 h-56 item-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div> 
                            <br></br>
                            <div className="text-gray-400 text-center relative left-1/2 bottom-1/12 transform -translate-x-1/2 -translate-y-1/8">
                                You have no submissions
                            </div>
                        </div>
                    ) : (
                        <ShowSubmissionThumbnails
                            previews={submissions.map(submission => {
                                return submission.mainSubmission;
                            })}
                        />
                    )}
            </div>
        </div>
    );
}
