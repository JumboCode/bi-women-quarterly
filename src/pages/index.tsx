//import { SignIn } from "@clerk/nextjs"
import UserEditableSubmission from "@/components/UserEditableSubmission";
import Preview from "@/types/Preview"
import Mediums from "@/types/Mediums";
import PreviewType from "@/types/PreviewType";
import Statuses from "@/types/Statuses";

export default function Home() {
    return (
        <div>
            <UserEditableSubmission 
                submission = {{
                editor_note: "A note to the editor",
                artist_statement: "I love dogs",
                id: "",
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
                    imageUrl: "https://cdn.shopify.com/s/files/1/1414/2472/files/1-_604px-Mona_Lisa__by_Leonardo_da_Vinci__from_C2RMF_retouched.jpg?v=1558424691",
                    contentDriveUrl: "https://drive.google.com/drive/u/0/home",
                },
                additionalReferences: [
                    {
                        title: "Additional Reference",
                        type: PreviewType.Submission,
                        description: "Additional reference description",
                        imageUrl: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
                        contentDriveUrl: ""
                    }
                ],
                }}     
             />
        </div>
    );
}


