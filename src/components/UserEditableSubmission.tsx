// ... other imports
import React, { useState, ChangeEvent } from 'react';
import Submission from '@/types/Submission';
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




  // const body = editOn ? (
  //   <form onSubmit={handleSave} className="submission-container flex flex-col bg-pink p-20">
  //     <div className="flex items-center">
  //       <img src={submission.mainSubmission.imageUrl} alt="Submission" className="w-560 h-400" />
  //       <div className="text ml-4">
  //         <h3>{submission.title}</h3>
  //         <h4>Issue: {submission.mainSubmission.type}</h4>
  //         <p>{submission.mainSubmission.description}</p>
  //         <h4>Artist Statement</h4>
  //         <p>{submission.author}</p>
  //       </div>
  //     </div>
  //     <div className="flex justify-end mt-4">
  //       <button type="button" onClick={handleEdit} className="mr-2">
  //         Edit
  //       </button>
  //       <button type="submit">
  //         Save
  //       </button>
  //     </div>
  //   </form>
  // ) : (
  //   <div className="submission-container flex flex-col bg-pink p-20">
  //     <button type="button" onClick={handleEdit} className="mb-4">
  //       Edit
  //     </button>
  //     <div className="ml-28 mt-28 font-bold text-3xl">
  //       {submission.title}
  //     </div>
  //     <div className="flex items-center mt-4">
  //       {submission.mainSubmission.imageUrl && (
  //         <img src={submission.mainSubmission.imageUrl} alt="Submission" className="w-560 h-400" />
  //       )}
  //       <div className="ml-4">
  //         <div>
  //           {submission.mainSubmission.type}
  //         </div>
  //         <div>
  //           {submission.mainSubmission.description}
  //         </div>
  //         <div>
  //           {submission.author}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  



  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/
  return (
    <div className="submission-container flex flex-col bg-pink h-screen p-10 bg-pink-300">
      <form onSubmit={handleEdit} className="flex flex-row justify-start mb-4">
        <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded shadow mb-4 inline-block">
          &lt;- Back
        </button>
      </form>
      <div className="author-date flex items-center justify-between mb-4">
        <div className="author-name text-xl font-bold">
          {submission.author}
        </div>
        <div className="submission-date text-white">
          Submitted {submission.date}
        </div>
      </div>
      <div className="flex items-center">
        <div className="issue-type text font-bold">
          Issue: {submission.mainSubmission.type}&nbsp;&nbsp;&nbsp;&nbsp;Type: {submission.mainSubmission.description}
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
      <div className="bg-pink p-3 flex justify-between items-center mt-auto">
        <div className="text-blue-500">
          © 2024 <span className="font-bold">BiWomenQuarterly</span>
        </div>
        <div className="flex items-center">
          <div className="mr-8">
            <a href="https://www.biwomenquarterly.com/about/" target="_blank" rel="noopener noreferrer" className="text-blue-500">About Us</a>
          </div>
          <div>
            <a href="https://www.biwomenquarterly.com/contact/" target="_blank" rel="noopener noreferrer" className="text-blue-500">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
};  

export default UserEditableSubmission;


