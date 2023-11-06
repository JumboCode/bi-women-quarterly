// User type stores basic information about the user

import socialMedias from "./socials";

type User = {
    username: string,
    penname: string,
    email: string,
    bio: string,
    socials: socialMedias,
    headshot: string,
};

export default User;
