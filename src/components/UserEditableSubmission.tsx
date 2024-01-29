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
  const [submission, setSubmission] = useState<Submission>(initialSubmission);
  const [editOn, setEditOn] = useState<boolean>(false);

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
        <input
          value={submission.mainSubmission.type}
          onChange={(e) => handleChange('type', e.target.value)}
        />
        <textarea
          value={submission.mainSubmission.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
        <input
          value={submission.author}
          onChange={(e) => handleChange('author', e.target.value)}
        />
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
  );

  return <>{body}</>;
};

export default UserEditableSubmission;


// import React from 'react';
// import { useState } from 'react';

// // Import types
// import Submission from '@/types/Submission';


// type Props = {
//   submission: Submission,
// };



// const UserEditableSubmission: React.FC<Props> = (props) => {


//   /*------------------------------------------------------------------------*/
//   /* -------------------------------- States ------------------------------ */
//   /*------------------------------------------------------------------------*/


//   const [submission, setSubmission] = useState(props.submission);

//   const [editOn, setEditOn] = useState(false);



//   /* ------------- Actions ------------ */

//   const handleSave = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log(submission);
//     setEditOn(false);
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log(submission);
//   }      

//   const handleEdit = () => {
//     setEditOn(true);
//   }

//   const handleChange = (e: React.FormEvent, key: string, value: string | null) => {
//     e.preventDefault();
//     console.log('Changing', key, 'to', value);
//     const newSubmission: Submission = {
//       ...submission,
//       [key]: value
//     };
//     setSubmission(newSubmission);
//   }


//   /*----------------------------------------*/
// 	/* ---------------- Views --------------- */
// 	/*----------------------------------------*/

// 	// Body that will be filled with the current view
// 	let body: React.ReactNode;

// 	/* -------- Preview Mode -------- */

// 	if (editOn) {
// 		body = (
//       <div className="relative flex flex-col">
//       <button onClick={handleEdit}>
//         Edit
//       </button>
//       <button onClick={handleSave}>
//         Save
//       </button>
//       <div className="static w-[70%]">
//         <div className="ml-28 mt-28 font-bold text-3xl" 
//           onBlur={e => handleChange(e, 'title', e.currentTarget.textContent)}>
//           {submission.title}
//         </div>
//         <div className="relative top-[0] w-[70%] left-[5%]">
//           <div className=" h-[50vh] w-[40%] ">
//             <img src={submission.mainSubmission.imageUrl}></img>
//           </div>
//           <div className="absolute w-[400px] h-[50vh] left-[45%] bottom-0">
//             <div className="" 
//               onBlur={e => handleChange(e, 'type', e.currentTarget.textContent)}>
//               {submission.mainSubmission.type}
//             </div>
//             <div className="border-3" 
//               onBlur={e => handleChange(e, 'description', e.currentTarget.textContent)}>
//               {submission.mainSubmission.description}
//             </div>
//             <div className="pt-[100px]" 
//               onBlur={e => handleChange(e, 'author', e.currentTarget.textContent)} >
//               {submission.author}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
// 		);
// 	}

// 	/* -------- Edit mode -------- */

// 	else {
// 		// TODO: implement

// 		// Create body
// 		body = (
//       <form onSubmit={handleSubmit}>
//         <div className="relative flex flex-col">
//         <button onClick={handleEdit}>
//           Edit
//         </button>
//         <button onClick={handleSave}>
//           Save
//         </button>
//         <div className="static w-[70%]">
//           {/* <input className="ml-28 mt-28 font-bold text-3xl" >
//             {submission.title}
//           </input> */}
//           <div className="relative top-[0] w-[70%] left-[5%]">
//             <div className=" h-[50vh] w-[40%] ">
//               <img src={submission.mainSubmission.imageUrl}></img>
//             </div>
//             <div className="absolute w-[400px] h-[50vh] left-[45%] bottom-0">
//               {/* <input className="" >
//                 {submission.mainSubmission.type}
//               </input>
//               <input className="border-3">
//                 {submission.mainSubmission.description}
//               </input>
//               <input className="pt-[100px]" >
//                 {submission.author}
//               </input> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </form>
// 		);
// 	}


//   /*----------------------------------------*/
//   /* --------------- Main UI -------------- */
//   /*----------------------------------------*/
//   return (
//    body
//   );
// };

// export default UserEditableSubmission;
