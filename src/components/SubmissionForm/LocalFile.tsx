/**
  * Local File Page, accessed when clicking the "Local File" button
  * @author Alana Sendlakowski, Vanessa Rose, Shreyas Ravi
 */

// Import React
import React, { useState } from "react";

// Import Preview and PreviewType
import Preview from '@/types/Preview';
import PreviewType from '@/types/PreviewType';

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

// Props definition
type Props = {
    handleNewPreview: (newPreview: Preview) => void;
};


/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

// NEW User file selection 
function LocalFile(props: Props) {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/

    const { handleNewPreview } = props;

    /* -------------- State ------------- */

    // Initialize states
    const [showModal, setShowModal] = React.useState(false);
    const [showFile, setShowFile] = React.useState(false);

    // storing string of file name
    const [fileName, setFileName] = React.useState<string[]>([]);

    /*------------------------------------------------------------------------*/
    /* ------------------------- Lifecycle Functions ------------------------ */
    /*------------------------------------------------------------------------*/

    /**
     * Adds the file name to the array of file names and changes the booleans
     * to display the modal and files
     * @author Alana Sendlakowski, Vanessa Rose, Shreyas Ravi
     * @param event the event that has been changed
     */
    const handleSubmissionChange = async (event : any) => {
        event.preventDefault();

        fileName.push(event.target.files[0].name);
        
        setShowModal(true);
        setShowFile(true);

        let formData = new FormData();
        formData.append(event.target.files[0].name, event.target.files[0]);

        // posts user response to server to be fetched in index.tsx
        await fetch("http://localhost:3001/update", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .catch(err => console.error(err));
    }

    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/

    /**
     * Contains display code and functions for submission modal
     * @author Alana Sendlakowski, Vanessa Rose
     * @param event the event that has been changed
     */
    function SubmissionModal(props: Props) {
        /*------------------------------------------------------------------------*/
        /* -------------------------------- Setup ------------------------------- */
        /*------------------------------------------------------------------------*/
        
        /* -------------- State ------------- */

        // Initialize states
        const [type, setType] = useState(PreviewType.Submission); 
        const [title, setTitle] = useState(""); 
        const [description, setDescription] = useState(""); 

        /**
         * Prints the title, issue, and type of the publication to the console
         * when the form is submitted
         * @author Alana Sendlakowski, Vanessa Rose
         * @param event the event that has been changed
         */
        const handleModalSubmit = (event : any) => {
            handleNewPreview({
                type,
                title,
                description,
                imageUrl: "https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png",
                contentDriveUrl: "",
            })
            setShowModal(false);
            event.preventDefault();
            console.log('type: ' + type);
            console.log("title: " + title);
            console.log("description: " + description);
        }
        
        /**
         * Handles the change of elements in the form by updating useState variable
         * @author Alana Sendlakowski, Vanessa Rose
         * @param event the event that has been changed
         * @returns new states of all the elements in the form
         */
        const handleTypeChange = (event : any) => {
            setType(event.target.value);
        }

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

        /*-----------------------------------------*/
        /* --------------- Modal UI -------------- */
        /*-----------------------------------------*/
        
        return (
        <>
            {showModal ? ( 
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="w-screen pt-[10px] max-w-3xl border-0 rounded-md shadow-lg relative flex flex-col w-full bg-[#c3cde3] outline-none focus:outline-none">
                    
                <div className="absolute absolute right-[10px]">
                    <button onClick={() => setShowModal(false)}> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>
                </div>

                <div className="flex items-start justify-between p-5 rounded-t">
                    
                    <div>
                    <div className="text-black font-bold">Submission Type *</div>
                        
                        <fieldset onChange={handleTypeChange}>
                        <div className="flex flex-col">
                        <div className="inline-flex items-center">
                            <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                            <input name="terms" type="radio" value={PreviewType.Submission} className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full bg-white border border-black checked:border-[#395fbb]"/>
                            <span className="absolute transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="#395fbb">
                                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                </svg>
                            </span>
                            </label>
                            <label className="text-black cursor-pointer select-none"> Submission Piece </label>
                        </div>

                        <div className="inline-flex items-center">
                            <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                            <input name="terms" type="radio" value={PreviewType.AdditionalReference} className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full bg-white border border-black checked:border-[#395fbb]"/>
                            <span className="absolute transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="#395fbb">
                                <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                </svg>
                            </span>
                            </label>
                            <label className="text-black cursor-pointer select-none"> Optional Related Photo </label>
                        </div>
                        </div>
                        </fieldset>
                    </div>
                    </div>

                <div className="pt-2 pb-8" onChange={handleTitleChange}>
                    <label className="flex items-start justify-between py-2 px-5 rounded-t text-black font-bold">Title of Piece *</label>
                    <input className="appearance-none ml-4 bg-transparent border-none w-full text-[#676c75] mr-3 px-2 leading-tight focus:outline-none" type="text" placeholder="title of piece"/>
                    <hr className="h-px mx-6 my-1 border-[#676c75] border-[1px]"/>
                </div>

                <div onChange={handleDescriptionChange}>
                    <label className="flex items-start justify-between py-2 px-5 rounded-t text-black font-bold">Description</label>
                    <input className="appearance-none ml-4 bg-transparent border-none w-full text-[#676c75] mr-3 px-2 leading-tight focus:outline-none" type="text" placeholder="description of your piece"/>
                    <hr className="h-px mx-6 my-1 mb-20 border-[#676c75] border-[1px]"/>
                </div>

                    <div className="flex items-center justify-end p-6 rounded-b">
                    <button className="bg-[#ec4899] text-white h-[40px] w-[90px] items-center rounded-lg shadow shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button" onClick={handleModalSubmit}>Done</button>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
            ) : null}
        </>
        );
    }

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/

    return (
        <div> 
            <form>
                <div>
                    <label className="inline-block h-[30px] w-[115px] absolute left-[200px] pt-[3px] rounded-sm content-center align-middle text-center  outline outline-[#5072c0] outline-offset-[3px]">
                        <input type="file" name="files" id="inputFile" className="hidden" onChange={handleSubmissionChange}/> Local File
                    </label>
                </div>
                
                <div> {showModal ? ( <SubmissionModal handleNewPreview={handleNewPreview}/> ) : null} </div>
                
                <br></br>
                <br></br>

                <div> {showFile ? (
                    <div className="flex flex-col mt-[40px] ml-[0px] mr-[0px] absolute left-[30px] right-[30px]">
                    <div className="overflow-y-auto h-[30vh]">
                        {fileName.map((file: any) => (
                            <div className="flex items-center mt-[10px] h-[40px] my-auto bg-[#c3cee3] rounded-xl shadow-lg">
                                <div className="pl-[10px] w-screen flex text-black">
                                    {file}
                                </div>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-6 h-6 mr-[10px]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                ) : null} </div>
            </form>
        </div>
    );
}

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default LocalFile; 
