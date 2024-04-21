import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    ignoredRoutes: [
        "/api/submissions/get",
        "/api/submissions/add",
        "/api/submissions/get-by-user",
        "/api/webhook",
        "/",
        "/submit"
    ]
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)/(.*)"]
};
