/**
 * Stores string type needed for the Submission File Preview
 * @author Lydia Chen
 * @author Austen Money
 * @typedef {Object} Preview
 * @property {string} type - The name/type of the submission (either "Submission" or "Additional References")
 * @property {string} title - The title of the submission
 * @property {string} description - The description of the submission
 * @property {string} imageUrl - The preview image of the submission
 * @property {string} contentDriveUrl - The content of the submission in Drive
 * @property {string} photoCredit - The credit for the photo submission
 */

import PreviewType from "./PreviewType";

type Preview = {
    type: PreviewType; 
    title: string;
    description: string;
    imageUrl: string;
    contentDriveUrl: string;
    photoCredit: string;
};

export default Preview;
