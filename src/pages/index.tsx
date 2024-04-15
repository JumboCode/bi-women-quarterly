import UserEditableSubmission from '@/components/UserEditableSubmission';
import PreviewType from '@/types/PreviewType';
import Preview from '@/types/Preview';
import Mediums from '@/types/Mediums';
import Issues from '@/types/Issues';

export default function Home() {
    return (
        <div>
            <UserEditableSubmission 
                submission = {{
                editor_note: "hi testing editor note",
                artist_statement: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                id: "",
                author: "Author",
                title: "It's a great title",
                date: "01/07/24",
                medium: Mediums.Fiction,
                issue: Issues.Current,
                mainSubmission: {
                    title: "",
                    type: PreviewType.Submission,
                    description: "a description",
                    imageUrl: "https://cdn.shopify.com/s/files/1/1414/2472/files/1-_604px-Mona_Lisa__by_Leonardo_da_Vinci__from_C2RMF_retouched.jpg?v=1558424691",
                    contentDriveUrl: "",
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


