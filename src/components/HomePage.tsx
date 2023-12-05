/**
 * Home page that shows all of a user's submissions.
 * @author Austen Money
 */

// Import React
import React, { useReducer } from "react";

// Import clerk
import { UserButton, useUser } from "@clerk/nextjs";

// Import components
import ShowSubmissionThumbnails from "@/components/ShowSubmissionThumbnails";

// Import types
import Submission from "@/types/Submission";
import PreviewType from "@/types/PreviewType";

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
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
    ChangeFilter = "ChangeFilter"
}

// Action definitions
type Action = {
    // Action type
    type: ActionType.ChangeFilter;
    // Add description of required payload property
    newFilter: FilterType;
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
            return {
                ...state,
                filter: action.newFilter
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
                return submission.issue === "Current Issue"; //TODO: connect to backend
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

    const { user } = useUser();

    let submissions: Submission[] = [];
    if (user && user.unsafeMetadata.submissions) {
        submissions = user.unsafeMetadata.submissions as Submission[];
    }

    
    /* -------------- State ------------- */
    
    // Initial state
    const initialState: State = {
        filter: FilterType.None
    };
    
    // Initialize state
    const [state, dispatch] = useReducer(reducer, initialState);
    
    // Destructure common state
    const { filter } = state;
    
    submissions = filterSubmissions(submissions, filter);
    
    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/
    
    if (!user) {
        return;
    }
    /**
     * Add new submission
     * @author Austen Money
     */
    const onSubmitWork = async () => {
        // TODO: blocked by cors, figure out later
        // const users = await fetch("https://api.clerk.com/v1/users", {
        //   method: "GET",
        //   headers: {
        //     Authorization: "Bearer " + process.env.CLERK_SECRET_KEY,
        //   },
        // })
        // console.log(users);

        const randomId = String(Math.random());

        const newSubmission: Submission = {
            id: randomId,
            author: "who?",
            title: "a NEWW title",
            date: "today",
            issue: "Current Issue",
            isApproved: false,
            mainSubmission: {
                type: PreviewType.Submission,
                title: `Title Here (${randomId})`,
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                imageUrl:
                    "https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png",
                contentDriveUrl: "placeholder link"
            }
        };

        // push new submission to front of array
        submissions.unshift(newSubmission);

        try {
            user.update({
                unsafeMetadata: {
                    submissions
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

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
        <div className="relative flex flex-col">
            <div className="HomePage-top-bar"></div>
            <div className="fixed m-3 mx-5 right-0 top-0">
                <li className="flex items-center space-x-2">
                    <button
                        onClick={onClearWork}
                        className="HomePage-submit-button"
                    >
                        Clear Work
                    </button>
                    <button
                        onClick={onSubmitWork}
                        className="HomePage-submit-button"
                    >
                        Submit Work
                    </button>
                    <div className="ml-4">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </li>
            </div>
            <div className="fixed top-16 left-20">
                <li className="flex justify-center space-x-20">
                    <button
                        onClick={() => {
                            dispatch({
                                type: ActionType.ChangeFilter,
                                newFilter: FilterType.None
                            });
                        }}
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
                    >
                        Current Submissions
                    </button>
                </li>
            </div>
            <div className="pt-14 pl-8">
                <div className="flex">
                    {submissions.length < 1 ? (
                        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600">
                            You have no submissions.
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
        </div>
    );
}
