/**
 * Submission delete endpoint for mongoDB Submissions collection
 * @author Austen Money
 */

// Import NextApiRequest and NextApiResponse
import { NextApiRequest, NextApiResponse } from "next";

// Import clientPromise
import clientPromise from "@/lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;

        const db = client.db("BiWomenQuarterly");
        const collect = db.collection("Submissions");

        // Delete the document with the given user ID and title
        await collect.deleteOne({ "submission.id": req.query.id, "submission.title": req.query.title })

        res.status(201).json({ success: true });
    } catch (e) {
        res.status(400).json({ success: false });
    }
};
