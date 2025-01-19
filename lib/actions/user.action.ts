"use server";
import { signIn, signOut } from "@/auth";
import { signInFormSchema, signUpFormSchema } from "../validation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";
import { hash } from "../encrypt";

export async function signInWithCredential(
    prevState: unknown,
    formData: FormData
) {
    try {
        const user = signInFormSchema.parse({
            email: formData.get("email"),
            password: formData.get("password"),
        });
        await signIn("credentials", user);
        return { success: true, message: "Signed in successfully" };
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        return { success: false, message: "Invalid credential" };
    }
}

export async function signoutUser() {
    await signOut();
}

export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        });
        const plainPassword = user.password;
        user.password = await hash(user.password);
        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });
        await signIn("credentials", {
            email: user.email,
            password: plainPassword,
        });
        return { success: true, message: "User registered successfully" };
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        return { success: false, message: formatError(error) };
    }
}
