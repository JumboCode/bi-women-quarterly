import User from "@/types/User"; 
import SocialMedias from "@/types/SocialMedias"; 

export default function Home() {
    // Get the data 
    const fetchData = async () => {
        await fetch('http://localhost:3000/api/mongo', {
            method: 'POST'
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