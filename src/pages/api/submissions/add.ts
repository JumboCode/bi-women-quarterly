/**
 * Submission upload endpoint for mongoDB Submissions collection
 * @author Alana Sendlakowski
 * @author Vanessa Rose
 */

// Import NextApiRequest and NextApiResponse
import { NextApiRequest, NextApiResponse } from "next";

// Import clientPromise
import clientPromise from "@/lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        const client = await clientPromise;
        // acesses database BiWomenQuarterly
        const db = client.db("BiWomenQuarterly");
        // acesses collection Submissions
        const collect = db.collection("Submissions");

        // Insert the defined document into the "Submissions" collection
        const body = JSON.parse(req.body)
        await collect.insertOne(body);

        // accesses collection to verify that everything was inserted correct
        const collection = await db
            .collection("Submissions")
            .find({})
            .toArray();

        res.status(201).json({ success: true, data: collection });

    } catch (e) {
        res.status(400).json({ success: false });
    }
};