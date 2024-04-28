import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [],
    ignoredRoutes: [
        "/api/submissions/get",
        "/api/issues/get",
        "/undefined/upload",
        "/undefined/update",
        "/api/submissions/add",
        "/api/submissions/get-by-user",
        "/api/webhook",
        "/submit",
        "/"
    ]
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)/(.*)"]
};
