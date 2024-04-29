// ... other imports
import React, { useState, ChangeEvent, useEffect, useReducer, } from 'react';
import Submission from '@/types/Submission';
import Preview from '@/types/Preview';
import PreviewType from '@/types/PreviewType';
import Mediums from '@/types/Mediums';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { TailSpin } from 'react-loader-spinner';

type Props = {
  initialSubmission: Submission;
  issues: string[];
  onClose: () => void;
};

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

type State = {
  submission: Submission;
  additionalRefIndex: number;
  initialAddRefIndex: number;
  showLoading: boolean;
}

enum ActionType {
  // Update submission object
  UpdateSubmission = 'UpdateSubmission',
  // Update main submission
  UpdateMainSubmission = 'UpdateMainSubmission',
  // Update Additional Reference
  UpdateAdditional = 'UpdateAdditional',
  // Show a loading spinner
  ShowLoading = 'ShowLoading',
  // Hide a loading spinner
  HideLoading = 'HideLoading',
  // Cancel
  Cancel = "Cancel",
}

type Action = (
  | {
    // Action type
    type: ActionType.UpdateSubmission,
    // Field to update
    field: string;
    // Value to update to
    value: string;
  }
  | {
    // Action type
    type: ActionType.UpdateMainSubmission,
    // Field to update
    field: string;
    // Value to update to
    value: string;
  }
  | {
    // Action type
    type: ActionType.UpdateAdditional,
    // Index of preview to update
    index: number;
    // Field to update
    field: string;
    // Value to update to
    value: string;
  }
  | {
    // Action type
    type: ActionType.ShowLoading,
  }
  | {
    // Action type
    type: ActionType.HideLoading,
  }
  | {
    // Action type
    type: ActionType.Cancel,

    submission: Submission;
  }
)


/* ------------- Actions ------------ */

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.UpdateSubmission: {
      return {
        ...state,
        submission: {
          ...state.submission,
          [action.field]: action.value,
        },
      };
    }
    case ActionType.UpdateMainSubmission: {
      return {
        ...state,
        submission: {
          ...state.submission,
          mainSubmission: {
            ...state.submission.mainSubmission,
            [action.field]: action.value,
          },
        },
      };
    }
    case ActionType.UpdateAdditional: {
      if (state.submission.additionalReferences != undefined) {
        const newPreviews = [
          ...state.submission.additionalReferences.slice(0, action.index),
          {
            ...state.submission.additionalReferences[action.index],
            [action.field]: action.value,
          },
          ...state.submission.additionalReferences.slice(action.index + 1)
        ]
        return {
          ...state,
          submission: {
            ...state.submission,
            additionalReferences: newPreviews,
          }
        };
      } else {
        throw Error("Trying to edit when there are no additional references");
      }
    }
    case ActionType.ShowLoading: {
      return {
        ...state,
        showLoading: true,
      }
    }
    case ActionType.HideLoading: {
      return {
        ...state,
        showLoading: false,
      }
    }
    case ActionType.Cancel: {
      return {
        ...state,
        additionalRefIndex: state.initialAddRefIndex,
        submission: action.submission,
      }
    }
    default: {
      return state;
    }
  }
}

/**
   * Allows the fields of submission to be edited, has very basic css for the 
   * display of the submission
   * @author Allison Zhang
   * @author Walid Nejmi
   * @author Kevin Yuan
   * @param submission Submission to be edited
   */

