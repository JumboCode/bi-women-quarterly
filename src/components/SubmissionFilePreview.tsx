/**
 * Submission File Preview compoment that displays the title, 
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
            <div className="fill-sky-100">{props.name}</div>
            <div><img src={props.image}></img></div>
            <div>{props.title}</div>
            <div>{props.description}</div>
            <br />
        </div>
    );
};
