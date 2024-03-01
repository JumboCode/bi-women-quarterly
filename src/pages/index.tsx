import AdminGrid from "@/components/AdminGrid";
import AdminHomePage from "@/components/AdminHomePage";
import { useUser } from "@clerk/nextjs";

export default function Home() {
    return (
        <div>
            <AdminHomePage></AdminHomePage>
        </div>
    );
}
