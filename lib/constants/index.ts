export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Skyblue Shop";
export const APP_DESCRIPTION =
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    "A modern e commerce store build with nextjs";
export const SERVER_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCT_LIMIT = 4;

export const PAYMENT_METHODS = ["Paypal", "Stripe", "Cash on delivery"];
export const DEFAULT_PAYMENT_METHOD = "Paypal";
