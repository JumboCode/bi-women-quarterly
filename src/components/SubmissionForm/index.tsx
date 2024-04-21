/**
 * Submission form components that takes in title, issue and type of
 * publication
 * @author Alana Sendlakowski, Vanessa Rose, Shreyas Ravi, Austen Money
 */

// Import React
import { useEffect, useReducer, useState } from 'react';

// Import types
import Submission from "@/types/Submission";
import PreviewType from "@/types/PreviewType";
import Mediums from "@/types/Mediums";

// Import Next
import Link from "next/link";

// Import clerk
import { useUser } from "@clerk/nextjs";

// Import components
import Preview from '@/types/Preview';
import Statuses from '@/types/Statuses';


/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

type PreviewRef = {
    preview: Preview;
    showImg: boolean;
    filename: string;
}

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = (
| {
    // Submission Guideline view
    view: "SubmissionGuideline" | "NewSubmission";
    // Whether guidelines have been reviewed
    isGuidelineRead: boolean;
    // Submission object to add
    submission: Submission;
    // Preview objects to add to the submission
    previews: PreviewRef[];
}
);

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
    // Change view from Submission Guideline ot New Submission
    SwitchView = 'SwitchView',
    // Toggle whether guidelines have been read
    ToggleGuidelineRead = 'ToggleGuidelineRead',
    // Update submission object
    UpdateSubmission = 'UpdateSubmission',
    // Update main submission
    UpdateMainSubmission = 'UpdateMainSubmission',
    // Update preview
    UpdatePreview = 'UpdatePreview',
    // Update preview reference
    UpdatePreviewRef = 'UpdatePreviewRef',
    // Add a new preview
    AddPreview = 'AddPreview',
    // Remove a preview
    RemovePreview = 'RemovePreview',
}

// Action definitions
type Action = (
| {
    // Switch view from Submission Guideline to New Submission 
    type: ActionType.SwitchView; 
    // New view to change to 
    newView: "SubmissionGuideline" | "NewSubmission"; //payload
}
| {
    // Action type
    type: ActionType.UpdateSubmission,
    // Field to update
    field: string;
    // Value to update to
    value: string;
}
| {
    // Action type
    type: ActionType.UpdateMainSubmission,
    // Field to update
    field: string;
    // Value to update to
    value: string;
}
| {
    // Action type
    type: ActionType.UpdatePreview,
    // Index of preview to update
    index: number;
    // Field to update
    field: string;
    // Value to update to
    value: string;
}
| {
    // Action type
    type: ActionType.UpdatePreviewRef,
    // Index of preview to update
    index: number;
    // Field to update
    field: string;
    // Value to update to
    value: string | boolean;
}
| {
    // Action type
    type: ActionType.AddPreview,
}
| {
    // Action type
    type: ActionType.RemovePreview,
    // Index of preview to remove
    index: number;
}
| {
    // Action type
    type: ActionType.ToggleGuidelineRead,
}
);

