// Import NextApiRequest and NextApiResponse
import { NextApiRequest, NextApiResponse } from "next";

// Import clientPromise
import { clerkClient } from "@clerk/nextjs/server";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const newUser = await clerkClient.users.createUser({
            unsafeMetadata: req.body,
          })

        console.log(`New User: ${newUser}`);
        console.log(`New User ID: ${newUser.id}`);

        res.status(201).json({ success: true, id: newUser.id });
    } catch (e) {
        res.status(400).json({ success: false });
    }
};
