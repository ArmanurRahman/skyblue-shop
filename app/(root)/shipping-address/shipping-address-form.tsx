"use client";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShippingAddress } from "@/types";
import { z } from "zod";
import { shippingAddressSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { updateUserAction } from "@/lib/actions/user.action";

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof shippingAddressSchema>>({
        resolver: zodResolver(shippingAddressSchema),
        defaultValues: address,
    });
    const [isPending, startTransition] = useTransition();
    const onSubmit: SubmitHandler<
        z.infer<typeof shippingAddressSchema>
    > = async (value) => {
        startTransition(async () => {
            const res = await updateUserAction(value);
            if (!res.success) {
                toast({
                    variant: "destructive",
                    description: res.message,
                });
                return;
            }
            router.push("/payment-method");
        });
    };
    return (
        <>
            <div className='max-w-md mx-auto space-y-4'>
                <div className='h2-bold mt-4'>Shipping Address</div>
                <p className='text-sm text-muted-foreground'>
                    Please enter the shipping address
                </p>
                <Form {...form}>
                    <form
                        method='post'
                        className='space-y-4'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className='flex flex-col md:flex-row gap-5'>
                            <FormField
                                control={form.control}
                                name='fullName'
                                render={({
                                    field,
                                }: {
                                    field: ControllerRenderProps<
                                        z.infer<typeof shippingAddressSchema>,
                                        "fullName"
                                    >;
                                }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Enter Full Name'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                        <div className='flex flex-col md:flex-row gap-5'>
                            <FormField
                                control={form.control}
                                name='address'
                                render={({
                                    field,
                                }: {
                                    field: ControllerRenderProps<
                                        z.infer<typeof shippingAddressSchema>,
                                        "address"
                                    >;
                                }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Enter Address'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                        <div className='flex flex-col md:flex-row gap-5'>
                            <FormField
                                control={form.control}
                                name='city'
                                render={({
                                    field,
                                }: {
                                    field: ControllerRenderProps<
                                        z.infer<typeof shippingAddressSchema>,
                                        "city"
                                    >;
                                }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Enter City'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                        <div className='flex flex-col md:flex-row gap-5'>
                            <FormField
                                control={form.control}
                                name='country'
                                render={({
                                    field,
                                }: {
                                    field: ControllerRenderProps<
                                        z.infer<typeof shippingAddressSchema>,
                                        "country"
                                    >;
                                }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Enter Country'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                        <div className='flex flex-col md:flex-row gap-5'>
                            <FormField
                                control={form.control}
                                name='fullName'
                                render={({
                                    field,
                                }: {
                                    field: ControllerRenderProps<
                                        z.infer<typeof shippingAddressSchema>,
                                        "fullName"
                                    >;
                                }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Enter Full Name'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                        <div className='flex flex-col md:flex-row gap-5'>
                            <FormField
                                control={form.control}
                                name='postalCode'
                                render={({
                                    field,
                                }: {
                                    field: ControllerRenderProps<
                                        z.infer<typeof shippingAddressSchema>,
                                        "postalCode"
                                    >;
                                }) => (
                                    <FormItem>
                                        <FormLabel>Postal Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Enter Postal Code'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
                        <div className='flex gap-2'>
                            <Button type='submit' disabled={isPending}>
                                {isPending ? (
                                    <Loader className='w-4 h-4 animate-spin' />
                                ) : (
                                    <ArrowRight className='w-4 h-4' />
                                )}{" "}
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default ShippingAddressForm;
