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
  
const UserEditableSubmission: React.FC<Props> = ({ submission: initialSubmission }) => {
  
  /*------------------------------------------------------------------------*/
  /* -------------------------------- States ------------------------------ */
  /*------------------------------------------------------------------------*/

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
    <div className="submission-container flex flex-col h-screen" style={{backgroundImage: 'linear-gradient(to bottom right, #FFD3CB, #E7A5FF, #B3C9FF)'}}>
      <form onSubmit={handleEdit} className="flex flex-row justify-start mb-4">
        <button type="submit" className="text-white px-4 py-2 mb-4 inline-block" style={{ color: '#395EB9', fontSize: '24px' }}>
          &lt;- Back
        </button>
      </form>
      <div className="title-date flex items-center justify-between mb-4">
        <div className="flex items-center">
          <form>
            <div className="issue-type text font-bold">
              <label>Issue: </label>
              <select name="issue" style={{ background: '#FADADD', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '6px', borderRadius: '4px'}}>
                  <option value="Current">{Issues.Current}</option>
                  <option value="Next">{Issues.Next}</option>
                  <option value="None">{Issues.None}</option>
              </select>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <label>Type: </label>
              <select name="issue" style={{ background: '#FADADD', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '6px', borderRadius: '4px' }}>
                  <option value="Submission">{PreviewType.Submission}</option>
                  <option value="addRef">{PreviewType.AdditionalReference}</option>
              </select>
            </div>
          </form>
        </div>
        <div className="submission-date text-white pr-10">
          Submitted: {submission.date}
        </div>
      </div>
      
      <div className="flex flex-row pl-10">
        <img
          src={submission.mainSubmission.imageUrl}
          alt="Submission"
          className="w-60 h-400 mr-4 rounded-lg"
        />
        <div className="flex-col items-center py-2 bg-[#eac4f9] rounded-lg drop-shadow-[0_0px_10px_rgba(0,0,0,0.25)] max-w-[40%] w-[100%]">
          <div className="title text-xl border-b border-blue-500 p-[5%] text-left">
            <b style={{ color: "#395EB9" }}>Title*</b>
            <br></br>
            <span style={{ fontSize: "14px" }}  contentEditable="true">{submission.title}</span>
          </div>
          <div className="image-description text-xl text-black p-[5%] text-left">
            <b style={{ color: "#395EB9" }}>Description</b>
            <br></br>
            <span style={{ fontSize: "14px" }}  contentEditable="true">{submission.mainSubmission.description}</span>
          </div>
        </div>
 
      </div>
      <div className="artist-statement mt-4 pl-10">
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
      <form onSubmit={handleSave} className="flex flex-row justify-between mt-10">
        <button type="button" className="mr-auto pl-10 rounded shadow">
          Delete Submission
        </button>
        <div className="flex flex-row pr-10">
          <button type="button" onClick={handleEdit} className="mr-2 rounded shadow p-[7%]">
            Edit
          </button>
          <button type="submit" className ="rounded shadow bg-pink-500 text-white size-100 p-[7%]">
            Save
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="submission-container flex flex-col h-screen" style={{backgroundImage: 'linear-gradient(to bottom right, #FFD3CB, #E7A5FF, #B3C9FF)'}}>
      <form onSubmit={handleEdit} className="flex flex-row justify-start mb-4">
      <button type="submit" className="text-white px-4 py-2 mb-4 inline-block" style={{ color: '#395EB9', fontSize: '24px' }}>
          &lt;- Back
        </button>
      </form>
      <div className="title-date flex items-center justify-between mb-4">
        <div className="title text-xl font-bold">
          {submission.title}
        </div>
        <div className="submission-date text-white pr-10">
          Submitted: {submission.date}
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="issue-type">
          <span className="font-bold">Issue:</span> {submission.issue}&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="font-bold">Type:</span> {submission.mainSubmission.type}
        </div>
      </div>
      <div className="flex flex-row">
        <img
          src={submission.mainSubmission.imageUrl}
          alt="Submission"
          className="w-60 h-400 mr-4"
        />
        <div className="image-description text-black">
          Description: {submission.mainSubmission.description}
        </div>
      </div>
      <div className="artist-statement mt-4">
        <div className="font-bold">Artist Statement</div>
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
          Quasi sint pariatur, praesentium, accusantium hic ut enim repellendus 
          ratione ipsum, illo voluptatem. Vel pariatur adipisci quidem dolorum, 
          exercitationem dicta. Vero, officia? Lorem, ipsum dolor sit amet consectetur 
          adipisicing elit. Tenetur nobis temporibus iusto odio vitae amet ex, 
          nemo quae veniam rem dolore sequi aliquam eius eveniet optio non totam voluptas et.
        </div>
      </div>
      <form onSubmit={handleSave} className="flex flex-row justify-between mt-10">
        <button type="button" className="mr-auto">
          Delete Submission
        </button>
        <div className="flex flex-row">
          <button type="button" onClick={handleEdit} className="mr-2">
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

export default UserEditableSubmission;


