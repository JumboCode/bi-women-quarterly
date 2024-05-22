/**
 * Modal that allows users to view and edit their submission.
 * @author Austen Money
 * @author Walid Nejmi
 * @author Allison Zhang
 */

// ... other imports
import React, { useState, ChangeEvent, useEffect, useReducer, ReactNode } from 'react';

// Import types
import Submission from '@/types/Submission';
import Mediums from '@/types/Mediums';
import SocialMedias from '@/types/SocialMedias';

// Import other components
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
    showWarning: boolean;
};

type UserInfo = {
    profilePicture?: string;
    primaryEmailAddress: string, // required
    firstName?: string,
    lastName?: string,
    authorName: string, // required
    pronouns?: string,
    bio: string,  // required
    yearOfBirth?: string,
    raceEthnicity?: string,
    gender?: string,
    country?: string,
    stateProvince?: string,
    cityTown?: string,

    // NOTE: for socialMedias to be optional means that the
    // strings it contains are allowed to be empty
    socialMedias: SocialMedias
};

const PLACEHOLDERS: UserInfo = {
    profilePicture: 'defaultpfp.png',
    primaryEmailAddress: 'No email given',
    firstName: 'No first name given',
    lastName: 'No last name given',
    authorName: 'No author name given',
    pronouns: 'No pronouns given',
    bio: 'No bio given',
    yearOfBirth: (new Date()).getFullYear().toString(),
    raceEthnicity: 'No race/ethnicity given',
    gender: 'No gender given',
    country: 'No country given',
    stateProvince: 'No state/province given',
    cityTown: 'No city/town given',
    socialMedias: {
        LinkedIn: 'N/A',
        Facebook: 'N/A',
        Instagram: 'N/A',
        X: 'N/A',
        TikTok: 'N/A',
    },
};

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
    // Show Warning
    ShowWarning = 'ShowWarning',
    // Hide Warning
    HideWarning = 'HideWarning',
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
    | {
        // Action type
        type: ActionType.ShowWarning,
    }
    | {
        // Action type
        type: ActionType.HideWarning,
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
        case ActionType.ShowWarning: {
            return {
                ...state,
                showWarning: true,
            }
        }
        case ActionType.HideWarning: {
            return {
                ...state,
                showWarning: false,
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
        additionalRefIndex: initialSubmission.additionalReferences ? initialSubmission.additionalReferences.length - 1 : -1,
        initialAddRefIndex: initialSubmission.additionalReferences ? initialSubmission.additionalReferences.length - 1 : -1,
        showLoading: false,
        showWarning: false,
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    // Destructure state
    const {
        submission,
        additionalRefIndex,
        showLoading,
        showWarning,
    } = state;

    const [userInfo, setUserInfo] = useState<UserInfo>(PLACEHOLDERS);

    const userId = initialSubmission.userId;
    useEffect(() => {
        const getUserInfo = async () => {
            await fetch(`../api/users/get?id=${userId}`, { method: "GET" })
                .then(response => response.json())
                .then(response => {
                    setUserInfo(response.data);
                });
        }

        getUserInfo();
    }, []);

    const handleSubmissionChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        // setSubmission({ ...submission, [e.target.name]: e.target.value });
        dispatch({ type: ActionType.UpdateSubmission, field: e.target.name, value: e.target.value })
    };

    const handleMainSubmissionChange = (e: ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: ActionType.UpdateMainSubmission, field: e.target.name, value: e.target.value })
    };

    const handleUpdateAdditionalRef = (index: number, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch({ type: ActionType.UpdateAdditional, field: e.target.name, value: e.target.value, index: index })
    }


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        dispatch({ type: ActionType.ShowLoading });

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

        dispatch({ type: ActionType.HideLoading });

        handleEdit();
    };

    const deleteSubmit = async () => {
        // Show loading spinner
        dispatch({ type: ActionType.ShowLoading });

        try {
            await fetch(`../api/submissions/delete?id=${submission.id}&title=${submission.title}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.log(error);
        }

        // Hide loading spinner
        dispatch({ type: ActionType.HideLoading });

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
            dispatch({ type: ActionType.Cancel, submission: initialSubmission })
        })();
    }, [initialSubmission]);

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/

    let body: React.ReactNode;
    let modal: React.ReactNode;

    if (showWarning) {
        modal = (
            <div>
                <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-50"></div>
                <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Are you sure you want to delete this submission?</h2>
                        <p>This action cannot be undone.</p>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-pink-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={() => {
                                dispatch({ type: ActionType.HideWarning });
                                deleteSubmit();
                            }}
                        >
                            Yes
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => dispatch({ type: ActionType.HideWarning })}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    body = (
        <div className="flex flex-row h-100 w-100 UserEdit-container m-[0px] justify-around overflow-y-scroll rounded-lg">
            {modal}
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
                            <div className="title-date flex justify-end mb-4">
                                <div className="flex issue-type text font-bold">
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
                                                {(Object.keys(Mediums) as Array<keyof typeof Mediums>).map((key) => (
                                                    <option key={key} value={Mediums[key]}>
                                                        {Mediums[key]}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row w-[100%] justify-between">
                                <div className="UserEdit-image-container mr-4 flex items-start">
                                    <img
                                        src={state.submission.mainSubmission.imageUrl}
                                        alt="Submission"
                                        className="UserEdit-image max-w-[100%] mr-4 rounded-lg"
                                    />
                                </div>
                                <div className="flex-col items-center py-2 pl-2 UserEdit-textbox w-[100%]">
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
                                            onChange={(e) => {
                                                handleMainSubmissionChange(e);
                                                handleSubmissionChange(e);
                                            }}
                                        ></input>
                                    </div>
                                    <div className="image-description text-black p-2 text-left">
                                        <b style={{ color: "#395EB9" }}>Description</b>
                                        <br></br>
                                        <div className="h-32">
                                            <textarea
                                                className="UserEdit-inputbox h-full"
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

                            <div className="pt-5">
                                <div className="font-bold UserEdit-header">
                                    Artist Statement
                                </div>
                                <div className=" UserEdit-textbox flex-col items-center p-2 max-w-[100%] h-32 mb-5">
                                    <textarea
                                        name="artist_statement"
                                        className=" UserEdit-inputbox w-full h-full"
                                        value={state.submission.artist_statement}
                                        onChange={handleSubmissionChange}
                                    ></textarea>
                                </div>
                            </div>
                            <div>
                                <div className="font-bold UserEdit-header">
                                    Note to editor
                                </div>
                                <div className="UserEdit-textbox flex-col items-center p-2 max-w-[100%] h-32">
                                    <textarea
                                        name="editor_note"
                                        className=" UserEdit-inputbox flex-col items-center w-full h-full "
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
                                <div className="flex flex-row w-full mt-[5%]" key={index}>
                                    <div className="UserEdit-image-container flex items-start mr-4">
                                        <img
                                            src={additionalReference.imageUrl}
                                            alt={`Additional Image ${index}`}
                                            className="UserEdit-image max-w-[100%] mr-4 rounded-lg"
                                        />
                                    </div>

                                    <div className="flex-col items-center py-2 UserEdit-textbox w-[100%]">
                                        <div className="title p-5 text-left">
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
                                        <div className="image-description text-black p-5 text-left ">
                                            <b style={{ color: "#395EB9" }}>Description</b>
                                            <br></br>
                                            <div className="h-32">
                                                <textarea
                                                    className="UserEdit-inputbox h-full"
                                                    name="description"
                                                    value={
                                                        additionalReference.description
                                                    }
                                                    onChange={(e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => handleUpdateAdditionalRef(index, e)}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="photo-credit p-5 text-left">
                                            <b style={{ color: "#395EB9" }}>Photo Credit</b>
                                            <br></br>
                                            <input
                                                className="UserEdit-inputbox"
                                                type="text"
                                                name="photoCredit"
                                                value={
                                                    additionalReference.photoCredit
                                                }
                                                onChange={(e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => handleUpdateAdditionalRef(index, e)}
                                            ></input>
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
                            <div className="flex">
                                <button type="button" className="rounded shadow UserEdit-bottombutton font-semibold text-lg" onClick={() => dispatch({type: ActionType.ShowWarning})}>
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
                        <div className="title-date flex justify-end mb-4 ">
                            <div className="flex items-center issue-type text font-bold">
                                <div className="UserEdit-selectBox">
                                    <div className="UserEdit-blue-box">
                                        <label>Issue: </label>
                                    </div>
                                    <div className="UserEdit-selectBoxLabel truncate">
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
                            <div className="UserEdit-image-container mr-4 flex items-start">
                                <img
                                    src={submission.mainSubmission.imageUrl}
                                    alt="Submission"
                                    className="max-w-[100%] mr-4 rounded-lg"
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
                            <div key={index} className="flex flex-row w-[100%] mt-[5%]">
                                <div className="UserEdit-image-container flex items-start mr-4">
                                    <img
                                        src={additionalReference.imageUrl}
                                        alt={`Additional Image ${index}`}
                                        className="UserEdit-image max-w-[100%] rounded-lg"
                                    />
                                </div>

                                <div className="flex-col items-center py-2 UserEdit-textbox w-[100%]">
                                    <div className="title p-5 text-left">
                                        <b style={{ color: "#395EB9" }}>Title</b>
                                        <br></br>
                                        <span>{additionalReference.title}</span>
                                    </div>
                                    <div className="image-description text-black p-5 text-left">
                                        <b style={{ color: "#395EB9" }}>Description</b>
                                        <br></br>
                                        <span>
                                            {additionalReference.description}
                                        </span>
                                    </div>
                                    <div className="photo-credit p-5 text-left">
                                        <b style={{ color: "#395EB9" }}>Photo Credit</b>
                                        <br></br>
                                        {additionalReference.photoCredit}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Biographical info */}
                        <div className="font-bold UserEdit-header pt-5">
                            Personal
                        </div>
                        <div className={"border border-solid brder-white"
                            + " rounded-xl mb-5 p-5 alpha-gradient-background"
                            + " shadow shadow-lg shadow-blue"} >
                            <div>
                                <label className="font-bold text-primary-blue">Email</label>
                                <div className="py-4">{userInfo!.primaryEmailAddress}</div>
                            </div>

                            <div className="grid grid-cols-2 lg:pr-96">
                                <div>
                                    <label className="font-bold text-primary-blue">First Name</label>
                                    <div className="py-4">{userInfo!.firstName}</div>
                                </div>

                                <div>
                                    <label className="font-bold text-primary-blue">Last Name</label>
                                    <div className="py-4">{userInfo!.lastName}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:pr-96">
                                <div>
                                    <div className="font-bold text-primary-blue">Author Name</div>
                                    <div className="py-4">{userInfo!.authorName}</div>
                                </div>

                                <div>
                                    <div className="font-bold text-primary-blue">Pronouns</div>
                                    <div className="py-4">{userInfo!.pronouns}</div>
                                </div>
                            </div>

                            <div className="font-bold text-primary-blue">Bio</div>
                            <div className="py-4">{userInfo!.bio}</div>

                        </div>

                        <div className="font-bold UserEdit-header ">
                            Demographics (for editor use only)
                        </div>
                        <div className={"border border-solid brder-white"
                            + " rounded-xl mb-5 p-5 alpha-gradient-background"
                            + " shadow shadow-lg shadow-blue"}>
                            <div className="grid md:grid-cols-3 grid-cols-2 lg:pr-96">
                                <div>
                                    <div className="font-bold text-primary-blue">Year of Birth</div>
                                    <div className="py-4">{userInfo!.yearOfBirth}</div>
                                </div>

                                <div>
                                    <div className="font-bold text-primary-blue">Race/Ethnicity</div>
                                    <div className="py-4">{userInfo?.raceEthnicity}</div>
                                </div>

                                <div>
                                    <div className="font-bold text-primary-blue">Gender</div>
                                    <div className="py-4">{userInfo?.gender}</div>
                                </div>

                                <div>
                                    <div className="font-bold text-primary-blue">Country</div>
                                    <div className="py-4">{userInfo!.country}</div>
                                </div>

                                <div>
                                    <div className="font-bold text-primary-blue">State</div>
                                    <div className="py-4">{userInfo!.stateProvince}</div>
                                </div>

                                <div>
                                    <div className="font-bold text-primary-blue">City</div>
                                    <div className="py-4">{userInfo!.cityTown}</div>
                                </div>
                            </div>
                        </div>

                        {/* Social media */}
                        <div className="font-bold UserEdit-header ">
                            Socials
                        </div>
                        <div className="border border-solid border-white \
                rounded-xl p-5 alpha-gradient-background \
                shadow shadow-lg shadow-blue">

                            <div className="grid md:grid-cols-2 grid-cols-1">
                                <div className="py-4">
                                    <label className="font-bold inline mr-5 text-primary-blue">LinkedIn</label>
                                    <div className="inline">{userInfo!.socialMedias.LinkedIn}</div>
                                </div>

                                <div className="py-4">
                                    <label className="font-bold inline mr-5 text-primary-blue">Instagram</label>
                                    <div className="inline">{userInfo!.socialMedias.Instagram}</div>
                                </div>

                                <div className="py-4">
                                    <label className="font-bold inline mr-5 text-primary-blue">X/Twitter</label>
                                    <div className="inline">{userInfo!.socialMedias.X}</div>
                                </div>

                                <div className="py-4">
                                    <label className="font-bold inline mr-5 text-primary-blue">Facebook</label>
                                    <div className="inline">{userInfo!.socialMedias.Facebook}</div>
                                </div>
                            </div>
                        </div>


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
