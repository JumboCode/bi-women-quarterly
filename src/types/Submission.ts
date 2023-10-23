// Type submission stores information about the submission

type Submission = {
    title: string,
    issue: string,
    date: string,
    wordDoc?: string,
    image?: string,
} & (
    { wordDoc: string } | { image: string }
)

export default Submission;
