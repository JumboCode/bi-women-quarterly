/**
  * Home page that shows all of a user's submissions.
  * @author Austen Money
 */

// Import React
import React, { useReducer } from 'react';

// Import clerk
import { UserButton, useUser } from "@clerk/nextjs";

// Import components
import ReviewSubmission from '@/components/ReviewSubmission';

// Import types
import Submission from '@/types/Submission';
import Preview from '@/types/Preview';
import PreviewType from '@/types/PreviewType';

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

export default function HomePage() {

  const { user } = useUser();

  let submissions: Submission[] = [];
  if (user && user.unsafeMetadata.submissions) {
      submissions = user.unsafeMetadata.submissions as Submission[];
  }

  /*------------------------------------------------------------------------*/
  /* -------------------------------- Setup ------------------------------- */
  /*------------------------------------------------------------------------*/

  if (!user) {
    return;
  }

  /*------------------------------------------------------------------------*/
  /* ------------------------- Component Functions ------------------------ */
  /*------------------------------------------------------------------------*/

  /**
    * Add new submission
    * @author Austen Money
   */
  const onSubmitWork = () => {
    const randomId = String(Math.random());
  
    const newSubmission: Submission = {
        id: randomId,
        author: "who?",
        title: "a NEWW title",
        date: "today",
        issue: "my ISSUES",
        isApproved: false,
        mainSubmission: {
          type: PreviewType.Submission,
          title: "new title 2",
          description: randomId,
          imageUrl: "https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png",
          contentDriveUrl: "placeholder link",
        }
    }

    submissions.push(newSubmission);

    try {
      user.update({
        unsafeMetadata: {
          submissions,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
    * Clear all submissions.
    * @author Austen Money
   */
  const onClearWork = () => {
    try {
      user.update({
        unsafeMetadata: {
          submissions: [],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  /*------------------------------------------------------------------------*/
  /* ------------------------------- Render ------------------------------- */
  /*------------------------------------------------------------------------*/

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/
    return (
        <div className="relative flex flex-col">
          <div className="absolute bg-gray-400 h-6 t-0">
            <div className="fixed m-5 mx-5 right-0 top-0">
                <li className="flex items-center space-x-2">
                  <button onClick={onClearWork} className="HomePage-submit-button">
                    Clear Work
                  </button>
                  <button onClick={onSubmitWork} className="HomePage-submit-button">
                    Submit Work
                  </button>
                  <div className="ml-4">
                    <UserButton afterSignOutUrl="/"/>
                  </div>
                </li>
            </div>
            <div className="fixed top-20 left-20">
              <li className="flex justify-center space-x-20">
                <button>
                  All Submissions
                </button>
                <button>
                  Approved Works
                </button>
                <button>
                  Current Submissions
                </button>
              </li>
            </div>
            </div>
            <div className="pt-14 pl-8">
              <div className="flex">
                {(submissions.length < 1)
                  ? <div className="absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600">You have no submissions.</div>
                  : <ReviewSubmission
                      previews={submissions.map((submission) => {
                        return submission.mainSubmission;
                      })}
                    />
                  }
              </div>
            </div>
        </div>
    )
}
