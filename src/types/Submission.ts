/**
 * Type representing information about a submission.
 * @author Walid and Geneva
 * @typedef {Object} Submission
 * @property {string} title - The title of the submission.
 * @property {string} issue - The issue associated with the submission.
 * @property {string} date - The date of the submission.
 * @property {string} [wordDoc] - The link to a Word document (optional).
 * @property {string} [image] - The link to an image (optional).
 * @property {string[]} [additionalImages] - An array of additional 
 * image paths (optional).
 */

type Submission = {
    title: string,
    issue: string,
    date: string,
    additionalImages?: string[],
 
} & (
    { wordDoc: string } | { image: string }
);

export default Submission;



