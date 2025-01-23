import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";
import { PAYMENT_METHODS } from "./constants";

const currency = z
    .string()
    .refine(
        (value) =>
            /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
        "Price must have exact 2 decimal point"
    );
export const insertProductSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
    category: z.string().min(3, "Category must be at least 3 characters"),
    brand: z.string().min(3, "Brand must be at least 3 characters"),
    description: z.string().min(3, "Description must be at least 3 characters"),
    stock: z.coerce.number(),
    images: z.array(z.string()).min(1, "Product must have at least 1 image"),
    isFeatured: z.boolean(),
    banner: z.string().nullable(),
    price: currency,
});

export const signInFormSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(5, "Password must be at least 5 characters"),
});

export const signUpFormSchema = z
    .object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        email: z.string().email("Invalid email"),
        password: z.string().min(5, "Password must be at least 5 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords does not match",
        path: ["confirmPassword"],
    });

export const cartItemSchema = z.object({
    productId: z.string().min(1, "Product is required"),
    name: z.string().min(1, "Product name is required"),
    slug: z.string().min(1, "Slug is required"),
    qty: z.number().int().nonnegative("Quantity must be positive"),
    image: z.string().min(1, "Image is required"),
    price: currency,
});

export const insertCartSchema = z.object({
    items: z.array(cartItemSchema),
    itemsPrice: currency,
    totalPrice: currency,
    shippingPrice: currency,
    taxPrice: currency,
    sessionCartId: z.string().min(1, "Session cart id is required"),
    userId: z.string().nullable().optional(),
});

export const shippingAddressSchema = z.object({
    fullName: z.string().min(3, "Name must be at least 3 characters"),
    address: z.string().min(3, "Address must be at least 3 characters"),
    city: z.string().min(3, "City must be at least 3 characters"),
    postalCode: z.string().min(3, "Postal Code must be at least 3 characters"),
    country: z.string().min(3, "Country must be at least 3 characters"),
    lat: z.number().optional(),
    lan: z.number().optional(),
});

export const paymentMethodSchema = z
    .object({
        type: z.string().min(1, "Payment method is required"),
    })
    .refine((data) => PAYMENT_METHODS.includes(data.type), {
        path: ["type"],
        message: "Invalid payment method",
    });

export const insetOrderSchema = z.object({
    userId: z.string().min(1, "User is required"),
    itemsPrice: currency,
    shippingPrice: currency,
    taxPrice: currency,
    totalPrice: currency,
    paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
        message: "Invalid payment method",
    }),
    shippingAddress: shippingAddressSchema,
});

export const insertOrderItemSchema = z.object({
    productId: z.string(),
    slug: z.string(),
    name: z.string(),
    image: z.string(),
    price: currency,
    qty: z.number(),
});

export const paymentResultSchema = z.object({
    id: z.string(),
    status: z.string(),
    email_address: z.string(),
    pricePaid: z.string(),
});

// Schema for updating the user profile
export const updateProfileSchema = z.object({
    name: z.string().min(3, "Name must be at leaast 3 characters"),
    email: z.string().min(3, "Email must be at leaast 3 characters"),
});
