/**
 * Admin home page.
 * NOTE unfinished.
 * @author Lucien Bao
 */

import { UserButton } from "@clerk/nextjs";
import AdminGrid from "@/components/AdminGrid";

export default function AdminHomePage() {

    const sampleData = [
        { id: 1, issue: 1, type: "Type 1", title: "Example A", name: "Author A", status: "Accepted", demographics: "United States", tags: "Family", ratings: 5, notes: "None" },
        { id: 2, issue: 2, type: "Type 1", title: "Example B", name: "Author B", status: "Accepted", demographics: "United States", tags: "Love", ratings: 5, notes: "None" },
        { id: 3, issue: 3, type: "Type 1", title: "Example C", name: "Author C", status: "Pending", demographics: "United States", tags: "Other", ratings: 5, notes: "None" },
        { id: 4, issue: 4, type: "Type 2", title: "Example D", name: "Author D", status: "Pending", demographics: "Canada", tags: "Other", ratings: 5, notes: "None" },
        { id: 5, issue: 5, type: "Type 2", title: "Example E", name: "Author E", status: "Pending", demographics: "Canada", tags: "Other", ratings: 5, notes: "None" },
        { id: 6, issue: 6, type: "Type 2", title: "Example F", name: "Author F", status: "Pending", demographics: "Canada", tags: "Other", ratings: 4, notes: "None" },
        { id: 7, issue: 7, type: "Type 3", title: "Example G", name: "Author G", status: "Pending", demographics: "Antarctica", tags: "Other", ratings: 3, notes: "None" },
        { id: 8, issue: 8, type: "Type 3", title: "Example H", name: "Author H", status: "Pending", demographics: "Antarctica", tags: "Other", ratings: 2, notes: "None" },
        { id: 9, issue: 9, type: "Type 3", title: "Example I", name: "Author I", status: "Pending", demographics: "Antarctica", tags: "Other", ratings: 1, notes: "None" }
    ];

    console.log("This is length from main:", sampleData.length);

    return (
        <div>
            {/* <UserButton></UserButton> */}
            {/* Welcome to the shadow realm */}
            <AdminGrid submissions={sampleData}></AdminGrid>
        </div>
    );
}