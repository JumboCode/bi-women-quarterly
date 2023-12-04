import React, {useState} from "react";

import SubmissionModal from "../../components/SubmissionModal"


// NEW User file selection 
function LocalFile() {
    const [showModal, setShowModal] = React.useState(false);

    const handleSubmit = (event : any) => {
        event.preventDefault();
        setShowModal(false);
    }

    const handleSubmissionChange = (event : any) => {
        setShowModal(true);
    }

    return (
        <div> 
            <form onSubmit={handleSubmit}>
                <label className="inline-block h-[30px] w-[115px] absolute left-[200px] pt-[3px] rounded-sm content-center align-middle text-center  outline outline-[#5072c0] outline-offset-[3px]">
                    <input type="file" className="hidden" onChange={handleSubmissionChange}/> Local File
                </label>
                
                <div> {showModal ? ( <SubmissionModal/> ) : null} </div>
                
                <br></br>
                <br></br>
            </form>
        </div>
    );
}

export default LocalFile; 