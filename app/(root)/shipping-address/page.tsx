import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.action";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import ShippingAddressForm from "./shipping-address-form";
import { ShippingAddress as ShippingAddressType } from "@/types";
import CheckoutStep from "@/components/shared/checkout-step";

export const metadata = {
    title: "Shipping Address",
};
const ShippingAddress = async () => {
    const cart = await getMyCart();
    if (!cart || cart.items.length === 0) {
        redirect("/cart");
    }
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
        throw new Error("No User Id");
    }
    const user = await getUserById(userId);
    return (
        <div>
            <CheckoutStep current={1} />
            <ShippingAddressForm
                address={user.address as ShippingAddressType}
            />
        </div>
    );
};

export default ShippingAddress;
