import { UserButton } from "@clerk/nextjs";
import ReviewSubmission from '@/components/ReviewSubmission';

export default function Home() {
    return (
        <div>
          <UserButton afterSignOutUrl="/"/>
          <ReviewSubmission></ReviewSubmission>
        </div>
    )
}
