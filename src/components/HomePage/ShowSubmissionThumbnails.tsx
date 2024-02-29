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
import Preview from "@/types/Preview";

// Props definition
type Props = {
    previews: Preview[];
};

const ShowSubmissionThumbnails: React.FC<Props> = props => {
    /* -------------- Props ------------- */

    // Destructure all props
    const { previews } = props;

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (
        <div className="mx-auto">
            <div className="grid grid-cols-4 mx-20 my-20">
                {previews.map(preview => {
                    return (
                        <SubmissionThumbnail
                            key={preview.contentDriveUrl}
                            preview={preview}
                        ></SubmissionThumbnail>
                    );
                })}
            </div>
        </div>
    );
};

export default ShowSubmissionThumbnails;
