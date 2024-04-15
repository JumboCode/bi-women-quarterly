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

    const { imageUrl, title, contentDriveUrl } = preview;

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (
        <button 
            onClick={(e) => {
                e.preventDefault();
                window.location.href=contentDriveUrl;
            }}
            className="flex justify-center p-4 m-2 bg-white bg-opacity-30 rounded-lg shadow-md hover:shadow-lg"
        >
            <div className="flex flex-col justify-center ms-8">
                <div className="w-3/4">
                    <img src={imageUrl} className=""></img>
                </div>
                <div className="w-3/4 b-0">
                    <div className="text-primary-blue text-base text-md font-semibold">{title}</div>
                </div>
            </div>
            <br />
        </button>
    );
};

export default SubmissionThumbnail;
