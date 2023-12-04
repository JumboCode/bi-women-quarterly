
import React, {useState} from "react";

import LocalFile from "../pages/components/LocalFile"


export default function SubmissionModal() {
    console.log("here");
    const [showModal, setShowModal] = React.useState(true);
    console.log(showModal);
    return (
      <>
        {showModal ? ( 
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <div>
                      <div>Submission Type *</div>
                      <div>Submission Piece</div>
                      <div>Optional Related Photo</div>
                    </div>
                    <button onClick={() => setShowModal(false)}> x </button>
                  </div>
                  <div>Title of Piece *</div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                      I always felt like I could do anything. That’s the main
                      thing people are controlled by! Thoughts- their perception
                      of themselves! They're slowed down by their perception of
                      themselves. If you're taught you can’t do anything, you
                      won’t do anything. I was taught I could do everything.
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        
        <div><LocalFile/></div>
      </>
    );
}

// export default function SubmissionModal() {
//     console.log("here!");
//   const [showModal, setShowModal] = React.useState(false);
//   return (
    // <h1>hi</h1>



    
//     <div id="crud-modal" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
//     <div className="relative p-4 w-full max-w-md max-h-full">
//         <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//             {/* <!-- Modal header --> */}
//             <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                     Create New Product
//                 </h3>
//                 <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
//                     <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
//                     </svg>
//                     <span className="sr-only">Close modal</span>
//                 </button>
//             </div>
//             {/* <!-- Modal body --> */}
//             <form className="p-4 md:p-5">
//                 <div className="grid gap-4 mb-4 grid-cols-2">
//                     <div className="col-span-2">
//                         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
//                         <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name"/>
//                     </div>
//                     <div className="col-span-2 sm:col-span-1">
//                         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
//                         <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999"/>
//                     </div>
//                     <div className="col-span-2 sm:col-span-1">
//                         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
//                         <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
//                             <option selected>Select category</option>
//                             <option value="TV">TV/Monitors</option>
//                             <option value="PC">PC</option>
//                             <option value="GA">Gaming/Console</option>
//                             <option value="PH">Phones</option>
//                         </select>
//                     </div>
//                     <div className="col-span-2">
//                         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
//                         <textarea id="description" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
//                     </div>
//                 </div>
//                 <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                     <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
//                     Add new product
//                 </button>
//             </form>
//         </div>
//     </div>
// </div> 

//   );
// }
