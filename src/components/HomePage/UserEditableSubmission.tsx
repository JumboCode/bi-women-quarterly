// ... other imports
import React, { useState, ChangeEvent, useEffect, useReducer, } from 'react';
import Submission from '@/types/Submission';
import Preview from '@/types/Preview';
import PreviewType from '@/types/PreviewType';
import Mediums from '@/types/Mediums';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


type Props = {
  initialSubmission: Submission;
  onClose: () => void;
};

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
    onClose,
  } = props;

  const [editOn, setEditOn] = useState<boolean>(false);

  type State = {
    submission: Submission;
    additionalRefIndex: number;
    initialAddRefIndex: number;
  }

  enum ActionType {
    // Update submission object
    UpdateSubmission = 'UpdateSubmission',
    // Update main submission
    UpdateMainSubmission = 'UpdateMainSubmission',
    // Update Additional Reference
    UpdateAdditional = 'UpdateAdditional',
    // // Add an additional reference
    // AddAdditionalRef = 'AddAdditionalRef',
    // // Remove an additional reference
    // RemoveAdditionalRef = 'RemoveAdditionalRef',
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
    // | {
    //   // Action type
    //   type: ActionType.AddAdditionalRef,
    // }
    // | {
    //   // Action type
    //   type: ActionType.RemoveAdditionalRef,
    //   // Index of preview to remove
    //   index: number;
    // }
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
        // const newPreviews = state.additionalRef;
        // newPreviews[action.index] = {
        //     ...newPreviews[action.index],
        //     preview: {
        //         ...newPreviews[action.index].preview,
        //         [action.field]: action.value,
        //     },
        // };
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
      // case ActionType.AddAdditionalRef: {
      //     const additionalReferences = state.submission.additionalReferences || [];
      //     return {
      //       ...state,
      //       additionalRefIndex: additionalReferences.length,
      //       submission: { 
      //         ...state.submission,
      //         additionalReferences: [...additionalReferences, {
      //             type: PreviewType.AdditionalReference,
      //             title: "",
      //             description: "",
      //             thumbnailUrl: "https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png",
      //             contentDriveUrl: "",
      //         }],
      //       },
      //     };
      // }
      // case ActionType.RemoveAdditionalRef: {
      //   if (state.submission.additionalReferences != undefined) { 
      //     return {
      //       ...state,
      //       submission: { 
      //         ...state.submission,
      //         additionalReferences: [...state.submission.additionalReferences.slice(0, action.index), ...state.submission.additionalReferences.slice(action.index + 1)]
      //       }
      //     };
      //   } else {
      //     throw Error("Trying to remove when there are no additional references");
      //   }
      // }
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

  const initialState = {
      submission: initialSubmission,
      additionalRefIndex: initialSubmission.additionalReferences ?  initialSubmission.additionalReferences.length - 1 : -1,
      initialAddRefIndex: initialSubmission.additionalReferences ?  initialSubmission.additionalReferences.length - 1 : -1,
  }

  const [state, dispatch] = useReducer(reducer, initialState);

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
    try {
      // add submission to database
      await fetch("../api/submissions/edit", {
        method: "POST",
        body: JSON.stringify({
          submission: state.submission,
        })
      });
    } catch (error) {
      console.log(error);
    }
    handleEdit();
  };

  const deleteSubmit = async (id: string, title: string) => {
    try {
      await fetch(`../api/submissions/delete?id=${id}&title=${title}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
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
  const body = editOn ? (
    <div
      className="flex flex-row h-screen UserEdit-container m-[0px] justify-around overflow-y-scroll"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, #FFD3CB, #E7A5FF, #B3C9FF)"
      }}
    >
      <div className="mt-[5%] w-[70%] ">
        <form onSubmit={onSubmit}>
          <div className="title-date flex items-center justify-between mb-4">
            <div className="flex flex-row">
              <div
                className="edit-submission-title text-3xl mb-4"
                style={{
                  fontSize: "32.73px",
                  fontWeight: 700,
                  textAlign: "left",
                  color: "#395EB9"
                }}
              >
                Edit Submission
              </div>
              <button
                className="ml-[50px] UserEdit-bottombutton"
                style={{ backgroundColor: "#FFFFFF80" }}
                onClick={e => {
                  e.preventDefault();
                  window.location.href =
                    state.submission.mainSubmission.contentDriveUrl;
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
                src={state.submission.mainSubmission.thumbnailUrl}
                alt="Submission"
                className="UserEdit-image max-w-[100%] mr-4 rounded-lg"
              />
            </div>
            <div className="flex-col items-center py-2 UserEdit-textbox max-w-[55%] w-[100%]">
              <div className="title p-[5%] text-left">
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
              <div className="image-description text-black p-[5%] text-left ">
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
            </div>
          </div>


          <div
            className="text-3xl mt-[3%]"
                style={{
                  fontSize: "30px",
                  fontWeight: 700,
                  lineHeight: "44.57px",
                  textAlign: "left",
                  color: "#395EB9"
                }}
              >
                Optional Related Content
          </div>

          {state.submission.additionalReferences?.map((additionalReference, index) => (
            <div className="flex flex-row w-full justify-between mt-[5%]" key={index}>
              <div className="additional-images">
                <div className="UserEdit-image-container flex items-start">
                  <img
                    src={additionalReference.thumbnailUrl}
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


          <div  className="mt-[10%] ">
            <div className="font-bold UserEdit-header">
              Artist Statement
            </div>
            <div className=" UserEdit-textbox flex-col items-center py-2 p-[50px] mb-[10%] max-w-[100%] ">
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
          <div className="bottom-0 right-0 w-full flex flex-row justify-end my-[10%]">
            <div className="bg-pink p-3 flex">
              <button
                type="button"
                onClick={handleEdit}
                className="mr-2 UserEdit-bottombutton"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="UserEdit-bottombuttonred"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div
      className="flex flex-row h-screen UserEdit-container m-[0px] justify-around overflow-y-scroll"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, #FFD3CB, #E7A5FF, #B3C9FF)"
      }}
    >
      <div className="mt-[5%] w-[70%] ">
      <div className=" bottom-0 left-0 w-full flex justify-between my-[10%]">
          <div className='p-3 flex items-center"'>
            <button type="button" onClick={(e) => deleteSubmit(state.submission.id, state.submission.title)} className="UserEdit-bottombutton">
              Delete Submission
            </button>
          </div>
          <div className="bg-pink p-3 flex items-center">
            <div className="submission-date text-white pr-10">
              Submitted: {state.submission.date}
            </div>
            <button
              type="button"
              onClick={handleEdit}
              className="mr-2 rounded shadow UserEdit-bottombutton">
              Edit
            </button>
            <button
              type="submit"
              className="UserEdit-bottombuttonred"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>
        <div className="title-date flex items-center justify-between mb-4 ">
          <div className="flex flex-row">
            <div
              className="edit-submission-title text-3xl mb-4"
              style={{
                fontSize: "32.73px",
                fontWeight: 700,
                textAlign: "left",
                color: "#395EB9"
              }}
            >
              View Submission
            </div>
            <button
              className="ml-[50px] UserEdit-bottombutton "
              style={{ backgroundColor: "#FFFFFF80" }}
              onClick={e => {
                e.preventDefault();
                window.location.href =
                  state.submission.mainSubmission.contentDriveUrl;
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
                {state.submission.medium}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row  w-[100%] justify-between">
          <div className="UserEdit-image-container flex items-start">
            <img
              src={state.submission.mainSubmission.thumbnailUrl}
              alt="Submission"
              className="max-w-[100%] mr-4 rounded-lg"
            />
          </div>
          <div className="flex-col items-center py-2 UserEdit-textbox max-w-[55%] w-[100%]">
            <div className="title p-[5%] text-left">
              <b style={{ color: "#395EB9" }}>Title</b>
              <br></br>
              <span>{state.submission.mainSubmission.title}</span>
            </div>
            <div className="image-description text-black p-[5%] text-left">
              <b style={{ color: "#395EB9" }}>Description</b>
              <br></br>
              {state.submission.mainSubmission.description}
            </div>
          </div>
        </div>

        <div
            className="text-3xl mt-[3%]"
                style={{
                  fontSize: "30px",
                  fontWeight: 700,
                  lineHeight: "44.57px",
                  textAlign: "left",
                  color: "#395EB9"
                }}
              >
                Optional Related Content
        </div>

        {state.submission.additionalReferences?.map((additionalReference, index) => ( 
          <div key={index} className="flex flex-row w-[100%] justify-between mt-[5%]">
              <div className="UserEdit-image-container flex items-start">
                <img
                  src={additionalReference.thumbnailUrl}
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

        <div className="mt-[10%] ">
          <div className="font-bold UserEdit-header">
            Artist Statement
          </div>
          <div className="flex-col items-center py-2 p-[50px] mb-[10%] UserEdit-textbox max-w-[100%] ">
            {state.submission.artist_statement}
          </div>
        </div>

        <div className="mt-[10%]">
          <div className="font-bold UserEdit-header">
            Note to editor
          </div>
          <div className="flex-col items-center py-2 p-[50px] mb-[10%] UserEdit-textbox max-w-[100%] ">
            {state.submission.editor_note}
          </div>
        </div>
      </div>
    </div>
  );

  return body;
};

export default UserEditableSubmission;
