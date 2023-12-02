import React, {useState} from "react";

import SubmissionModal from "../../components/SubmissionModal"

// User file selection 
function LocalFile() {
    const [files, setFiles] = useState<File[]>([]); 
    // const [canSubmit, setCanSubmit] = useState(false); 

    // function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    //     const selectedFiles = event.target.files; 

    //     if (selectedFiles) {
    //         const fileArray = Array.from(selectedFiles); 

    //         // Update the file state to check if user can submit 
    //         setFiles(fileArray); 
    //         // setCanSubmit(fileArray.length == numberOfFiles); 
    //     }
    // }

    const handleSubmit = (event : any) => {
        event.preventDefault();
        console.log("hello");
        // <SubmissionModal/>
        // if (canSubmit) {
        //     // Log the file information to the console 
        //     console.log("Selected files:", files); 
        // } else {
        //     alert('Please select ${numberOfFiles} file(s) before submission'); 
        // }
    }

    const handleSubmissionChange = (event : any) => {
        console.log("change!");
        // got here, modal not working
        // <SubmissionModal/>
    }

    return (
        // <div className="LocalFile">
        <form onSubmit={handleSubmit}>
                    <label className="inline-block h-[30px] w-[115px] absolute left-[200px] pt-[3px] rounded-sm content-center align-middle text-center  outline outline-[#5072c0] outline-offset-[3px]">
                    <input type="file" className="hidden" onChange={handleSubmissionChange}/> Local File
                </label>
                <br></br>
                <br></br>
            {/* <input type="submit" /> */}
        </form>
        // </div>
    );
}

export default LocalFile; 