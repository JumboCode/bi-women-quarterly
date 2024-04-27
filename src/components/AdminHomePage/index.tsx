/**
 * Admin Homepage
 * @author Lydia Chen
 * @author Lucien Bao
 */

// Import clerk
import { UserButton } from "@clerk/nextjs";

// Import types
import Submission from "@/types/Submission";

// Import components
import AdminGrid from "@/components/AdminHomePage/AdminGrid";

// Import next
import Link from 'next/link';
import React, { useEffect, useReducer, useState } from 'react';
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

    // Initialize state
    const [showModal, setShowModal] = React.useState(false);
    const [current, setCurrent] = React.useState("");
    const [issues, setIssues] = React.useState<[string, string, string][]>([]);

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

    /**
     * Fetches data to initialize issue modal
     * @author Alana Sendlakowski, Vanessa Rose
     */
    const setupIssueModal = async () => {        
        try {
            await fetch("../api/issues/get", { method: "GET" })
                .then(response => response.json())
                .then(res => res.data.map((issue: any) => [issue._id, issue.status, issue.title]))
                .then(info => {
                    setIssues(info);
                    info.forEach((issue : any) => {
                        if (issue[1] == "Current") {
                            setCurrent(issue[0]);
                        } 
                    })
                });
        } catch (error) {
            console.error("Error fetching issue themes: ", error);
            return [];
        }

        setShowModal(true);
    }


    function IssueModal() {
        /*------------------------------------------------------------------------*/
        /* -------------------------------- Setup ------------------------------- */
        /*------------------------------------------------------------------------*/

        /* -------------- State ------------- */

        // Initialize states
        const [addIssue, setAddIssue] = React.useState(false);
        const [inputValue, setInputValue] = React.useState("");


        /**
         * changes state of inputValue as input is added
         * @author Alana Sendlakowski, Vanessa Rose
         */
        const handleInputChange = (event: any) => {
            const newValue = event.target.value;
            setInputValue(newValue);
        };
        
        /**
         * Posts new issue to api when user clicks save
         * @author Alana Sendlakowski, Vanessa Rose
         */
        async function saveNewIssue() {
            // show loading spinner
            dispatch({
                type: ActionType.ToggleLoadingOn
            })

            try {
                // add submission to database
                await fetch("../api/issues/add", {
                    method: "POST",
                    body: JSON.stringify({
                        status : "Next",
                        title : inputValue,
                    })
                });
            } catch (error) {
                console.log(error);
            }

            // hide loading spinner
            dispatch({
                type: ActionType.ToggleLoadingOff
            })

            setupIssueModal();
        }
        
        /**
         * Deletes passed in issue from database and reloads issues from api
         * @author Alana Sendlakowski, Vanessa Rose
         * @param id of the issue to be deleted
         */
        async function deleteIssue(event: any) {
            // show loading spinner
            dispatch({
                type: ActionType.ToggleLoadingOn
            })
            
            // if the element to delete is the current issue, must select a new current
            if (current == event) {
                var [id, status, title] = issues[0];
                if (event == id) {
                    var [id, status, title] = issues[1];
                }

                try {
                    // modify submission in database
                    await fetch("../api/issues/edit", {
                        method: "PATCH",
                        body: JSON.stringify({
                            id : id,
                            status : "Current",
                            title : title,
                        })
                    });
                } catch (error) {
                    console.log(error);
                }
            }
            
            try {
                // remove submission from database
                await fetch("../api/issues/delete", {
                    method: "DELETE",
                    body: JSON.stringify({
                        id : event,
                    })
                });
            } catch (error) {
                console.log(error);
            }

            // hide loading spinner
            dispatch({
                type: ActionType.ToggleLoadingOff
            })

            setupIssueModal();   
        }

        /**
         * Closes the modal after the 'x' button is clicked, patching the current issue in the database
         * @author Alana Sendlakowski, Vanessa Rose
         * @param id of the current issue
         */
        async function closeModal(event: any) {
            // notes the issue that was selected to be current and closes the modal
            setCurrent(event);
            setShowModal(false);

            var addedisCurr = false;
            var index = issues.findIndex(([id, status, title]) => id === event);
            var changed_index = issues.findIndex(([id, status, title]) => status === "Current");
                
            // if the current modal has changed, update it in the database
            if (index != changed_index) {

                var [id, status, title] = issues[index]
                
                try {
                    // add submission to database
                    await fetch("../api/issues/edit", {
                        method: "PATCH",
                        body: JSON.stringify({
                            id : id,
                            status : "Current",
                            title : title,
                        })
                    });
                } catch (error) {
                    console.log(error);
                }

                var [id, status, title] = issues[changed_index];

                try {
                    // add submission to database
                    await fetch("../api/issues/edit", {
                        method: "PATCH",
                        body: JSON.stringify({
                            id : id,
                            status : "Next",
                            title : title,
                        })
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }



        /*-----------------------------------------*/
        /* --------------- Modal UI -------------- */
        /*-----------------------------------------*/

        return (
            <>
                {showModal ? (
                    <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="pt-[10px] w-1/2 border-0 rounded-md shadow-lg relative flex flex-col bg-[#dcadff] outline-none focus:outline-none">
                            <div className="absolute absolute right-[10px]">
                                <button onClick={() => {
                                    const selectedRadio = document.querySelector('input[name="radio"]:checked') as HTMLInputElement;
                                    if (selectedRadio) {
                                        closeModal(selectedRadio.value);
                                    }
                                }}>
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#385eb9" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                    
                                </button>
                            </div>
                            <div>
                                <div>
                                    <div className="mt-[10px] mb-[10px] flex items-center justify-center text-xl text-primary-blue font-bold">
                                        Update Issues
                                    </div>

                                            <div className="flex justify-end h-1 pe-[5px] text-sm italic text-primary-blue">
                                                Current
                                            </div>
                                            <div className="p-[10px]">
                                            <div>
                                                {issues.map(([_id, status, title]) => (
                                                    <div className="flex">
                                                        <div onClick={() => deleteIssue(_id)} className="inline-block flex items-center justify-center pl-[10px]">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#385eb9" className="w-6 h-6 cursor-pointer hover:stroke-black hover:fill-[#385eb9]">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                        </div>

                                                        <div key={title} className="inline-block shadow-lg flex inline-block align-middle pl-[10px] w-full h-[45px] rounded-md shadow-inner items-center m-[10px] text-primary-blue text-xl  bg-[#e3cafc]">
                                                            {title}
                                                        </div>
                                                            
                                                        <div>
                                                            {(status === "Current") ? (
                                                                <div>
                                                                    <div className="flex items-center mb-4">
                                                                        <input id="radio-current" type="radio" value={_id} defaultChecked={status == "Current"} name="radio" className="relative w-5 h-5 ml-[2px] mr-[10px] mt-[22.5px] before:content[''] cursor-pointer appearance-none rounded-full border transition-all border-[#385eb9] checked:bg-[#385eb9] checked:border-white"/>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <div className="flex items-center mb-4">
                                                                        <input id="radio-current" type="radio" value={_id} name="radio" className="relative w-5 h-5 ml-[2px] mr-[10px] mt-[22.5px] before:content[''] cursor-pointer appearance-none rounded-full border transition-all border-[#385eb9] checked:bg-[#385eb9] checked:border-white"/>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div>
                                                {addIssue ? (
                                                    <div>
                                                        <div className="inline-block shadow-lg flex inline-block align-middle  ml-[44px] mr-[44px] h-[45px] rounded-md shadow-inner items-center m-[10px] text-[#5a5a5b] text-xl">
                                                            <input
                                                                className="w-full h-full rounded-md pl-[10px] pr-[10px] bg-[#f6e7ff] placeholder-shown:italic"
                                                                placeholder="Type new issue title"
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>

                                                        <button onClick={() => saveNewIssue()} className="pl-[10px] mt-[20px] mb-[30px] ml-[44px] mr-[44px] flex inline-block align-middle justify-center h-[45px] w-5/6 rounded-md items-center bg-[#ff4295] text-white font-bold text-xl">
                                                            Save New Issue 
                                                        </button>
                                                    </div>

                                                ) : (

                                                    <button onClick={() => setAddIssue(true)} className="mt-[10px] mb-[30px] ml-[44px] mr-[44px] border-dashed border-2 border-[#958cae] flex inline-block align-middle justify-center h-[45px] w-5/6 rounded-md items-center border-[#5a5a5b] text-[#5a5a5b] text-m">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                        </svg>

                                                        <div className="pl-[10px]">
                                                            add new issue 
                                                        </div>
                                                    </button>

                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
            </>
        );
    }



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
                    <div>
                        {" "}
                        {showModal ? (
                            <IssueModal/>
                        ) : null}{" "}
                    </div>
                    <li className="flex items-center space-x-4">
                        <button className="HomePage-submit-button lg:text-lg shadow-md">
                            <div onClick={() => setupIssueModal()}>Update Issues</div>
                            
                        </button>
                        <button className="HomePage-submit-button lg:text-lg shadow-md">
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
                    <div className="m-auto z-50">
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