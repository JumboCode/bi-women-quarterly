import { NextApiRequest, NextApiResponse } from "next";
import { useUser } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";

import Submission from "@/types/Submission";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { newSubmission, userId } = JSON.parse(req.body);
    const { user } = useUser();

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
