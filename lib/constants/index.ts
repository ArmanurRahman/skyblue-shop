export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Skyblue Shop";
export const APP_DESCRIPTION =
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    "A modern e commerce store build with nextjs";
export const SERVER_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCT_LIMIT = 4;

export const PAYMENT_METHODS = ["Paypal", "Stripe", "Cash on delivery"];
export const DEFAULT_PAYMENT_METHOD = "Paypal";

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;

export const productDefaultValues = {
    name: "",
    slug: "",
    category: "",
    images: [],
    brand: "",
    description: "",
    price: "0",
    stock: 0,
    rating: "0",
    numReviews: "0",
    isFeatured: false,
    banner: null,
};
export const USER_ROLES = process.env.USER_ROLES
    ? process.env.USER_ROLES.split(", ")
    : ["admin", "user"];

export const reviewFormDefaultValues = {
    title: "",
    comment: "",
    rating: 0,
};

export const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";
