//Connecting users to BiWomenQuarterly
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import User from "@/types/User";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    // Takes in incoming response and save to database 
    try {
        const user_to_add: User = JSON.parse(req.body);  

        const client = await clientPromise;
        const db = client.db("BiWomenQuarterly");
        const user_collection = db.collection("Users"); 
        const result = await user_collection.insertOne(user_to_add); 

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

