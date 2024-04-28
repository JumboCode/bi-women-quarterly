import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    publicRoutes: ["/api/webhook", "/submit"],
    ignoredRoutes: [
        "/api/submissions/get",
        "/api/submissions/add",
        "/api/submissions/get-by-user",
        "/api/submissions/edit",
        "/api/submissions/delete"
    ]
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)/(.*)"]
};
