//import { SignIn } from "@clerk/nextjs"
import UserEditableSubmission from "@/components/UserEditableSubmission";
import Submission from "@/types/Submission";
import Preview from "@/types/Preview"
import Mediums from "@/types/Mediums";
import PreviewType from "@/types/PreviewType";
import Statuses from "@/types/Statuses";
import { useEffect, useState } from "react";

const getSubmission = async(id: string) => {
    let submission;
    try {
        submission = await fetch(`/api/submissions/get-by-user?id=${id}`, {
        method: "GET"
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    console.log("Successfully connected to database");
                    return res.data;
                } else {
                    console.log("Failed to connect to database");
                }
            });
    } catch (error) {
        console.log(error);
    }
    return submission;
}


export default function Home() {
    const initialSubmission = {
        editor_note: "A note to the editor",
                artist_statement: "I love dogs",
                id: "use_test",
                author: "Author",
                title: "It's a great title",
                date: "01/07/24",
                status: Statuses.Pending,
                medium: Mediums.Fiction,
                issue: "",
                mainSubmission: {
                    title: "",
                    type: PreviewType.Submission,
                    description: "a description",
                    thumbnailUrl: "https://cdn.shopify.com/s/files/1/1414/2472/files/1-_604px-Mona_Lisa__by_Leonardo_da_Vinci__from_C2RMF_retouched.jpg?v=1558424691",
                    contentDriveUrl: "https://drive.google.com/drive/u/0/home",
                },
                additionalReferences: [
                    {
                        title: "Additional Reference",
                        type: PreviewType.AdditionalReference,
                        description: "Additional reference description",
                        thumbnailUrl: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
                        contentDriveUrl: ""
                    },
                    {
                        title: "Additional Reference",
                        type: PreviewType.AdditionalReference,
                        description: "Additional reference description",
                        thumbnailUrl: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
                        contentDriveUrl: ""
                    }
                ],
    }
    const [submission, setSubmission] = useState<Submission>(initialSubmission);
    
    useEffect(() => {
        (async () => {
            const submission = await getSubmission("use_test");
            console.log("here", submission[0].submission);
            setSubmission(submission[0].submission);
        })();
    }, []);

    return (
        <div>
            <UserEditableSubmission 
                submission = {submission}
             />
        </div>
    );
}

