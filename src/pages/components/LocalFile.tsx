import React, {useState} from "react";

import SubmissionModal from "../../components/SubmissionModal"


// NEW User file selection 
function LocalFile() {
    const [showModal, setShowModal] = React.useState(false);
    const [showFile, setShowFile] = React.useState(false);
    const [fileName, setFileName] = useState(""); 

    const handleSubmit = (event : any) => {
        event.preventDefault();
        setShowModal(false);
    }

    const handleSubmissionChange = (event : any) => {
        event.preventDefault();
        setFileName(event.target.files[0].name);
        setShowModal(true);
        setShowFile(true);
    }

    return (
        <div> 
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="inline-block h-[30px] w-[115px] absolute left-[200px] pt-[3px] rounded-sm content-center align-middle text-center  outline outline-[#5072c0] outline-offset-[3px]">
                        <input type="file" id="inputFile" className="hidden" onChange={handleSubmissionChange}/> Local File
                    </label>
                </div>
                
                <div> {showModal ? ( <SubmissionModal/> ) : null} </div>
                
                <br></br>
                <br></br>

                <div> {showFile ? (
                    <div className="flex items-center h-[40px] bg-[#c3cee3] ml-[0px] mr-[0px] absolute left-[30px] right-[30px] rounded-xl shadow-lg">
                        <div className="pl-[10px] flex items-center text-black">
                            {fileName}
                        </div>

                        <div className="flex absolute absolute right-[10px]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                ) : null} </div>
            </form>
        </div>
    );
}

export default LocalFile; 