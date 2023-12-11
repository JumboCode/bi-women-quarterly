/**
 * Profile review React component
 * @author Lucien Bao, Lydia Chen
 */

import { User } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

/*
Here are the user properties we should be able to
display in the profile view:

Email - text
First Name - text
Last Name - text
Author Name - text (additionally, checkbox)
Pronouns - text
Bio - text
Birthday - date
Racial/Ethnicity - dropdown
Gender - dropdown
Country - dropdown
State/Province - dropdown
City - dropdown

Instagram - text/link
X/Twitter - text/link
Facebook - text/link
*/

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

type State = {
    view: View.Preview,
    // TODO: add state variables for each of the user props
    /*
    Email - text
    First Name - text
    Last Name - text
    Author Name - text (additionally, checkbox)
    Pronouns - text
    Bio - text
    Birthday - date
    Racial/Ethnicity - dropdown
    Gender - dropdown
    Country - dropdown
    State/Province - dropdown
    City - dropdown

    Instagram - text/link
    X/Twitter - text/link
    Facebook - text/link
    */
   
    // Add description of require state variable
    addStateVariableName: addStateVariableValue,
    // Add description of optional state variable
    addStateVariableName?: addStateVariableValue,
};


/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

const ProfileReview: React.FC = () => {

    // Get current user; requires a user so if there isn't one then stop
    const { user } = useUser();
    if (!user)
        return (<div>No user :(</div>);

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

    // Initialize state
    const [users, setUsers] = useState<User>({
        email: "",
        first_name: "",
        last_name: "",
        author_name: "",
        pronouns: "",
        bio: "",
        birthday: "",
        race_ethnicity: "",
        gender: "",
        country: "",
        state_province: "",
        city: "",
        "Instagram": "",
        "Twitter": "",
        "Facebook": ""
    });


    /*----------------------------------------*/
    /* --------------- Main UI -------------- */
    /*----------------------------------------*/

    return (
        <form onSubmit={View.Edit}>
            <button type="submit">Edit</button>
        </form>
    );
};

/*------------------------------------------------------------------------*/
/* ------------------------------- Wrap Up ------------------------------ */
/*------------------------------------------------------------------------*/

// Export component
export default ProfileReview;