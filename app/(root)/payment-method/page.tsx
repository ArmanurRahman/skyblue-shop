import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.action";
import { Metadata } from "next";
import PaymentMethodForm from "./paymentMethodForm";
import CheckoutStep from "@/components/shared/checkout-step";

export const metadata: Metadata = {
    title: "Payment Method",
};

const PaymentMethodPage = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new Error("User not found");

    const user = await getUserById(userId);
    return (
        <>
            <CheckoutStep current={2} />
            <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
        </>
    );
};

export default PaymentMethodPage;
