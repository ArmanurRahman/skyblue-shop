import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CredentialSignInForm from "./SignUpForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Sign Up",
};
const SignInPage = async (props: {
    searchParams: Promise<{ callbackUrl: string }>;
}) => {
    const session = await auth();
    const { callbackUrl } = await props.searchParams;
    if (session) {
        redirect(callbackUrl || "/");
    }
    return (
        <div className=' w-full max-w-md m-auto'>
            <Card>
                <CardHeader className=' space-y-4'>
                    <Link href='/' className=' flex-center'>
                        <Image
                            src='/images/logo.svg'
                            alt={`${APP_NAME} Logo`}
                            width={100}
                            height={100}
                            priority={true}
                        />
                    </Link>
                    <CardTitle className=' text-center'>Sign Up</CardTitle>
                    <CardDescription className='text-center'>
                        Enter your Information
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CredentialSignInForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default SignInPage;
