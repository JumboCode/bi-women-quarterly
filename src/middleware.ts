import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/api/webhook", "/submit", ""],
    ignoredRoutes: [
        "/api/submissions/get",
        "/api/submissions/add",
        "/api/submissions/get-by-user"
    ]
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)/(.*)"]
};
