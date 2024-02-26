import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/api/webhook", "/submit", "/api/submissions/add", "/api/submissions/get-by-user", "/api/issues/get"],
    ignoredRoutes: ["/api/submissions/get"]
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)/(.*)"]
};
