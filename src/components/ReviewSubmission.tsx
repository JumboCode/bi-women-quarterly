/**
 * Page for reviewing a submission before submitting. 
 * @notes This is a test page only; no actual submission data is being 
 *        retrieved.
 * @author Lydia Chen
 * @author Austen Money
 */

// import components
import SubmissionPreview from "./SubmissionFilePreview";

// import types
import PreviewType from '@/types/PreviewType';
import Preview from '@/types/Preview';

export default function ReviewSubmission() {
    const preview1: Preview = {
        type: PreviewType.Submission,
        title: "title of piece",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin sagittis ex. Fusce pellentesque libero vitae urna tincidunt tempus. Proin orci odio, dapibus nec pulvinar sit amet, egestas ut sapien. Nunc vulputate tellus at sapien tempus, eget ultricies mauris accumsan. Suspendisse a pulvinar sapien, ut aliquet neque. Curabitur venenatis tristique vulputate. Donec imperdiet purus mi, nec scelerisque magna interdum sit amet. Morbi diam enim, placerat et nulla sed, rhoncus fringilla nisl. Duis blandit lectus et odio tempus pulvinar. Morbi ornare nisl ipsum, a porta odio lobortis eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras a varius enim, in ultricies odio. ",
        imageUrl: "a.JPG",
    };

    const preview2: Preview = {
        type: PreviewType.AdditionalReference,
        title: "title of reference",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin sagittis ex. Fusce pellentesque libero vitae urna tincidunt tempus. Proin orci odio, dapibus nec pulvinar sit amet, egestas ut sapien. Nunc vulputate tellus at sapien tempus, eget ultricies mauris accumsan. Suspendisse a pulvinar sapien, ut aliquet neque. Curabitur venenatis tristique vulputate. Donec imperdiet purus mi, nec scelerisque magna interdum sit amet. Morbi diam enim, placerat et nulla sed, rhoncus fringilla nisl. Duis blandit lectus et odio tempus pulvinar. Morbi ornare nisl ipsum, a porta odio lobortis eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras a varius enim, in ultricies odio. ",
        imageUrl: "b.JPG",
    };

    const issue = "Some issue";
    const type = "Some type";

    return (
        <div className="m-10 mx-12">
            <b>New Submission</b><br/>

            <div>
                <div>*Issue: <label>{issue}</label></div>
                <div>*Type: <label>{type}</label></div>
            </div>
            <br/>

            <SubmissionPreview 
                type = {preview1.type}
                title = {preview1.title}
                description = {preview1.description}
                imageUrl = {preview1.imageUrl}
            ></SubmissionPreview>
            <SubmissionPreview 
                type = {preview2.type}
                title = {preview2.title}
                description = {preview2.description}
                imageUrl = {preview2.imageUrl}
            ></SubmissionPreview>
        </div>
    )
}
