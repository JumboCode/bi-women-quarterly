import { UserButton, useUser } from "@clerk/nextjs";
import ReviewSubmission from '@/components/ReviewSubmission';

import Submission from '@/types/Submission';
import Preview from '@/types/Preview';
import PreviewType from '@/types/PreviewType';

export default function HomePage() {
    const { user } = useUser();
    if (!user) {
        return;
    }

    const randomId = String(Math.random());

    const newSubmission: Submission = {
        id: randomId,
        author: "who?",
        title: "a NEWW title",
        issue: "my ISSUES",
        date: "today",
        wordDoc: "wonderful link here"
    }

    let newSubmissions: Submission[] = [];
    if (user.unsafeMetadata.submissions) {
        newSubmissions = user.unsafeMetadata.submissions as Submission[];
    }
    
    newSubmissions.push(newSubmission);
    
    const onSubmit = () => {
        try {
          user.update({
            unsafeMetadata: {
              submissions: newSubmissions,
            },
          });
        } catch (error) {
          console.log(error);
        }
      };
    

    return (
        <div>
          <UserButton afterSignOutUrl="/"/>
          <button onClick={onSubmit}>
            Submit here
          </button>
          <ReviewSubmission
            previews={newSubmissions.map((submission) => {
              const newPreview: Preview = {
                type: PreviewType.Submission,
                title: submission.title,
                description: "placeholder desc",
                imageUrl: "placeholder image url",
              }
              return newPreview;
            })}
          />
        </div>
    )
}
