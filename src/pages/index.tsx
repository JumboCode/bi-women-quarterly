import AdminGrid from "@/components/AdminHomePage/AdminGrid";
import AdminHomePage from "@/components/AdminHomePage";
import HomePage from "@/components/HomePage";
import { useUser } from "@clerk/nextjs";
import ProfileReview from '@/components/ProfileReview';

export default function Home() {
    const { user } = useUser();
    const isAdmin =
        user?.organizationMemberships !== undefined &&
        user?.organizationMemberships.length > 0;

    return isAdmin ? (
        <div>
            <AdminHomePage></AdminHomePage>
        </div>
    ) : (
        <div>
            <HomePage></HomePage>
        </div>
    );
}
