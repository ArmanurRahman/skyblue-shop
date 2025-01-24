import { getOrderById } from "@/lib/actions/order.action";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddress } from "@/types";
import { auth } from "@/auth";

export const metadata: Metadata = {
    title: "Order Details",
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
    const { id } = await props.params;
    const order = await getOrderById(id);
    const session = await auth();
    if (!order) notFound();

    return (
        <OrderDetailsTable
            order={{
                ...order,
                shippingAddress: order.shippingAddress as ShippingAddress,
            }}
            paymentClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
            isAdmin={session?.user.role === "admin" || false}
        />
    );
};

export default OrderDetailsPage;
