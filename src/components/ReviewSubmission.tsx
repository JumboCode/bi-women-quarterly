/**
 * Page for reviewing a submission before submitting. 
 * @notes This is a test page only; no actual submission data is being 
 *        retrieved.
 * @author Lydia Chen
 * @author Austen Money
 */

// import components
import SubmissionPreview from "./SubmissionFilePreview";

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

    return (
        <div className="m-10 mx-12">
            {previews.map((preview) => {
                return (
                    <SubmissionPreview 
                        type = {preview.type}
                        title = {preview.title}
                        description = {preview.description}
                        imageUrl = {preview.imageUrl}
                    ></SubmissionPreview>
                );
            })}
        </div>
    )
}

export default ReviewSubmission;
