/**
 * An admin page to display a grid containnig all submissions and their related information
 * @author Lydia Chen
 * @author Lucien Bao 
 */

import Submission from "@/types/Submission";
import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import Button from '@mui/material/Button';

type Props = {
    submissionArray: Submission[];
}

const tagStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    color: "#415db3",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBlock: "5px",
    borderRadius: "10px",
}

const nameStyle = {
    color: "#415db3",
}

const AdminGrid: React.FC<Props> = (properties) => {
    const props = properties.submissionArray;

    let rows = [];
    for (let i = 0; i < props.length; i++) {
        const submission = {
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
        rows.push(submission);
    }

    const handleClick = (event: any, cellValues: any) => {
        console.log(event);
        console.log(cellValues);
    }

    const columns: GridColDef[] = [
        {
            field: "issue",
            headerName: "Issue",
            width: 100,
            type: "singleSelect",
            valueOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            editable: false,
            cellClassName: "issue",
            headerClassName: "issue-header",
            renderCell: (cellValues) => {
                return (
                    <div style={tagStyle}>
                        {cellValues.row.issue}
                    </div>
                );
            }
        },
        {
            field: "type",
            headerName: "Type",
            width: 150,
            type: "singleSelect",
            valueOptions: ["Type 1", "Type 2", "Type 3"],
            editable: false,
            cellClassName: "type",
            headerClassName: "type-header",
            renderCell: (cellValues) => {
                return (
                    <div style={tagStyle}>
                        {cellValues.row.type}
                    </div>
                );
            }
        },
        {
            field: "title",
            headerName: "Title of Piece",
            width: 250,
            editable: false,
            cellClassName: "title",
            headerClassName: "title-header",
            renderCell: (cellValues) => {
                return (
                    <div style={nameStyle}>
                        {cellValues.row.title}
                    </div>
                );
            }
        },
        {
            field: "name",
            headerName: "BWQ Name",
            width: 200,
            editable: false,
            cellClassName: "name",
            headerClassName: "name-header",
            renderCell: (cellValues) => {
                return (
                    <div style={nameStyle}>
                        {cellValues.row.name}
                    </div>
                );
            }
        },
        { /* 
           * We can also color the div with different colors depending on 
           * the status (i.e. light green for Accepted, light red for Declined, etc.) 
           * 
           */
            field: "status",
            headerName: "Status",
            width: 150,
            type: "singleSelect",
            valueOptions: ["Accepted", "Pending", "Rejected"],
            editable: false,
            cellClassName: "status",
            headerClassName: "status-header",
            renderCell: (cellValues) => {
                return (
                    <div style={tagStyle}>
                        {cellValues.row.status}
                    </div>
                );
            }
        },
        // { field: "demographics", headerName: "Demographics", width: 200, type: "singleSelect", valueOptions: ["United States", "Canada", "Antarctica"], editable: false },
        {
            field: "tags",
            headerName: "Tags",
            width: 200,
            editable: false,
            cellClassName: "tags",
            headerClassName: "tags-header",
            renderCell: (cellValues) => {
                return (
                    <div style={tagStyle}>
                        {cellValues.row.tags}
                    </div>
                );
            }
        },
        {
            field: "ratings",
            headerName: "Rating",
            width: 100,
            type: "singleSelect",
            valueOptions: [1, 2, 3, 4, 5],
            editable: false,
            cellClassName: "ratings",
            headerClassName: "ratings-header",
        },
        {
            field: "notes",
            headerName: "Notes",
            width: 250,
            editable: false,
            cellClassName: "notes",
            headerClassName: "notes-header",
        },
        {
            field: "Print",
            cellClassName: "print",
            headerClassName: "print-header",
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
        /* move styling to index where the component is called */
        <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
            <Typography
                variant="h6"
                fontWeight={700}
                fontSize={24}
                color="#415db3"
                paddingTop={8}
                paddingLeft={10}
            >
                Submissions
            </Typography>

            <Box
                sx={{
                    "& .issue, & .type, & .title, & .name, & .status, \
                    & .tags, & .ratings, & .notes, & .print": {
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        color: "#415db3",
                        border: "none",
                    },
                    "& .issue-header, & .type-header, & .title-header, \
                    & .name-header, & .status-header, & .tags-header, \
                    & .ratings-header, & .notes-header, & .print-header": {
                        color: "#415db3",
                        // backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    },
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{ toolbar: { showQuickFilter: true } }}
                    className="mx-20 mt-0 border-none"
                    getRowSpacing={params => ({
                        top: params.isFirstVisible ? 0 : 3,
                        bottom: params.isLastVisible ? 0 : 3
                    })}
                    sx={{
                        '&, [class^=MuiDataGrid]': { border: 'none' },
                        '& .MuiDataGrid-virtualScroller': {
                            transform: 'rotateX(180deg)',
                            paddingBlock: "20px"
                        },
                        '& .MuiDataGrid-virtualScrollerContent': {
                            transform: 'rotateX(180deg)',
                        },
                    }}
                />
            </Box>
        </div >
    );

}

export default AdminGrid;
