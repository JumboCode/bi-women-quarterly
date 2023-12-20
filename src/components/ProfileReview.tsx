/**
 * Profile review React component
 * @author Lucien Bao, Lydia Chen
 */

import { IdentificationLink, User } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { EmailAddress } from "@clerk/nextjs/server";

import { useState } from "react";

import RaceEthnicity from "@/types/RaceEthnicity";
import Gender from "@/types/Gender";
import SocialMedias from "@/types/SocialMedias";
import { profile } from "console";

/*------------------------------------------------------------------------*/
/* -------------------------------- State ------------------------------- */
/*------------------------------------------------------------------------*/

/* -------------- Views ------------- */

enum View {
    // Add conditionals here
    Preview = "PreviewView",
    Edit = "EditView"
}

/* -------- State Definition -------- */

type UserInfo = {
    view: View.Preview,

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


/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const ProfileReview: React.FC = () => {

    // Get current user; requires a user so if there isn't one then stop
    const { user } = useUser();
    if (!user)
        return (<div>No user found!</div>);

    // user.createEmailAddress()
    // user.firstName()
    // user.fullName()
    // user.

    try {
        user.update({

        });
    } catch (error) {
        console.log(error);
    }
    /*------------------------------------------------------------------------*/
    /* -------------------------------- Setup ------------------------------- */
    /*------------------------------------------------------------------------*/

    /* -------------- State ------------- */

    const userProps = user.unsafeMetadata;

    // Initialize state
    const [userInfo, setUserInfo] = useState<UserInfo>({
        view: View.Preview,

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
    });

    /*------------------------------------------------------------------------*/
    /* ------------------------- Lifecycle Functions ------------------------ */
    /*------------------------------------------------------------------------*/

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


    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/

    if (userInfo.view == View.Preview) {
        return (
            <form onSubmit={handleSubmit}>
                {/* Header portion */}
                <div>
                    <img src={userInfo.profilePicture as string} alt="" />
                    <button type="submit" onClick={switchToEdit}>🖉 Edit</button>
                </div>
            </form>
        );
    } else { // userInfo.view == View.Edit
        return (
            <form onSubmit={handleSubmit}>
                {/* Header portion */}
                <div>
                    <img src={userInfo.profilePicture as string} alt="" />
                    <button type="button" onClick={uploadPicture}>Upload Photo</button>
                    <button type="button" onClick={deletePicture}>Delete Photo</button>
                    <button type="submit">Edit</button>
                </div>
            </form>
        );
    }
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default ProfileReview;