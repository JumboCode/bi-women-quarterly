import Submission from "@/types/Submission";
import SubmissionForm from "@/components/SubmissionForm";

type Props = {
    finishSubmit: (body: FormData, submission: Submission) => void,
    goBack: () => void,
};

export const FileUploadForm: React.FC<Props> = props => {
    const { finishSubmit, goBack } = props;
    return <SubmissionForm finishSubmit={finishSubmit} goBack={goBack}/>;
}
