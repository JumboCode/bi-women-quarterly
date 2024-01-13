/**
 * Type representing information about a submission.
 * @author Walid
 * @author Geneva
 * @typedef {Object} Submission
 * @property {string} id - The id of the submission ("author|title|date").
 * @property {string} author - The username of the author of the submission.
 * @property {string} title - The title of the submission.
 * @property {string} date - The date of the submission.
 * @property {Issues} issue - The issue associated with the submission.
 * @property {Mediums} medium - The medium of the submission.
 * @property {boolean} isApproved - Whether the submission is approved for the
 *                                  current issue.
 * @property {Preview} mainSubmission - The main item being submitted.
 * @property {Preview[]} additionalReferences - Additional items to be submitted.
 */

// Import types
import Preview from "./Preview";
import Mediums from './Mediums';
import Issues from './Issues';

type  Submission = {
    id: string; // "author|title|date"
    author: string;
    title: string;
    date: string;
    issue: Issues;
    medium: Mediums;
    isApproved: boolean;
    additionalReferences?: Preview[];
};

export default Submission;
