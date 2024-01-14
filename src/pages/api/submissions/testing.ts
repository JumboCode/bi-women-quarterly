import Submission from "@/types/Submission";
import Issues from "@/types/Issues";
import PreviewType from "@/types/PreviewType";
import Mediums from "@/types/Mediums";

export default function Home() {
    const test = async () => {
        const randomNumber = Math.random();
 
        // Create an initial document to add
        const original: Submission = {
            id: "fooAuthor|barTitle|" + randomNumber,
            author: "fooAuthor",
            title: "barTitle",
            issue: Issues.Current,
            date: "bazDate",
            isApproved: false,
            medium: Mediums.Fiction,
            mainSubmission: {
                type: PreviewType.Submission,
                title: "Submission Title",
                description: "Submission Description",
                imageUrl: "https://example.com/image.jpg",
                contentDriveUrl: "https://drive.google.com/yourfile",
            },
            additionalReferences: [{
                type: PreviewType.AdditionalReference, 
                title: "Reference Title",
                description: "Reference Description",
                imageUrl: "https://example.com/reference.jpg",
                contentDriveUrl: "https://drive.google.com/referencefile",
            }],
        };
 
        // Add it
        await fetch("http://localhost:3000/api/submissions/add", {
            method: "POST",
            body: JSON.stringify(original),
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    console.log("Successfully added submission.");
                    console.log(res.data);
                } else {
                    console.log("Add failed.")
                }
            });
 
        // Create an edited version
        const edit: Submission = {
            id: "fooAuthor|barTitle|" + randomNumber,
            author: "EDITED!",
            title: "barTitle",
            issue: Issues.Next,
            date: "bazDate",
            isApproved: false,
            medium: Mediums.Poetry, 
            mainSubmission: {
                type: PreviewType.Submission,
                title: "Edited Submission Title",
                description: "Edited Submission Description",
                imageUrl: "https://example.com/edited-image.jpg",
                contentDriveUrl: "https://drive.google.com/edited-file",
            },
            additionalReferences: [{
                type: PreviewType.AdditionalReference,
                title: "Edited Reference Title",
                description: "Edited Reference Description",
                imageUrl: "https://example.com/edited-reference.jpg",
                contentDriveUrl: "https://drive.google.com/edited-reference-file",
            }],
        };
 
        await fetch('http://localhost:3000/api/submissions/edit', {
            method: 'PATCH',
            body: JSON.stringify(edit),
        })
            // convert promise to JSON
            .then(res => res.json())
            // print out results
            .then(res => {
                if (res.success) {
                    console.log("Successfully edited submission.");
                    console.log(res.data);
                } else {
                    console.log("Edit failed");
                }
            });
    };
 
    test();
 }