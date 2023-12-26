/**
 * Profile review React component.
 * @author Lucien Bao, Lydia Chen, Austen Money
 */

// Clerk imports
import { IdentificationLink, User } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

// React imports
import React, { useReducer, useEffect, } from 'react';

// Custom types, etc.
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
    // Add conditionals here
    Preview = "PreviewView",
    Edit = "EditView"
}

/* -------- User Info Definition -------- */

type UserInfo = {
    /*
    Optional fields:
    ---
    email
    author name
    bio
    socials
    */

    profilePicture: string | null;

    email: string | null,
    firstName: string,
    lastName: string,
    authorName: string | null,
    pronouns: string,

    bio: string | null,

    birthday: Date,
    raceEthnicity: RaceEthnicity,
    gender: Gender,

    country: number, // use a number as index for "countries-list"
    stateProvince: string, // probably easier than implementing dropdowns
    cityTown: string, // same as stateProvince

    // NOTE: for socialMedias to be optional means that the
    // strings it contains are allowed to be empty
    socialMedias: SocialMedias

    // Add description of require state variable
    // addStateVariableName: addStateVariableValue,
    // Add description of optional state variable
    // addStateVariableName?: addStateVariableValue,
};

/* ------------- Actions ------------ */

// Types of actions
enum ActionType {
    // Switch between views
    ToggleView = "ToggleView",
    // Update user info
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
            profilePicture: userProps.profilePicture as string | null,

            email: user.primaryEmailAddressId,
            firstName: user.firstName!,
            lastName: user.lastName!,

            authorName: userProps.authorName as string | null, // TODO: make sure these are set?
            pronouns: userProps.pronouns as string,

            bio: userProps.bio as string | null,

            birthday: userProps.birthday as Date,
            raceEthnicity: userProps.raceEthnicity as RaceEthnicity,
            gender: userProps.gender as Gender,

            country: userProps.country as number,
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
                profilePicture: userProps.profilePicture as string | null,

                email: user!.primaryEmailAddressId,
                firstName: user!.firstName!,
                lastName: user!.lastName!,

                authorName: userProps.authorName as string | null, // TODO: make sure these are set?
                pronouns: userProps.pronouns as string,

                bio: userProps.bio as string | null,

                birthday: userProps.birthday as Date,
                raceEthnicity: userProps.raceEthnicity as RaceEthnicity,
                gender: userProps.gender as Gender,

                country: userProps.country as number,
                stateProvince: userProps.stateProvince as string,
                cityTown: userProps.cityTown as string,

                socialMedias: userProps.socialMedias as SocialMedias
            }
        });
    },
        [],
    );

    // BEGIN STUFF NOT LOOKED AT

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
     * @author Lucien Bao
     * @param event the event that has been changed
     */
    const switchToEdit = (event: any) => {
        // TODO
    }

    /**
     * Upload new profile picture.
     * @author Lucien Bao
     * @param event the event that has been changed
     */
    const uploadPicture = (event: any) => {
        // TODO
    }

    /**
     * Delete current profile picture.
     * @author Lucien Bao
     * @param event the event that has been changed
     */
    const deletePicture = (event: any) => {
        // TODO
    }

    // END STUFF NOT LOOKED AT

    /*------------------------------------------------------------------------*/
    /* ------------------------------- Render ------------------------------- */
    /*------------------------------------------------------------------------*/

    /*----------------------------------------*/
    /* ---------------- Views --------------- */
    /*----------------------------------------*/

    // Body that will be filled with the current view
    let body: React.ReactNode;

    // Edit mode //
    if (view == View.Preview) {
        body = (
            <form onSubmit={handleSubmit}>
                {/* Header portion */}
                <div>
                    <img src={userInfo!.profilePicture as string} alt="" />
                    <button type="submit" onClick={switchToEdit}>🖉 Edit</button>
                </div>
            </form>
        );
    }

    // Preview mode //
    else { // view == View.Edit
        body = (
            <form onSubmit={handleSubmit}>
                {/* Header portion */}
                <div>
                    <img src={userInfo!.profilePicture as string} alt="" />
                    <button type="button" onClick={uploadPicture}>Upload Photo</button>
                    <button type="button" onClick={deletePicture}>Delete Photo</button>
                    <button type="submit">Edit</button>
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