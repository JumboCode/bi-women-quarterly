// Form to collect pen name, email, short biography, social media
// On submission, prints user info to console

import { useState } from "react";
import User from "../types/User";
import SocialMedias from "../types/SocialMedias";

/**
 * Displays a user form that can handle 4 fields: name, email address, bio, and
 * any social media accounts.
 * @author Allison Zhang and Avery Hanna
 * @returns user form onto the display
 */
export default function UserForm() {
    var new_social_medias: SocialMedias = {
        LinkedIn: "",
        Facebook: "",
        Instagram: "",
        X: "",
        TikTok: ""
    };
    var new_user: User = {
        username: "",
        penname: "",
        email: "",
        bio: "",
        socials: new_social_medias,
        headshot: ""
    };
    const [user, setUser] = useState(new_user);

    const onChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(user);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Enter your pen name:
                <input
                    type="text"
                    value={user.penname}
                    name="penname"
                    onChange={onChangeUser}
                />
            </label>
            <br></br>
            <label>
                Enter your email address:
                <input
                    type="text"
                    value={user.email}
                    name="email"
                    onChange={onChangeUser}
                />
            </label>
            <br></br>
            <label>
                Enter a short biography:
                <input
                    type="text"
                    value={user.bio}
                    name="bio"
                    onChange={onChangeUser}
                />
            </label>
            <br></br>
            <label>
                Enter your instagram account:
                <input
                    type="text"
                    value={user.socials.Instagram}
                    name="socials"
                    onChange={onChangeUser}
                />
            </label>
            <br></br>
            <button type="submit">Submit</button>
        </form>
    );
}
