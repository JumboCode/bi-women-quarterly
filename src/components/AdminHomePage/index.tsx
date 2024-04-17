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
    
    






    function IssueModal() {
        /*------------------------------------------------------------------------*/
        /* -------------------------------- Setup ------------------------------- */
        /*------------------------------------------------------------------------*/

        /* -------------- State ------------- */

        // Initialize states
        // const [issues, setIssues] = useState("");
        // const [issues, setIssues] = React.useState<string[]>([]);
        // const [stars, setStars] = React.useState<[string : boolean]>();
        
        // const [issues, setIssues] = React.useState<[string, string][]>([]);
        const [issues, setIssues] = React.useState<[string, string, string][]>([]);
        const [addIssue, setAddIssue] = React.useState(false);
        const [inputValue, setInputValue] = React.useState("");

        /**
         * Prints the title, issue, and type of the publication to the console
         * when the form is submitted
         * @author Alana Sendlakowski, Vanessa Rose
         * @param event the event that has been changed
         */
        const handleModalSubmit = (event: any) => {
            setShowModal(false);
        };

        /**
         * Handles the change of elements in the form by updating useState variable
         * @author Alana Sendlakowski, Vanessa Rose
         * @param event the event that has been changed
         * @returns new states of all the elements in the form
         */
        const handleIssueChange = (event: any) => {
            issues.push(event.target.value);
        };

        // const change = (event: any) => {
        //     issues.push(event.target.value);
        // };

        function checkStatus(event: any): boolean {
            // (status === "Current")
            // console.log("HERERE");
            return (event == "Current");
        }

        async function changeStatus(event: any) {
            var index = 0;
            var changed_index = 0;
            issues.forEach(([id, status, title]) => {
                if (issues[index][1] == "Current") {
                    issues[index] = [id, "Next", title];
                    changed_index = index;
                }
                index++;
            });



            index = issues.findIndex(([id, status, title]) => title === event);

            if (index != changed_index) {

                var [id, status, title] = issues[index]
                // issues[index] = [id, "Current", event];
                console.log(id);
                
                // console.log(issues);

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
                console.log(id);

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

            // try {
            //     await fetch("../api/issues/edit", {
            //         method: "PATCH",
            //         body: JSON.stringify({
            //             issues
            //         }))

            // } catch (error) {
            //     console.error("Error fetching issue themes: ", error);
            //     return [];
            // }

            // var index = issues.findIndex(([title, status]) => title === event);
            // var [fst, snd] = issues[index];
            // console.log(issues[index]);
            // issues[index] = [fst, "Next"];

            // console.log(issues);
        }

        // function starIssue(event: any) {
        //     console.log("EVENT: " + event);
        //     var index = stars.findIndex(([string]) => string === event);
        //     var [fst, snd] = stars[index];
        //     console.log(stars[index]);
        //     stars[index] = [fst, !snd];
        //     console.log(stars[index]);
        // }



        // function findStar(event: any): boolean {
        //     const pair = stars.find(([string]) => string === event);

        //     if (pair) {
        //         const [, snd] = pair; // Destructure the pair to get the second element (boolean value)
        //         return snd;
        //     } else {
        //         return false;
        //     }
        // }

        /**
         * Fetches the issue themes from the database and sets the issues state
         * @author Austen Money
         * @author Walid Nejmi
         * @param event the event that has been changed
         */
        const fetchIssueThemes = async () => {
            // console.log("fetching issues");
            try {
                await fetch("../api/issues/get", { method: "GET" })
                    .then(response => response.json())
                    // .then(res => console.log(res));
                    .then(res => res.data.map((issue: any) => [issue._id, issue.status, issue.title]))
                    // .then(res => res.data.map((issue: any) => console.log(issue)));
                    .then(info => {
                        setIssues(info);
                    });
            } catch (error) {
                console.error("Error fetching issue themes: ", error);
                return [];
            }

            // console.log(issues);
            
            // issues.forEach(iss => {
            //     stars.push([iss, false]);
            // });
        };

        const handleInputChange = (event: any) => {
            const newValue = event.target.value;
            setInputValue(newValue);
            // You can send the input value here or pass it to another function
            // console.log("Input value:", newValue);
            // For sending it, you might use an API call or pass it to a parent component via a callback function
        };

        async function saveNewIssue() {
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
            console.log(inputValue);
            setAddIssue(false);
        }

        async function deleteIssue(event: any) {
            console.log(event);
            // var index = issues.findIndex(([id, status, title]) => title === event);
            // var [id, status, title] = issues[index];

            try {
                // add submission to database
                await fetch("../api/issues/delete", {
                    method: "DELETE",
                    body: JSON.stringify({
                        id : event,
                    })
                });
            } catch (error) {
                console.log(error);
            }
        }

            
    
        useEffect(() => {
                (async () => {
                    await fetchIssueThemes();
                })();
        });


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
                                <button onClick={() => setShowModal(false)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="#385eb9"
                                        className="w-7 h-7"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <div>
                                    <div className="mt-[10px] mb-[10px] flex items-center justify-center text-xl text-primary-blue font-bold">
                                        Current Issues
                                    </div>

                                    <div className="p-[10px]">
                                        <div>
                                            {issues.map(([id, status, title]) => (
                                                <div className="flex">
                                                    <div onClick={() => deleteIssue(id)} className="inline-block flex items-center justify-center pl-[10px]">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#385eb9" className="w-6 h-6">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </div>

                                                    <div key={title} className="inline-block shadow-lg flex inline-block align-middle pl-[10px] w-full h-[45px] rounded-md shadow-inner items-center m-[10px] text-primary-blue text-xl  bg-[#e3cafc]">
                                                        {title}
                                                    </div>
                                                        
                                                    <div>
                                                        {(status == "Current") ? (
                                                            <div>
                                                                <div className="flex items-center mb-4">
                                                                    <input onClick={() => changeStatus(title)} checked={status == "Current"} id="default-radio-1" type="radio" value="" name="default-radio" className="hidden p-[0px] m-[0px] text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                                </div>

                                                                <label className="inline-block flex items-center justify-center pr-[10px]">
                                                                    <svg onClick={() => changeStatus(title)} xmlns="http://www.w3.org/2000/svg" fill="#385eb9" viewBox="0 0 24 24" stroke-width="1.5" stroke="#385eb9" className="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                                    </svg>
                                                                </label>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <div className="flex items-center mb-4">
                                                                    <input onClick={() => changeStatus(title)} id="default-radio-1" type="radio" value="" name="default-radio" className="hidden text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                                                </div>
                                                                
                                                                <div className="inline-block flex items-center justify-center pr-[10px]">
                                                                    <svg onClick={() => changeStatus(title)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#385eb9" className="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                                    </svg>
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

                                                    <div onClick={() => saveNewIssue()} className="pl-[10px] mt-[20px] mb-[30px] ml-[44px] mr-[44px] flex inline-block align-middle justify-center h-[45px] rounded-md items-center bg-[#ff4295] text-white font-bold text-xl">
                                                        Save New Issue 
                                                    </div>
                                                </div>

                                            ) : (

                                                <div onClick={() => setAddIssue(true)} className="mt-[10px] mb-[30px] ml-[44px] mr-[44px] border-dashed border-2 border-[#958cae] flex inline-block align-middle justify-center h-[45px] rounded-md items-center border-[#5a5a5b] text-[#5a5a5b] text-m">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>

                                                    <div className="pl-[10px]">
                                                        add new issue 
                                                    </div>
                                                </div>

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
                            <div onClick={() => setShowModal(true)}>Update Issues</div>
                            
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
