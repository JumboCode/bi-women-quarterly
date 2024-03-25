/**
 * Submission Thumbnail component that displays the title and image
 * @author Lydia Chen
 * @author Avery Hanna
 * @author So Hyun Kim
 */

// Import types
import Submission from "@/types/Submission";

// Props definition
type Props = {
    submission: Submission;
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const SubmissionThumbnail: React.FC<Props> = props => {
    /* -------------- Props ------------- */

    // Destructure all props
    const { submission } = props;

    // id: string;
    // author: string;
    // title: string;
    // date: string;
    // issue: string;
    // medium: Mediums;
    // status: Statuses;
    // mainSubmission: Preview;
    // additionalReferences?: Preview[] | undefined;
    // tags?: string[] | undefined;
    // rating?: number | undefined;
    // notes?: string | undefined;
    let submission_date: string = submission.date;
    // console.log(submission_date);

    function formatDate(submission.date: string): string {
        const date = new Date(submission.date);
        const options = { month: 'short', day: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }


    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (
        <div>
            <div onClick={() => {console.log('Button clicked!')}} 
            className="group block flex-col items-start bg-[#F0C2FE] hover:bg-[#385FB8] cursor-pointer m-2 p-2.5 transition-colors rounded-lg hover:text-[#ffffff]">
                <div className="max-w-md min-w-min w-2/4 bg-gray-200 m-auto">
                    <img src={submission.mainSubmission.imageUrl} className="max-w-full rounded-lg"></img>
                </div>
                <div className="max-w-md min-w-min w-2/4">
                    <div className="text-[#385FB8] font-bold md:text-xl lg:text-2xl xl:text-2xl group-hover:text-white">{submission.title}</div>
                    {/* <div className="font-normal">{contentDriveUrl}</div> */}
                </div>
                <div className="max-w-md min-w-min w-2/4 group-hover:text-white">
                    <div className="text-[#385FB8] md:text-lg group-hover:text-white">{submission.date}</div>
                    {/* <div className="font-normal">{contentDriveUrl}</div> */}
                </div> 
            </div>
            <br />
        </div>
    );
};

export default SubmissionThumbnail;
