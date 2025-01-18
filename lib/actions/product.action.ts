"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCT_LIMIT } from "../constants";

export async function getLatestProduct() {
    const data = await prisma.product.findMany({
        take: LATEST_PRODUCT_LIMIT,
        orderBy: { createdAt: "desc" },
    });
    // return data.map((product) => ({
    //     ...product,
    //     price: product.price.toString(),
    //     rating: product.rating.toString(),
    // }));
    return convertToPlainObject(data);
}

export async function getProductBySlug(slug: string) {
    const data = prisma.product.findFirst({
        where: { slug },
    });
    return data;
}
