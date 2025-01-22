"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { updateUserPaymentMethod } from "@/lib/actions/user.action";
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants";
import { paymentMethodSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const PaymentMethodForm = ({
    preferredPaymentMethod,
}: {
    preferredPaymentMethod: string | null;
}) => {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof paymentMethodSchema>>({
        resolver: zodResolver(paymentMethodSchema),
        defaultValues: {
            type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
        },
    });

    const [isPending, startTransition] = useTransition();
    const onSubmit: SubmitHandler<z.infer<typeof paymentMethodSchema>> = async (
        value
    ) => {
        startTransition(async () => {
            const res = await updateUserPaymentMethod(value);
            if (!res.success) {
                toast({
                    variant: "destructive",
                    description: res.message,
                });
                return;
            }
            router.push("/place-order");
        });
    };
    return (
        <>
            <div className='max-w-md mx-auto space-y-4'>
                <div className='h2-bold mt-4'>Payment Method</div>
                <p className='text-sm text-muted-foreground'>
                    Please enter the payment method
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
                                name='type'
                                render={({ field }) => (
                                    <FormItem className='space-y-3'>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                className='flex flex-col space-y-2'
                                            >
                                                {PAYMENT_METHODS.map((p) => (
                                                    <FormItem
                                                        key={p}
                                                        className='flex items-center space-x-2 space-y-0'
                                                    >
                                                        <FormControl>
                                                            <RadioGroupItem
                                                                value={p}
                                                                checked={
                                                                    p ===
                                                                    field.value
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormLabel className='font-normal'>
                                                            {p}
                                                        </FormLabel>
                                                    </FormItem>
                                                ))}
                                            </RadioGroup>
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

export default PaymentMethodForm;
