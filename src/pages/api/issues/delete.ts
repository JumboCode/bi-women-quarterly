/**
 * Submission upload endpoint for mongoDB Issues collection
 * @author Alana and Vanessa
 */

// Import NextApiRequest and NextApiResponse
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

// Import clientPromise
import clientPromise from "@/lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // console.log(req.body);
        const client = await clientPromise;
        // access database BiWomenQuarterly
        const db = client.db("BiWomenQuarterly");
        // access collection Issues
        const collect = db.collection("Issues");

        // delete the defined document from the "Issues" collection
        const { id } = JSON.parse(req.body);
        const document = await collect.deleteOne({ _id: new ObjectId(id) });

        // accesses collection to verify that everything was inserted correctly
        const collection = await db.collection("Issues").find({}).toArray();
        // console.log(collection);

        res.status(201).json({ success: true, data: collection });
    } catch (e) {
        res.status(400).json({ success: false });
    }
};