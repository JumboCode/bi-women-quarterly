import React, { FC, useState } from 'react'

const DriveUpload: FC<any> = () => {
    const [file, setFile] = useState<any>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        console.log(file.name);
        let formData = new FormData();
        formData.append('file', file);

        console.log(formData);

        // api call
        await fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
    };

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    return (
        <form
            onSubmit={handleSubmit}
        >
            <input type='file' name='file' onChange={handleFileChange}></input>
            <button>Submit</button>
        </form>
    );
}

export default DriveUpload;