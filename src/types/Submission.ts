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
 * @property {Statuses} status - The status of the submission.
 * @property {string[]} tags - The tags associated with the submission.
 * @property {number} rating - The rating of the submission.
 * @property {string} notes - The notes associated with the submission.
 * @property {Preview} mainSubmission - The main item being submitted.
 * @property {Preview[]} additionalReferences - Additional items to be submitted.
 */

// Import types
import Preview from "./Preview";
import Mediums from "./Mediums";
import Statuses from './Statuses';

type Submission = {
    // Submission metadata
    id: string; // "author|title|date"
    author: string;
    title: string;
    date: string;
    issue: string;
    medium: Mediums;
    status: Statuses;

    // Submission content
    mainSubmission: Preview;
    additionalReferences?: Preview[];

    // Admin only
    tags?: string[];
    rating?: number;
    notes?: string;
};

export default Submission;
