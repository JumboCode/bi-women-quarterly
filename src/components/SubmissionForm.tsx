/**
 * Submission form components that takes in title, issue and type of
 * publication
 * @author Alana Sendlakowski, Vanessa Rose
 */

// Import React
import { useState } from 'react';

// Import Submission type
import Submission from "../types/Submission";

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

export default function SubmissionForm() {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/

    /* -------------- State ------------- */

    // Initialize state
    const [states, setStates] = useState<Submission>({
        id: "", 
        author : "",
        title : "", 
        issue: "", 
        date: "", 
        isApproved: false});

    /*------------------------------------------------------------------------*/
    /* ------------------------- Lifecycle Functions ------------------------ */
    /*------------------------------------------------------------------------*/

    /**
     * Sends title, issue, and date of the submission to the Submissions database
     * when the form is submitted, 
     * @author Alana Sendlakowski, Vanessa Rose
     * @param event the event that has been changed
     */
    const handleSubmit = async (event : any) => {
        event.preventDefault();
        const response = await fetch("../api/submissions/add", {
            method: "POST", // or 'PUT'
            body: JSON.stringify({
                title: states.title,
                issue: states.issue,
                date: states.date
            }),
        });
        console.log(response);
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

            <label>Date: 
                {/* text input element for date */}
                <input
                    type="text" 
                    name="date"
                    value={states.date}
                    onChange={handleSubmissionChange}
                />
            </label>

            {/* submission button */}
            <button type = "submit">
                Submit Query
            </button>
        </form>
    )
}