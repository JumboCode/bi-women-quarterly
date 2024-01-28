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
                date: "",
                isApproved: false,
                medium: Mediums.Fiction,
                issue: Issues.Current,
                mainSubmission: {
                    title: "",
                    type: PreviewType.Submission,
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    imageUrl: "https://cdn.shopify.com/s/files/1/1414/2472/files/1-_604px-Mona_Lisa__by_Leonardo_da_Vinci__from_C2RMF_retouched.jpg?v=1558424691",
                    contentDriveUrl: ""
                }
                }}     
             />
        </div>
    );
}
