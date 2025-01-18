"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpUser } from "@/lib/actions/user.action";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const SignUpForm = () => {
    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: "",
    });

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const SignUpButton = () => {
        const { pending } = useFormStatus();
        return (
            <Button variant='default' className='w-full'>
                {pending ? "Submitting..." : "Sign Up"}
            </Button>
        );
    };
    return (
        <form action={action}>
            <input type='hidden' value={callbackUrl} name='callbackUrl' />
            <div className=' space-y-6'>
                <div>
                    <Label htmlFor='name'>Name</Label>
                    <Input
                        id='name'
                        name='name'
                        type='text'
                        autoComplete='name'
                        required
                    />
                </div>
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
                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                    <Input
                        id='confirmPassword'
                        name='confirmPassword'
                        type='password'
                        autoComplete='confirmPassword'
                        required
                    />
                </div>
                <div>
                    <SignUpButton />
                </div>
                {data && !data.success && (
                    <p className='text-center text-destructive'>
                        {data.message}
                    </p>
                )}
                <div>
                    <div className='text-sm text-center text-muted-foreground'>
                        Already have an account?{" "}
                        <Link href='/sign-in' target='_self' className='link'>
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SignUpForm;
