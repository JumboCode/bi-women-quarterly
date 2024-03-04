import Submission from "@/types/Submission";
// import { useUser } from "@clerk/nextjs";
import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";

type Props = {
    submissionArray: Submission[];
}

const AdminGrid: React.FC<Props> = (properties) => {
    // const { isSignedIn, user, isLoaded } = useUser();

    /* Checks if the user has admin role */
    // if (!user || !isSignedIn || user!.unsafeMetadata['role'] !== 'admin') {
    //     return;
    // }

    const props = properties.submissionArray;

    let rows: GridRowsProp = [];

    console.log("This is length: ", props.length);

    for (let i = 0; i < props.length; i++) {
        const id = i;
        const issue = props[i].issue;
        const type = props[i].medium;
        const title = props[i].title;
        const author = props[i].author;
        const status = props[i].status;
        const tags = props[i].tags;
        const rating = props[i].rating;
        const notes = props[i].notes;

        const row = {
            id: id,
            issue: issue,
            type: type,
            title: title,
            name: author,
            status: status,
            demographics: "United States",
            tags: tags,
            ratings: rating,
            notes: notes
        }

        rows.push(row);
    }

    const columns: GridColDef[] = [
        { field: "issue", headerName: "Issue", width: 100, type: "singleSelect", valueOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9], editable: true },
        { field: "type", headerName: "Type", width: 100, type: "singleSelect", valueOptions: ["Type 1", "Type 2", "Type 3"], editable: true },
        { field: "title", headerName: "Title of Piece", width: 250 },
        { field: "name", headerName: "BWQ Name", width: 200 },
        { field: "status", headerName: "Status", width: 100, type: "singleSelect", valueOptions: ["Accepted", "Pending", "Rejected"], editable: true },
        { field: "demographics", headerName: "Demographics", width: 200, type: "singleSelect", valueOptions: ["United States", "Canada", "Antarctica"], editable: true },
        { field: "tags", headerName: "Tags", width: 200, editable: true },
        { field: "ratings", headerName: "Rating", width: 100, type: "singleSelect", valueOptions: [1, 2, 3, 4, 5], editable: true },
        { field: "notes", headerName: "Notes", width: 250, editable: true }
    ];

    return (
        <div>
            {/* Having some trouble with access the user data (e.g. profile picture) */}
            <img className="rounded-full bg-gray-500 w-24 h-24 ml-auto my-8 mr-20"></img>
            <DataGrid
                rows={rows}
                columns={columns}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
                className="m-20 mt-0" />
        </div>
    );

}

// export default function Grid() {
//     const rows: GridRowsProp = [
//         { id: 1, issue: 1, type: "Type 1", title: "Example A", name: "Author A", status: "Accepted", demographics: "United States", tags: "Family", ratings: 5, notes: "None" },
//         { id: 2, issue: 2, type: "Type 1", title: "Example B", name: "Author B", status: "Accepted", demographics: "United States", tags: "Love", ratings: 5, notes: "None" },
//         { id: 3, issue: 3, type: "Type 1", title: "Example C", name: "Author C", status: "Pending", demographics: "United States", tags: "Other", ratings: 5, notes: "None" },
//         { id: 4, issue: 4, type: "Type 2", title: "Example D", name: "Author D", status: "Pending", demographics: "Canada", tags: "Other", ratings: 5, notes: "None" },
//         { id: 5, issue: 5, type: "Type 2", title: "Example E", name: "Author E", status: "Pending", demographics: "Canada", tags: "Other", ratings: 5, notes: "None" },
//         { id: 6, issue: 6, type: "Type 2", title: "Example F", name: "Author F", status: "Pending", demographics: "Canada", tags: "Other", ratings: 4, notes: "None" },
//         { id: 7, issue: 7, type: "Type 3", title: "Example G", name: "Author G", status: "Pending", demographics: "Antarctica", tags: "Other", ratings: 3, notes: "None" },
//         { id: 8, issue: 8, type: "Type 3", title: "Example H", name: "Author H", status: "Pending", demographics: "Antarctica", tags: "Other", ratings: 2, notes: "None" },
//         { id: 9, issue: 9, type: "Type 3", title: "Example I", name: "Author I", status: "Pending", demographics: "Antarctica", tags: "Other", ratings: 1, notes: "None" },
//     ];

//     const columns: GridColDef[] = [
//         { field: "issue", headerName: "Issue", width: 100, type: "singleSelect", valueOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9], editable: true },
//         { field: "type", headerName: "Type", width: 100, type: "singleSelect", valueOptions: ["Type 1", "Type 2", "Type 3"], editable: true },
//         { field: "title", headerName: "Title of Piece", width: 250 },
//         { field: "name", headerName: "BWQ Name", width: 200 },
//         { field: "status", headerName: "Status", width: 100, type: "singleSelect", valueOptions: ["Accepted", "Pending", "Rejected"], editable: true },
//         { field: "demographics", headerName: "Demographics", width: 200, type: "singleSelect", valueOptions: ["United States", "Canada", "Antarctica"], editable: true },
//         { field: "tags", headerName: "Tags", width: 200, editable: true },
//         { field: "ratings", headerName: "Rating", width: 100, type: "singleSelect", valueOptions: [1, 2, 3, 4, 5], editable: true },
//         { field: "notes", headerName: "Notes", width: 250, editable: true }
//     ];

//     return (
//         <div>
//             <DataGrid rows={rows} columns={columns} slots={{ toolbar: GridToolbar }} slotProps={{ toolbar: { showQuickFilter: true } }} />
//         </div>
//     );
// }

export default AdminGrid;
