import React, {useState} from "react";

// User file selection 
function UploadFile() {
    const [files, setFiles] = useState<File[]>([]); 
    const [canSubmit, setCanSubmit] = useState(false); 
    const [numberOfFiles, setNumberOfFiles] = useState(1); 

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedFiles = event.target.files; 

        if (selectedFiles) {
            const fileArray = Array.from(selectedFiles); 

            // Update the file state to check if user can submit 
            setFiles(fileArray); 
            setCanSubmit(fileArray.length == numberOfFiles); 
        }
    }

    function handleSubmit(event: any) {
        event.preventDefault(); 

        if (canSubmit) {
            // Log the file information to the console 
            console.log("Selected files:", files); 
        } else {
            alert('Please select ${numberOfFiles} file(s) before submission'); 
        }
    }

    return (
        <div className="UploadFile">
            <form onSubmit={handleSubmit}>
                <h1>File Upload</h1>
                <label> <b>Number of Files to Upload: </b>
                    <input type="number"
                           value={numberOfFiles}
                           onChange={(e) => setNumberOfFiles(Number(e.target.value))} />
                </label>
                <input type="file" multiple onChange={handleChange}/>
                <br></br>
                <br></br>
                <button type="submit" disabled={!canSubmit}>
                    Upload here
                </button>
            </form>
        </div>
    );
}

export default UploadFile; 