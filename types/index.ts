import {
    cartItemSchema,
    insertCartSchema,
    insertOrderItemSchema,
    insertProductSchema,
    insertReviewSchema,
    insetOrderSchema,
    paymentResultSchema,
    shippingAddressSchema,
} from "@/lib/validation";
import { z } from "zod";

export type Product = z.infer<typeof insertProductSchema> & {
    id: string;
    rating: string;
    createdAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type Order = z.infer<typeof insetOrderSchema> & {
    id: string;
    createdAt: Date;
    isPaid: boolean;
    paidAt: Date | null;
    isDelivered: boolean;
    deliveredAt: Date | null;
    orderitems: OrderItem[];
    user: { name: string; email: string };
};

export type PaymentResult = z.infer<typeof paymentResultSchema>;
export type Review = z.infer<typeof insertReviewSchema> & {
    id: string;
    createdAt: Date;
    user?: { name: string };
};
