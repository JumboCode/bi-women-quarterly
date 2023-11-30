/**
 * Page for reviewing a submission before submitting. 
 * @author Lydia Chen
 * @author Austen Money
 */

// import components
import PreviewType from '@/types/PreviewType';
import SubmissionFilePreview from "./SubmissionFilePreview";

// import types
import Preview from '@/types/Preview';

// Props definition
type Props = {
    previews: Preview[],
  };

const ReviewSubmission: React.FC<Props> = (props) => {

    /* -------------- Props ------------- */

    // Destructure all props
    const {
        previews
    } = props;

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (
        <div className="m-10 mx-12">
            {previews.map((preview) => {
                return (
                    <SubmissionFilePreview 
                        key={preview.contentDriveUrl}
                        preview={preview}
                    ></SubmissionFilePreview>
                );
            })}
        </div>
    )
}

export default ReviewSubmission;
