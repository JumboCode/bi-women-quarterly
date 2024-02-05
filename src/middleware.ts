import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ["/"],
    ignoredRoutes: ["/api/submissions/get"]
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)/(.*)"]
};
