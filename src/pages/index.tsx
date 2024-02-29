import AdminGrid from "@/components/AdminGrid";
import { useUser } from "@clerk/nextjs";

export default function Home() {
    return (
        <div>
            <AdminGrid></AdminGrid>
        </div>
    );
}