/**
* Reducer that executes actions
* @author So Hyun Kim, Avery Hanna
* @param state current state
* @param action action to execute
* @returns updated state
*/
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.SwitchView: {
            return {
                ...state,
                view: action.newView,
            };
        }
        case ActionType.UpdateSubmission: {
            return {
                ...state,
                submission: {
                    ...state.submission,
                    [action.field]: action.value,
                },
            };
        }
        case ActionType.UpdateMainSubmission: {
            return {
                ...state,
                submission: {
                    ...state.submission,
                    mainSubmission: {
                        ...state.submission.mainSubmission,
                        [action.field]: action.value,
                    },
                },
            };
        }
        case ActionType.UpdatePreview: {
            const newPreviews = state.previews;
            newPreviews[action.index] = {
                ...newPreviews[action.index],
                preview: {
                    ...newPreviews[action.index].preview,
                    [action.field]: action.value,
                },
            };
            return {
                ...state,
                previews: newPreviews,
            };
        }
        case ActionType.UpdatePreviewRef: {
            const newPreviews = state.previews;
            newPreviews[action.index] = {
                ...newPreviews[action.index],
                [action.field]: action.value,
            };
            return {
                ...state,
                previews: newPreviews,
            };
        }
        case ActionType.AddPreview: {
            return {
                ...state,
                previews: [...state.previews, {
                    showImg: false,
                    filename: "",
                    preview: {
                        type: PreviewType.AdditionalReference,
                        title: "",
                        description: "",
                        imageUrl: "https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png",
                        contentDriveUrl: "",
                    },
                }],
            };
        }
        case ActionType.RemovePreview: {
            return {
                ...state,
                previews: [...state.previews.slice(0, action.index), ...state.previews.slice(action.index + 1)]
            };
        }
        case ActionType.ToggleGuidelineRead: {
            return {
                ...state,
                isGuidelineRead: !state.isGuidelineRead,
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

export default function SubmissionForm() {
    /*------------------------------------------------------------------------*/
    const { user } = useUser();

    if (!user) {
        return null;
    }

    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/

    /* -------------- State ------------- */

    // Initial state
    const initialState: State = {
        view: 'SubmissionGuideline',
        isGuidelineRead: false,
        submission: {
            id : user.id,
            author : user.fullName ?? "", 
            title : "",
            date: Date().toString(),
            issue: "",
            medium: Mediums.None,
            status: Statuses.Pending,
            artist_statement: "",
            editor_note: "",
            mainSubmission: {
                type: PreviewType.Submission,
                title: "",
                description: "",
                imageUrl: "https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png",
                contentDriveUrl: "",
            },
        },
        previews: [],
    };

    // Initialize state
    const [state, dispatch] = useReducer(reducer, initialState);

    const [type, setType] = useState(PreviewType.Submission); 
    // second box 
    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState("");
 
    // To decide whether to render   
    const [showFile, setShowFile] = useState(false);
    // storing string of file name
    const [fileArray, setFileArray] = useState<FormData>(new FormData());  
    // storing url of main submission file use this to store submission locally
    const [file, setFile] = useState<File | null>(); 

    // Destructure common state
    const {
        view,
        isGuidelineRead,
        submission,
        previews,
    } = state;

    const [issues, setIssues] = useState<string[]>([]);

    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/

    /**
     * Fetches the issue themes from the database and sets the issues state
     * @author Austen Money
     * @author Walid Nejmi
     * @param event the event that has been changed
     */
    const fetchIssueThemes = async () => {
        try {
            await fetch("../api/issues/get", { method: "GET" })
                .then(response => response.json())
                .then(res => res.data.map((issue: any) => issue.title))
                .then(titles => {
                    setIssues(titles);
                });
        } catch (error) {
            console.error("Error fetching issue themes: ", error);
            return [];
        }
    };

    const onSubmit = async () => {
        // Create a copy of the submission object
        let updatedSubmission: Submission = submission;
        updatedSubmission.title = submission.mainSubmission.title;

        // Add the previews to the submission
        updatedSubmission.additionalReferences = previews.map(preview => preview.preview);

        console.log("Submitting: ", updatedSubmission.title);
        console.log("File Array: ", fileArray);

        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/update`, {
            method: "POST",
            body: fileArray
        })
        .then(async () => {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`)
            .then(res => res.json())
            .then(res => res.body)
            .then(responses => {
                console.log(`response length: ${responses.length}`);
                console.log(responses);
                // Update main submission with drive info
                if (responses[0]) {
                    updatedSubmission.mainSubmission.contentDriveUrl = `https://drive.google.com/file/d/${responses[0].id}`;
                    updatedSubmission.mainSubmission.imageUrl = responses[0].thumbnail;
                }
                // Update additional references with drive info
                if (updatedSubmission.additionalReferences && responses.length > 1) {
                    for (let i = 1; i < responses.length; i++) {
                        updatedSubmission.additionalReferences[i - 1].contentDriveUrl = `https://drive.google.com/file/d/${responses[i].id}`;
                        updatedSubmission.additionalReferences[i - 1].imageUrl = responses[i].thumbnail;
                    }
                }
            })
        })
        .then(async () => {
            try {
                // add submission to database
                await fetch("../api/submissions/add", {
                    method: "POST",
                    body: JSON.stringify({
                        submission: updatedSubmission
                    })
                });
            } catch (error) {
                console.log(error);
            }
        })
        .catch(err => console.error(err));
    };

    // /**
    //  * Adds the file name to the array of file names and changes the booleans
    //  * to display the modal and files
    //  * @author Alana Sendlakowski, Vanessa Rose, Shreyas Ravi
    //  * @param event the event that has been changed
    //  */
    // const handleFileUpload = async (event: any) => {
    //     event.preventDefault();

    //     fileName.push(event.target.files[0].name);

    //     setShowModal(true);
    //     setShowFile(true);

    //     let formData = new FormData();
    //     formData.append(event.target.files[0].name, event.target.files[0]);

    //     // posts user response to server to be fetched in index.tsx
    //     await fetch("http://localhost:3001/update", {
    //         method: "POST",
    //         body: formData
    //     })
    //         .then(res => res.json())
    //         .catch(err => console.error(err));
    // };

    /**
     * Update fileArray with new uploaded file. Adjusts display settings
     * @author Avery Hanna, So Hyun Kim
     * @param index the index of the optional reference who's file we should remove
     * @returns updates fileArray
     */
    const handleFileChange = (index : number, event : any) => {
        console.log("appending file: ", event.target.files[0].name, "which is at index: ", index)
        fileArray.append(event.target.files[0].name, event.target.files[0]);

        if (index == -1) { // Adding main submission file
            setShowFile(true);
        } else { // Adding optional reference
            dispatch({type: ActionType.UpdatePreviewRef, index, field: "showImg", value: true});
        }
    }


    /**
     * Remove a formdata object corresponding to the file getting removed. Used 
     * when delete an uploaded file
     * @author Avery Hanna
     * @param index the index of the optional reference who's file we should remove
     * @returns updates fileArray
     */
    const removeFile = (index : number) => {
        const nameToDelete = previews[index].filename
        fileArray.delete(nameToDelete);
    }


    /*------------------------------------------------------------------------*/
    /* ------------------------- Lifecycle Functions ------------------------ */
    /*------------------------------------------------------------------------*/

    /**
     * Mount
     * @author Austen Money
     */
    useEffect(() => {
        (async () => {
            await fetchIssueThemes();
        })();
    }, [user]);

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/

    console.log('Submission: ', JSON.stringify(submission, null, 2));

    if (view == "SubmissionGuideline") {
        return (
            <div className="p-8 h-screen bg-[#ecf0f6] tile col-span-3 row-span-6">
                <div>
                    <button className="rounded-lg h-[40px] w-[90px] items-center ">
                        <Link href="/"> &larr; Back</Link>
                    </button>
                </div>
                {/* // Title */}
                <h1 className="text-2xl font-bold pb-8 mt-3 ml-24">Submission Guidelines</h1>
                {/* // Submission instructions */}
                <div className="mb-20 ml-24">
                    Please review the {' '}
                    <u>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.biwomenquarterly.com/submission-guidelines/">
                            Submission Guidelines
                        </a>
                    </u>
                    {' '} before continuing.     
                </div> 
                <div className="ml-24">
                    <input type="checkbox" id="submission" name="submission" onClick={() => dispatch({type: ActionType.ToggleGuidelineRead})}/>
                    <label> I have read the {' '}
                        <u>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.biwomenquarterly.com/submission-guidelines/">
                                Submission Guidelines
                            </a>
                        </u>
                    </label>
                </div> 
                <div className="ml-32"> 
                        <button 
                            type="submit"
                            disabled={!isGuidelineRead}
                            onClick={() => {
                                dispatch({
                                    type: ActionType.SwitchView,
                                    newView: "NewSubmission"
                                });
                            }}
                            className={`absolute rounded-lg mt-5 h-[40px] w-[90px] items-center text-white bg-[#ec4899] shadow-lg ${!isGuidelineRead ? "bg-opacity-50" : ""}`}
                        >
                            Start
                        </button>
                    </div>
            </div>
        )
    } else {
        return (
            <div className="p-8 mx-10 h-screen bg-[#ecf0f6]">
                <div>
                    <button className="rounded-lg h-[40px] w-[90px] items-center ">
                        <Link href="/"> &larr; Back</Link>
                    </button>
                </div>
            {/* // Creates a form to retrieve title, issue, and name information */}
                <div className="grid grid-cols-2 gap-4">
                    {/* drop down element for issue selection */}
                    <h1 className="text-2xl font-bold pb-8 mt-3 justify=">New Submission</h1>
                    <div className="flex md:flex md:flex-grow flex-row justify-end space-x-1 px-[20px] py-[10px]">
                        <select name="issue" className="absolute right-[208px] h-[30px] w-[115px] pl-1 text-m text-gray-900 rounded-lg" 
                                value={submission.issue} 
                                onChange={(e) => dispatch({type: ActionType.UpdateSubmission, field: e.target.name, value: e.target.value})}>
                            <option defaultValue="Select Issues">Select Issue</option> 
                                <option value="Any">Any</option>
                                {
                                    issues.map((issue) => (
                                        <option key={issue} value={issue}>
                                            {issue}
                                        </option>
                                    ))
                                }
                        </select>
                        {/* drop down element for type selection */}
                            <select
                                name="medium" 
                                className="absolute right-[80px] h-[30px] w-[115px] pl-1 text-m text-gray-900 rounded-lg"
                                value={submission.medium}
                                onChange={(e) => dispatch({type: ActionType.UpdateSubmission, field: e.target.name, value: e.target.value})}
                            >
                                <option defaultValue="Select Type">Select Type</option>
                                <option value={Mediums.Fiction}>{Mediums.Fiction}</option>
                                <option value={Mediums.Nonfiction}>{Mediums.Nonfiction}</option>
                                <option value={Mediums.Poetry}>{Mediums.Poetry}</option>
                                <option value={Mediums.VisualArt}>{Mediums.VisualArt}</option>
                                <option value={Mediums.Other}>{Mediums.Other}</option>
                            </select>
                    </div>
                </div>
                {/* Submission Boxes */}
                <div className="flex flex-cols-2 gap-4">
                    {/* Submission Box 1 */}
                    {showFile? (
                        <div className=" resize p-6 h-[250px] w-[550px] bg-[#c3cee3] rounded-xl shadow-lg items-center outline-dashed outline-[#768fcd] outline-offset-[-3px]">                     
                            <div className="flex  text-justify justify-end text-[#3b60ba]"> 
                                <button 
                                onClick={() => {
                                    setFile(null); 
                                    setShowFile(false);                            
                                    }}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd" />
                                    </svg>
                                    </button>
                            </div> 
                            <div className="flex items-center justify-center ">
                                <img className="h-[150px]" src="https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png"></img>
                            </div>
                        </div> 
                    ) : 
                    <div className="resize	p-6 h-[250px] w-[550px] bg-[#c3cee3] rounded-xl shadow-lg items-center outline-dashed outline-[#768fcd] outline-offset-[-3px]">
                        <div className="break-normal">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3b60ba" className="mx-auto flex h-20 w-20 items-center justify-center">
                                <path fillRule="evenodd" d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clipRule="evenodd" />
                            </svg>
                        </div>
            
                        <h1 className="flex grow text-center justify-center text-l font-bold pb-1 pt-1">Drag & Drop Files Here</h1>
                        <h1 className="flex grow text-center justify-center text-m pb-1 pt-1">or</h1>
                        
                        <div className="flex grid grid-cols-2 gap-4 pt-[20px]"> 
                        <div className="flex grow text-justify justify-center text-[#3b60ba]">       
                            <form>
                                <div>
                                    <label className="resize inline-block h-[30px] w-[115px] pt-[3px] rounded-sm   text-center  outline outline-[#5072c0] outline-offset-[3px]">
                                        <input
                                            type="file"
                                            name="files"
                                            id="inputFile"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(-1, e)}
                                        />{" "}
                                        Local File
                                    </label>
                                </div>
                            </form>                                
                        </div>
                            <div className="flex  text-justify justify-center text-[#3b60ba]">
                                <button  type="submit" className="inline-block h-[30px] w-[115px] rounded-sm   text-center  outline outline-[#5072c0] outline-offset-[3px]">
                                    Google Drive
                                </button>
                            </div>
                        </div>
                    </div>
                    }
                    {/* Submission Box 2 */}
                    <div className="resize	p-6 h-[250px] w-[550px] bg-[#c3cee3] rounded-xl shadow-lg items-center space-x-4 outline-[#768fcd] outline-offset-[-3px]">
                        <div>
                            <h3 className="flex grow text-left justify-start text-l font-bold pb-1 pt-1 ">Title*</h3>
                            <input 
                                name="title"
                                onChange={(e) => dispatch({type: ActionType.UpdateMainSubmission, field: e.target.name, value: e.target.value})}
                                type="text"
                                id="Title"
                                className="bg-transparent border-b-2 border-blue-500 text-gray-900 pt-1.5 pb-1.5 text-sm block w-11/12 outline outline-0 transition-all after:absolute after:bottom-2 after:block after:w-11/12"
                                placeholder="Title of your piece"
                                required />
                            <div>
                                <h3 className="flex grow text-left justify-start text-l font-bold pb-1 pt-7">Description</h3>
                                <input
                                    name="description"
                                    onChange={(e) => dispatch({type: ActionType.UpdateMainSubmission, field: e.target.name, value: e.target.value})}
                                    type="text"
                                    id="Description"
                                    className="bg-transparent border-b-2 border-blue-500 text-gray-900 pt-1.5 pb-1.5 text-sm block w-11/12 outline outline-0 transition-all after:absolute after:bottom-2 after:block after:w-11/12"
                                    placeholder="Describe your piece"
                                    required />
                                <p className="text-xs text-gray-400 pt-1"><em>Max 400 Characters</em></p>
                            </div>
                        </div>
                    </div>
                </div> 
                {/* Optional Images */}
                {
                    previews.map((preview, index) => {
                        return (
                            <div>
                                <div className="grid grid-cols-2 gap-4" >
                                    <h1 className="text-1xl font-bold pb-4 mt-3 pt-8 justify=">Optional Related Photo</h1>
                                    {/* <button className="inline-block h-[30px] w-[115px] rounded-sm  text-center  outline outline-[#5072c0] outline-offset-[3px]" */}
                                    <div className="flex md:flex md:flex-grow flex-row justify-end space-x-1 px-[20px] py-[40px]">
                                    <button className="absolute right-[80px] flex inline-block bg-[#FFFFFF] h-[30px] w-[115px] rounded-sm  text-center  outline outline-[#5072c0] outline-offset-[3px]"
                                            // className="absolute right-[208px] h-[30px] w-[115px] pl-1 text-m text-gray-900 rounded-lg" 
                                    onClick={() => {dispatch({type: ActionType.RemovePreview, index})}}>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd" />
                                        </svg> Delete</button>    
                                    </div> 
                                </div>

                                {/* Submission Boxes */}
                                <div className="flex flex-cols-2 gap-4">
                                    {/* Submission Box 1 */}
                                    {preview.showImg ? (
                                        <div className=" resize p-6 h-[250px] w-[550px] bg-[#c3cee3] rounded-xl shadow-lg items-center outline-dashed outline-[#768fcd] outline-offset-[-3px]">                     
                                        <div className="flex  text-justify justify-end text-[#3b60ba]"> 
                                            <button 
                                            onClick={() => {
                                                removeFile(index); 
                                                dispatch({type: ActionType.UpdatePreviewRef, index, field: "showImg", value: false});
                                            }}>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd" />
                                                </svg>
                                                </button>
                                        </div> 
                                        <div className="flex items-center justify-center ">
                                            <img className="h-[150px]" src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg"></img>
                                        </div>
                                        </div> 
                                    ) :
                                        <div className="resize	p-6 h-[250px] w-[550px] bg-[#c3cee3] rounded-xl shadow-lg items-center outline-dashed outline-[#768fcd] outline-offset-[-3px]">
                                        <div className="break-normal">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3b60ba" className="mx-auto flex h-20 w-20 items-center justify-center">
                                                <path fillRule="evenodd" d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                            
                                        <h1 className="flex grow text-center justify-center text-l font-bold pb-1 pt-1">Drag & Drop Files Here</h1>
                                        <h1 className="flex grow text-center justify-center text-m pb-1 pt-1">or</h1>
                                        
                                        <div className="flex grid grid-cols-2 gap-4 pt-[20px]">
                                        <div className="flex grow text-justify justify-center text-[#3b60ba]">
                                            <form>
                                                <div>
                                                    <label className="resize inline-block h-[30px] w-[115px] pt-[3px] rounded-sm   text-center  outline outline-[#5072c0] outline-offset-[3px]">
                                                        <input
                                                            type="file"
                                                            name="files"
                                                            id="inputFile"
                                                            className="hidden"
                                                            onChange={(e) => (handleFileChange(index, e))}
                                                        />{" "}
                                                        Local File
                                                    </label>
                                                </div>
                                            </form>
                                    </div>
                                        <div className="flex  text-justify justify-center text-[#3b60ba]">
                                            <button  type="submit" className="inline-block h-[30px] w-[115px] rounded-sm   text-center  outline outline-[#5072c0] outline-offset-[3px]">
                                                Google Drive
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                    }
                                    

                                    {/* Submission Box 2 */}
                                    <div className="resize	p-6 h-[250px] w-[550px] bg-[#c3cee3] rounded-xl shadow-lg items-center space-x-4 outline-[#768fcd] outline-offset-[-3px]">
                                        <div>
                                            <h3 className="flex grow text-left justify-start text-l font-bold pb-1 pt-1 ">Title*</h3>
                                            <input
                                                type="text"
                                                id="Title"
                                                name="title"
                                                onChange={(e) => dispatch({type: ActionType.UpdatePreview, index, field: e.target.name, value: e.target.value})}
                                                value={preview.preview.title}
                                                className="bg-transparent border-b-2 border-blue-500 text-gray-900 pt-1.5 pb-1.5 text-sm block w-11/12 outline outline-0 transition-all after:absolute after:bottom-2 after:block after:w-11/12" placeholder="Title of your piece" required />
                                            <div>
                                                <h3 className="flex grow text-left justify-start text-l font-bold pb-1 pt-7">Description</h3>
                                                <input 
                                                    type="text"
                                                    name="description"
                                                    onChange={(e) => dispatch({type: ActionType.UpdatePreview, index, field: e.target.name, value: e.target.value})}
                                                    value={preview.preview.description}
                                                    id="Title" className="bg-transparent border-b-2 border-blue-500 text-gray-900 pt-1.5 pb-1.5 text-sm block w-11/12 outline outline-0 transition-all after:absolute after:bottom-2 after:block after:w-11/12" placeholder="Describe your piece" required />
                                                <p className="text-xs text-gray-400 pt-1"><em>Max 400 Characters</em></p>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        );
                    })
                }
                <div>
                    {/* Add Optional Image button */}
                    <button 
                        onClick={() => {
                            dispatch({type: ActionType.AddPreview});
                        }}
                        className="rounded-lg items-center pt-4 ml-20">
                        <Link href="/submit">+ Additional Photos</Link>
                    </button>
                </div>
                {/* Artist Statement */}
                <div>
                <h1 className="text-1xl font-bold pb-4 mt-3 pt-8 justify=">Artist Statement</h1>
                    <div className="p-6 h-[150px] w-[full] bg-[#c3cee3] rounded-xl shadow-lg items-center space-x-4 outline-[#768fcd] outline-offset-[-3px]">
                        <div>
                            <h3 className="flex grow text-left justify-start text-l font-bold pb-1 pt-7">Note</h3>
                            <input name="artist_statement" onChange={(e) => dispatch({type: ActionType.UpdateSubmission, field: e.target.name, value: e.target.value})} type="text" id="Title" className="bg-transparent border-b-2 border-blue-500 text-gray-900 pt-1.5 pb-1.5 text-sm block w-full outline outline-0 transition-all after:absolute after:bottom-2 after:block after:w-full" placeholder="Your Artist Statement" required />
                            <p className="text-xs text-gray-400 pt-1 pb-4"><em>Max 400 Characters</em></p>
                        </div>
                    </div>
                </div>
                {/* Note to Editor */}
                <div>
                    <h1 className="text-1xl font-bold pb-4 mt-3 pt-8 justify=">Note to Editor</h1>
                    <div className="p-6 h-[250px] w-[full] bg-[#c3cee3] rounded-xl shadow-lg items-center space-x-4 outline-[#768fcd] outline-offset-[-3px]">
                        <div>
                            <h3 className="flex grow text-left justify-start text-l font-bold pb-1 pt-7">Subject</h3>
                            <input name="editor_note" onChange={(e) => dispatch({type: ActionType.UpdateSubmission, field: e.target.name, value: e.target.value})} type="text" id="Title" className="bg-transparent border-b-2 border-blue-500 text-gray-900 pt-1.5 pb-1.5 text-sm block w-full outline outline-0 transition-all after:absolute after:bottom-2 after:block after:w-full" placeholder="Subject of your Note" required />
                        
                            <h3 className="flex grow text-left justify-start text-l font-bold pb-1 pt-7">Note</h3>
                            <input type="text" id="Title" className="bg-transparent border-b-2 border-blue-500 text-gray-900 pt-1.5 pb-1.5 text-sm block w-full outline outline-0 transition-all after:absolute after:bottom-2 after:block after:w-full" placeholder="Note to Editor" required />
                            <p className="text-xs text-gray-400 pt-1"><em>Max 400 Characters</em></p>
                        </div>
                    </div>
                </div>
                <Link href="/">
                    <button className="absolute right-[176px] mt-[100px] rounded-lg bg-white  m-6 h-[40px] w-[200px]  items-center shadow-lg">
                        Save & Continue Later
                    </button>
                </Link>
                <Link href="/">
                    <button onClick={onSubmit} className="absolute right-[64px] mt-[100px] rounded-lg m-6 h-[40px] w-[90px] items-center text-white bg-[#ec4899] shadow-lg">
                        Submit
                    </button>
                </Link>
            </div>
        )
    }
    
}
