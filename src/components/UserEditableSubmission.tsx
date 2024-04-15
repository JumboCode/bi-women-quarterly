// ... other imports
import React, { useState, ChangeEvent } from 'react'; 
import Submission from '@/types/Submission';
import PreviewType from '@/types/PreviewType';
import Issues from '@/types/Issues';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


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
  const [submission, setSubmission] = useState<Submission>(initialSubmission);
  const [editOn, setEditOn] = useState<boolean>(false);



  /* ------------- Actions ------------ */

  const handleSubmissionChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setSubmission({ ...submission, [e.target.name]: e.target.value});
  };

  const handleMainSubmissionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setSubmission({ ...submission, mainSubmission: { ...submission.mainSubmission, [name]: value} });
  };

  const handleArtistStatementChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setSubmission({ ...submission, artist_statement: value });
  };
  

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const img = URL.createObjectURL(e.target.files[0]);
      setSubmission({ ...submission, mainSubmission: { ...submission.mainSubmission, imageUrl: img } });
    }
  };

  const handleAdditionalImageDescriptionChange = (index: number, event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    const updatedAdditionalReferences = [...(submission.additionalReferences ?? [])];
    updatedAdditionalReferences[index] = { ...updatedAdditionalReferences[index], description: value };
    setSubmission({ ...submission, additionalReferences: updatedAdditionalReferences });
  };
  
  
  const handleNoteEditorChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setSubmission({ ...submission, editor_note: value });
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

  const additionalImages = submission.additionalReferences 
  ? submission.additionalReferences.map((reference, index) => (
      <img
        key={index}
        src={reference.imageUrl}
        alt={`Submission ${index}`}
        className="max-w-[40%] mr-4 rounded-lg"
      />
    ))
  : null;

  
  /*----------------------------------------*/
  /* --------------- Main UI -------------- */
  /*----------------------------------------*/
  const body = editOn ? (
      <div className="flex flex-row h-screen UserEdit-container m-[0px] justify-around overflow-y-scroll" style={{backgroundImage: 'linear-gradient(to bottom right, #FFD3CB, #E7A5FF, #B3C9FF)'}}>
        <div className="w-[70%] mt-[5%]">
          <form onSubmit={handleEdit} className="flex flex-row justify-start mb-4">
            <button type="submit" className="text-white px-4 py-2 mb-4 inline-block absolute top-0 left-0" style={{ color: '#395EB9', fontSize: '24px' }}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
          </form>
          <div className="title-date flex items-center justify-between mb-4">
            <div className="flex flex-row">
              <div className="edit-submission-title text-3xl mb-4" style={{fontSize: '32.73px', fontWeight: 700, lineHeight: '44.57px', textAlign: 'left', color: '#395EB9'}}>
                Edit Submission
              </div>
              <button className="ml-[50px] UserEdit-bottombutton" 
              style={{ backgroundColor: '#FFFFFF80' }} 
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = submission.mainSubmission.contentDriveUrl;
                    }}>
                    <FontAwesomeIcon icon={faLink} /> &nbsp; Google Drive
              </button>
            </div>
            <div className="flex items-center issue-type text font-bold">
            <form>
              <div className="issue-type text">
              &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="blue-box">
                  <label>Issue: </label>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="blue-box">
                  <label>Type: </label>
                </div>                
              </div>
              
                <div className="issue-type text font-bold">
                  <select name="issue" style={{ background: 'FFFFFF80', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '6px'}}>
                      <option value="Current">{Issues.Current}</option>
                      <option value="Next">{Issues.Next}</option>
                      <option value="None">{Issues.None}</option>
                  </select>
                  &nbsp;&nbsp;&nbsp;&nbsp;

                  <select name="PreviewType" style={{ background: 'FFFFFF80', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '6px'}}>
                      <option value="Submission">{PreviewType.Submission}</option>
                      <option value="addRef">{PreviewType.AdditionalReference}</option>
                  </select>
                </div>
              </form>

            </div>
        </div>
        
      <div className="flex flex-row w-full justify-between">
        <div className="image-container flex items-start">
          <img
            src={submission.mainSubmission.imageUrl}
            alt="Submission"
            className="image max-w-[100%] mr-4 rounded-lg"
          />
        </div>

        <div className="flex-col items-center py-2 UserEdit-textbox max-w-[55%] w-[100%]">
            <div className="title p-[5%] text-left"> 
              <b style={{ color: "#395EB9" }}>Title*</b>
              <br></br>
              <input className="UserEdit-inputbox" type='text' name="title" value={submission.title} onChange={handleSubmissionChange}></input>
            </div>
            <div className="image-description text-black p-[5%] text-left">
              <b style={{ color: "#395EB9" }}>Description</b>
              <br></br>
              <textarea className="UserEdit-inputbox" name="description" value={submission.mainSubmission.description} onChange={handleMainSubmissionChange}> 
              </textarea>
            </div>
          </div>
        </div>
          <div>
            {submission.additionalReferences?.map((image, index) => (
            <div className="flex flex-row w-[100%] justify-between mt-[10%]" key={index}>
              <div className="additional-images"> 
                <div className="image-container flex items-start">
                  <img
                    src={image.imageUrl}
                    alt={`Additional Image ${index}`}
                    className="image max-w-[100%] rounded-lg"
                  />
                </div>
              </div>

              <div className="flex-col items-center py-2 UserEdit-textbox max-w-[55%] w-[100%]">
                <div className="title p-[5%] text-left"> 
                  <b style={{ color: "#395EB9" }}>My process</b>
                  <br></br>
                  <textarea
                    className="UserEdit-inputbox"
                    value={image.description}
                    onChange={(event) => handleAdditionalImageDescriptionChange(index, event)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <div className="font-bold UserEdit-header">Artist Statement</div>
          <div className="flex-col items-center py-2 p-[50px] mb-[10%] UserEdit-textbox max-w-[100%] ">
          <textarea className="UserEdit-inputbox" value={submission.artist_statement}  onChange={handleArtistStatementChange}> </textarea>
          </div>
        </div>
        <div>
          <div className="font-bold UserEdit-header">Note to editor</div>
          <div className="flex-col items-center py-2 p-[50px] mb-[10%] UserEdit-textbox max-w-[100%] ">
          <textarea className="UserEdit-inputbox" value={submission.editor_note}  onChange={handleNoteEditorChange}> </textarea>
          </div>
        </div>
        
        <div className="bottom-0 right-0 w-full flex flex-row justify-end my-[10%]">
          <form onSubmit={handleSave} className="bg-pink p-3 flex">
            <button type="button" onClick={handleEdit} className="mr-2 UserEdit-bottombutton">
              Save & Continue Later
            </button>
            <button type="submit" className="UserEdit-bottombuttonred">
              Submit
            </button>
          </form>
        </div>
      </div>  
    </div>
  ) : (
    <div className="flex flex-row h-screen UserEdit-container m-[0px] justify-around overflow-y-scroll" style={{backgroundImage: 'linear-gradient(to bottom right, #FFD3CB, #E7A5FF, #B3C9FF)'}}>
      <div className="mt-[5%] w-[70%] ">
          <button className="text-white px-4 py-2 mb-4 inline-block absolute top-0 left-0" style={{ color: '#395EB9', fontSize: '24px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
        <div className="title-date flex items-center justify-between mb-4 ">
          <div className="flex">
            <div className="edit-submission-title text-3xl mb-4" style={{fontSize: '32.73px', fontWeight: 700, lineHeight: '44.57px', textAlign: 'left', color: '#395EB9'}}>
              View Submission
            </div>
            <button className="ml-[50px] UserEdit-bottombutton"
            style={{ backgroundColor: '#FFFFFF80' }} 
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = submission.mainSubmission.contentDriveUrl;
                    }}>
                    <FontAwesomeIcon icon={faLink} /> &nbsp; Google Drive
              </button>
          </div>
            
          <div className="flex items-center">
            <form>
              <div className="issue-type text font-bold">
                <label>Issue: </label>
                {submission.issue}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label>Type: </label>
                {submission.mainSubmission.type}
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-row  w-[100%] justify-between">
          <img 
            src={submission.mainSubmission.imageUrl}
            alt="Submission"
            className="max-w-[40%] mr-4 rounded-lg"
          />
          
          <div className="flex-col items-center py-2 UserEdit-textbox max-w-[55%] w-[100%]">
            <div className="title p-[5%] text-left"> 
              <b style={{ color: "#395EB9" }}>Title*</b>
              <br></br>
              <span>{submission.title}</span>
            </div>
            <div className="image-description text-black p-[5%] text-left">
              <b style={{ color: "#395EB9" }}>Description</b>
              <br></br>
              <span>{submission.mainSubmission.description}</span>
            </div>
          </div>
        </div>

        <div>
          
            {submission.additionalReferences?.map((image, index) => (
            <div className="flex flex-row w-[100%] justify-between mt-[10%]" key={index}>
              <div className="additional-images"> 
                <div className="image-container flex items-start">
                  <img
                    src={image.imageUrl}
                    alt={`Additional Image ${index}`}
                    className="image max-w-[100%] rounded-lg"
                  />
                </div>
              </div>

              <div className="flex-col items-center py-2 UserEdit-textbox max-w-[55%] w-[100%]">
                <div className="title p-[5%] text-left"> 
                  <b style={{ color: "#395EB9" }}>My process</b>
                  <br></br>
                  <span>{image.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-[10%] ">
          <div className="font-bold UserEdit-header">Artist Statement</div>
          <div className="flex-col items-center py-2 p-[50px] mb-[10%] UserEdit-textbox max-w-[100%] ">
            {submission.artist_statement}
          </div>
        </div>

        <div className="mt-[10%]">
          <div className="font-bold UserEdit-header">Note to editor</div>
          <div className="flex-col items-center py-2 p-[50px] mb-[10%] UserEdit-textbox max-w-[100%] ">
            {submission.editor_note}
          </div>
        </div>
        
        <div className=" bottom-0 left-0 w-full flex justify-between my-[10%]">
          <button type="button" className="UserEdit-bottombutton">
            Delete Submission
          </button>
          <form onSubmit={handleSave} className="bg-pink p-3 flex items-center ">
            <div className="submission-date text-white pr-10">
              Submitted: {submission.date}
            </div>
            <button type="button" onClick={handleEdit} className="mr-2 rounded shadow UserEdit-bottombutton">
              Edit
            </button>
            <button type="submit" className="UserEdit-bottombuttonred">
              Done
            </button>
          </form>
        </div>
      </div>
    </div>
  );


  return (body);
  
  
  
};  

export default UserEditableSubmission;


