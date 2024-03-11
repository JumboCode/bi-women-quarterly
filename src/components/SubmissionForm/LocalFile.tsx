/**
 * Local File Page, accessed when clicking the "Local File" button
 * @author Alana Sendlakowski, Vanessa Rose, Shreyas Ravi
 */

// Import React
import React, { useState } from "react";


/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

// NEW User file selection 
function LocalFile() {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/

    /* -------------- State ------------- */

    // Initialize states
    const [showFile, setShowFile] = React.useState(false);

    // storing string of file name
    const [fileName, setFileName] = React.useState<string[]>([]);

    /*------------------------------------------------------------------------*/
    /* ------------------------- Lifecycle Functions ------------------------ */
    /*------------------------------------------------------------------------*/

    /**
     * Handles submit of the form, sets showModal to false
     * @author Alana Sendlakowski, Vanessa Rose
     * @param event the event that has been changed
     */
    const handleSubmit = (event : any) => {
        event.preventDefault();
    }

    /**
     * Adds the file name to the array of file names and changes the booleans
     * to display the modal and files
     * @author Alana Sendlakowski, Vanessa Rose, Shreyas Ravi
     * @param event the event that has been changed
     */
    const handleSubmissionChange = async (event: any) => {
        event.preventDefault();

        fileName.push(event.target.files[0].name);

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
    };

    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/

    
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/

    return (
        <div>
            <form>
                <div>
                    <label className="inline-block h-[30px] w-[115px] absolute left-[200px] pt-[3px] rounded-sm content-center align-middle text-center  outline outline-[#5072c0] outline-offset-[3px]">
                        <input
                            type="file"
                            name="files"
                            id="inputFile"
                            className="hidden"
                            onChange={handleSubmissionChange}
                        />{" "}
                        Local File
                    </label>
                </div>
                
                <br></br>
                <br></br>

                <div>
                    {" "}
                    {showFile ? (
                        <div className="flex flex-col mt-[40px] ml-[0px] mr-[0px] absolute left-[30px] right-[30px]">
                            <div className="overflow-y-auto h-[30vh]">
                                {fileName.map((file: any) => (
                                    <div className="flex items-center mt-[10px] h-[40px] my-auto bg-[#c3cee3] rounded-xl shadow-lg">
                                        <div className="pl-[10px] w-screen flex text-black">
                                            {file}
                                        </div>
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="black"
                                                className="w-6 h-6 mr-[10px]"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}{" "}
                </div>
            </form>
        </div>
    );
}

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default LocalFile;
