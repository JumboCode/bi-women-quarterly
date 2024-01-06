/**
 * Profile review React component.
 * @author Lucien Bao, Lydia Chen, Austen Money
 */

// Clerk imports
import { useUser } from "@clerk/nextjs";

// React imports
import React, { useReducer, useEffect, useRef } from 'react';

// Custom types, etc.
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

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
    userInfo?: UserInfo;
};

/* ----------- View Definition ------------- */

enum View {
    Preview = "PreviewView",
    Edit = "EditView"
}

/* -------- User Info Definition -------- */

type UserInfo = {
    /*
    Required fields:
    ---
    email
    author name
    bio
    */

    profilePicture?: string;

    email: string, // required
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

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const ProfileReview: React.FC<{}> = () => {

    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/

    /* -------------- State ------------- */

    // Get current user; requires a user so if there isn't one then stop
    const { user } = useUser();
    if (!user)
        return (<div>No user found!</div>);

    /* Begin stuff Lucien doesn't understand and has left commented for now
    // user.createEmailAddress()
    // user.firstName()
    // user.fullName()
    // user.
 
    // try {
    //     user.update({
 
    //     });
    // } catch (error) {
    //     console.log(error);
    // }
    // end stuff Lucien commented out
    */

    const userProps = user.unsafeMetadata;

    const initialState: State = {
        view: View.Preview,
        userInfo: {
            // TODO: we assume some things are not null, is this okay?
            profilePicture: userProps.profilePicture as string,

            email: user.primaryEmailAddressId!,
            firstName: user.firstName!,
            lastName: user.lastName!,

            authorName: userProps.authorName as string,
            pronouns: userProps.pronouns as string,

            bio: userProps.bio as string,

            birthday: userProps.birthday as Date,
            raceEthnicity: userProps.raceEthnicity as RaceEthnicity,
            gender: userProps.gender as Gender,

            country: userProps.country as string,
            stateProvince: userProps.stateProvince as string,
            cityTown: userProps.cityTown as string,

            socialMedias: userProps.socialMedias as SocialMedias
        }
    }

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
            // 
            // This is where you'll first set the user info. The same
            // stuff you're already doing to pull the user info into 
            // your state will happen in this function instead, so that
            // you're only doing it once (you're essentially caching the 
            // data you get from Clerk in your state). 
            //
            // Any edits to the state will not be pushed to the Clerk database
            // unless the user clicks "submit", and no new info will be pulled from
            // the Clerk database after this one function is called. (We know what
            // the state looks like at the beginning of the component's lifecycle,
            // and we control anything that might change.)

        })();

        const { user } = useUser();

        dispatch({
            type: ActionType.UpdateUserInfo,
            updatedUserInfo: {
                // TODO: we assume some things are not null, is this okay?
                profilePicture: userProps.profilePicture as string,

                email: user!.primaryEmailAddressId!,
                firstName: user!.firstName!,
                lastName: user!.lastName!,

                authorName: userProps.authorName as string,
                pronouns: userProps.pronouns as string,

                bio: userProps.bio as string,

                birthday: userProps.birthday as Date,
                raceEthnicity: userProps.raceEthnicity as RaceEthnicity,
                gender: userProps.gender as Gender,

                country: userProps.country as string,
                stateProvince: userProps.stateProvince as string,
                cityTown: userProps.cityTown as string,

                socialMedias: userProps.socialMedias as SocialMedias
            }
        });
    },
        [],
    );

    /**
     * Update view on form submit and print some debug information to the console.
     * @author Lucien Bao, Alana Sendlakowski, Vanessa Rose
     * @param event the event that has been changed
     */
    const handleSubmit = (event: any) => {
        // TODO: implement
    }

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
     * @param value Updated country value.
     */
    const selectCountry = (value: string) => {
        const deepCopy = JSON.parse(JSON.stringify(userInfo));
        dispatch(
            {
                type: ActionType.UpdateUserInfo,
                updatedUserInfo: {
                    ...deepCopy,
                    country: value
                }
            }
        )
    }

    /**
     * Select a state/province.
     * @author Lucien Bao, Ben Keen, Lydia Chen
     * @param value Updated state/province value.
     */
    const selectStateProvince = (value: string) => {
        const deepCopy = JSON.parse(JSON.stringify(userInfo));
        dispatch(
            {
                type: ActionType.UpdateUserInfo,
                updatedUserInfo: {
                    ...deepCopy,
                    stateProvince: value
                }
            }
        )
    }

    /**
     * Upload new profile picture.
     * @author Lucien Bao, Lydia Chen
     * @param event the event that has been changed
     */
    const uploadPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const uploadedImage = event.target.files?.[0];
            /* 
            Had issues with using the shallow copy (...userInfo) when 
            updating profilePicture. I think it was due to customized types?
            So, did a "deep copy" using parse and stringify, but there are limitations
            Some online recommendations were to use libraries like:
            { import cloneDeep from 'lodash/cloneDeep'; }
            But I don't know the secure it may be.
            - Lydia
            */
            const deepCopy = JSON.parse(JSON.stringify(userInfo));

            if (uploadedImage) {
                const newProfilePicture = URL.createObjectURL(uploadedImage);

                dispatch({
                    type: ActionType.UpdateUserInfo,
                    updatedUserInfo: {
                        ...deepCopy,
                        profilePicture: newProfilePicture,
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
                profilePicture: null,
            },
        });
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
    const extractDateString = (date: Date) => {
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    };

    // Preview mode //
    if (view == View.Preview) {
        body = (
            <div>
                {/* Header portion */}
                <div>
                    <img src={userInfo!.profilePicture as string} alt="Your profile picture" />
                    <button type="button" onClick={switchToEdit}>🖉 Edit</button>
                </div>

                {/* Biographical info */}
                <div>
                    <table>
                        <tr>
                            <th align="left">Email</th>
                        </tr>
                        <tr>
                            <td>{userInfo!.email}</td>
                        </tr>

                        <tr>
                            <th align="left">First name</th>
                            <th align="left">Last name</th>
                        </tr>
                        <tr>
                            <td>{userInfo!.firstName}</td>
                            <td>{userInfo!.lastName}</td>
                        </tr>

                        <tr>
                            <th align="left">Author name</th>
                            <th align="left">Pronouns</th>
                        </tr>
                        <tr>
                            <td>{userInfo!.authorName}</td>
                            <td>{userInfo!.pronouns}</td>
                        </tr>

                        <tr>
                            <th align="left">Bio</th>
                        </tr>
                        <tr>
                            <td>{userInfo!.bio}</td>
                        </tr>

                        <tr>
                            <th align="left">Birthday</th>
                            <th align="left">Race/Ethnicity</th>
                            <th align="left">Gender</th>
                        </tr>
                        <tr>
                            <td>{extractDateString(userInfo!.birthday!)}</td>
                            <td>{userInfo!.raceEthnicity}</td>
                            <td>{userInfo!.gender}</td>
                        </tr>

                        <tr>
                            <th align="left">Country</th>
                            <th align="left">State</th>
                            <th align="left">City</th>
                        </tr>
                        <tr>
                            <td>{userInfo!.country}</td>
                            <td>{userInfo!.stateProvince}</td>
                            <td>{userInfo!.cityTown}</td>
                        </tr>
                    </table>
                </div>

                {/* Social media */}
                <div>
                    <table>
                        <tr>
                            <th>Month</th>
                            <th>Savings</th>
                        </tr>
                        <tr>
                            <td>January</td>
                            <td>$100</td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }

    // Edit mode //
    else { // view == View.Edit
        body = (
            <form onSubmit={handleSubmit} id="profileEdit">
                {/* Header portion */}
                <div>
                    <img src={userInfo!.profilePicture as string} alt="Your profile picture" />
                    {/* 
                    Added an input for the user to select a new profile picture. 
                    The "fileInputRef" provides a reference to the file input element 
                    and is used to trigger the click event, allowing the user to select 
                    a file.
                    */}
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={uploadPicture} />
                    <button type="button" onClick={() => fileInputRef.current?.click()}>Upload Photo</button>
                    <button type="button" onClick={deletePicture}>Delete Photo</button>
                    <button type="submit">✓ Done</button>
                </div>

                {/* Biographical info */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" required /> <br></br>

                    <label htmlFor="fname">First name</label>
                    <input type="text" id="fname" />
                    <label htmlFor="lname">Last name</label>
                    <input type="text" id="lname" /> <br></br>

                    <label htmlFor="aname">Author name</label>
                    <input type="text" id="aname" required />
                    <label htmlFor="pronouns">Pronouns</label>
                    <input type="text" id="pronouns" /> <br></br>

                    <label htmlFor="bio">Bio</label>
                    <textarea id="bio" name="profileEdit" rows={4} cols={50}
                        placeholder="Tell us about yourself!" required /> <br></br>

                    <label htmlFor="birthday">Birthday</label>
                    <input type="date" id="birthday" />
                    <label htmlFor="raceEthnicity">Race/Ethnicity</label>
                    <select form="profileEdit" name="profileEdit" id="raceEthnicity">
                        <option value="americanIndian">{RaceEthnicity.AmericanIndian}</option>
                        <option value="asian">{RaceEthnicity.Asian}</option>
                        <option value="black">{RaceEthnicity.Black}</option>
                        <option value="nativeHawaiian">{RaceEthnicity.NativeHawaiian}</option>
                        <option value="white">{RaceEthnicity.White}</option>
                        <option value="other">{RaceEthnicity.Other}</option>
                    </select>
                    <label htmlFor="gender">Gender</label>
                    <select form="profileEdit" name="profileEdit" id="gender">
                        <option value="female">{Gender.Female}</option>
                        <option value="male">{Gender.Male}</option>
                        <option value="non-binary">{Gender.Nonbinary}</option>
                        <option value="other">{Gender.Other}</option>
                    </select> <br></br>

                    <CountryDropdown
                        value={country!}
                        onChange={selectCountry}
                        priorityOptions={["US"]} />
                    <RegionDropdown
                        country={country!}
                        value={stateProvince!}
                        onChange={selectStateProvince} />
                    <label htmlFor="cityTown">City/Town</label>
                    <input type="text" id="cityTown" />
                </div>

                {/* Social media */}
                <div>
                    <label htmlFor="facebook">Facebook</label>
                    <input type="text" id="facebook" />
                    <label htmlFor="instagram">Instagram</label>
                    <input type="text" id="instagram" />
                    <label htmlFor="xTwitter">X/Twitter</label>
                    <input type="text" id="xTwitter" />
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