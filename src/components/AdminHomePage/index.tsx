/**
 * Admin home page.
 * NOTE unfinished.
 * @author Lucien Bao
 */

import { UserButton } from "@clerk/nextjs";

export default function AdminHomePage() {
    return (
        <div>
            <UserButton></UserButton>
            Welcome to the shadow realm
        </div>
    );
}