//Connecting users to BiWomenQuarterly
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import User from "@/types/User";
import SocialMedias from "@/types/SocialMedias";

const socials1: SocialMedias = {
    LinkedIn: "my_linkedin",
    Facebook: "my_facebook",
    Instagram: "my_instagram",
    X: "my_X",
    TikTok: "my_tiktok",
};

const user1: User = {
    username: "student_name",
    penname: "student_penname",
    email: "student_email@gmail.com",
    bio: "student",
    socials: socials1,
    headshot: "headshot",
};


export default async (req: NextApiRequest, res: NextApiResponse) => {
    // Takes in incoming response and save to data 
    // Type POST: method that requests the web server to accept data from the incoming message -- check the POST method 
    try {
        //if (req.method === "POST") {
            console.log("in POST case")
            //const to_post = req.body;
            const to_post = user1; 

            const client = await clientPromise;
            // replace database name with whatever you are testing
            const db = client.db("BiWomenQuarterly");
            const babyCollection = await db.collection("Users").insertOne(to_post); //not adding to collection
            
            const collection = await db
                // replace collection name with whatever you are testing
                .collection("Users")
                .find({})
                .limit(10)
                .toArray();

            //res.status(201).json({ name: "newName" }); // TODO: POST user data
            console.log("Printing collection:"); 
            console.log(babyCollection);
                res.status(201).json({ success: true, data: collection });
        //}
    } catch (e) {
        console.log(e);
        res.status(400).json({ success: false });
    }
};

// import { MongoClient } from "mongodb";
// export default async function handler(req, res) {
//     if (req.method === "POST") {
//         const data = req.body;
//         const client = await
//             MongoClient.connect(
//                 "mongodb+srv://<user><password>@cluster0.pqdli.mongodb.net/<dbname>retryWrites=true&w=majority");
//         const db = client.db();
//         const yourCollection = db.collection("yourCollection");
//         const result = await yourCollection.insertOne(data);
//         console.log(result);
//         client.close();
//         res.status(201).json({ message: "Data inserted successfully!" });
//     }
// }