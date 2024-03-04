/**
 * Admin home page.
 * NOTE unfinished.
 * @author Lucien Bao
 */

import { UserButton } from "@clerk/nextjs";
import Submission from "@/types/Submission";
import Preview from "@/types/Preview";
import PreviewType from "@/types/PreviewType";
import AdminGrid from "@/components/AdminGrid";
import Statuses from "@/types/Statuses";
import Mediums from "@/types/Mediums";

export default function AdminHomePage() {
    const blank: Preview = {
        type: PreviewType.Submission,
        title: "string",
        description: "string",
        imageUrl: "string",
        contentDriveUrl: "string"
    }

    const sampleData: Submission[] = [
        { id: "author|title|date", issue: "1", medium: Mediums.Fiction, title: "Example A", author: "Author A", status: Statuses.Approved, /*demographics: "United States",*/ tags: ["Family"], rating: 5, notes: "None", mainSubmission: blank, date: "3/3/2024" },
        { id: "author|title|date", issue: "2", medium: Mediums.Fiction, title: "Example B", author: "Author B", status: Statuses.Approved, /*demographics: "United States",*/ tags: ["Love"], notes: "None", mainSubmission: blank, date: "3/3/2024" }, // has no rating
        { id: "author|title|date", issue: "3", medium: Mediums.Nonfiction, title: "Example C", author: "Author C", status: Statuses.Pending, /*demographics: "United States",*/ tags: ["Other"], rating: 5, notes: "One!", mainSubmission: blank, date: "3/3/2024" },
        { id: "author|title|date", issue: "4", medium: Mediums.Poetry, title: "Example D", author: "Author D", status: Statuses.Pending, /*demographics: "Canada",*/ tags: ["Tag1", "Tag2"], rating: 5, mainSubmission: blank, date: "3/7/2024" }, // has no notes
        { id: "author|title|date", issue: "5", medium: Mediums.VisualArt, title: "Example E", author: "Author E", status: Statuses.Pending, /*demographics: "Canada",*/ tags: ["Other"], rating: 5, notes: "None", mainSubmission: blank, date: "3/3/2024" },
        { id: "author|title|date", issue: "6", medium: Mediums.Other, title: "Example F", author: "Author F", status: Statuses.Declined, /*demographics: "Canada",*/ tags: ["Other"], rating: 4, notes: "None", mainSubmission: blank, date: "3/3/2024" },
        { id: "author|title|date", issue: "7", medium: Mediums.Other, title: "Example G", author: "Author G", status: Statuses.Declined, /*demographics: "Antarctica",*/ tags: ["Other"], rating: 3, notes: "None", mainSubmission: blank, date: "3/3/2024" },
        { id: "author|title|date", issue: "8", medium: Mediums.Other, title: "Example H", author: "Author H", status: Statuses.Declined, /*demographics: "Antarctica",*/ tags: [], rating: 2, notes: "None", mainSubmission: blank, date: "1/1/1111" }, // tags is empty
        { id: "author|title|date", issue: "9", medium: Mediums.Other, title: "Example I", author: "Author I", status: Statuses.Declined, /*demographics: "Antarctica",*/ rating: 1, notes: "None", mainSubmission: blank, date: "3/3/2024" } // has no tags
    ];

    console.log("This is length from main:", sampleData.length);

    return (
        <div>
            {/* <UserButton></UserButton> */}
            {/* Welcome to the shadow realm */}
            <AdminGrid submissionArray={sampleData}></AdminGrid>
        </div>
    );
}