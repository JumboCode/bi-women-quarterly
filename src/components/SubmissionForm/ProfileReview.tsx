/**
 * Profile review React component.
 * @author Lucien Bao, Lydia Chen, Austen Money
 */

// Clerk imports
import { useUser } from "@clerk/nextjs";

// React imports
import React, { useReducer, useEffect, useRef } from 'react';

// Custom types, etc.
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { TailSpin } from 'react-loader-spinner';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// Import types
import SocialMedias from "@/types/SocialMedias";

/*------------------------------------------------------------------------*/
/* -------------------------------- Types ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- User Info Definition -------- */

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

type Props = {
    onBack: () => void,
    onSubmit: () => void,
};

/*------------------------------------------------------------------------*/
/* ------------------------------ Constants ----------------------------- */
/*------------------------------------------------------------------------*/

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

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------- State Definition -------- */

type State = {
    // Preview vs. edit mode
    view: View;
    // Info about the current user
    userInfo: UserInfo;
};

/* ----------- View Definition ------------- */

enum View {
    Preview = "PreviewView",
    Edit = "EditView"
}


/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
    ToggleView = "ToggleView",
    UpdateUserInfo = "UpdateUserInfo"
}

// Action definitions
type Action = (
    | {
        type: ActionType.ToggleView,
    }
    | {
        type: ActionType.UpdateUserInfo,
        updatedUserInfo: UserInfo
    }
)

