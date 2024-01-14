// Import NextApiRequest and NextApiResponse
import { NextApiRequest, NextApiResponse } from "next";

// Import clientPromise
import clientPromise from "@/lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        // access database BiWomenQuarterly
        const db = client.db("BiWomenQuarterly");
        // access collection Issues
        const collect = db.collection("Issues");

        // Insert the defined document into the "Issues" collection
        const { status, title } = JSON.parse(req.body);
        await collect.insertOne({ status, title });

        // accesses collection to verify that everything was inserted correctly
        const collection = await db.collection("Issues").find({}).toArray();

        res.status(201).json({ success: true, data: collection });
    } catch (e) {
        res.status(400).json({ success: false });
    }
};


