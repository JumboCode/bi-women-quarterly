// Form to collect pen name, email, short biography, social media
// On submission, prints user info to console

import {useState} from 'react';
import User from "../types/User";
import SocialMedias from "../types/SocialMedias"


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
            
    return (
        <form onSubmit={handleSubmit}>
            <label className="block">
                <span className="text-gray-700">Email</span>
                <input type="text" className="form-input mt-1 block w-full" placeholder="@gmail.com"
                      value={user.email}
                      name="email"
                      onChange={onChangeUser}/>
            </label>
            <br></br>
            <label>First Name
                <input type="text" 
                      value={user.firstname}
                      name="firstname"      
                      onChange={onChangeUser}/>
            </label>
            <br></br>
            <label>Last Name
                <input type="text" 
                      value={user.lastname}
                      name="lastname"      
                      onChange={onChangeUser}/>
            </label>
            <br></br>
            <label>*Author Name
                <input type="text" 
                      value={user.authorname}
                      name="authorname"      
                      onChange={onChangeUser}/>
            </label>
            <br></br>
            <label>*Bio
                <input type="text" 
                      value={user.bio}
                      name="bio"
                      onChange={onChangeUser}/>
            </label>
            <br></br>
            <label>Age
                <input type="text" 
                      value={user.age}
                      name="age"
                      onChange={onChangeUser}/>
            </label>
            <br></br>
            <label>Demographic?
                <input type="text" 
                      value={user.demographic}
                      name="demographic"
                      onChange={onChangeUser}/>
            </label>
            <br></br>
            <label>X
                <input type="text" 
                      value={user.socials.X}
                      name="X"
                      onChange={onChangeUser}/>
            </label>
            <br></br>
            <label>Instagram:
                <input type="text" 
                      value={user.socials.Instagram}
                      name="Instagram"
                      onChange={onChangeUser}/>
            </label>
            <br></br>
            <label>Facebook
                <input type="text" 
                      value={user.socials.Facebook}
                      name="facebook"
                      onChange={onChangeUser}/>
            </label>
            <br></br>
            <button type = "submit">Submit</button>
        </form>
      )
}