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
        // access collection Issues
        const collect = db.collection("Issues");

        // get the document ID and updates from the request body
        const { id, status} = JSON.parse(req.body);

        // console.log(id);
        // console.log(status);
        // console.log(title);

        // Update the specific fields using $set
        await collect.updateOne({ _id: id }, { $set:{status: status} });

        console.log("2");

        // debugging info
        const collection = await db.collection("Issues").find({}).toArray();
        console.log("3");

        res.status(200).json({ success: true, data: collection });
    } catch (e) {
        res.status(400).json({ success: false });
    }
};
