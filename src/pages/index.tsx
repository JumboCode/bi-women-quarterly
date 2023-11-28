import React, { useState } from "react";
import UploadFile from "./components/UploadFile";
import SubmissionForm from "@/components/SubmissionForm";
import SubmissionPreview from "@/components/SubmissionFilePreview";



export default function Home() {
    // For testing purposes:
    const issue = "Some issue";
    const type = "Some type";
    const main_title = "title of piece";
    const main_desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin sagittis ex. Fusce pellentesque libero vitae urna tincidunt tempus. Proin orci odio, dapibus nec pulvinar sit amet, egestas ut sapien. Nunc vulputate tellus at sapien tempus, eget ultricies mauris accumsan. Suspendisse a pulvinar sapien, ut aliquet neque. Curabitur venenatis tristique vulputate. Donec imperdiet purus mi, nec scelerisque magna interdum sit amet. Morbi diam enim, placerat et nulla sed, rhoncus fringilla nisl. Duis blandit lectus et odio tempus pulvinar. Morbi ornare nisl ipsum, a porta odio lobortis eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras a varius enim, in ultricies odio. ";
    const add_title = "title of piece";
    const add_desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin sagittis ex. Fusce pellentesque libero vitae urna tincidunt tempus. Proin orci odio, dapibus nec pulvinar sit amet, egestas ut sapien. Nunc vulputate tellus at sapien tempus, eget ultricies mauris accumsan. Suspendisse a pulvinar sapien, ut aliquet neque. Curabitur venenatis tristique vulputate. Donec imperdiet purus mi, nec scelerisque magna interdum sit amet. Morbi diam enim, placerat et nulla sed, rhoncus fringilla nisl. Duis blandit lectus et odio tempus pulvinar. Morbi ornare nisl ipsum, a porta odio lobortis eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras a varius enim, in ultricies odio. ";
    const images = ["a.JPG", "b.JPG"];

    return (
        <div className="m-10 mx-12">
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
