/**
 * Admin Homepage
 * @author Lydia Chen
 * @author Lucien Bao
 */

import { UserButton } from "@clerk/nextjs";
import Submission from "@/types/Submission";
import Preview from "@/types/Preview";
import PreviewType from "@/types/PreviewType";
import AdminGrid from "@/components/AdminHomePage/AdminGrid";
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
        { id: "1", issue: 'Spring 2024: letters to self', medium: Mediums.Fiction, title: "Example A", author: "Author A", status: Statuses.Approved, /*demographics: "United States",*/ tags: ["Family"], rating: 5, notes: "", mainSubmission: blank, date: "3/3/2024" },
        { id: "2", issue: 'Spring 2024: letters to self', medium: Mediums.Fiction, title: "Example B", author: "Author B", status: Statuses.Approved, /*demographics: "United States",*/ tags: ["Love"], notes: "None", mainSubmission: blank, date: "3/3/2024" }, // has no rating
        { id: "3", issue: "Summer 2024: more than one letter", medium: Mediums.Nonfiction, title: "Example C", author: "Author C", status: Statuses.Pending, /*demographics: "United States",*/ tags: ["Other"], rating: 5, notes: "One!", mainSubmission: blank, date: "3/3/2024" },
        { id: "4", issue: 'Spring 2024: letters to self', medium: Mediums.Poetry, title: "Example D", author: "Author D", status: Statuses.Pending, /*demographics: "Canada",*/ tags: ["Tag1", "Tag2"], rating: 5, mainSubmission: blank, date: "3/7/2024" }, // has no notes
        { id: "5", issue: 'Spring 2024: letters to self', medium: Mediums.VisualArt, title: "Example E", author: "Author E", status: Statuses.Pending, /*demographics: "Canada",*/ tags: ["Other"], rating: 5, notes: "None", mainSubmission: blank, date: "3/3/2024" },
        { id: "6", issue: 'Spring 2024: letters to self', medium: Mediums.Other, title: "Example F", author: "Author F", status: Statuses.Declined, /*demographics: "Canada",*/ tags: ["Other"], rating: 4, notes: "None", mainSubmission: blank, date: "3/3/2024" },
        { id: "7", issue: "Summer 2024: more than one letter", medium: Mediums.Other, title: "Example G", author: "Author G", status: Statuses.Declined, /*demographics: "Antarctica",*/ tags: ["Other"], rating: 3, notes: "None", mainSubmission: blank, date: "3/3/2024" },
        { id: "8", issue: "Summer 2024: more than one letter", medium: Mediums.Other, title: "Example H", author: "Author H", status: Statuses.Declined, /*demographics: "Antarctica",*/ tags: [], rating: 2, notes: "None", mainSubmission: blank, date: "1/1/1111" }, // tags is empty
        { id: "9", issue: 'Spring 2024: letters to self', medium: Mediums.Other, title: "Example I", author: "Author I", status: Statuses.Declined, /*demographics: "Antarctica",*/ rating: 1, notes: "None", mainSubmission: blank, date: "3/3/2024" }, // has no tags
        { id: "10", issue: 'Spring 2024: letters to self', medium: Mediums.Fiction, title: "Example A", author: "Author A", status: Statuses.Approved, /*demographics: "United States",*/ tags: ["Family"], rating: 5, notes: "None", mainSubmission: blank, date: "3/3/2024" },
        { id: "11", issue: "Summer 2024: more than one letter", medium: Mediums.Fiction, title: "Example B", author: "Author B", status: Statuses.Approved, /*demographics: "United States",*/ tags: ["Love"], notes: "None", mainSubmission: blank, date: "3/3/2024" }, // has no rating
        { id: "12", issue: "Summer 2024: more than one letter", medium: Mediums.Nonfiction, title: "Example C", author: "Author C", status: Statuses.Pending, /*demographics: "United States",*/ tags: ["Other"], rating: 5, notes: "One!", mainSubmission: blank, date: "3/3/2024" },
        { id: "13", issue: 'Spring 2024: letters to self', medium: Mediums.Poetry, title: "Example D", author: "Author D", status: Statuses.Pending, /*demographics: "Canada",*/ tags: ["Tag1", "Tag2"], rating: 5, mainSubmission: blank, date: "3/7/2024" }, // has no notes
        { id: "14", issue: 'Spring 2024: letters to self', medium: Mediums.VisualArt, title: "Example E", author: "Author E", status: Statuses.Pending, /*demographics: "Canada",*/ tags: ["Other"], rating: 5, notes: "None", mainSubmission: blank, date: "3/3/2024" },
        { id: "15", issue: 'Spring 2024: letters to self', medium: Mediums.Other, title: "Example F", author: "Author F", status: Statuses.Declined, /*demographics: "Canada",*/ tags: ["Other"], rating: 4, notes: "None", mainSubmission: blank, date: "3/3/2024" },
        { id: "16", issue: 'Spring 2024: letters to self', medium: Mediums.Other, title: "Example G", author: "Author G", status: Statuses.Declined, /*demographics: "Antarctica",*/ tags: ["Other"], rating: 3, notes: "None", mainSubmission: blank, date: "3/3/2024" },
        { id: "17", issue: "Summer 2024: more than one letter", medium: Mediums.Other, title: "Example H", author: "Author H", status: Statuses.Declined, /*demographics: "Antarctica",*/ tags: [], rating: 2, notes: "None", mainSubmission: blank, date: "1/1/1111" }, // tags is empty
        { id: "18", issue: "Summer 2024: more than one letter", medium: Mediums.Other, title: "Example I", author: "Author I", status: Statuses.Declined, /*demographics: "Antarctica",*/ rating: 1, notes: "None", mainSubmission: blank, date: "3/3/2024" } // has no tags
    ];

    return (
        <div>
            <UserButton></UserButton>
            <AdminGrid submissionArray={sampleData}></AdminGrid>
        </div>
    );
}