import React, { useState } from "react";
import UploadFile from "./components/UploadFile";
import SubmissionForm from "@/components/SubmissionForm";
import SubmissionPreview from "@/components/SubmissionFilePreview";

export default function Home() {
    // For testing purposes:
    const issue = "Some issue";
    const type = "Some type";
    const main_title = "Title 1";
    const main_desc = "Loresm upson";
    const add_title = "Title 2";
    const add_desc = "Loresm upsom v2"; 
    const images = ["a.JPG", "b.JPG"];

    return (
        <div>
            <div>New Submission</div><br/>

            <div>
                <div>*Issue: <label>{issue}</label></div>
                <div>*Type: <label>{type}</label></div>
            </div>
            <br/>

            <SubmissionPreview 
                name = "Submission"
                title = {main_title}
                description = {main_desc}
                image = {images[0]}  
            ></SubmissionPreview>

            <SubmissionPreview 
                name = "Additional References"
                title = {add_title}
                description = {add_desc}
                image = {images[1]}  
            ></SubmissionPreview>
        </div>
    )
}
