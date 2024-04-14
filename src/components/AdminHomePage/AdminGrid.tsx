/**
 * An admin page to display a grid containing all submissions and their related information
 * @author Lydia Chen
 * @author Lucien Bao 
 */

import { useEffect, useReducer } from 'react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

// Import MUI components
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

// Import next
import Issues from '@/types/Issues';

// Import types
import Submission from "@/types/Submission";
import Statuses from '@/types/Statuses';
import Mediums from '@/types/Mediums';

type Props = {
    submissionArray: Submission[];
}

const tagStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    color: "#415db3",
    margin: "2px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingBlock: "5px",
    borderRadius: "10px",
}

const linkStyle = {
    backgroundColor: "#415db3",
    color: "white",
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
    paddingBlock: "5px",
    borderRadius: "10px",
}

const nameStyle = {
    color: "#415db3",
}

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/
  
/* -------- State Definition -------- */

type State = {
    // Issues of the publication to be displayed
    issues: Issues[];
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
// Set issues
setIssues = 'setIssues',
}

// Action definitions
type Action = {
    // Action type
    type: ActionType.setIssues,
    // New issues to set 
    newIssues: Issues[];
};

/**
 * Reducer that executes actions
 * @author Austen Money
 * @param state current state
 * @param action action to execute
 * @returns updated state
 */
const reducer = (state: State, action: Action): State => {
switch (action.type) {
    case ActionType.setIssues: {
    return {
        ...state,
        issues: action.newIssues,
    };
    }
    default: {
        return state;
    }
}
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const AdminGrid: React.FC<Props> = (properties) => {
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/

    /* -------------- Props ------------- */

    // Destructure all props
    const {
        submissionArray,
    } = properties;

    /* -------------- State ------------- */

    // Initial state
    const initialState: State = {
        issues: [],
    };

    // Initialize state
    const [state, dispatch] = useReducer(reducer, initialState);

    // Destructure common state
    const {
        issues,
    } = state;

    /*------------------------------------------------------------------------*/
    /* ------------------------- Component Functions ------------------------ */
    /*------------------------------------------------------------------------*/

     /**
     * Fetches the issue themes from the database and sets the issues state
     * @author Austen Money
     * @author Walid Nejmi
     * @param event the event that has been changed
     */
    const fetchIssueThemes = async () => {
        try {
            await fetch("../api/issues/get", { method: "GET" })
                .then(response => response.json())
                .then(res => res.data.map((issue: any) => issue.title))
                .then(titles => {
                    dispatch({ type: ActionType.setIssues, newIssues: titles });
                });
        } catch (error) {
            console.error("Error fetching issue themes: ", error);
            return [];
        }
    };

    const rows: Submission[] = submissionArray;

    console.log("Rows: ");
    rows.forEach((row) => {
        console.log(JSON.stringify(row, null, 2));
    }
    );

    const columns: GridColDef[] = [
        {
            field: "Drive",
            headerName: "Drive",
            width: 55,
            type: "singleSelect",
            editable: false,
            cellClassName: "Drive",
            headerClassName: "drive-header",
            renderCell: (cellValues) => {
                return (
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href=cellValues.row.mainSubmission.contentDriveUrl;
                        }}
                        style={linkStyle}
                    >
                        <FontAwesomeIcon icon={faLink} />
                    </button>
                );
            }
        },
        {
            field: "issue",
            headerName: "Issue",
            width: 275,
            type: "singleSelect",
            valueOptions: issues,
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
            field: "medium",
            headerName: "Medium",
            width: 150,
            type: "singleSelect",
            valueOptions: Object.values(Mediums),
            editable: false,
            cellClassName: "type",
            headerClassName: "type-header",
            renderCell: (cellValues) => {
                return (
                    <div style={tagStyle}>
                        {cellValues.row.medium.toLowerCase()}
                    </div>
                );
            }
        },
        {
            field: "title",
            headerName: "Title of Piece",
            width: 200,
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
            field: "author",
            headerName: "Author",
            width: 100,
            editable: false,
            cellClassName: "name",
            headerClassName: "name-header",
            renderCell: (cellValues) => {
                return (
                    <div style={nameStyle}>
                        {cellValues.row.author}
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
            width: 125,
            type: "singleSelect",
            valueOptions: Object.values(Statuses),
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

        {
            field: "tags",
            headerName: "Tags",
            width: 200,
            editable: false,
            cellClassName: "tags",
            headerClassName: "tags-header",
            renderCell: (cellValues) => {
                return (
                    cellValues.row.tags &&
                        cellValues.row.tags.map((tag: string) =>
                            <div style={tagStyle}>
                                {tag}
                            </div>
                        )
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
            renderCell: (cellValues) => {
                return (
                    cellValues.row.rating &&
                    <div style={tagStyle}>
                        {cellValues.row.rating}
                    </div>
                );
            }
        },
        {
            field: "notes",
            headerName: "Notes",
            width: 250,
            editable: false,
            cellClassName: "notes",
            headerClassName: "notes-header",
        },
    ];

    /*------------------------------------------------------------------------*/
    /* ------------------------- Lifecycle Functions ------------------------ */
    /*------------------------------------------------------------------------*/

    /**
     * Mount
     * @author Austen Money
     */
    useEffect(() => {
        (async () => {
            await fetchIssueThemes();
        })();
    }, []);


    /*------------------------------------------------------------------------*/
    /* ------------------------------ Rendering ----------------------------- */
    /*------------------------------------------------------------------------*/

    return (
        <Box
            sx={{
                "& .drive, & .issue, & .type, & .title, & .name, & .status, \
                & .tags, & .ratings, & .notes, & .print": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    color: "#415db3",
                    border: "none",
                },
                "& .drive-header, & .issue-header, & .type-header, & .title-header, \
                & .name-header, & .status-header, & .tags-header, \
                & .ratings-header, & .notes-header, & .print-header": {
                    color: "#415db3",
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row: Submission) => {
                    console.log("Row: ");
                    console.log(JSON.stringify(row, null, 2)); 
                    return `${row.author}|${row.title}|${row.date}`
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 500 } }}}
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
    );
}

export default AdminGrid;
