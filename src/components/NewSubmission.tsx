/**
 * Submission form components that takes in title, issue and type of
 * publication
 * @author Alana Sendlakowski, Vanessa Rose
 */

// Import React
import { useState } from 'react';

// Import types
import Submission from "../types/Submission"
import PreviewType from "../types/PreviewType"
import Mediums from '@/types/Mediums';
import Issues from '@/types/Issues';

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

export default function SubmissionForm() {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/

    /* -------------- State ------------- */

    // Initialize state
    const [submission, setSubmission] = useState<Submission>(
        {
            id : "",
            author : "",
            title : "",
            date: "",
            issue: Issues.None,
            medium: Mediums.None,
            isApproved : false,
            mainSubmission: {
                type: PreviewType.Submission,
                title: "",
                description: "",
                imageUrl: "",
                contentDriveUrl: "",
            },
        })

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
        console.log('title: ' + submission.title);
        console.log("issue: " + submission.issue);
        console.log("date: " + submission.date);
    }
    
    /**
     * Handles the change of elements in the form by updating useState variable
     * @author Alana Sendlakowski, Vanessa Rose
     * @param event the event that has been changed
     * @returns new states of all the elements in the form
     */
    const handleSubmissionChange = (event : any) => {
        setSubmission( prevValues => {
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
                <label className="pr-[6px] font-bold"> *Input: </label>
                <select name="issue" className="inline-block h-[30px] w-[115px] pl-1 text-m text-gray-900 rounded-lg" value={submission.issue} onChange={handleSubmissionChange}>
                    <option selected>Select Issue</option>
                    <option value={Issues.None}>{Issues.None}</option>
                    <option value={Issues.Current}>{Issues.Current}</option>
                    <option value={Issues.Next}>{Issues.Next}</option>
                </select>

            <label className="pl-[50px] pr-[6px] font-bold">*Type: </label>
                {/* drop down element for issue selection */}
                <select name="medium" className="h-[30px] w-[115px] pl-1 text-m text-gray-900 rounded-lg" value={submission.medium} onChange={handleSubmissionChange}>
                    <option selected>Select Type</option>
                    <option value={Mediums.Fiction}>Fiction</option>
                    <option value={Mediums.Nonfiction}>Nonfiction</option>
                    <option value={Mediums.Poetry}>Poetry</option>
                    <option value={Mediums.VisualArt}>Visual Art</option>
                    <option value={Mediums.Other}>Other</option>
                </select>
            </div>
        </form>
    )
}