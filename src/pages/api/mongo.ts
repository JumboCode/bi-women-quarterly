/**
 * Submission upload endpoint for mongoDB Submissions collenction
 * @author Alana Sendlakowski, Vanessa Rose
 */

// Import NextApiRequest and NextApiResponse
import { NextApiRequest, NextApiResponse } from "next";

// Import clientPromise
import clientPromise from "@/lib/mongodb";

// Import Submission type
import Submission from "../../types/Submission"

/*------------------------------------------------------------------------*/
/* ------------------------------ Component ----------------------------- */
/*------------------------------------------------------------------------*/

export default async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        /*------------------------------------------------------------------------*/
        /* ------------------------------ Constants ----------------------------- */
        /*------------------------------------------------------------------------*/
        const client = await clientPromise;
        // acesses database BiWomenQuarterly
        const db = client.db("BiWomenQuarterly");
        // acesses collection Submissions
        const collect = db.collection("Submissions");
        
        // Create a document to insert
        const doc = <Submission>{
            title: "",
            issue: "",
            date: "",
            image: "",
            wordDoc: "",
        }
        
        // Insert the defined document into the "Submissions" collection
        const result = await collect.insertOne(doc);

        // accesses collection to verify that everything was inserted correct
        const collection = await db
            .collection("Submissions")
            .find({})
            .limit(10)
            .toArray();

            res.status(201).json({ success: true, data: collection });
        
    } catch (e) {
        res.status(400).json({ success: false });
    }
};