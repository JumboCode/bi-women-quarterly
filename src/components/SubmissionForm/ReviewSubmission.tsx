/**
 * Page for reviewing a submission before submitting.
 * @author Lydia Chen
 * @author Austen Money
 */

// import components
import PreviewCard from "./PreviewCard";

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
        <div className="m-10 mx-12">
            {previews.map(preview => {
                return (
                    <PreviewCard
                        key={preview.contentDriveUrl}
                        preview={preview}
                    ></PreviewCard>
                );
            })}
        </div>
    );
};

export default ReviewSubmission;
