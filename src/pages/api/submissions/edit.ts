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

        console.log("THE BODY: ")
        console.log(JSON.stringify(body, null, 2));

        console.log("THE ID: ")
        console.log(body.submission.id);

        // replaces the old document with the new one by ID
        const result = await collect.replaceOne({ "submission.id": body.submission.id }, body);
        console.log("THE RESULT: ")
        console.log(JSON.stringify(result, null, 2));

        res.status(201).json({ success: true });
    } catch (e) {
        res.status(400).json({ success: false });
    }
};
