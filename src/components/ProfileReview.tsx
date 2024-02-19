/**
 * Profile review React component.
 * @author Lucien Bao, Lydia Chen, Austen Money
 */

// Clerk imports
import { clerkClient, useUser } from "@clerk/nextjs";

// React imports
import React, { useReducer, useEffect, useRef } from 'react';

// Custom types, etc.
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { TailSpin } from 'react-loader-spinner';

import RaceEthnicity from "@/types/RaceEthnicity";
import Gender from "@/types/Gender";
import SocialMedias from "@/types/SocialMedias";

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

/* -------- User Info Definition -------- */

type UserInfo = {
    profilePicture?: string;
    primaryEmailAddress: string, // required
    firstName?: string,
    lastName?: string,
    authorName: string, // required
    pronouns?: string,
    bio: string,  // required
    birthday?: Date,
    raceEthnicity?: RaceEthnicity,
    gender?: Gender,
    country?: string,
    stateProvince?: string,
    cityTown?: string,

    // NOTE: for socialMedias to be optional means that the
    // strings it contains are allowed to be empty
    socialMedias: SocialMedias
};

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

const getDateFromString = (date: string) => {
    // Subtract 1 from month because months use indexing for some reason
    return new Date(+date.substring(0, 4), +date.substring(5, 7) - 1, +date.substring(8, 10));
}

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const ProfileReview: React.FC<{}> = () => {

    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/

    /* -------------- State ------------- */
    const { isSignedIn, user, isLoaded } = useUser();

    const initialState: State = {
        view: View.Preview,
        userInfo: {
            profilePicture: "defaultpfp.png",
            primaryEmailAddress: 'No email given'
                || user?.primaryEmailAddress?.emailAddress,
            firstName: 'No first name given' || user?.firstName,
            lastName: 'No last name given' || user?.lastName,
            authorName: 'No author name given',
            pronouns: 'No pronouns given',
            bio: 'No bio given',
            birthday: new Date(),
            raceEthnicity: RaceEthnicity.Other,
            gender: Gender.Other,
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
        },
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    if (isLoaded) {
        // load stuff
    }

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
                primaryEmailAddress: userProps.primaryEmailAddress as string ?? 'No email given',
                firstName: userProps.firstName as string ?? 'No first name given',
                lastName: userProps.lastName as string ?? 'No last name given',
                authorName: userProps.authorName as string ?? 'No author name given',
                pronouns: userProps.pronouns as string ?? 'No pronouns given',
                bio: userProps.bio as string ?? 'No bio given',
                birthday: getDateFromString(userProps.birthday as string) ?? new Date(),
                raceEthnicity: userProps.raceEthnicity as RaceEthnicity ?? 'No race/ethnicity given',
                gender: userProps.gender as Gender ?? 'No gender given',
                country: userProps.country as string ?? 'No country given',
                stateProvince: userProps.stateProvince as string ?? 'No state/province given',
                cityTown: userProps.cityTown as string ?? 'No city/town given',
                socialMedias: userProps.socialMedias as SocialMedias ?? {
                    LinkedIn: 'N/A',
                    Facebook: 'N/A',
                    Instagram: 'N/A',
                    X: 'N/A',
                    TikTok: 'N/A',
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
     * Select race/ethnicity
     * @author Lydia Chen
     * @param value The new race/ethnicity value.
     */
    const selectRaceEthnicity = (value: string) => {
        const deepCopy = JSON.parse(JSON.stringify(userInfo));

        dispatch({
            type: ActionType.UpdateUserInfo,
            updatedUserInfo: {
                ...deepCopy,
                raceEthnicity: value
            },
        });
    }

    /**
     * Select gender preferences.
     * @author Lydia Chen
     * @param value the new gender value.
     */
    const selectGender = (value: string) => {
        const deepCopy = JSON.parse(JSON.stringify(userInfo));

        dispatch({
            type: ActionType.UpdateUserInfo,
            updatedUserInfo: {
                ...deepCopy,
                gender: value
            }
        })
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

    // NOTE: new
    /**
     * Handle any new changes to existing user data
     * @author Lucien Bao, Lydia Chen
     * @param field the field to be updated in the user data
     * @param value - The new value for the specified field
     */
    const handleBirthdayChange = (field: string, value: string) => {
        const deepCopy = JSON.parse(JSON.stringify(userInfo));

        dispatch({
            type: ActionType.UpdateUserInfo,
            updatedUserInfo: {
                ...deepCopy,
                [field]: getDateFromString(value)
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
        const deepCopy = JSON.parse(JSON.stringify(userInfo));

        try {
            await user?.update({
                // primaryEmailAddressId: userInfo.primaryEmailAddress,
                unsafeMetadata: {
                    ...deepCopy,
                },
            });
            // user?.update()
            // user?.createEmailAddress({ email: "thing@example.com" });
            // console.log(user?.emailAddresses)
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

    // Helper function for Preview mode display of user birthday
    const extractDateString = (date: Date): string => {
        if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
            return "No date given";
        }

        return (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '/' + date.getUTCFullYear();
    };

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
            <div className="p-10 px-20 bg-[#F4F0FF]">
                {/* Header portion */}
                <div className="grid grid-cols-2 pb-8">
                    <img className="rounded-full bg-gray-500 w-24 h-24" src={userInfo!.profilePicture as string} alt="Your profile picture" onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "defaultpfp.png";
                    }} />
                    <button className="text-right pr-4" type="button" onClick={switchToEdit}>🖉 Edit</button>
                </div>

                {/* Biographical info */}
                <div className="border border-solid border-slate-400 rounded-xl mb-5 p-5">
                    <div>
                        <label className="font-bold">Email</label>
                        <div className="py-4">{userInfo!.primaryEmailAddress}</div>
                    </div>

                    <div className="grid grid-cols-2 lg:pr-96">
                        <div>
                            <label className="font-bold">First Name</label>
                            <div className="py-4">{userInfo!.firstName}</div>
                        </div>

                        <div>
                            <label className="font-bold">Last Name</label>
                            <div className="py-4">{userInfo!.lastName}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:pr-96">
                        <div>
                            <div className="font-bold">Author Name</div>
                            <div className="py-4">{userInfo!.authorName}</div>
                        </div>

                        <div>
                            <div className="font-bold">Pronouns</div>
                            <div className="py-4">{userInfo!.pronouns}</div>
                        </div>
                    </div>

                    <div className="font-bold">Bio</div>
                    <div className="py-4">{userInfo!.bio}</div>

                    <div className="grid md:grid-cols-3 grid-cols-2 lg:pr-96">
                        <div>
                            <div className="font-bold">Birthday</div>
                            <div className="py-4">{extractDateString(userInfo.birthday!)}</div>
                        </div>

                        <div>
                            <div className="font-bold">Race/Ethnicity</div>
                            <div className="py-4">{userInfo.raceEthnicity}</div>
                        </div>

                        <div>
                            <div className="font-bold">Gender</div>
                            <div className="py-4">{userInfo.gender}</div>
                        </div>

                        <div>
                            <div className="font-bold">Country</div>
                            <div className="py-4">{userInfo.country}</div>
                        </div>

                        <div>
                            <div className="font-bold">State</div>
                            <div className="py-4">{userInfo.stateProvince}</div>
                        </div>

                        <div>
                            <div className="font-bold">City</div>
                            <div className="py-4">{userInfo.cityTown}</div>
                        </div>
                    </div>
                </div>

                {/* Social media */}
                <div className="border border-solid border-slate-400 rounded-xl p-5">
                    <label className="font-bold">Socials</label>

                    <div className="grid md:grid-cols-2 grid-cols-1">
                        <div className="py-4">
                            <label className="font-bold inline mr-5">LinkedIn</label>
                            <div className="inline">{userInfo!.socialMedias === undefined ?
                                "No LinkedIn given" : userInfo!.socialMedias.LinkedIn}</div>
                        </div>

                        <div className="py-4">
                            <label className="font-bold inline mr-5">Instagram</label>
                            <div className="inline">{userInfo!.socialMedias === undefined ?
                                "No Instagram given" : userInfo!.socialMedias.Instagram}</div>
                        </div>

                        <div className="py-4">
                            <label className="font-bold inline mr-5">X/Twitter</label>
                            <div className="inline">{userInfo!.socialMedias === undefined ?
                                "No X/Twitter given" : userInfo!.socialMedias.X}</div>
                        </div>

                        <div className="py-4">
                            <label className="font-bold inline mr-5">Facebook</label>
                            <div className="inline">{userInfo!.socialMedias === undefined ?
                                "No Facebook given" : userInfo!.socialMedias.Facebook}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Edit mode //
    else {
        body = (
            <form id="profileEdit" className="p-10 px-20 bg-#F4F0FF">
                {/* Header portion */}
                <div className="flex flex-col-4 items-center gap-5 pb-8 gap-x-5">
                    <img className="rounded-full bg-gray-500 w-24 h-24" src={userInfo!.profilePicture as string} alt="Your profile picture" onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "defaultpfp.png";       // Add src link to default img
                    }} />

                    <input type="file" accept="image/*" ref={fileInputRef} onChange={uploadPicture} />
                    {/* <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded h-10">Upload Photo</button> */}
                    <button type="button" onClick={deletePicture} className="bg-transparent hover:bg-gray-400 text-gray-500 font-bold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded h-10">Delete Photo</button>
                    <button type="submit" onClick={updateClerk} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10">✓ Done</button>
                </div>

                {/* Biographical info */}
                <div className="bg-white border border-solid border-slate-400 rounded-xl mb-5 p-5">
                    <label className="font-bold" htmlFor="email">Email*</label><br />
                    <input className="border-b-2 my-4 w-80" type="text" id="email" defaultValue={userInfo!.primaryEmailAddress} onChange={(e) => handleChange('primaryEmailAddress', e.target.value)} required /><br />

                    <div className="grid xl:grid-cols-2 lg:pr-96 grid-cols-1">
                        <div>
                            <label className="font-bold" htmlFor="fname">First Name</label><br />
                            <input className="border-b-2 my-4 w-80" type="text" id="fname" defaultValue={userInfo.firstName} onChange={(e) => handleChange('firstName', e.target.value)} />
                        </div>

                        <div>
                            <label className="font-bold" htmlFor="lname">Last Name</label><br />
                            <input className="border-b-2 my-4 w-80" type="text" id="lname" defaultValue={userInfo.lastName} onChange={(e) => handleChange('lastName', e.target.value)} />
                        </div>
                    </div>

                    <div className="grid xl:grid-cols-2 lg:pr-96 grid-cols-1">
                        <div>
                            <label className="font-bold" htmlFor="aname">Author Name*</label><br />
                            <input className="border-b-2 my-4 w-80" type="text" id="aname" defaultValue={userInfo.authorName} onChange={(e) => handleChange('authorName', e.target.value)} required />
                        </div>

                        <div>
                            <label className="font-bold" htmlFor="pronouns">Pronouns</label><br />
                            <input className="border-b-2 my-4 w-80" type="text" id="pronouns" defaultValue={userInfo.pronouns} onChange={(e) => handleChange('pronouns', e.target.value)} />
                        </div>
                    </div>

                    <div className="lg:pr-96">
                        <label className="font-bold" htmlFor="bio">Bio*</label><br />
                        <textarea className="my-4 pl-2 border border-gray-400 rounded" id="bio" name="profileEdit" rows={4} cols={50}
                            placeholder="Tell us about yourself!" defaultValue={userInfo.bio} onChange={(e) => handleChange('bio', e.target.value)} required />
                    </div>

                    <div className="grid md:grid-cols-3 grid-cols-2 xl:pr-96">
                        <div>
                            <label className="font-bold" htmlFor="birthday">Birthday</label><br />
                            <input
                                className="border-b-2 my-4 w-48"
                                type="date"
                                id="birthday"
                                defaultValue={extractDateString(userInfo.birthday!)}
                                onChange={(e) => handleBirthdayChange('birthday', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="font-bold" htmlFor="raceEthnicity">Race/Ethnicity</label><br />
                            <select className="my-4 bg-gray-300 rounded w-48"
                                form="profileEdit"
                                name="profileEdit"
                                id="raceEthnicity"
                                defaultValue={userInfo?.raceEthnicity?.toLowerCase()}
                                onChange={(e) => selectRaceEthnicity(e.target.value)}>

                                <option value="default">Select</option>
                                <option value="American Indian or Alaskan Native">{RaceEthnicity.AmericanIndian}</option>
                                <option value="Asian">{RaceEthnicity.Asian}</option>
                                <option value="Black or African American">{RaceEthnicity.Black}</option>
                                <option value="Native Hawaiian or Pacific Islander">{RaceEthnicity.NativeHawaiian}</option>
                                <option value="White or Caucasian">{RaceEthnicity.White}</option>
                                <option value="Other or prefer not to say">{RaceEthnicity.Other}</option>
                            </select>
                        </div>

                        <div>
                            <label className="font-bold" htmlFor="gender">Gender</label><br />
                            <select className="my-4 bg-gray-300 rounded w-48"
                                form="profileEdit"
                                name="profileEdit"
                                id="gender"
                                defaultValue={userInfo?.raceEthnicity?.toLowerCase()}
                                onChange={(e) => selectGender(e.target.value)}>

                                <option value="default">Select</option>
                                <option value="Female">{Gender.Female}</option>
                                <option value="Male">{Gender.Male}</option>
                                <option value="Non-binary">{Gender.Nonbinary}</option>
                                <option value="Other or prefer not to say">{Gender.Other}</option>
                            </select>
                        </div>

                        <div>
                            <div className="font-bold mb-4">Country</div>
                            <div className="relative">
                                <CountryDropdown
                                    value={country!}
                                    onChange={selectCountry}
                                    priorityOptions={["US"]}
                                // style={{ width: '192px' }}
                                />
                                <div className="border-b-2 border-gray-500 w-48"></div>
                            </div>
                        </div>

                        <div>
                            <div className="font-bold mb-4">State/Province</div>
                            <div className="relative">
                                <RegionDropdown
                                    country={country!}
                                    value={stateProvince!}
                                    onChange={selectStateProvince}
                                // style={{ width: '192px' }}
                                />
                                <div className="border-b-2 border-gray-500 w-48"></div>
                            </div>
                        </div>

                        <div>
                            <div className="font-bold" >City</div>
                            <input className="border-b-2 border-gray-500 my-4" type="text" id="cityTown" value={userInfo?.cityTown} onChange={(e) => handleChange('cityTown', e.target.value)} />
                        </div>

                    </div>

                </div>

                {/* Social media */}
                <div className="bg-white border border-solid border-slate-400 rounded-xl p-5">
                    <label className="font-bold">Socials</label>

                    <div className="grid lg:grid-cols-2 grid-cols-1">
                        <div>
                            <label className="font-bold pr-4" htmlFor="linkedin">LinkedIn</label>
                            <input className="border-b-2 my-4 w-80" type="text" id="linkedin" defaultValue={userInfo?.socialMedias.LinkedIn} onChange={(e) => updateSocialMedia('LinkedIn', e.target.value)} />
                        </div>

                        <div>
                            <label className="font-bold pr-4" htmlFor="instagram">Instagram</label>
                            <input className="border-b-2 my-4 w-80" type="text" id="instagram" defaultValue={userInfo?.socialMedias.Instagram} onChange={(e) => updateSocialMedia('Instagram', e.target.value)} />
                        </div>

                        <div>
                            <label className="font-bold pr-4" htmlFor="xTwitter">X/Twitter</label>
                            <input className="border-b-2 my-4 w-80" type="text" id="xTwitter" defaultValue={userInfo?.socialMedias.X} onChange={(e) => updateSocialMedia('X', e.target.value)} />
                        </div>

                        <div>
                            <label className="font-bold pr-4" htmlFor="facebook">Facebook</label>
                            <input className="border-b-2 my-4 w-80" type="text" id="facebook" defaultValue={userInfo?.socialMedias.Facebook} onChange={(e) => updateSocialMedia('Facebook', e.target.value)} />
                        </div>
                    </div>

                </div>
            </form>
        );
    }

    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/

    return (
        <div>
            {body}
        </div>
    );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default ProfileReview;