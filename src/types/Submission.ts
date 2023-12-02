/**
 * Type representing information about a submission.
 * @author Walid
 * @author Geneva
 * @typedef {Object} Submission
 * @property {string} id - The id of the submission ("author|title|date").
 * @property {string} author - The username of the author of the submission.
 * @property {string} title - The title of the submission.
 * @property {string} date - The date of the submission.
 * @property {string} issue - The issue associated with the submission.
 * @property {boolean} isApproved - Whether the submission is approved for the 
 *                                  current issue.
 * @property {Preview} mainSubmission - The main item being submitted.
 * @property {Preview[]} additionalReferences - Additional items to be submitted.
 */

// Import types
import Preview from './Preview';

type Submission = {
    id: string; // "author|title|date"
    author: string;
    title: string;
    date: string;
    issue: string;
    isApproved: boolean;
    mainSubmission: Preview;
    additionalReferences?: Preview[];
};

export default Submission;
