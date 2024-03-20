import HomePage from "@/components/HomePage";
import { SignIn } from "@clerk/clerk-react";

export default function Home() {
    return (
        <div>
            <SignIn></SignIn>
            <HomePage></HomePage>
        </div>
    );
}
