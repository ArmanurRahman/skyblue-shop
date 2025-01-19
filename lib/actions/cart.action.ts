"use server";

import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { convertToPlainObject, formatError, round2 } from "../utils";
import { cartItemSchema, insertCartSchema } from "../validation";
import { revalidatePath } from "next/cache";

function calcPrice(items: CartItem[]) {
    const itemsPrice = round2(
        items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    );
    const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
    const taxPrice = round2(0.15 * itemsPrice);
    const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

    return {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice: taxPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
    };
}
export async function addItemToCart(data: CartItem) {
    try {
        const sessionCartId = (await cookies()).get("sessionCartId")?.value;
        if (!sessionCartId) {
            throw new Error("Cart session not found");
        }

        const session = await auth();
        const userId = session?.user?.id
            ? (session.user.id as string)
            : undefined;

        const cart = await getMyCart();
        const item = cartItemSchema.parse(data);

        const product = await prisma.product.findFirst({
            where: { id: item.productId },
        });

        if (!product) {
            throw new Error("Product not found");
        }

        if (!cart) {
            const newCart = insertCartSchema.parse({
                userId,
                sessionCartId,
                items: [item],
                ...calcPrice([item]),
            });
            await prisma.cart.create({ data: newCart });
            revalidatePath(`/product/${item.slug}`);
            return {
                success: true,
                message: "Item added to cart",
            };
        } else {
            const existProduct = (cart.items as CartItem[]).find(
                (product) => product.productId === item.productId
            );
            if (existProduct) {
                if (product.stock < existProduct.qty + 1) {
                    throw new Error("Not enough stock");
                }
                (cart.items as CartItem[]).find(
                    (x) => x.productId === item.productId
                )!.qty = existProduct.qty + item.qty;
            } else {
                if (product.stock < item.qty) {
                    throw new Error("Not enough stock");
                }
                cart.items.push(item);
            }
            await prisma.cart.update({
                where: { id: cart.id },
                data: {
                    items: cart.items,
                    ...calcPrice(cart.items),
                },
            });
            revalidatePath(`/product/${product.slug}`);
            return {
                success: true,
                message: `${product.name} ${
                    existProduct ? "updated in" : "added to"
                } cart`,
            };
        }
    } catch (error) {
        return formatError(error);
    }
}

export async function getMyCart() {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) {
        throw new Error("Cart session not found");
    }

    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    const cart = await prisma.cart.findFirst({
        where: userId ? { userId } : { sessionCartId },
    });

    if (!cart) {
        return undefined;
    }
    return convertToPlainObject({
        ...cart,
        items: cart.items as CartItem[],
        itemsPrice: cart.itemsPrice,
        totalPrice: cart.totalPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
    });
}

export async function removeItemFromCart(productId: string) {
    try {
        const sessionCartId = (await cookies()).get("sessionCartId")?.value;

        if (!sessionCartId) {
            throw new Error("Cart Session not found");
        }

        const product = await prisma.product.findFirst({
            where: {
                id: productId,
            },
        });
        if (!product) throw new Error("Product not found");
        const cart = await getMyCart();
        if (!cart) throw new Error("Cart not found");

        const exist = cart.items.find((x) => x.productId === productId);
        if (!exist) throw new Error("Item not found");

        if (exist.qty === 1) {
            cart.items = cart.items.filter((x) => x.productId !== productId);
        } else {
            cart.items.find((x) => x.productId === productId)!.qty =
                exist.qty - 1;
        }

        await prisma.cart.update({
            where: { id: cart.id },
            data: {
                items: cart.items,
                ...calcPrice(cart.items),
            },
        });
        revalidatePath(`/product/${product.slug}`);
        return {
            success: true,
            message: `${product.name} was removed from cart`,
        };
    } catch (error) {
        return { success: false, message: formatError(error) };
    }
}
