/**
 * Submission Thumbnail component that displays the title and image
 * @author Lydia Chen
 * @author Avery Hanna
 * @author So Hyun Kim
 */

// Import types
import Preview from "@/types/Preview";
import { useState } from "react";

// Props definition
type Props = {
    preview: Preview;
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

export const openInNewTab = (url: string): void => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

const SubmissionThumbnail: React.FC<Props> = props => {
    /* -------------- Props ------------- */

    // Destructure all props
    const { preview } = props;

    const { imageUrl, title, contentDriveUrl } = preview;

    // fetch the new thumbnail using file id
    // get file id from contentdriveurl + "thumbnail"

    const [newImageUrl, setImageUrl] = useState(""); // TODO: fix this jank

    async () => {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/thumbnail`, {
            method: "GET",
            body: contentDriveUrl.split("/").toReversed()[0]
        })
            .then(res => {
                console.log(res.json());
                return res.json();
            })
            .then(res => {
                console.log(res.body);
                setImageUrl(res.body);
            });
    }

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                openInNewTab(contentDriveUrl);
            }}
            className="flex justify-center p-4 m-2 bg-white bg-opacity-30 rounded-lg shadow-md hover:shadow-lg"
        >
            <div className="flex flex-col justify-center ms-8">
                <div className="w-3/4">
                    <img src={newImageUrl} className=""></img>
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
