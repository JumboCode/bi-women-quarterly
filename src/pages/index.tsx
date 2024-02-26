import HomePage from "@/components/HomePage";
import AdminHomePage from "@/components/AdminHomePage";
import { useUser } from "@clerk/nextjs";

export default function Home() {
    const { isLoaded, isSignedIn, user } = useUser();
    const isAdmin = user?.organizationMemberships?.length! > 0;

    return isAdmin ?
        (
            <div>
                <AdminHomePage></AdminHomePage>
            </div>
        ) : (
            <div>
                <HomePage></HomePage>
            </div>
        );
}
