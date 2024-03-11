import Submission from "@/types/Submission";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Button from '@mui/material/Button';

type Props = {
    submissionArray: Submission[];
}

const AdminGrid: React.FC<Props> = (properties) => {
    const props = properties.submissionArray;

    let rows = [];
    for (let i = 0; i < props.length; i++) {
        const row = {
            id: i,
            issue: props[i].issue,
            type: props[i].medium,
            title: props[i].title,
            name: props[i].author,
            status: props[i].status,
            // demographics: "United States",
            tags: props[i].tags?.join(", "),
            ratings: props[i].rating,
            notes: props[i].notes
        }
        rows.push(row);
    }

    const handleClick = (event: any, cellValues: any) => {
        console.log(event);
        console.log(cellValues);
    }

    const columns: GridColDef[] = [
        { field: "issue", headerName: "Issue", width: 100, type: "singleSelect", valueOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9], editable: false },
        { field: "type", headerName: "Type", width: 100, type: "singleSelect", valueOptions: ["Type 1", "Type 2", "Type 3"], editable: false },
        { field: "title", headerName: "Title of Piece", width: 250, editable: false },
        { field: "name", headerName: "BWQ Name", width: 200, editable: false },
        { field: "status", headerName: "Status", width: 100, type: "singleSelect", valueOptions: ["Accepted", "Pending", "Rejected"], editable: false },
        // { field: "demographics", headerName: "Demographics", width: 200, type: "singleSelect", valueOptions: ["United States", "Canada", "Antarctica"], editable: false },
        { field: "tags", headerName: "Tags", width: 200, editable: false },
        { field: "ratings", headerName: "Rating", width: 100, type: "singleSelect", valueOptions: [1, 2, 3, 4, 5], editable: false },
        { field: "notes", headerName: "Notes", width: 250, editable: false },
        {
            field: "Print",
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(event) => {
                            handleClick(event, cellValues);
                        }}>
                        Print
                    </Button>
                );
            }
        }
    ];

    return (
        <div>
            <DataGrid
                rows={rows}
                columns={columns}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
                className="m-20 mt-0" />
        </div>
    );

}

export default AdminGrid;
