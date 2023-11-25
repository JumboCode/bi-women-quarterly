/**
 * Submission edit endpoint for mongoDB Submissions collection.
 * @author Lucien Bao
 * @author Walid Nejmi
 * @author Alana Sendlakowski
 * @author Vanessa Rose
 */

// Import NextApiRequest and NextApiResponse
import { NextApiRequest, NextApiResponse } from "next";

// Import clientPromise
import clientPromise from "@/lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // get the mongodb information
        const client = await clientPromise;
        // access database BiWomenQuarterly
        const db = client.db("BiWomenQuarterly");
        // access collection Submissions
        const collect = db.collection("Submissions");

        // get the document to substitute in
        const body = JSON.parse(req.body);

        const documentID = body["id"];
        // replaces the old document with the new one by ID
        await collect.replaceOne({ id: documentID }, body);

        // debugging info
        const collection = await db
            .collection("Submissions")
            .find({})
            // .limit(30)
            .toArray();

        res.status(201).json({ success: true, data: collection });

    } catch (e) {
        res.status(400).json({ success: false });
    }
};