"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithCredential } from "@/lib/actions/user.action";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const CredentialSignInForm = () => {
    const [data, action] = useActionState(signInWithCredential, {
        success: false,
        message: "",
    });

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const SignInButton = () => {
        const { pending } = useFormStatus();
        return (
            <Button variant='default' className='w-full'>
                {pending ? "Sign In..." : "Sign In"}
            </Button>
        );
    };
    return (
        <form action={action}>
            <input type='hidden' value={callbackUrl} name='callbackUrl' />
            <div className=' space-y-6'>
                <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                        id='email'
                        name='email'
                        type='email'
                        autoComplete='email'
                        required
                    />
                </div>
                <div>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                        id='password'
                        name='password'
                        type='password'
                        autoComplete='password'
                        required
                    />
                </div>
                <div>
                    <SignInButton />
                </div>
                {data && !data.success && (
                    <p className='text-center text-destructive'>
                        {data.message}
                    </p>
                )}
                <div>
                    <div className='text-sm text-center text-muted-foreground'>
                        Don&apos;t have an account?{" "}
                        <Link href='/sign-up' target='_self' className='link'>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CredentialSignInForm;
