//Example with movie data
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { Db } from "../../../node_modules/mongodb/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        // replace database name with whatever you are testing
        const db = client.db("sample_mflix");
        
        const collection = await db
            // replace collection name with whatever you are testing
            .collection("movies")
            .find({})
            .limit(2)
            .toArray();

            res.status(201).json({ success: true, data: collection });
    } catch (e) {
        console.log(e);
        res.status(400).json({ success: false });
    }
};