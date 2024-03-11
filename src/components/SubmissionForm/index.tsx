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
import LocalFile from '@/components/SubmissionForm/LocalFile';
import Preview from '@/types/Preview';
import Statuses from '@/types/Statuses';


/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = (
| {
    // Submission Guideline view
    view: "SubmissionGuideline" | "NewSubmission";
}
);

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
    // Change view from Submission Guideline ot New Submission
    SwitchView = 'SwitchView',
}

// Action definitions
type Action = (
| {
    // Switch view from Submission Guideline to New Submission 
    type: ActionType.SwitchView; 
    // New view to change to 
    newView: "SubmissionGuideline" | "NewSubmission"; //payload
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
            ...state, //return state as is except what's underneath
            //TODO: this should switch from the SubmissionGuideline option for view
            // to NewSubmission
            view: action.newView,
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
    };

    // Initialize state
    // first box 
    const [state, dispatch] = useReducer(reducer, initialState);
    const [type, setType] = useState(PreviewType.Submission); 
    // second box 
    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState(""); 

    // Destructure common state
    const {
        view
    } = state;

    // Initialize state
    const [submission, setSubmission] = useState<Submission>(
        {
            id : user.id,
            author : user.fullName ?? "", 
            title : "",
            date: Date().toString(),
            issue: "",
            medium: Mediums.None,
            status: Statuses.Pending,
            mainSubmission: {
                type: PreviewType.Submission,
                title: "",
                description: "",
                imageUrl: "https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png",
                contentDriveUrl: "",
            },
        })

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

    // const handleModalSubmit = (event : any) => {
    //     handleNewPreview({
    //         type,
    //         title,
    //         description,
    //         imageUrl: "https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png",
    //         contentDriveUrl: "",
    //     })
    //     event.preventDefault();
    //     console.log('type: ' + type);
    //     console.log("title: " + title);
    //     console.log("description: " + description);
    // }

    /**
     * Prints the title, issue, and type of the publication to the console
     * when the form is submitted
     * @author Alana Sendlakowski, Vanessa Rose, Shreyas Ravi
     * @param event the event that has been changed
     */
    const handleSubmit = async () => {
        handleNewPreview({
            type,
            title,
            description,
            imageUrl: "https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png",
            contentDriveUrl: "",
        });
        console.log("title: " + title);
        
        submission.title = submission.mainSubmission.title;

        // upload submission to google drive
        await fetch("http://localhost:3000/upload")
            .then(res => res.json())
            .then(res => res.body)
            .then(responses => {
                // set main submission contentDriveUrl
                setSubmission(prevValues => {
                    return {
                        ...prevValues,
                        mainSubmission: {
                            ...prevValues.mainSubmission,
                            contentDriveUrl:
                                "https://drive.google.com/file/d/" +
                                responses[0].id
                        },
                    };
                });
                // set additional references contentDriveUrl
                for (let i = 1; i < responses.length; i++) {
                    setSubmission(prevValues => {
                        if (prevValues.additionalReferences) {
                            const newReference: Preview = {
                                ...prevValues.additionalReferences[i],
                                contentDriveUrl:
                                    "https://drive.google.com/file/d/" +
                                    responses[i].id
                            }
                            const newAdditionalReferences = prevValues.additionalReferences;
                            newAdditionalReferences[i] = newReference;
                            return {
                                ...prevValues,
                                additionalReferences: newAdditionalReferences,
                            };
                        } else {
                            return prevValues;
                        }
                    });
                }

                try {
                    // add submission to database
                    fetch("../api/submissions/add", {
                        method: "POST",
                        body: JSON.stringify({
                            submission
                        }),
                    });
                } catch (error) {
                    console.log(error);
                }
            });
    };

    /**
     * Handles the change of elements in the form by updating useState variable
     * @author Austen Money
     * @param event the event that has been changed (when a new file is ubloaded
     *              within the modal)
     * @returns new states of all the elements in the form
     */
    const handleSubmissionChange = (event: any) => {
        setSubmission(prevValues => {
            return { ...prevValues, [event.target.name]: event.target.value };
        });
    };

    /**
     * Handles the change of file submissions
     * @author Austen Money
     * @param event the event that has been changed
     * @returns new states of all the elements in the form
     */
    const handleNewPreview = (newPreview: Preview) => {
        setSubmission(prevValues => {
            return { ...prevValues, mainSubmission: newPreview };
        });
    };

    /**
     * Handles the change of elements in the form by updating useState variable
     * @author Alana Sendlakowski, Vanessa Rose
     * @param event the event that has been changed
     * @returns new states of all the elements in the form
     */
    const handleTitleChange = (event : any) => {
        setTitle(event.target.value);
    }

    /**
     * Handles the change of elements in the form by updating useState variable
     * @author Alana Sendlakowski, Vanessa Rose
     * @param event the event that has been changed
     * @returns new states of all the elements in the form
     */
    const handleDescriptionChange = (event : any) => {
        setDescription(event.target.value);
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
    /**
     * Main UI of New Submission 
     * @author So Hyun Kim, Avery Hanna
     */
//react node variable and assign something different depending on view and then return that variable at end
// or multiple returns 
// <Link href="/submissionguideline">Submission Guideline</Link>
    if (view == "SubmissionGuideline") {
        return (
            <div className="p-8 h-screen bg-[#ecf0f6] tile col-span-3 row-span-6">
                <div>
                    <button className="rounded-lg h-[40px] w-[90px] items-center ">
                        <Link href="/"> &larr; Back</Link>
                    </button>
                </div>
                {/* // Title */}
                <h1 className="text-2xl font-bold pb-8 mt-3 ml-24">Submission Guideline</h1>
                {/* // Submission instructions */}
                <div className="mb-20 ml-24">
                Please review Submission Guideline before submitting.     
                </div> 
                <div className="ml-24">
                    <input type="checkbox" id="submission" name="submission" />
                    <label for="submission"> I have read the Submission Guideline</label>
                </div> 
                <div className="ml-32"> 
                        <button type="submit"
                        onClick={() => {
                            dispatch({
                                type: ActionType.SwitchView,
                                newView: "NewSubmission"
                            });
                        }}
                        className="absolute rounded-lg mt-5 h-[40px] w-[90px] items-center text-white bg-[#ec4899] shadow-lg">
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
                        <Link href="/submit"> &larr; Back</Link>
                    </button>
                </div>
            {/* // Creates a form to retrieve title, issue, and name information */}
                <div className="grid grid-cols-2 gap-4">
                    {/* drop down element for issue selection */}
                    <h1 className="text-2xl font-bold pb-8 mt-3 justify=">New Submission</h1>
                    <div className="flex md:flex md:flex-grow flex-row justify-end space-x-1 px-[20px] py-[10px]">
                        <select name="issue" className="absolute right-[208px] h-[30px] w-[115px] pl-1 text-m text-gray-900 rounded-lg" 
                                value={submission.issue} 
                                onChange={handleSubmissionChange}>
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
                            <select name="medium" className="absolute right-[80px] h-[30px] w-[115px] pl-1 text-m text-gray-900 rounded-lg" value={submission.medium} onChange={handleSubmissionChange}>
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
                                <LocalFile/>
                        </div>
                        {/* "absolute right-[120px] mt-[100px] rounded-lg bg-white  m-6 h-[40px] w-[200px]  items-center shadow-lg"> */}
                        {/*"inline-block h-[30px] w-[115px] pt-[3px] rounded-sm   text-center  outline outline-[#5072c0] outline-offset-[3px]" */}
                        {/* <button  type="submit" className="flex grow justify-center text-justify h-[30px] w-[115px] pt-[3px] rounded-sm outline outline-[#5072c0] text-[#3b60ba] outline-offset-[3px]">
                            Google Drive
                        </button> */}
                        <div className="flex  text-justify justify-center text-[#3b60ba]">
                            <button  type="submit" className="inline-block h-[30px] w-[115px] rounded-sm   text-center  outline outline-[#5072c0] outline-offset-[3px]">
                                Google Drive
                            </button>
                        </div>
                        </div>
                    </div>

                    {/* Submission Box 2 */}
                    <div className="resize	p-6 h-[250px] w-[550px] bg-[#c3cee3] rounded-xl shadow-lg items-center space-x-4 outline-[#768fcd] outline-offset-[-3px]">
                        <div onChange={handleTitleChange}>
                            <h3 className="flex grow text-left justify-start text-l font-bold pb-1 pt-1 ">Title*</h3>
                            <input type="text" id="Title" className="bg-transparent border-b-2 border-blue-500 text-gray-900 pt-1.5 pb-1.5 text-sm block w-11/12 outline outline-0 transition-all after:absolute after:bottom-2 after:block after:w-11/12" placeholder="Title of your piece" required />
                            {/* <div className="pt-2 pb-8" onChange={handleTitleChange}>
                                <label className="flex items-start justify-between py-2 px-5 rounded-t text-black font-bold">Title of Piece *</label>
                                <input className="appearance-none ml-4 bg-transparent border-none w-full text-[#676c75] mr-3 px-2 leading-tight focus:outline-none" type="text" placeholder="title of piece"/>
                                <hr className="h-px mx-6 my-1 border-[#676c75] border-[1px]"/>
                            </div> */}
                            <div onChange={handleDescriptionChange}>
                                <h3 className="flex grow text-left justify-start text-l font-bold pb-1 pt-7">Description</h3>
                                <input type="text" id="Title" className="bg-transparent border-b-2 border-blue-500 text-gray-900 pt-1.5 pb-1.5 text-sm block w-11/12 outline outline-0 transition-all after:absolute after:bottom-2 after:block after:w-11/12" placeholder="Describe your piece" required />
                                <p className="text-xs text-gray-400 pt-1"><em>Max 400 Characters</em></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="rounded-lg items-center pt-4 ml-20">
                        <Link href="/submit"> + Add Additional Photos</Link>
                    </button>
                </div>
                {/* Artist Statement */}
                <div>
                <h1 className="text-1xl font-bold pb-4 mt-3 pt-8 justify=">Artist Statement</h1>
                    <div className="p-6 h-[150px] w-[full] bg-[#c3cee3] rounded-xl shadow-lg items-center space-x-4 outline-[#768fcd] outline-offset-[-3px]">
                        
                        <div onChange={handleDescriptionChange}> {/* TODO: change handleDescriptionChange to handleStatementChange*/}
                            <h3 className="flex grow text-left justify-start text-l font-bold pb-1 pt-7">Note</h3>
                            <input type="text" id="Title" className="bg-transparent border-b-2 border-blue-500 text-gray-900 pt-1.5 pb-1.5 text-sm block w-full outline outline-0 transition-all after:absolute after:bottom-2 after:block after:w-full" placeholder="Your Artist Statement" required />
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
                            <input type="text" id="Title" className="bg-transparent border-b-2 border-blue-500 text-gray-900 pt-1.5 pb-1.5 text-sm block w-full outline outline-0 transition-all after:absolute after:bottom-2 after:block after:w-full" placeholder="Subject of your Note" required />
                        
                            <h3 className="flex grow text-left justify-start text-l font-bold pb-1 pt-7">Note</h3>
                            <input type="text" id="Title" className="bg-transparent border-b-2 border-blue-500 text-gray-900 pt-1.5 pb-1.5 text-sm block w-full outline outline-0 transition-all after:absolute after:bottom-2 after:block after:w-full" placeholder="Note to Editor" required />
                            <p className="text-xs text-gray-400 pt-1"><em>Max 400 Characters</em></p>
                        </div>
                    </div>
                </div>
                <button className="absolute right-[176px] mt-[100px] rounded-lg bg-white  m-6 h-[40px] w-[200px]  items-center shadow-lg">
                    <Link href="/">
                        Save & Continue Later
                    </Link>
                </button>
                <button onClick={handleSubmit} className="absolute right-[64px] mt-[100px] rounded-lg m-6 h-[40px] w-[90px] items-center text-white bg-[#ec4899] shadow-lg">
                    <Link href="/">
                        Review
                    </Link>
                </button>
            </div>
        )
    }
    
}
