import { insertProductSchema } from "@/lib/validation";
import { z } from "zod";

export type Product = z.infer<typeof insertProductSchema> & {
    id: string;
    rating: string;
    createdAt: Date;
};
