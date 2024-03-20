/**
 * Submission Thumbnail component that displays the title and image
 * @author Lydia Chen
 * @author Avery Hanna
 * @author So Hyun Kim
 */

// Import types
import Preview from "@/types/Preview";

// Props definition
type Props = {
    preview: Preview;
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const SubmissionThumbnail: React.FC<Props> = props => {
    /* -------------- Props ------------- */

    // Destructure all props
    const { preview } = props;

    const { type, imageUrl, title, contentDriveUrl, description } = preview;

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (
        <div>
            <div className="flex-col items-start">
                <div className="max-w-md min-w-min w-2/4 bg-gray-200">
                    <img src={imageUrl} className="max-w-full"></img>
                </div>
                <div className="max-w-md min-w-min w-2/4">
                    <div className="font-normal">{title}</div>
                    <div className="font-normal">{contentDriveUrl}</div>
                </div>
            </div>
            <br />
        </div>
    );
};

export default SubmissionThumbnail;
