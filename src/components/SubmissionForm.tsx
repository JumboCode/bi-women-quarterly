/**
 * Submission form components that takes in title, issue and type of
 * publication
 * @author Alana Sendlakowski, Vanessa Rose
 */

// Import React
import { useState } from 'react';

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

export default function SubmissionForm() {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/

    /* -------------- State ------------- */

    // Initialize state
    const [states, setStates] = useState({title : "", issue : "", type : "",})

    /*------------------------------------------------------------------------*/
    /* ------------------------- Lifecycle Functions ------------------------ */
    /*------------------------------------------------------------------------*/

    /**
     * Prints the title, issue, and type of the publication to the console
     * when the form is submitted
     * @author Alana Sendlakowski, Vanessa Rose
     * @param event the event that has been changed
     */
    const handleSubmit = (event : any) => {
        event.preventDefault();
        console.log('title: ' + states.title);
        console.log("issue: " + states.issue);
        console.log("type: " + states.type);
    }
    
    /**
     * Handles the change of elements in the form by updating useState variable
     * @author Alana Sendlakowski, Vanessa Rose
     * @param event the event that has been changed
     * @returns new states of all the elements in the form
     */
    const handleSubmissionChange = (event : any) => {
        setStates( prevValues => {
            return { ...prevValues,[event.target.name]: event.target.value}
         })
    }

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/

    return (
      // Creates a form to retrieve title, issue, and name information
        <form onSubmit={handleSubmit}>
            <label>Title: 
                {/* text input element for title */}
                <input
                    type="text" 
                    name="title"
                    value={states.title}
                    onChange={handleSubmissionChange}
                />
            </label>

            {/* drop down element for issue selection */}
            <select name="issue" value={states.issue} onChange={handleSubmissionChange}>
                <option value="Issue1">Issue 1</option>
                <option value="Issue2">Issue 2</option>
                <option value="Issue3">Issue 3</option>
            </select>

            {/* drop down element for type selection */}
            <select name="type" value={states.type} onChange={handleSubmissionChange}>
                <option value="Nonfiction">Nonfiction</option>
                <option value="Fiction">Fiction</option>
                <option value="Poetry">Poetry</option>
                <option value="Visual">Visual Art</option>
                <option value="other">Other</option>
            </select>

            {/* submission button */}
            <input type="submit" />
        </form>
    )
}