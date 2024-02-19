import UserEditableSubmission from '@/components/UserEditableSubmission';
import PreviewType from '@/types/PreviewType'
import Preview from '@/types/Preview';
import Mediums from '@/types/Mediums';
import Issues from '@/types/Issues';

export default function Home() {
    return (
        <div>
            <UserEditableSubmission 
                submission = {{
                id: "",
                author: "Author",
                title: "It's a great title",
                date: "01/07/24",
                isApproved: false,
                medium: Mediums.Fiction,
                issue: Issues.Current,
                mainSubmission: {
                    title: "",
                    type: PreviewType.Submission,
                    description: "a description",
                    imageUrl: "https://cdn.shopify.com/s/files/1/1414/2472/files/1-_604px-Mona_Lisa__by_Leonardo_da_Vinci__from_C2RMF_retouched.jpg?v=1558424691",
                    contentDriveUrl: ""
                }
                }}     
             />
        </div>
    );
}

