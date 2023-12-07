import { NextApiRequest, NextApiResponse } from "next";
import { clerkClient, useUser } from "@clerk/nextjs";

import Submission from "@/types/Submission";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("HEREE");
    const { newSubmission, userId } = JSON.parse(req.body);
    const { user } = useUser();

    console.log(`newSubmission: ${newSubmission}`);
    console.log(`id: ${userId}`);

    if (!user) {
        console.log("User is undefined.");
        res.status(400).json({ success: false });
        return;
    }

    let newSubmissions: Submission[] = [];
    if (user.unsafeMetadata.submissions) {
        newSubmissions = user.unsafeMetadata.submissions as Submission[];
        newSubmissions.push(newSubmission);
    }

    await clerkClient.users.updateUserMetadata(userId, {
        unsafeMetadata: {
            submissions: newSubmissions
        }
    });
    res.status(201).json({ success: true });
};
