import AdminHomePage from "@/components/AdminHomePage";
import HomePage from "@/components/HomePage";
import { useUser } from "@clerk/nextjs";

export default function Home() {
    const { user } = useUser();
    const isAdmin =
        user?.organizationMemberships && user?.organizationMemberships.length > 0;

    return (
        <div className="h-screen w-screen">
            {isAdmin 
                ? <AdminHomePage></AdminHomePage>
                : <HomePage></HomePage>
            }
        </div>
    );
}