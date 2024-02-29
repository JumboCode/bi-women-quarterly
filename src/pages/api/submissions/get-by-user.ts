/**
 * Retrieves user submissions from author query
 * @author Geneva
 * @author Walid
 * @param req the API request
 * @param res the API response
 * @returns Filtered array of submissions
 */
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("BiWomenQuarterly");

        const collection = await db
            .collection("Submissions")
            .find({ "submission.id": req.query.id })
            .toArray();

        res.status(201).json({ success: true, data: collection });
    } catch (e) {
        res.status(400).json({ success: false });
    }
};
