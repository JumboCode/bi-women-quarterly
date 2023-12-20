/**
 * Home page that shows all of a user's submissions.
 * @author Austen Money
 * @author Avery Hanna 
 * @author So Hyun Kim
 */

// Import React
import React, { useReducer } from "react";

// Import Next
import Link from 'next/link';

// Import clerk
import { UserButton, useUser } from "@clerk/nextjs";

// Import components
import ShowSubmissionThumbnails from "@/components/ShowSubmissionThumbnails";

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
                return submission.issue === Issues.Current; //TODO: connect to backend
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
        <div className="relative flex flex-col">
            <div className="HomePage-top-bar border-b border-gray-400"></div>
            <div className="fixed m-3 mx-5 right-0 top-0">
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
            <div className="fixed top-16 left-20">
                <li className="flex justify-center space-x-20">
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
            <div className="pt-14 pl-8">
                <div className="flex item-center justify-center">
                    {submissions.length < 1 ? (
                        <div className="absolute left-1/2 pt-96 transform -translate-x-1/2 -translate-y-1/2 text-gray-600">
                            <div className="box-content border-8 bg-gray-300 box-border box-sizing md:h-40 md:w-80"> </div>
                            <br></br>
                            <div className="text-gray-400 text-center">
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
        </div>
    );
}
