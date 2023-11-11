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

            res.status(201).json({ success: true, data: collection });
    } catch (e) {
        res.status(400).json({ success: false });
    }
};