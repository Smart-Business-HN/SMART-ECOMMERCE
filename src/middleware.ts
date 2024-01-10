export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/adresses/:path*",
    "/cart/:path*",
    "/payment-methods/:path*",
    "/porfile/:path*",
    "/purchase-orders/:path*",
    "/security/:path*",
],
};