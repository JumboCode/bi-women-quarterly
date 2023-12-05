/**
 * Page for reviewing a submission before submitting.
 * @author Lydia Chen
 * @author Austen Money
 * @author Avery Hanna and So Hyun Kim
 */

// import components
import PreviewType from '@/types/PreviewType';
import SubmissionFilePreview from "./SubmissionFilePreview"; 
// import types
import Preview from "@/types/Preview";

// Props definition
type Props = {
    previews: Preview[];
};

const ReviewSubmission: React.FC<Props> = props => {
    /* -------------- Props ------------- */

    // Destructure all props
    const { previews } = props;

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (
        <div className="w-3/4 p-4 mx-auto">
            <div className="grid gap-y-1 grid-cols-3 gap-0.01 mx-20 place-items-center h-screen">
                {previews.map((preview) => {
                    return (
                        <SubmissionFilePreview
                            key={preview.contentDriveUrl}
                            preview={preview}
                        ></SubmissionFilePreview>
                    );
                })}
            </div>
        </div>
    );
};

export default ReviewSubmission;
