//Connecting users to BiWomenQuarterly
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import User from "@/types/User";
import SocialMedias from "@/types/SocialMedias";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    // Takes in incoming response and save to data 
    try {
        // Receive the data from fetch() 
        const user_example = JSON.parse(req.body);  
        const user: User = user_example; 

        const client = await clientPromise;
        // replace database name with whatever you are testing
        const db = client.db("BiWomenQuarterly");
        const user_collection = db.collection("Users"); 
        
        // Delete the user test 
        //user_collection.deleteMany({})

        const result = await user_collection.insertOne(user); 

        console.log("Printing collection:"); 
        console.log(result);
        res.status(201).json({ success: true, data: result.insertedId });

        const sub_collection = await db
         .collection("Users")
         .find({})
         .limit(10)
         .toArray(); 
        console.log(sub_collection); 

    } catch (e) {
        console.log(e);
        res.status(400).json({ success: false });
    }
};

