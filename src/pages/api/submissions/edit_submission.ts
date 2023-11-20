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
        const client = await clientPromise;
        // acesses database BiWomenQuarterly
        const db = client.db("BiWomenQuarterly");
        // acesses collection Submissions
        const collect = db.collection("Submissions");

        // Insert the defined document into the "Submissions" collectio

        const body = JSON.parse(req.body);
        // const { id, replacement } = body;
        // await collect.replaceOne({ id: Object(id) }, replacement);


        //I think we need to do this
        const documentID = body["id"];
        await collect.replaceOne({ id: documentID }, body);


        // console.log("New document:")

        // `body` = the document that we're uploading
        await collect.insertOne(body); // TODO it seems like this is the first thing we need to change?
        // https://www.mongodb.com/docs/manual/reference/method/db.collection.replaceOne/

        // accesses most recent 30 submissions of collection to verify
        // that everything was inserted correct
        const collection = await db
            .collection("Submissions")
            .find({})
            .limit(30)
            .toArray();

        res.status(201).json({ success: true, data: collection });

    } catch (e) {
        res.status(400).json({ success: false });
    }
};