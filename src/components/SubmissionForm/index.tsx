/**
 * Submission form components that takes in title, issue and type of
 * publication
 * @author Alana Sendlakowski, Vanessa Rose
 */

// Import React
import { useState } from 'react';

// Import types
import Submission from "@/types/Submission"
import PreviewType from "@/types/PreviewType"
import Mediums from '@/types/Mediums';
import Issues from '@/types/Issues';

// Import Next
import Link from 'next/link'

// Import clerk
import { useUser } from "@clerk/nextjs";

// Import components
import LocalFile from '@/components/SubmissionForm/LocalFile';
import Preview from '@/types/Preview';

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

export default function SubmissionForm() {
    const { user } = useUser();

    if (!user) {
        return null;
    }

    let submissions: Submission[] = [];
    if (user && user.unsafeMetadata.submissions) {
        submissions = user.unsafeMetadata.submissions as Submission[];
    }

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
                imageUrl: "https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png",
                contentDriveUrl: "",
            },
        })

    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/

    /**
     * Prints the title, issue, and type of the publication to the console
     * when the form is submitted
     * @author Alana Sendlakowski, Vanessa Rose
     * @param event the event that has been changed
     */
    const handleSubmit = async () => {
        // push new submission to front of array
        submissions.unshift(submission);

        try {
            // update user metadata with submission
            user.update({
                unsafeMetadata: {
                    submissions
                }
            });
            // add submission to database
            await fetch("../api/submissions/add", {
                method: "POST",
                body: JSON.stringify({
                    submission
                }),
            });
        } catch (error) {
            console.log(error);
        }
    };
    
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

    const handleNewPreview = (newPreview: Preview) => {
        setSubmission( prevValues => {
            return { ...prevValues, mainSubmission: newPreview}
         })
    }

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/

    return (
        <div className="p-8 h-screen bg-[#ecf0f6]">
            <h1 className="text-2xl font-bold pb-8">New Submission</h1>
        {/* // Creates a form to retrieve title, issue, and name information */}
            <div>
                {/* drop down element for issue selection */}
                <div className="pb-[20px]">
                    <label className="pr-[6px] font-bold"> *Issue: </label>
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
                        <option value={Mediums.Fiction}>{Mediums.Fiction}</option>
                        <option value={Mediums.Nonfiction}>{Mediums.Nonfiction}</option>
                        <option value={Mediums.Poetry}>{Mediums.Poetry}</option>
                        <option value={Mediums.VisualArt}>{Mediums.VisualArt}</option>
                        <option value={Mediums.Other}>{Mediums.Other}</option>
                    </select>
                </div>
            </div>
            <div className="p-6 h-[250px] bg-[#c3cee3] rounded-xl shadow-lg items-center space-x-4 outline-dashed outline-[#768fcd] outline-offset-[-3px]">
                <div className="break-normal">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3b60ba" className="mx-auto flex h-20 w-20 items-center justify-center">
                        <path fillRule="evenodd" d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clipRule="evenodd" />
                    </svg>
                </div>

                <h1 className="flex grow text-center justify-center text-l font-bold pb-1 pt-1">Drag & Drop Files Here</h1>
                <h1 className="flex grow text-center justify-center text-m pb-1 pt-1">or</h1>
                
                <div className="flex grow p-[10px] w-screen justify-center text-[#3b60ba]">
                    <LocalFile handleNewPreview={handleNewPreview}/>
                    <button type="submit" className="h-[30px] w-[115px] absolute right-[200px] rounded-sm items-center outline outline-[#5072c0] outline-offset-[3px]">
                        Google Drive
                    </button>
                </div>
            </div>
            <button type="submit" className="absolute bottom-[10px] left-[10px] mt-[100px] rounded-lg bg-white  m-6 h-[40px] w-[90px]  items-center shadow-lg">
                <Link href="/">
                    Cancel
                </Link>
            </button>
            <button type="submit" onClick={handleSubmit} className="absolute bottom-[10px] right-[10px] mt-[100px] rounded-lg m-6 h-[40px] w-[90px] items-center text-white bg-[#ec4899] shadow-lg">
                <Link href="/">
                    Submit
                </Link>
            </button>
        </div>
    )
}