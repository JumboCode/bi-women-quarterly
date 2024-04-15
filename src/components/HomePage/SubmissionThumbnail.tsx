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

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (
        <button>
            <div onClick={(e) => {
                e.preventDefault();
                window.location.href=contentDriveUrl;
            }}
            className="group block flex flex-col items-start bg-[#ffffff3c] hover:bg-[#385FB8] cursor-pointer m-2 p-5 transition-colors rounded-lg hover:text-[#ffffff] w-full h-full">
                <div className="w-full h-full bg-gray-200 m-auto mb-4"> {/*max-w-md min-w-min */}
                    <img src={imageUrl} className="max-w-full rounded-lg"></img>
                </div>
                <div className="w-full flex min-w-min justify-between">
                    <div className="text-[#385FB8] font-bold md:text-xl lg:text-2xl xl:text-2xl group-hover:text-white">{title}</div>
                    {/*PENDING*/}
                    {/* <div className="text-[#385FB8] md:text-sm font-bold group-hover:text-white border-2 border-[#385FB8] rounded-xl p-2  group-hover:border-white">PENDING</div> */}
                    {/*APPROVED*/}
                    <div className={status === Statuses.Approved
                    ? "bg-[#ffffff] rounded-xl p-1"
                    : "text-[#385FB8] md:text-sm font-bold group-hover:text-white border-2 border-[#385FB8] rounded-xl p-1 group-hover:border-white"
                    }>{status.toLocaleUpperCase()} </div>
                    {/* <div className="text-[#385FB8] md:text-sm font-bold group-hover:text-[#385FB8] bg-[#ffffff] rounded-xl p-2">APPROVED</div> */}
                    {/* <div className="font-normal">{contentDriveUrl}</div> */}
                </div>
                <div className="max-w-md min-w-min group-hover:text-white">
                    <div className="text-[#385FB8] md:text-lg group-hover:text-white">{formatDate(date)}</div>
                    {/* <div className="font-normal">{contentDriveUrl}</div> */}
                </div> 
            </div>
            <br />
        </button>
    );
};

export default SubmissionThumbnail;
