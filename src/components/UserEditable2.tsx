// ... other imports
import React, { useState, ChangeEvent } from 'react';
import Submission from '@/types/Submission';
import PreviewType from '@/types/PreviewType';
import Issues from '@/types/Issues';

// import '.src/styles/ViewSub.css'; 
type Props = {
  submission: Submission;
};

/**
   * Allows the fields of submission to be edited, has very basic css for the 
   * display of the submission
   * @author Allison Zhang and Kevin Yuan
   * @param submission Submission to be edited
   */
  
const UserEditable2: React.FC<Props> = ({ submission: initialSubmission }) => {
  const [submission, setSubmission] = useState<Submission>(initialSubmission);
  const [editOn, setEditOn] = useState<boolean>(false);



  /* ------------- Actions ------------ */


  const handleChange = (key: keyof Submission, value: string) => {
    setSubmission({ ...submission, [key]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const img = URL.createObjectURL(e.target.files[0]);
      setSubmission({ ...submission, mainSubmission: { ...submission.mainSubmission, imageUrl: img } });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic goes here
    setEditOn(false);
  };

  const handleEdit = () => {
    setEditOn(true);
  };


  /*----------------------------------------*/
 	/* ---------------- Views --------------- */
 	/*----------------------------------------*/
   const authorName = (
    <div className="author-name text-xl font-bold absolute top-10 left-20">
      {submission.author}
    </div>
  );

  const issueType = (
    <div className="issue-type text font-bold absolute top-20 left-20">
      <div>Issue: {submission.mainSubmission.type}&nbsp;&nbsp;&nbsp;&nbsp;Type: {submission.mainSubmission.description}</div>
    </div>
  );

  const image = (
    <img
      src={submission.mainSubmission.imageUrl}
      alt="Submission"
      className="absolute top-40 left-20"
      style={{ width: '560px', height: '400px' }}
    />
  );


  const descriptionImage = (
    <div className="image-description absolute top-40 right-20 text-black">
      <p>Description: {submission.mainSubmission.description}</p>
    </div>
  );

  const submissionDate = (
    <div className="submission-date absolute top-10 right-20 text-white">
      Submitted {submission.date}
    </div>
  );

  const footer = (
    <div className="bg-pink p-3 flex justify-between items-center fixed bottom-0 w-full mx-auto px-20">
    <div className="text-blue-500">© 2024 <span className="font-bold">BiWomenQuarterly</span></div>
    <div className="flex items-center">
      <div className="mr-8">
        <a href="https://www.biwomenquarterly.com/about/" target="_blank" rel="noopener noreferrer" className="text-blue-500">About Us</a>
      </div>
      <div>
        <a href="https://www.biwomenquarterly.com/contact/" target="_blank" rel="noopener noreferrer" className="text-blue-500">Contact Us</a>
      </div>
    </div>
  </div>  
  )

  const containerStyle = {
    backgroundImage: 'linear-gradient(to bottom right, #FFD3CB, #E7A5FF, #B3C9FF)',
    fontFamily: 'Open Sans, sans-serif', 
  };

  
  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/
const body = editOn ? (
    <div className="submission-container">
        <form onSubmit={handleEdit}>
            <button type="submit">
                &lt;- Back
            </button>
        </form>
        <div className="title-date">
            <div className="edit-submission-title">
                Edit Submission
            </div>
            <div>
                <form>
                    <div className="issue-type">
                        <label>Issue: </label>
                        <select name="issue">
                            <option value="Current">{Issues.Current}</option>
                            <option value="Next">{Issues.Next}</option>
                            <option value="None">{Issues.None}</option>
                        </select>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <label>Type: </label>
                        <select name="issue">
                            <option value="Submission">{PreviewType.Submission}</option>
                            <option value="addRef">{PreviewType.AdditionalReference}</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
        <div className="flex-row">
            <img
                src={submission.mainSubmission.imageUrl}
                alt="Submission"
                className="w-60 h-400"
            />
            <div className="flex-col">
                <div className="title">
                    <b>Title*</b>
                    <br></br>
                    <span contentEditable="true">{submission.title}</span>
                </div>
                <div className="image-description">
                    <b>Description</b>
                    <br></br>
                    <span contentEditable="true">{submission.mainSubmission.description}</span>
                </div>
            </div>
        </div>
        <div className="artist-statement">
            <div className="font-bold">Artist Statement</div>
            <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Quasi sint pariatur, praesentium, accusantium hic ut enim repellendus 
                ratione ipsum, illo voluptatem. Vel pariatur adipisci quidem dolorum, 
                exercitationem dicta. Vero, officia? Lorem, ipsum dolor sit amet consectetur 
                adipisicing elit. Tenetur nobis temporibus iusto odio vitae amet ex, 
                nemo quae veniam rem dolore sequi aliquam eius even.
            </div>
        </div>
        <div>
            <button type="button">
                Delete Submission
            </button>
            <form onSubmit={handleSave}>
                <button type="button" onClick={handleEdit}>
                    Save & Continue Later
                </button>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    </div>
) : (
    <div className="submission-container">
        <form onSubmit={handleEdit}>
            <button type="submit">
                &lt;- Back
            </button>
        </form>
        <div className="title-date">
            <div className="title">
                {submission.title}
            </div>
            <div className="submission-date">
                Submitted: {submission.date}
            </div>
        </div>
        <div className="flex items-center">
            <div className="issue-type">
                <span className="font-bold">Issue:</span> {submission.issue}&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="font-bold">Type:</span> {submission.mainSubmission.type}
            </div>
        </div>
        <div className="flex flex-row">
            <img
                src={submission.mainSubmission.imageUrl}
                alt="Submission"
                className="w-60 h-400"
            />
            <div className="image-description">
                Description: {submission.mainSubmission.description}
            </div>
        </div>
        <div className="artist-statement">
            <div className="font-bold">Artist Statement</div>
            <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Quasi sint pariatur, praesentium, accusantium hic ut enim repellendus 
                ratione ipsum, illo voluptatem. Vel pariatur adipisci quidem dolorum, 
                exercitationem dicta. Vero, officia? Lorem, ipsum dolor sit amet consectetur 
                adipisicing elit. Tenetur nobis temporibus iusto odio vitae amet ex, 
                nemo quae veniam rem dolore sequi aliquam eius eveniet optio non totam voluptas
            </div>
        </div>
        <form onSubmit={handleSave}>
            <button type="button">
                Delete Submission
            </button>
            <div className="flex flex-row">
                <button type="button" onClick={handleEdit}>
                    Edit
                </button>
                <button type="submit">
                    Save
                </button>
            </div>
        </form>
    </div>
);
  


  return (body);
  
  
  
};  

export default UserEditable2;
