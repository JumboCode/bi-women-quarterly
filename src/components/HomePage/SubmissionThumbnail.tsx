/**
 * Submission Thumbnail component that displays the title and image
 * @author Lydia Chen
 * @author Avery Hanna
 * @author So Hyun Kim
 */

// Import types
import Statuses from "@/types/Statuses";
import Submission from "@/types/Submission";

// Props definition
type Props = {
    submission: Submission;
};

/*------------------------------------------------------------------------*/
/* -------------------------- Static Functions -------------------------- */
/*------------------------------------------------------------------------*/

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

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
    const { submission } = props;

    const { 
        title,
        status,
        date,
        mainSubmission: {
            imageUrl,
            contentDriveUrl,
        }
    } = submission;

    // fetch the new thumbnail using file id
    // get file id from contentdriveurl + "thumbnail"

    const [newImageUrl, setImageUrl] = useState<string>(""); // TODO: fix this jank

    useEffect(() => {
        async function getThumbnailUrl() {
            const id = contentDriveUrl.split("/").toReversed()[0];
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/thumbnail/?id=${id}`, { method: "GET" })
                .then(res => res.json())
                .then(res => setImageUrl(res.body));
        }
        getThumbnailUrl();
    });

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                openInNewTab(contentDriveUrl);
            }}
            className="group block flex flex-col items-start bg-[#ffffff3c] hover:bg-[#385FB8] cursor-pointer p-4 transition-colors rounded-lg hover:text-[#ffffff] w-full"
        >
            <div className="w-full mb-2 object-cover"> {/*max-w-md min-w-min */}
                <img src={imageUrl} className="max-h-96 rounded-lg"></img>
            </div>
            <div className="w-full flex min-w-min justify-between">
                <div className="text-[#385FB8] font-bold md:text-xl lg:text-2xl xl:text-2xl group-hover:text-white">{title}</div>
                <div className={`max-h-7 h-auto text-[#385FB8] text-xs font-bold border-2 border-[#385FB8] rounded-xl p-1  ${status === Statuses.Approved
                ? "bg-[#ffffff] group-hover:text-[#385FB8]"
                : "group-hover:text-white group-hover:border-white"
                }`}>{status.toLocaleUpperCase()} </div>
            </div>
            <div className="max-w-md min-w-min group-hover:text-white">
                <div className="text-[#385FB8] md:text-lg group-hover:text-white">{formatDate(date)}</div>
            </div> 
        </button>
    );
};

export default SubmissionThumbnail;
