/**
 * Submission File Preview component that displays the title, 
 * description, and image
 * @author Lydia Chen
 */

// Import Preview type
import Preview from "../types/Preview"

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

export default function SubmissionPreview (props : Preview) {
                                                
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (
        <div>
            <div className="py-6">{props.type}</div>
            
            <div className="flex">
                <div className="max-w-xl min-w-min w-1/3 bg-gray-200"><img src={props.imageUrl} className="max-w-full"></img></div>

                <div className= "ps-12">
                    <div className="font-bold">{props.title}</div>
                    <div className="py-6 pr-6 max-w-xl">{props.description}</div>
                </div>
            </div>
            <br />
        </div>
    );
};