/**
 * Reducer that executes actions
 * @author Lucien Bao, Austen Money
 * @param state current state
 * @param action action to execute
 * @returns updated state
 */
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.ToggleView: {
            return {
                ...state,
                view: state.view == View.Preview ?
                    View.Edit : View.Preview,
            };
        }
        case ActionType.UpdateUserInfo: {
            return {
                ...state,
                userInfo: action.updatedUserInfo,
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

const ProfileReview: React.FC<Props> = (props) => {

    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/

    /* -------------- Props ------------- */
    const { onSubmit, onBack } = props;

    /* -------------- State ------------- */
    const { user, isLoaded } = useUser();

    const initialState: State = {
        view: View.Preview,
        userInfo: {
            profilePicture: "defaultpfp.png",
            primaryEmailAddress: '',
            firstName: '',
            lastName: '',
            authorName: '',
            pronouns: '',
            bio: '',
            yearOfBirth: '',
            raceEthnicity: '',
            gender: '',
            country: '',
            stateProvince: '',
            cityTown: '',
            socialMedias: {
                LinkedIn: '',
                Facebook: '',
                Instagram: '',
                X: '',
                TikTok: '',
            }
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const {
        view,
        userInfo
    } = state;

    /*------------------------------------------------------------------------*/
    /* ------------------------- Lifecycle Functions ------------------------ */
    /*------------------------------------------------------------------------*/

    /**
     * Mount
     * @author Lucien Bao, Austen Money
     */
    useEffect(() => {
        (async () => {
            // This function is a specialized function that will only be called once,
            // when the component first renders. 

            // This is where you'll first set the user info. The same
            // stuff you're already doing to pull the user info into 
            // your state will happen in this function instead, so that
            // you're only doing it once (you're essentially caching the 
            // data you get from Clerk in your state). 

            // Any edits to the state will not be pushed to the Clerk database
            // unless the user clicks "submit", and no new info will be pulled from
            // the Clerk database after this one function is called. (We know what
            // the state looks like at the beginning of the component's lifecycle,
            // and we control anything that might change.)      
        })();

        if (!isLoaded || !user) {
            return;
        }

        const currentUser = user;

        if (currentUser.unsafeMetadata === undefined) {
            currentUser.unsafeMetadata = {};
        }

        const userProps = currentUser.unsafeMetadata;

        dispatch({
            type: ActionType.UpdateUserInfo,
            updatedUserInfo: {
                profilePicture: userProps.profilePicture as string ?? "defaultpfp.png",
                primaryEmailAddress: userProps.primaryEmailAddress as string ?? '',
                firstName: userProps.firstName as string ?? '',
                lastName: userProps.lastName as string ?? '',
                authorName: userProps.authorName as string ?? '',
                pronouns: userProps.pronouns as string ?? '',
                bio: userProps.bio as string ?? '',
                yearOfBirth: userProps.yearOfBirth as string,
                raceEthnicity: userProps.raceEthnicity as string ?? '',
                gender: userProps.gender as string ?? '',
                country: userProps.country as string ?? '',
                stateProvince: userProps.stateProvince as string ?? '',
                cityTown: userProps.cityTown as string ?? '',
                socialMedias: userProps.socialMedias as SocialMedias ?? {
                    LinkedIn: '',
                    Facebook: '',
                    Instagram: '',
                    X: '',
                    TikTok: '',
                },
            }
        });

    },
        [isLoaded],
    );

    /**
     * Change to edit mode.
     * @author Lucien Bao, Lydia Chen
     * @param event the event that has been changed
     */
    const switchToEdit = (event: any) => {
        dispatch({ type: ActionType.ToggleView });
    }

    /**
     * Select a country.
     * @author Lucien Bao, Ben Keen, Lydia Chen
     * @param value the new country value.
     */
    const selectCountry = (value: string) => {
        const deepCopy = JSON.parse(JSON.stringify(userInfo));
        dispatch({
            type: ActionType.UpdateUserInfo,
            updatedUserInfo: {
                ...deepCopy,
                country: value
            }
        })
    }

    /**
     * Select a state/province.
     * @author Lucien Bao, Ben Keen, Lydia Chen
     * @param value the new state/province value.
     */
    const selectStateProvince = (value: string) => {
        const deepCopy = JSON.parse(JSON.stringify(userInfo));
        dispatch({
            type: ActionType.UpdateUserInfo,
            updatedUserInfo: {
                ...deepCopy,
                stateProvince: value
            }
        })
    }

    /**
     * Update social media
     * @author Lydia Chen
     * @param value the updated social media handle
     */
    const updateSocialMedia = (key: string, value: string) => {
        const deepCopy = JSON.parse(JSON.stringify(userInfo));

        dispatch({
            type: ActionType.UpdateUserInfo,
            updatedUserInfo: {
                ...deepCopy,
                socialMedias: {
                    ...deepCopy.socialMedias,
                    [key]: value
                }
            },
        });
    }

    /**
     * Upload new profile picture.
     * @author Lucien Bao, Lydia Chen
     * @param event the event that has been changed
     */
    const uploadPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const uploadedImage = event.target.files?.[0];
            const deepCopy = JSON.parse(JSON.stringify(userInfo));

            if (uploadedImage) {
                const newProfilePicture = URL.createObjectURL(uploadedImage);

                dispatch({
                    type: ActionType.UpdateUserInfo,
                    updatedUserInfo: {
                        ...deepCopy,
                        profilePicture: newProfilePicture
                    },
                });
            }
        } catch (error) {
            console.error('Error Uploading New Profile Picture: ', error);
        }
    }

    /**
     * Delete current profile picture.
     * @author Lucien Bao, Lydia Chen
     * @param event the event that has been changed
     */
    const deletePicture = (event: any) => {
        const deepCopy = JSON.parse(JSON.stringify(userInfo));

        dispatch({
            type: ActionType.UpdateUserInfo,
            updatedUserInfo: {
                ...deepCopy,
                profilePicture: "defaultpfp.png"
            },
        });
    }

    /**
     * Handle any new changes to existing user data
     * @author Lucien Bao, Lydia Chen
     * @param field the field to be updated in the user data
     * @param value - The new value for the specified field
     */
    const handleChange = (field: string, value: string) => {
        const deepCopy = JSON.parse(JSON.stringify(userInfo));

        dispatch({
            type: ActionType.UpdateUserInfo,
            updatedUserInfo: {
                ...deepCopy,
                [field]: value
            },
        });
    };

    /**
     * Change to view mode and update user info in Clerk.
     * @author Lucien Bao, Lydia Chen
     * @param event the event that has been changed
     */
    const updateClerk = async (event: any) => {
        event.preventDefault();

        if (userInfo.primaryEmailAddress === '') {
            alert("Please provide a valid email address.");
            return;
        }

        if (userInfo.authorName === '') {
            alert("Please provide an author name.");
            return;
        }

        if (userInfo.bio === '') {
            alert("Please provide an author bio.");
            return;
        }

        const deepCopy = JSON.parse(JSON.stringify(userInfo));

        try {
            await user?.update({
                unsafeMetadata: {
                    ...deepCopy,
                },
            });
            console.log("User updated successfully");
            dispatch({ type: ActionType.ToggleView });
        } catch (error) {
            console.log("Error updating user", error);
        }
    }

    // Initializes a null reference
    const fileInputRef = useRef<HTMLInputElement>(null);

    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/

    /*----------------------------------------*/
    /* ---------------- Views --------------- */
    /*----------------------------------------*/

    // Body that will be filled with the current view
    let body: React.ReactNode;

    const country = userInfo!.country;
    const stateProvince = userInfo!.stateProvince;

    console.log('profile picture: ', userInfo!.profilePicture)

    // No current user
    if (!isLoaded) {
        body = (
            <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#800080"
                ariaLabel="tail-spin-loading"
                radius="1"
                // wrapperStyle={{}}
                wrapperClass="flex items-center justify-center h-screen"
            />
        )
    }

    // Preview mode //
    else if (view == View.Preview) {
        body = (
            <div className="p-10 px-20 gradient-background flex flex-col gap-3">
                {/* Header portion */}
                <div className="flex justify-end">
                    <button className="rounded-lg h-11 w-11 left-3 absolute items-center "
                        onClick={onBack}
                    >
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="text-primary-blue text-2xl"
                        />
                    </button>
                    <h1 className="text-4xl text-primary-blue font-bold pb-3 flex-1">
                        Review Profile
                    </h1>
                    <div className={"text-center h-10 leading-10 h-10"
                        + " rounded-md "
                        + " cursor-pointer alpha-gradient-background-hover"
                        + " shadow shadow-md shadow-blue justify-end"
                        + " inset-highlight"}
                        onClick={switchToEdit}>
                        <p className="px-4 text-primary-blue">
                            <strong> 🖉 Edit</strong>
                        </p>
                    </div>
                    <button
                        type="submit"
                        onClick={onSubmit}
                        className={"bg-[#FF4395] shadow shadow-md shadow-blue"
                            + " hover:shadow-lg text-white font-bold py-2 px-4"
                            + " rounded h-10 hover:bg-[#f04090] justify-end ml-5"}
                    >
                        Submit
                    </button>
                </div>

                {/* Biographical info */}
                <div className="text-xl text-primary-blue font-bold pl-5 ">
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

                <div className="text-xl text-primary-blue font-bold pl-5 ">
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
                <div className="text-xl text-primary-blue font-bold pl-5 ">
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
            </div >
        );
    }

    // Edit mode //
    else {
        body = (
            <form id="profileEdit" className={"p-10 px-20 gradient-background"
                + " flex flex-col gap-3"}>
                <div className="flex justify-end">
                    <h1 className="text-4xl text-primary-blue font-bold pb-3 flex-1">
                        Edit Profile
                    </h1>
                    <button
                        type="submit"
                        onClick={updateClerk}
                        className={"bg-[#FF4395] shadow shadow-md shadow-blue"
                            + " hover:shadow-lg text-white font-bold py-2 px-4"
                            + " rounded h-10 hover:bg-[#f04090] justify-end"}
                    >
                        Save
                    </button>
                </div>

                {/* Biographical info */}
                <div className="text-xl text-primary-blue font-bold pl-5 ">
                     Personal
                </div>
                <div className={"border border-solid brder-white"
                    + " rounded-xl mb-5 p-5 alpha-gradient-background"
                    + " shadow shadow-lg shadow-blue"}>
                    <label className="font-bold text-primary-blue" htmlFor="email">Email*</label><br />
                    <input
                        className={"border-b my-4 w-5/6 xl:w-4/6 bg-transparent"
                            + " border-primary-blue"}
                        placeholder={PLACEHOLDERS.primaryEmailAddress}
                        type="text"
                        id="email"
                        defaultValue={userInfo!.primaryEmailAddress}
                        onChange={(e) => handleChange('primaryEmailAddress', e.target.value)}
                        required
                    />
                    <br />
                    <div className="grid xl:grid-cols-2 xl:pr-96 grid-cols-1">
                        <div>
                            <label className="font-bold text-primary-blue" htmlFor="fname">First Name</label><br />
                            <input
                                className={"border-b my-4 w-5/6 xl:w-80 bg-transparent"
                                    + " border-primary-blue"}
                                placeholder={PLACEHOLDERS.firstName}
                                type="text"
                                id="fname"
                                defaultValue={userInfo!.firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="font-bold text-primary-blue" htmlFor="lname">Last Name</label><br />
                            <input
                                className={"border-b my-4 w-5/6 xl:w-80 bg-transparent"
                                    + " border-primary-blue"}
                                placeholder={PLACEHOLDERS.lastName}
                                type="text"
                                id="lname"
                                defaultValue={userInfo!.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid xl:grid-cols-2 xl:pr-96 grid-cols-1">
                        <div>
                            <label className="font-bold text-primary-blue" htmlFor="aname">Author Name*</label><br />
                            <input
                                className={"border-b my-4 w-5/6 xl:w-80 bg-transparent"
                                    + " border-primary-blue"}
                                placeholder={PLACEHOLDERS.authorName}
                                defaultValue={userInfo!.authorName}
                                type="text"
                                id="aname"
                                onChange={(e) => handleChange('authorName', e.target.value)}
                                required />
                        </div>

                        <div>
                            <label className="font-bold text-primary-blue" htmlFor="pronouns">Pronouns</label><br />
                            <input
                                className={"border-b my-4 w-5/6 xl:w-80 bg-transparent"
                                    + " border-primary-blue"}
                                placeholder={PLACEHOLDERS.pronouns}
                                defaultValue={userInfo!.pronouns}
                                type="text"
                                id="pronouns"
                                onChange={(e) => handleChange('pronouns', e.target.value)} />
                        </div>
                    </div>

                    <div className="xl:pr-96 pb-4">
                        <label className="font-bold text-primary-blue"
                            htmlFor="bio">Bio*</label><br />
                        <textarea className={"border-b my-4 w-full bg-transparent"
                            + " border-primary-blue pl-2 rounded"}
                            id="bio" name="profileEdit" rows={4} cols={50}
                            placeholder="Tell us about yourself!"
                            defaultValue={userInfo.bio}
                            onChange={(e) => handleChange('bio', e.target.value)} required />
                        <label className="text-primary-blue text-sm">
                            Bio should be 1-2 sentences in length and include geographic location (can be as precise about location as you wish, but please include country). Please write in third person. </label>
                    </div>
                </div>
                <div className="text-xl text-primary-blue font-bold pl-5 ">
                     Personal
                </div>
                <div className={"border border-solid brder-white"
                    + " rounded-xl mb-5 p-5 alpha-gradient-background"
                    + " shadow shadow-lg shadow-blue"}>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:pr-96">
                        <div>
                            <label className="font-bold text-primary-blue"
                                htmlFor="yearOfBirth">Year of Birth</label><br />
                            <input
                                className={"border-b-2 my-4 w-48 border-b-2" +
                                    " border-primary-blue bg-transparent"}
                                placeholder={PLACEHOLDERS.yearOfBirth}
                                defaultValue={(new Date()).getFullYear().toString()}
                                type="text"
                                id="yearOfBirth"
                                onChange={(e) => handleChange('yearOfBirth', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="font-bold text-primary-blue"
                                htmlFor="raceEthnicity">Race/Ethnicity</label><br />
                            <input
                                className={"border-b-2 my-4 w-48 border-b-2" +
                                    " border-primary-blue bg-transparent"}
                                placeholder={PLACEHOLDERS.raceEthnicity}
                                defaultValue={userInfo?.raceEthnicity}
                                type="text"
                                id="raceEthnicity"
                                onChange={(e) => handleChange(e.target.id, e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="font-bold text-primary-blue" htmlFor="gender">Gender</label><br />
                            <input
                                className={"border-b-2 my-4 w-48 border-b-2" +
                                    " border-primary-blue bg-transparent"}
                                placeholder={PLACEHOLDERS.gender}
                                defaultValue={userInfo?.gender}
                                type="text"
                                id="gender"
                                onChange={(e) => handleChange(e.target.id, e.target.value)}
                            />
                        </div>

                        <div>
                            <div className="font-bold mb-4 text-primary-blue">Country</div>
                            <div className="relative">
                                <CountryDropdown
                                    value={country!}
                                    onChange={selectCountry}
                                    priorityOptions={["US"]}
                                    classes='w-48 bg-transparent cursor-pointer'
                                />
                                <div className="border-b-2 border-primary-blue w-48"></div>
                            </div>
                        </div>

                        <div>
                            <div className="font-bold mb-4 text-primary-blue">State/Province</div>
                            <div className="relative">
                                <RegionDropdown
                                    country={country!}
                                    value={stateProvince!}
                                    onChange={selectStateProvince}
                                    classes='w-48 bg-transparent cursor-pointer'
                                />
                                <div className="border-b-2 border-primary-blue w-48"></div>
                            </div>
                        </div>

                        <div>
                            <div className="font-bold text-primary-blue">City</div>
                            <input
                                className="border-b-2 border-primary-blue my-4 bg-transparent"
                                placeholder={PLACEHOLDERS.cityTown}
                                type="text"
                                id="cityTown"
                                value={userInfo?.cityTown}
                                onChange={(e) => handleChange('cityTown', e.target.value)}
                            />
                        </div>

                    </div>

                </div>

                {/* Social media */}
                <div className="text-xl text-primary-blue font-bold pl-5 ">
                     Socials
                </div>
                <div className={"border border-solid brder-white"
                    + " rounded-xl mb-5 p-5 alpha-gradient-background"
                    + " shadow shadow-lg shadow-blue"}>
                    <div className="grid lg:grid-cols-10 items-baseline">
                        <label className="font-bold text-primary-blue pr-4" htmlFor="linkedin">LinkedIn</label>
                        <input placeholder={PLACEHOLDERS.socialMedias.LinkedIn} className={"border-b my-4 w-5/6 lg:w-80 bg-transparent col-span-4"
                            + " border-primary-blue"} type="text" id="linkedin" defaultValue={userInfo?.socialMedias.LinkedIn} onChange={(e) => updateSocialMedia('LinkedIn', e.target.value)} />
                        <label className="font-bold text-primary-blue pr-4" htmlFor="instagram">Instagram</label>
                        <input placeholder={PLACEHOLDERS.socialMedias.Instagram} className={"border-b my-4 w-5/6 lg:w-80 bg-transparent col-span-4"
                            + " border-primary-blue"} type="text" id="instagram" defaultValue={userInfo?.socialMedias.Instagram} onChange={(e) => updateSocialMedia('Instagram', e.target.value)} />
                        <label className="font-bold text-primary-blue pr-4" htmlFor="xTwitter">X/Twitter</label>
                        <input placeholder={PLACEHOLDERS.socialMedias.X} className={"border-b my-4 w-5/6 lg:w-80 bg-transparent col-span-4"
                            + " border-primary-blue"} type="text" id="xTwitter" defaultValue={userInfo?.socialMedias.X} onChange={(e) => updateSocialMedia('X', e.target.value)} />
                        <label className="font-bold text-primary-blue pr-4" htmlFor="facebook">Facebook</label>
                        <input placeholder={PLACEHOLDERS.socialMedias.Facebook} className={"border-b my-4 w-5/6 lg:w-80 bg-transparent col-span-4"
                            + " border-primary-blue"} type="text" id="facebook" defaultValue={userInfo?.socialMedias.Facebook} onChange={(e) => updateSocialMedia('Facebook', e.target.value)} />
                    </div>

                </div>
            </form>
        );
    }

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/

    return (
        <div className="w-screen">
            {body}
        </div>
    );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default ProfileReview;
