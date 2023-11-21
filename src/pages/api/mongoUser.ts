//Connecting users to BiWomenQuarterly
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import User from "@/types/User";
import SocialMedias from "@/types/SocialMedias";


export default async (req: NextApiRequest, res: NextApiResponse) => {

    // Takes in incoming response and save to data 
    // Type POST: method that requests the web server to accept data from the incoming message -- check the POST method 
    try {
        //if (req.method === "POST") {
            console.log("in POST case")

            // Receive the data from fetch() 
            const user_example = JSON.parse(req.body); 
            const user: User = user_example; 

            const client = await clientPromise;
            // replace database name with whatever you are testing
            const db = client.db("BiWomenQuarterly");
            const user_collection = db.collection("Users"); 
            const result = await user_collection.insertOne(user); 
            
            //const collection = await db
                // replace collection name with whatever you are testing
            //    .collection("Users")
            //    .find({})
            //    .limit(10)
            //    .toArray();

            console.log("Printing collection:"); 
            console.log(result);
                res.status(201).json({ success: true, data: result.insertedId });
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