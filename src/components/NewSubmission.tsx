/**
 * Submission form components that takes in title, issue and type of
 * publication
 * @author Alana Sendlakowski, Vanessa Rose
 */

// Import React
import { useState } from 'react';

// Import Submission type
import Submission from "../types/Submission"

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

export default function SubmissionForm() {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/

    /* -------------- State ------------- */

    // Initialize state
    const [states, setStates] = useState<Submission>({id : "", author : "", title : "", issue: "", date: "", image : "", wordDoc : ""})

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
        console.log("date: " + states.date);
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

            {/* drop down element for issue selection */}
            <div className="pb-[20px]">
                {/* <div>*Issue</div> */}
{/* <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></select> */}
                <label className="pr-[6px] font-bold"> *Input: </label>
                <select name="issue" className="inline-block h-[30px] w-[115px] pl-1 text-m text-gray-900 rounded-lg" value={states.issue} onChange={handleSubmissionChange}>
                    <option selected>Select Issue</option>
                    <option value="Issue1">Issue 1</option>
                    <option value="Issue2">Issue 2</option>
                    <option value="Issue3">Issue 3</option>
                </select>

            <label className="pl-[50px] pr-[6px] font-bold">*Type: </label>
                {/* drop down element for issue selection */}
                <select name="type" className="h-[30px] w-[115px] pl-1 text-m text-gray-900 rounded-lg" value={states.title} onChange={handleSubmissionChange}>
                    <option selected>Select Type</option>
                    <option value="Type1">Submission Piece</option>
                    <option value="Type2">Optional Related Photo</option>
                </select>
            </div>

            {/* submission button */}
            {/* <input type="submit" /> */}
        </form>
    )
}