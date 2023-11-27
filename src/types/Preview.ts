/**
 * Stores string type needed for the Submission File Preview
 * @author Lydia Chen
 * @typedef {Object} Preview
 * @property {string} name - The name/type of the submission (either "Submission" or "Additional References")
 * @property {string} title - The title of the submission
 * @property {string} description - The description of the submission
 * @property {string} image - The preview image of the submission
 */

type Preview = {
    name: string;
    title: string;
    description: string;
    image: string;
}