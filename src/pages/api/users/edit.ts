/**
 * User edit endpoint for mongoDB Users collection.
 * Note: this is largely theoretical as there is no endpoint for adding
 * a user to the database.
 * @author Lucien Bao
 * @author Walid Nejmi
 */

// Import NextApiRequest and NextApiResponse
import { NextApiRequest, NextApiResponse } from "next";

// Import clientPromise
import clientPromise from "@/lib/mongodb";

/**
 * Updates the given User profile.
 * Assumes that the given and replaced `username` properties are the same.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // get the mongodb information
        const client = await clientPromise;
        // access database BiWomenQuarterly
        const db = client.db("BiWomenQuarterly");
        // access collection Users (this is a guess)
        const collect = db.collection("Users");

        // get the profile to substitute in
        const body = JSON.parse(req.body);

        const username = body["username"];
        // replaces the old document with the new one by ID
        await collect.replaceOne({ id: username }, body);

        // debugging info
        const collection = await db
            .collection("Users")
            .find({})
            // .limit(30)
            .toArray();

        res.status(201).json({ success: true, data: collection });

    } catch (e) {
        res.status(400).json({ success: false });
    }
};