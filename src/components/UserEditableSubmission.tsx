// ... other imports
import React, { useState, ChangeEvent } from 'react';
import Submission from '@/types/Submission';

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

  const body = editOn ? (
    <form onSubmit={handleSave} className="relative flex flex-col">
      <button type="button" onClick={handleEdit}>
        Edit
      </button>
      <button type="submit">
        Save
      </button>
      <input
        className="ml-28 mt-28 font-bold text-3xl"
        value={submission.title}
        onChange={(e) => handleChange('title', e.target.value)}
      />
      <div className="relative top-[0] w-[70%] left-[5%]">
        <input type="file" onChange={handleImageChange} />
        {submission.mainSubmission.imageUrl && (
          <img src={submission.mainSubmission.imageUrl} alt="Submission" />
        )}
       <div className="absolute left-[45%]  bottom-[60vh]">
        <input
            value={submission.mainSubmission.type}
            onChange={(e) => handleChange('mainSubmission.type', e.target.value)}
          />
          <textarea
            value={submission.mainSubmission.description}
            onChange={(e) => handleChange('mainSubmission.description', e.target.value)}
          />
          <input
            value={submission.author}
            onChange={(e) => handleChange('author', e.target.value)}
          />
       </div>
      </div>
    </form>
  ) : (
    <div className="relative flex flex-col">
      <button type="button" onClick={handleEdit}>
        Edit
      </button>
      <div className="ml-28 mt-28 font-bold text-3xl">
        {submission.title}
      </div>
      <div className="relative top-[0] w-[70%] left-[5%]">
        {submission.mainSubmission.imageUrl && (
          <img src={submission.mainSubmission.imageUrl} alt="Submission" />
        )}
        <div className='absolute left-[50%] bottom-[60vh]'>
          <div>
            {submission.mainSubmission.type}
          </div>
          <div>
            {submission.mainSubmission.description}
          </div>
          <div>
            {submission.author}
          </div>
        </div>
      </div>
    </div>
  );


  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/
  return <>{body}</>;

};

export default UserEditableSubmission;


