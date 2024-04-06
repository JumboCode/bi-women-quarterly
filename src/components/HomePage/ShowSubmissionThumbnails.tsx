/**
 * Page for reviewing a submission before submitting.
 * @author Lydia Chen
 * @author Austen Money
 * @author Avery Hanna
 * @author So Hyun Kim
 */

// import components
import SubmissionThumbnail from "./SubmissionThumbnail";
// import types
import Submission from "@/types/Submission";

// Props definition
type Props = {
    submissions: Submission[];
};

const ShowSubmissionThumbnails: React.FC<Props> = props => {
    /* -------------- Props ------------- */

    // Destructure all props
    const { submissions } = props;

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (
        <div className="mx-auto">
            <div className="grid grid-cols-4 m-4">
                {submissions.map(submission => {
                    return (
                        <SubmissionThumbnail
                            key={`${submission.title}|${submission.mainSubmission.imageUrl}|${submission.mainSubmission.contentDriveUrl}`}
                            submission={submission}
                        ></SubmissionThumbnail>
                    );
                })}
            </div>
        </div>
    );
};

export default ShowSubmissionThumbnails;
