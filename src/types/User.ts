/**
 * Represents basic information about a user.
 * @author Walid and Geneva
 * @typedef {Object} User
 * @property {string} username - The username of the user.
 * @property {string} penname - The pen name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} bio - The biography of the user.
 * @property {socialMedias} socials - The user's social media information.
 * @property {string} headshot - The link to the user's headshot image.
 */

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
