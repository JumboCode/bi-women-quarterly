import User from "@/types/User"; 
import SocialMedias from "@/types/SocialMedias"; 

const socials1: SocialMedias = {
    LinkedIn: "ind_linkedin",
    Facebook: "ind_facebook",
    Instagram: "ind_instagram", 
    X: "ind_X",
    TikTok: "ind_tiktok",
};

const user1: User = {
    username: "index",
    penname: "ind",
    email: "ind@gmail.com",
    bio: "index file",
    socials: socials1,
    headshot: "headshot",
};

export default function Home() {
    // Get the data 
    const fetchData = async () => {
        await fetch('http://localhost:3000/api/mongo', {
            method: 'POST',
            body: JSON.stringify(user1)
        })  // convert to json format 
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    console.log("Successfully connected to database!");
                    console.log(res.data);
                    console.log("hello"); 
                } else {
                    console.log("Could not connect to database!");
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error); 
            });
    };
    fetchData();

    return <div>Hello</div>;
}