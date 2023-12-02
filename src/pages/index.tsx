import LocalFile from "./components/LocalFile"
import NewSubmission from "../components/NewSubmission"
import React, {useState} from "react";

export default function Home() {
    return (
        <div className="p-8 h-screen bg-[#ecf0f6]">
            <h1 className="text-2xl font-bold pb-8">New Submission</h1>
            <NewSubmission />
            <div className="p-6 h-[250px] bg-[#c3cee3] rounded-xl shadow-lg items-center space-x-4 outline-dashed outline-[#768fcd] outline-offset-[-3px]">
            <div className="break-normal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3b60ba" className="mx-auto flex h-20 w-20 items-center justify-center">
                    <path fill-rule="evenodd" d="M10.5 3.75a6 6 0 00-5.98 6.496A5.25 5.25 0 006.75 20.25H18a4.5 4.5 0 002.206-8.423 3.75 3.75 0 00-4.133-4.303A6.001 6.001 0 0010.5 3.75zm2.03 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v4.94a.75.75 0 001.5 0v-4.94l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clip-rule="evenodd" />
                </svg>
            </div>

                <h1 className="flex grow text-center justify-center text-l font-bold pb-1 pt-1">Drag & Drop Files Here</h1>
                <h1 className="flex grow text-center justify-center text-m pb-1 pt-1">or</h1>
                
                <div className="flex grow p-[10px] w-screen justify-center text-[#3b60ba]">
                    {/* <button type="submit" className="h-[30px] w-[115px] absolute left-[200px] rounded-sm items-center outline outline-[#5072c0] outline-offset-[3px]">
                        Local File
                    </button> */}
                    <LocalFile />
                    <button type="submit" className="h-[30px] w-[115px] absolute right-[200px] rounded-sm items-center outline outline-[#5072c0] outline-offset-[3px]">
                        Google Drive
                    </button>
                </div>
            </div>
            <button type="submit" className="absolute left-[10px] mt-[100px] rounded-lg bg-white  m-6 h-[40px] w-[90px]  items-center shadow-lg">
                Cancel
            </button>
            <button type="submit" className="absolute right-[10px] mt-[100px] rounded-lg m-6 h-[40px] w-[90px] items-center text-white bg-[#ec4899] shadow-lg">
                Review
            </button>
        </div>
    )
}