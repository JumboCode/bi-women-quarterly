// Import NextApiRequest and NextApiResponse
import { NextApiRequest, NextApiResponse } from "next";

// Import clientPromise
import { clerkClient } from "@clerk/nextjs/server";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const data = await clerkClient.users.getUser(req.query.id as string);
        const userData = data.unsafeMetadata;
        res.status(201).json({ success: true, data: userData });
    } catch (e) {
        res.status(400).json({ success: false });
    }
};
