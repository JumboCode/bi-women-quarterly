import HomePage from "@/components/HomePage";
import ProfileReview from "@/components/ProfileReview";
import { SignIn } from "@clerk/clerk-react";

export default function Home() {
    return (
        <div>
            <SignIn></SignIn>
            <HomePage></HomePage>
            <ProfileReview></ProfileReview>
        </div>
    );
}