const UserEditableSubmission: React.FC<Props> = (props) => {
  const {
    initialSubmission,
    issues,
    onClose,
  } = props;

  const [editOn, setEditOn] = useState<boolean>(false);

  const initialState = {
      submission: initialSubmission,
      additionalRefIndex: initialSubmission.additionalReferences ?  initialSubmission.additionalReferences.length - 1 : -1,
      initialAddRefIndex: initialSubmission.additionalReferences ?  initialSubmission.additionalReferences.length - 1 : -1,
      showLoading: false,
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure state
  const {
    submission,
    additionalRefIndex,
    showLoading,
  } = state;

  const handleSubmissionChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
    // setSubmission({ ...submission, [e.target.name]: e.target.value });
    dispatch({type: ActionType.UpdateSubmission, field: e.target.name, value: e.target.value})
  };

  const handleMainSubmissionChange = (e: ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: ActionType.UpdateMainSubmission, field: e.target.name, value: e.target.value})
  };

  const handleUpdateAdditionalRef = (index: number, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({type:ActionType.UpdateAdditional, field: e.target.name, value: e.target.value, index: index})
  } 
  

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({type: ActionType.ShowLoading});

    console.log(JSON.stringify(state.submission, null, 2));
    submission.additionalReferences?.forEach((preview) => {
      console.log(JSON.stringify(preview, null, 2));
    })
    
    try {
      // add submission to database
      await fetch("../api/submissions/edit", {
        method: "POST",
        body: JSON.stringify({
          submission,
        })
      });
    } catch (error) {
      console.log(error);
    }

    dispatch({type: ActionType.HideLoading});

    handleEdit();
  };

  const deleteSubmit = async (id: string, title: string) => {
    // Show loading spinner
    dispatch({type: ActionType.ShowLoading});

    try {
      await fetch(`../api/submissions/delete?id=${id}&title=${title}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }

    // Hide loading spinner
    dispatch({type: ActionType.HideLoading});

    // go to homepage
    onClose();
  }

  const handleEdit = () => {
    if (editOn == false) {
      setEditOn(true);
    } else {
      setEditOn(false);
    }
  };

  /* Testing */
  useEffect(() => {
    (async () => {
        dispatch({type: ActionType.Cancel, submission: initialSubmission})
    })();
  }, [initialSubmission]);  

  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/
  const body = (
  <div className="flex flex-row h-100 w-100 UserEdit-container m-[0px] justify-around overflow-y-scroll rounded-lg">
    {/* Loading Spinner */}
    {showLoading ? (
      <div className="flex h-screen">
        <div className="m-auto">
            <TailSpin color="#8200B1"></TailSpin>
        </div>
      </div>
    ) : (
      editOn ? (
        <div className="mt-2 w-11/12">
        {/* Editable */}
      <form onSubmit={onSubmit}>
      <div className="bottom-0 right-0 w-full flex flex-row justify-end">
          <div className="bg-pink flex">
            <button
              type="button"
              onClick={handleEdit}
              className="mr-2 rounded shadow UserEdit-bottombutton font-semibold text-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="UserEdit-bottombuttonred text-lg"
            >
              Save
            </button>
          </div>
        </div>
        <div className="title-date flex items-center justify-between mb-4">
          <div className="flex flex-row">
            <button
              className="bottom-0 mt-6 text-sm UserEdit-bottombutton"
              style={{ backgroundColor: "#FFFFFF80" }}
              onClick={e => {
                e.preventDefault();
                openInNewTab(state.submission.mainSubmission.contentDriveUrl);
              }}
            >
              <FontAwesomeIcon icon={faLink} /> &nbsp; Google Drive
            </button>
          </div>
          <div className="flex items-center issue-type text font-bold">
            <div className="UserEdit-selectBox">
              <div className="UserEdit-blue-box">
                <label>Issue: </label>
              </div>
              <div>
                <select
                  name="issue"
                  style={{
                    background: "FFFFFF80",
                    boxShadow:
                      "0 2px 4px rgba(0, 0, 0, 0.1)",
                    padding: "6px"
                  }}
                  value={state.submission.issue}
                  onChange={handleSubmissionChange}
                >
                  <option defaultValue="Select Issues">Select Issue</option> 
                  <option value="Any">Any</option>
                  {
                      issues.map((issue) => (
                          <option key={issue} value={issue}>
                              {issue}
                          </option>
                      ))
                  }
                </select>
              </div>
            </div>
            <div className="UserEdit-selectBox">
              <div className="UserEdit-blue-box">
                <label>Type: </label>
              </div>
              <div>
                <select
                  name="medium"
                  style={{
                    background: "FFFFFF80",
                    boxShadow:
                      "0 2px 4px rgba(0, 0, 0, 0.1)",
                    padding: "6px"
                  }}
                  value={
                    state.submission.medium
                  }
                  onChange={handleSubmissionChange}
                >
                  <option value="Fiction">
                    {Mediums.Fiction}
                  </option>
                  <option value="NonFiction">
                    {Mediums.Nonfiction}
                  </option>
                  <option value="Other">
                    {Mediums.Other}
                  </option>
                  <option value="Poetry">
                    {Mediums.Poetry}
                  </option>
                  <option value="VisArt">
                    {Mediums.VisualArt}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-[100%] justify-between">
          <div className="UserEdit-image-container flex items-start">
            <img
              src={state.submission.mainSubmission.imageUrl}
              alt="Submission"
              className="UserEdit-image max-w-[100%] mr-4 rounded-lg"
            />
          </div>
          <div className="flex-col items-center py-2 UserEdit-textbox w-[100%]">
            <div className="title p-2 text-left">
              <b style={{ color: "#395EB9" }}>Title</b>
              <br></br>
              <input
                className="UserEdit-inputbox"
                type="text"
                name="title"
                value={
                  state.submission.mainSubmission.title
                }
                onChange={handleMainSubmissionChange}
              ></input>
            </div>
            <div className="image-description text-black p-2 text-left">
              <b style={{ color: "#395EB9" }}>Description</b>
              <br></br>
              <div>
                <textarea
                  className="UserEdit-inputbox"
                  name="description"
                  value={
                    state.submission.mainSubmission
                      .description
                  }
                  onChange={handleMainSubmissionChange}
                ></textarea>
              </div>
            </div>
            <div className="photo-credit p-2 text-left">
              <b style={{ color: "#395EB9" }}>Photo Credit</b>
              <br></br>
              <input
                className="UserEdit-inputbox"
                type="text"
                name="photoCredit"
                value={
                  state.submission.mainSubmission.photoCredit
                }
                onChange={handleMainSubmissionChange}
              ></input>
            </div>
          </div>
        </div>

        <div  className="pt-5">
          <div className="font-bold UserEdit-header">
            Artist Statement
          </div>
          <div className=" UserEdit-textbox flex-col items-center py-2 p-[50px] max-w-[100%] ">
            <textarea
              name="artist_statement"
              className=" UserEdit-inputbox" 
              value={state.submission.artist_statement}
              onChange={handleSubmissionChange}
            ></textarea>
          </div>
        </div>
        <div>
          <div className="font-bold UserEdit-header">
            Note to editor
          </div>
          <div className=" UserEdit-textbox">
            <textarea
              name="editor_note"
              className=" UserEdit-inputbox flex-col items-center max-w-[100%] "
              value={state.submission.editor_note}
              onChange={handleSubmissionChange}
            ></textarea>
          </div>
        </div>

        {(state.submission.additionalReferences?.length && state.submission.additionalReferences?.length > 0) ? (
          <div
              className="text-2xl mt-[3%] font-semibold"
                  style={{
                    lineHeight: "44.57px",
                    textAlign: "left",
                    color: "#395EB9"
                  }}
                >
                  Optional Related Content
          </div>
        ) : null}

        {state.submission.additionalReferences?.map((additionalReference, index) => (
          <div className="flex flex-row w-full justify-between mt-[5%]" key={index}>
            <div className="additional-images">
              <div className="UserEdit-image-container flex items-start">
                <img
                  src={additionalReference.imageUrl}
                  alt={`Additional Image ${index}`}
                  className="UserEdit-image max-w-[100%] mr-4 rounded-lg"
                />
              </div>
            </div>

            <div className="flex-col items-center py-2 UserEdit-textbox max-w-[55%] w-[100%]">
            <div className="title p-[5%] text-left">
              <b style={{ color: "#395EB9" }}>Title</b>
              <br></br>
              <input
                className="UserEdit-inputbox"
                type="text"
                name="title"
                value={additionalReference.title}
                onChange={(e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => handleUpdateAdditionalRef(index, e)}
              ></input>
            </div>
            <div className="image-description text-black p-[5%] text-left ">
              <b style={{ color: "#395EB9" }}>Description</b>
              <br></br>
              <div>
                <textarea
                  className="UserEdit-inputbox"
                  name="description"
                  value={
                    additionalReference.description
                  }
                  onChange={(e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => handleUpdateAdditionalRef(index, e)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        ))}

      </form>
      </div>
  ) : (
    <div className="mt-2 w-11/12">
      {/* View Only */}
      <div className="w-full flex justify-between pb-2">
          <div className="flex items-center">
            <button type="button" onClick={(e) => deleteSubmit(state.submission.id, state.submission.title)} className="text-lg font-semibold UserEdit-bottombutton">
              Delete Submission
            </button>
          </div>
          <div className="bg-pink flex items-center">
            <button
              type="button"
              onClick={handleEdit}
              className="mr-2 rounded shadow UserEdit-bottombutton font-semibold text-lg">
              Edit
            </button>
            <button
              type="submit"
              className="UserEdit-bottombuttonred text-lg"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>
        <div className="title-date flex justify-between mb-4 ">
          <div className="relative">
            <button
              className="bottom-0 mt-6 text-sm UserEdit-bottombutton"
              style={{ backgroundColor: "#FFFFFF80" }}
              onClick={e => {
                e.preventDefault();
                openInNewTab(state.submission.mainSubmission.contentDriveUrl);
              }}
            >
              <FontAwesomeIcon icon={faLink} /> &nbsp; Google Drive
            </button>
          </div>

          <div className="flex items-center issue-type text font-bold">
            <div className="UserEdit-selectBox">
              <div className="UserEdit-blue-box">
                <label>Issue: </label>
              </div>
              <div className="UserEdit-selectBoxLabel">
                {state.submission.issue}
              </div>
            </div>
            <div className="UserEdit-selectBox">
              <div className="UserEdit-blue-box">
                <label>Type: </label>
              </div>
              <div className="UserEdit-selectBoxLabel">
                {submission.medium}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-[100%] justify-between">
          <div className="UserEdit-image-container flex items-start">
            <img
              src={submission.mainSubmission.imageUrl}
              alt="Submission"
              className="max-w-[100%] mr-1 rounded-lg"
            />
          </div>
          <div className="flex-col items-center py-2 UserEdit-textbox w-[100%]">
            <div className="title p-2 text-left">
              <b style={{ color: "#395EB9" }}>Title</b>
              <br></br>
              <span className="font-medium">{submission.mainSubmission.title}</span>
            </div>
            <div className="image-description text-black p-2 text-left">
              <b style={{ color: "#395EB9" }}>Description</b>
              <br></br>
              {state.submission.mainSubmission.description}
            </div>
            <div className="photo-credit text-black p-2 text-left">
              <b style={{ color: "#395EB9" }}>Photo Credit</b>
              <br></br>
              {state.submission.mainSubmission.photoCredit}
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="font-bold UserEdit-header">
            Artist Statement
          </div>
          <div className="flex-col items-center py-2 p-[50px] UserEdit-textbox max-w-[100%] ">
            {state.submission.artist_statement}
          </div>
        </div>

        <div className="pt-5">
          <div className="font-bold UserEdit-header">
            Note to editor
          </div>
          <div className="flex-col items-center py-2 p-[50px] UserEdit-textbox max-w-[100%] ">
            {state.submission.editor_note}
          </div>
        </div>

      {(state.submission.additionalReferences?.length && state.submission.additionalReferences?.length > 0) ? (
        <div
            className="text-2xl mt-[3%] font-semibold"
                style={{
                  lineHeight: "44.57px",
                  textAlign: "left",
                  color: "#395EB9"
                }}
              >
                Optional Related Content
        </div>
      ) : null}
        {state.submission.additionalReferences?.map((additionalReference, index) => ( 
          <div key={index} className="flex flex-row w-[100%] justify-between mt-[5%]">
              <div className="UserEdit-image-container flex items-start">
                <img
                  src={additionalReference.imageUrl}
                  alt={`Additional Image ${index}`}
                  className="UserEdit-image max-w-[100%] rounded-lg"
                />
              </div>

              <div className="flex-col items-center py-2 UserEdit-textbox max-w-[55%] w-[100%]">
                <div className="title p-[5%] text-left">
                  <b style={{ color: "#395EB9" }}>Title</b>
                  <br></br>
                  <span>{additionalReference.title}</span>
                </div>
                <div className="image-description text-black p-[5%] text-left">
                  <b style={{ color: "#395EB9" }}>Description</b>
                  <br></br>
                  <span>
                    {additionalReference.description}
                  </span>
                </div>
              </div>
            </div>
        ))}
          <div className="text-white text-sm bottom-1 absolute">
            Submitted: {state.submission.date}
          </div>
        </div>
      ))}
    </div>
  );

  return body;
};

export default UserEditableSubmission;
