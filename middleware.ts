export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/account/:path*",
        "/admin/:path*",
        "/checkout/:path*",
        "/dashboard/:path*",
        
    ]
}