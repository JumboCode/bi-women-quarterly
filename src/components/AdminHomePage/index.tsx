/**
 * Admin Homepage
 * @author Lydia Chen
 * @author Lucien Bao
 */

// Import clerk
import { UserButton } from "@clerk/nextjs";

// Import types
import Submission from "@/types/Submission";
import Preview from "@/types/Preview";
import PreviewType from "@/types/PreviewType";
import Statuses from "@/types/Statuses";
import Mediums from "@/types/Mediums";

// Import components
import AdminGrid from "@/components/AdminHomePage/AdminGrid";

// Import next
import Link from 'next/link';
import { useEffect, useReducer } from 'react';
import { TailSpin } from 'react-loader-spinner';

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
    // All user submissions
    allSubmissions: Submission[];
    // Whether to show loading spinner
    isLoading: boolean;
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
    UpdateAllSubmissions = "UpdateAllSubmissions",
    ToggleLoadingOn = "ToggleLoadingOn",
    ToggleLoadingOff = "ToggleLoadingOff"
}

// Action definitions
type Action =
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
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

export default function AdminHomePage() {

    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/

    /* -------------- State ------------- */

    // Initial state
    const initialState: State = {
        allSubmissions: [],
        isLoading: false
    };

    // Initialize state
    const [state, dispatch] = useReducer(reducer, initialState);

    // Destructure common state
    const {
        allSubmissions,
        isLoading 
    } = state;

    /*------------------------------------------------------------------------*/
    /* ------------------------------ Functions ----------------------------- */
    /*------------------------------------------------------------------------*/

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

        console.log("Getting submissions");

        try {
            // get submissions from database
            const url = '/api/submissions/get';

            await fetch(url, {
                method: "GET"
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        console.log("Successfully connected to database");
                        console.log(res.data);
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
    }, []);


    /*------------------------------------------------------------------------*/
    /* ------------------------------ Rendering ----------------------------- */
    /*------------------------------------------------------------------------*/

    return (
        <div className="h-screen w-screen flex flex-col gradient-background">
            <div className="HomePage-top-bar">
                <div className="m-6 mx-5 flex flex-row justify-between">
                    <div className="ms-4 flex text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-blue">
                        Submissions
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
            </div>
            {isLoading ? (
                <div className="flex h-screen">
                    <div className="m-auto">
                        <TailSpin color="#8200B1"></TailSpin>
                    </div>
                </div>
            ) : (
                <div className="overflow-scroll">
                    <AdminGrid submissionArray={allSubmissions}></AdminGrid>
                </div>
            )}
        </div>
    );
}
