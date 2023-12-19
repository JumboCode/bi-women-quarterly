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

    email: EmailAddress,
    firstName: string,
    lastName: string,
    authorName?: string
    pronouns: string,

    bio: string,

    birthday: Date,
    raceEthnicity: RaceEthnicity,
    gender: Gender,

    country: number, // use a number as index for "countries-list"
    stateProvince: string, // probably easier than implementing dropdowns
    cityTown: string, // same as stateProvince

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

    // TODO: temporary
    let exampleSocialMedias: SocialMedias = {
        LinkedIn: "linkedin.com",
        Facebook: "facebook.com",
        Instagram: "instagram.com",
        X: "twitter.com",
        TikTok: "tiktok.com"
    };

    // Initialize state
    const [userInfo, setUserInfo] = useState<UserInfo>({
        view: View.Preview,

        email: new EmailAddress("id", "example@example.com", null, []),
        firstName: "First",
        lastName: "Last",
        authorName: "PenName",
        pronouns: "they/them",

        bio: "I'm an example!",

        birthday: new Date(0),
        raceEthnicity: RaceEthnicity.Other,
        gender: Gender.Other,

        country: 0, // Andorra!
        stateProvince: "Province",
        cityTown: "Placeville",

        socialMedias: exampleSocialMedias
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


    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Edit</button>
        </form>
    );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default ProfileReview;