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

export default function SubmissionPreview ({name, title, description, image} : Preview) {
                                                
    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/
    return (
        <div>
            <div>{name}</div>
            <div><img src={image}></img></div>
            <div>{title}</div>
            <div>{description}</div>
            <br />
        </div>
    );
};
