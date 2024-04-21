// ... other imports
import React, { useState, ChangeEvent, useEffect, useReducer, } from 'react';
import Submission from '@/types/Submission';
import Preview from '@/types/Preview';
import PreviewType from '@/types/PreviewType';
import Issues from '@/types/Issues';


// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { error } from 'console';
import { init } from 'next/dist/compiled/webpack/webpack';


// import '.src/styles/ViewSub.css'; 
type Props = {
  submission: Submission;
};

/**
   * Allows the fields of submission to be edited, has very basic css for the 
   * display of the submission
   * @author Allison Zhang and Kevin Yuan
   * @param submission Submission to be edited
   */

const UserEditableSubmission: React.FC<Props> = ({ submission: initialSubmission }) => {
  const [editOn, setEditOn] = useState<boolean>(false);

  type State = {
    // additionalRef: AdditionalRef[];
    submission: Submission;
  }

  enum ActionType {
    // Update submission object
    UpdateSubmission = 'UpdateSubmission',
    // Update main submission
    UpdateMainSubmission = 'UpdateMainSubmission',
    // Update preview
    UpdateAdditional = 'UpdateAdditional',
    //  // Update preview reference
    //  UpdatePreviewRef = 'UpdatePreviewRef',
    // Add a new preview
    AddAdditionalRef = 'AddAdditionalRef',
    // Remove a preview
    RemoveAdditionalRef = 'RemoveAdditionalRef',
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
    //     // Action type
    //     type: ActionType.UpdatePreviewRef,
    //     // Index of preview to update
    //     index: number;
    //     // Field to update
    //     field: string;
    //     // Value to update to
    //     value: string | boolean;
    // }
    | {
      // Action type
      type: ActionType.AddAdditionalRef,
    }
    | {
      // Action type
      type: ActionType.RemoveAdditionalRef,
      // Index of preview to remove
      index: number;
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
              preview: {
                ...state.submission.additionalReferences[action.index],
                [action.field]: action.value,
              },
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
      // case ActionType.UpdatePreviewRef: {
      //     const newPreviews = state.additionalRef;
      //     newPreviews[action.index] = {
      //         ...newPreviews[action.index],
      //         [action.field]: action.value,
      //     };
      //     return {
      //         ...state,
      //         additionalRef: newPreviews,
      //     };
      // }
      case ActionType.AddAdditionalRef: {
          const additionalReferences = state.submission.additionalReferences || [];
          return {
            ...state,
            submission: { 
              ...state.submission,
              additionalReferences: [...additionalReferences, {
                  type: PreviewType.AdditionalReference,
                  title: "",
                  description: "",
                  imageUrl: "https://mailmeteor.com/logos/assets/PNG/Google_Docs_Logo_512px.png",
                  contentDriveUrl: "",
              }],
            },
          };
      }
      case ActionType.RemoveAdditionalRef: {
        if (state.submission.additionalReferences != undefined) { 
          return {
            ...state,
            submission: { 
              ...state.submission,
              additionalReferences: [...state.submission.additionalReferences.slice(0, action.index), ...state.submission.additionalReferences.slice(action.index + 1)]
            }
          };
        } else {
          throw Error("Trying to remove when there are no additional references");
        }
      }
      case ActionType.Cancel: {
        return {
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
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmissionChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    // setSubmission({ ...submission, [e.target.name]: e.target.value });
    dispatch({type: ActionType.UpdateSubmission, field: e.target.name, value: e.target.value})
  };

  const handleMainSubmissionChange = (e: ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type: ActionType.UpdateMainSubmission, field: e.target.name, value: e.target.value})
  };

  // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   dispatch({type:ActionType.UpdateMainSubmission, field: "imageUrl", value})
  //   if (e.target.files && e.target.files[0]) {
  //     const img = URL.createObjectURL(e.target.files[0]);
  //     setSubmission({ ...submission, mainSubmission: { ...submission.mainSubmission, imageUrl: img } });
  //   }
  // };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // add submission to database
      console.log("here");
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

  const handleEdit = () => {
    if (editOn == false) {
      setEditOn(true);
    } else {
      setEditOn(false);
    }
  };

  /* Testing */
  useEffect(() => {
    console.log(state.submission);
    (async () => {
        dispatch({type: ActionType.Cancel, submission: initialSubmission})
    })();
  }, [initialSubmission]);


  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/
  const body = editOn ? (
    <div className="flex flex-row h-screen UserEdit-container m-[0px] justify-around overflow-y-scroll" style={{ backgroundImage: 'linear-gradient(to bottom right, #FFD3CB, #E7A5FF, #B3C9FF)' }}>
      <div className="w-[70%] mt-[5%]">
        {/* <form className="flex flex-row justify-start mb-4">
          <button className="text-white px-4 py-2 mb-4 inline-block absolute top-0 left-0" style={{ color: '#395EB9', fontSize: '24px' }}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
        </form> */}
        <form onSubmit={onSubmit}>
          <div className="title-date flex items-center justify-between mb-4">
            <div className="flex flex-row">
              <div className="edit-submission-title text-3xl mb-4" style={{ fontSize: '32.73px', fontWeight: 700, lineHeight: '44.57px', textAlign: 'left', color: '#395EB9' }}>
                Edit Submission
              </div>
              <button className="ml-[50px] UserEdit-bottombutton"
                style={{ backgroundColor: '#FFFFFF80' }}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = state.submission.mainSubmission.contentDriveUrl;
                }}>
                <FontAwesomeIcon icon={faLink} /> &nbsp; Google Drive
              </button>
            </div>
            <div className="flex items-center issue-type text font-bold">
                <div className="issue-type text">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="blue-box">
                    <label>Issue: </label>
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="blue-box">
                    <label>Type: </label>
                  </div>
                </div>

                <div className="issue-type text font-bold">
                  <select name="issue" style={{ background: 'FFFFFF80', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '6px' }}>
                    <option value="Current">{Issues.Current}</option>
                    <option value="Next">{Issues.Next}</option>
                    <option value="None">{Issues.None}</option>
                  </select>
                  &nbsp;&nbsp;&nbsp;&nbsp;

                  <select name="PreviewType" style={{ background: 'FFFFFF80', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '6px' }}>
                    <option value="Submission">{PreviewType.Submission}</option>
                    <option value="addRef">{PreviewType.AdditionalReference}</option>
                  </select>
                </div>

            </div>
          </div>

          <div className="flex flex-row w-full justify-between">
            <div className="image-container flex items-start">
              <img
                src={state.submission.mainSubmission.imageUrl}
                alt="Submission"
                className="image max-w-[100%] mr-4 rounded-lg"
              />
            </div>

            <div className="flex-col items-center py-2 UserEdit-textbox max-w-[55%] w-[100%]">
              <div className="title p-[5%] text-left">
                <b style={{ color: "#395EB9" }}>Title*</b>
                <br></br>
                <input className='UserEdit-inputbox' type='text' name="title" value={state.submission.mainSubmission.title} onChange={handleMainSubmissionChange}></input>
              </div>
              <div className="image-description text-black p-[5%] text-left ">
                <b style={{ color: "#395EB9" }}>Description</b>
                <br></br>
                <textarea className="UserEdit-inputbox" name="description" value={state.submission.mainSubmission.description} onChange={handleMainSubmissionChange}>
                </textarea>
              </div>
            </div>
          </div>

          <div className="flex flex-row  w-[100%] justify-between mt-[10%]">
            <div className="additional-images">
              {state.submission.additionalReferences?.map((image, index) => (
                <div className="image-container flex items-start" key={index}>
                  <img
                    src={image.imageUrl}
                    alt={`Additional Image ${index}`}
                    className="image max-w-[100%] rounded-lg"

                  />
                </div>
              ))}
            </div>

            <div className="flex-col items-center py-2 UserEdit-textbox max-w-[55%] w-[100%]">
              <div className="title p-[5%] text-left">
                <b style={{ color: "#395EB9" }}>My process</b>
                <br></br>
                <span>This photo captures the midway point of my painting,
                  offering a glimpse into the evolving work as it takes shape on
                  the canvas.</span>
              </div>
            </div>
          </div>

          <div>
            <div className="font-bold UserEdit-header">Artist Statement</div>
            <div className="flex-col items-center py-2 p-[50px] mb-[10%] UserEdit-textbox max-w-[100%] ">
              {/* <textarea className="UserEdit-inputbox"
                value="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
              Quasi sint pariatur, praesentium, accusantium hic ut enim repellendus 
              ratione ipsum, illo voluptatem. Vel pariatur adipisci quidem dolorum, 
              exercitationem dicta. Vero, officia? Lorem, ipsum dolor sit amet consectetur 
              adipisicing elit. Tenetur nobis temporibus iusto odio vitae amet ex, 
              nemo quae veniam rem dolore sequi aliquam eius even.">
              </textarea> */}
            </div>
          </div>
          <div>
            <div className="font-bold UserEdit-header">Note to editor</div>
            <div className="flex-col items-center py-2 p-[50px] mb-[10%] UserEdit-textbox max-w-[100%] ">
              {/* <textarea className="UserEdit-inputbox"
                value="Note to editor: Lorem ipsum dolor sit amet consectetur, adipisicing elit.">
              </textarea> */}
            </div>
          </div>
          <div className="bottom-0 right-0 w-full flex flex-row justify-end my-[10%]">
            <div className="bg-pink p-3 flex">
              <button type="button" onClick={handleEdit} className="mr-2 UserEdit-bottombutton">
                Cancel
              </button>
              <button type="submit" className="UserEdit-bottombuttonred">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="flex flex-row h-screen UserEdit-container m-[0px] justify-around overflow-y-scroll" style={{ backgroundImage: 'linear-gradient(to bottom right, #FFD3CB, #E7A5FF, #B3C9FF)' }}>
      <div className="mt-[5%] w-[70%] ">
        <button className="text-white px-4 py-2 mb-4 inline-block absolute top-0 left-0" style={{ color: '#395EB9', fontSize: '24px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        <div className="title-date flex items-center justify-between mb-4 ">
          <div className="flex">
            <div className="edit-submission-title text-3xl mb-4" style={{ fontSize: '32.73px', fontWeight: 700, lineHeight: '44.57px', textAlign: 'left', color: '#395EB9' }}>
              View Submission
            </div>
            <button className="ml-[50px] UserEdit-bottombutton"
              style={{ backgroundColor: '#FFFFFF80' }}
              onClick={(e) => {
                e.preventDefault();
                window.location.href = state.submission.mainSubmission.contentDriveUrl;
              }}>
              <FontAwesomeIcon icon={faLink} /> &nbsp; Google Drive
            </button>
          </div>

          <div className="flex items-center">
            <form>
              <div className="issue-type text font-bold">
                <label>Issue: </label>
                {state.submission.issue}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label>Type: </label>
                {state.submission.mainSubmission.type}
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-row  w-[100%] justify-between">
          <img
            src={state.submission.mainSubmission.contentDriveUrl}
            alt="Submission"
            className="max-w-[40%] mr-4 rounded-lg"
          />

          <div className="flex-col items-center py-2 UserEdit-textbox max-w-[55%] w-[100%]">
            <div className="title p-[5%] text-left">
              <b style={{ color: "#395EB9" }}>Title*</b>
              <br></br>
              <span>{state.submission.mainSubmission.title}</span>
            </div>
            <div className="image-description text-black p-[5%] text-left">
              <b style={{ color: "#395EB9" }}>Description</b>
              <br></br>
              <span>{state.submission.mainSubmission.description}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-row  w-[100%] justify-between mt-[10%]">
          <div className="additional-images">
            {state.submission.additionalReferences?.map((image, index) => (
              <img
                key={index}
                src={image.imageUrl}
                alt={`Additional Image ${index}`}
                className="max-w-[100%] mr-4 rounded-lg"
              />
            ))}
          </div>

          <div className="flex-col items-center py-2 UserEdit-textbox max-w-[55%] w-[100%]">
            <div className="title p-[5%] text-left">
              <b style={{ color: "#395EB9" }}>My process</b>
              <br></br>
              <span>This photo captures the midway point of my painting,
                offering a glimpse into the evolving work as it takes shape on
                the canvas.</span>
            </div>
          </div>
        </div>

        <div className="mt-[10%] ">
          <div className="font-bold UserEdit-header">Artist Statement</div>
          <div className="flex-col items-center py-2 p-[50px] mb-[10%] UserEdit-textbox max-w-[100%] ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Quasi sint pariatur, praesentium, accusantium hic ut enim repellendus
            ratione ipsum, illo voluptatem. Vel pariatur adipisci quidem dolorum,
            exercitationem dicta. Vero, officia? Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Tenetur nobis temporibus iusto odio vitae amet ex,
            nemo quae veniam rem dolore sequi aliquam eius even.
          </div>
        </div>

        <div className="mt-[10%]">
          <div className="font-bold UserEdit-header">Note to editor</div>
          <div className="flex-col items-center py-2 p-[50px] mb-[10%] UserEdit-textbox max-w-[100%] ">
            {state.submission.editor_note}
          </div>
        </div>

        <div className=" bottom-0 left-0 w-full flex justify-between my-[10%]">
          <button type="button" className="UserEdit-bottombutton">
            Delete Submission
          </button>
          <form onSubmit={onSubmit} className="bg-pink p-3 flex items-center ">
            <div className="submission-date text-white pr-10">
              Submitted: {state.submission.date}
            </div>
            <button type="button" onClick={handleEdit} className="mr-2 rounded shadow UserEdit-bottombutton">
              Edit
            </button>
            <button type="submit" className="UserEdit-bottombuttonred">
              Done
            </button>
          </form>
        </div>
      </div>
    </div>
  );


  return (body);



};

export default UserEditableSubmission;


