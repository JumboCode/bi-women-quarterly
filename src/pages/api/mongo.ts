import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        // replace database name with whatever you are testing
        const db = client.db("sample_mflix");

        const collection = await db
            // replace collection name with whatever you are testing
            .collection("movies")
            .find({})
            .limit(10)
            .toArray();
        
        console.log(collection);
        res.json("Successfully connected to the database!");
    } catch (e) {
        console.error(e);
    }
};