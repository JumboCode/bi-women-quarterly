/**
 * Submission Preview component that displays the title,
 * description, and image
 * @author Lydia Chen
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

const PreviewCard: React.FC<Props> = props => {
    /* -------------- Props ------------- */

    // Destructure all props
    const { preview } = props;

    const { type, imageUrl, title, description } = preview;

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (
        <div>
            <div className="py-6">{type}</div>

            <div className="flex">
                <div className="max-w-xl min-w-min w-1/3 bg-gray-200">
                    <img src={imageUrl} className="max-w-full"></img>
                </div>

                <div className="ps-12">
                    <div className="font-bold">{title}</div>
                    <div className="py-6 pr-6 max-w-xl">{description}</div>
                </div>
            </div>
            <br />
        </div>
    );
};

export default PreviewCard;
