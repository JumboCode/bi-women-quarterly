// Form to collect pen name, email, short biography, social media
// On submission, prints user info to console

import {useState} from 'react';
import User from "../types/User";
import SocialMedias from "../types/SocialMedias"
import UploadFile from '@/pages/components/UploadFile';


/**
 * Displays a user form that can handle 4 fields: name, email address, bio, and
 * any social media accounts.
 * @author Allison Zhang and Avery Hanna
 * @returns user form onto the display
 */
export default function UserForm() {
    var new_social_medias: SocialMedias = {
        Facebook: "",
        Instagram: "",
        X: "",
    }
    var new_user: User = {
        email: "",
        firstname: "",
        lastname: "",
        authorname: "",
        bio: "",
        age: "",
        demographic: "", 
        socials: new_social_medias,
        headshot: ""
    }
    const [user, setUser] = useState(new_user);   
    
    const onChangeUser = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name] : e.target.value});
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(user);
    }              
        
    //TODO: make checkbox element functional
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <UploadFile></UploadFile>
            <h3 className="text-xl font-bold">Personal Information</h3>
            <div className="flex w-full flex-wrap mb-6">
            <div className="w-full -mx-3  px-3">
            <label className="block">
                <span className="text-gray-700  text-sm ">*Email</span>
                <input type="text" className="form-input font-normal mt-1 bg-gray-50 block w-full" placeholder="abcde@gmail.com"
                      value={user.email}
                      name="email"
                      onChange={onChangeUser}/>
            </label>
            </div>
            </div>
            <div className="flex flex-wrap mb-6 w-full">
                <div className="w-full md:w-1/2 -mx-3 px-3 mb-6 md:mb-0">
                <label className=" text-sm text-gray-700  ">First Name
                    <input type="text" className="form-input font-normal mt-1 bg-gray-50 block w-full" placeholder="James"
                        value={user.firstname}
                        name="firstname"      
                        onChange={onChangeUser}/>
                </label>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className=" text-sm text-gray-700  ">Last Name 
                    <input type="text" className="form-input font-normal mt-1 bg-gray-50 block w-full" placeholder="Smith"
                        value={user.lastname}
                        name="lastname"      
                        onChange={onChangeUser}/>
                </label>
                </div>
                <p className="italic text-xs text-gray-500 dark:text-white">Disclaimer: For identity protection purposes, first and last name is required.</p>
            </div>
            
            <div className="flex flex-wrap mb-6 w-full">
                <div className="w-full -mx-3  px-3">
                <label className="block">
                    <span className="text-gray-700  text-sm ">*Author Name</span>
                    <input type="text" 
                        className="form-input 
                                mt-1 
                                w-full 
                                p-2.5 
                                text-m 
                                text--900 
                                rounded-lg 
                                bg-gray-50
                                font-normal
                                border-black-400" 
                        placeholder="James Smith"
                        value={user.authorname}
                        name="authorname"      
                        onChange={onChangeUser}/>
                </label>
                <input type="checkbox"></input> 
                <span className="italic 
                            text-xs 
                            text-gray-500 
                            dark:text-white"> Same as First and Last Name</span>
                </div>
            </div>

            <div className="flex flex-wrap mb-6 w-95">
                <div className="w-full -mx-3  px-3">
                    <label htmlFor="bio" class="block text-gray-700 text-sm ">*Bio
                        <textarea id="bio" 
                                value={user.bio} 
                                onChange={onChangeUser} 
                                rows="4" 
                                cols="50" 
                                class="block p-2.5 
                                        mt-1 
                                        w-full 
                                        text-m 
                                        text--900 
                                        bg-gray-50
                                        rounded-lg 
                                        border
                                        font-normal
                                        border-gray-300" placeholder="Write your bio description here..."></textarea>
                        <p className="italic text-xs font-normal text-gray-500 dark:text-white">Word Count xxx/xxx</p>
                    </label>
                </div>
            </div>

            <div className="grid grid-flow-row-dense grid-cols-5">
                <div className="col-span-1"><label htmlFor="age" class="text-left text-gray-700 text-sm mt-5">Age</label></div> 
                <div className="col-span-4"> 
                    <input id="x" type="text" className="form-input font-normal mt-1 bg-gray-50 block w-full"
                        value={user.age}
                        name="age"
                        onChange={onChangeUser}/>
                </div>
                <div className="col-span-1"><label htmlFor="demographic" class="text-left text-gray-700 text-sm mt-5">Demographic</label></div> 
                <div className="col-span-4">
                    <input type="text" className="form-input font-normal mt-1 bg-gray-50 block w-full"
                        value={user.demographic}
                        name="demographic"
                        onChange={onChangeUser}/>
                </div> 
            </div>
            <br></br>
            <h3 className="text-sm font-bold text-align text-gray-700">Socials</h3>
            <div className="grid grid-flow-row-dense grid-cols-5">
                <div className="col-span-1"><label htmlFor="x" class="text-align font-light text-gray-700 text-sm mt-5">X{"       "}</label></div> 
                <div className="col-span-4"> 
                    <input id="x" type="text" className="form-input font-normal mt-1 bg-gray-50 block w-full"
                        value={user.socials.X}
                        name="X"
                        onChange={onChangeUser}/>
                </div>
                <div className="col-span-1"><label htmlFor="Instagram" class="text-align font-light  text-gray-700 text-sm mt-5">Instagram</label></div> 
                <div className="col-span-4">
                    <input type="text" className="form-input font-normal mt-1 bg-gray-50 block w-full"
                        value={user.socials.Instagram}
                        name="Instagram"
                        onChange={onChangeUser}/>
                </div> 
                <div className="col-span-1"><label htmlFor="Faceboook" class="text-align font-light text-sm text-gray-700 mt-5">Facebook</label></div> 
                <div className="col-span-4"> 
                    <input type="text" className="form-input font-normal mt-1 bg-gray-50 block w-full"
                        value={user.socials.Facebook}
                        name="facebook"
                        onChange={onChangeUser}/>
                </div> 
            </div>     
            <button type = "submit">Submit</button>
        </form>
      )
}