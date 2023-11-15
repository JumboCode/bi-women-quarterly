import User from "@/types/User"; 
import SocialMedias from "@/types/SocialMedias"; 

export default function Home() {
    const fetchData = async () => {
        await fetch('http://localhost:3000/api/mongo', {
            method: 'POST', 
            body: JSON.stringify(user), 
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    console.log("Successfully connected to database!");
                    console.log(res.data);
                    console.log("hello"); 
                } else {
                    console.log("Could not connect to database!");
                }
            });
    };
    fetchData();

    return <div>Hello</div>;
}