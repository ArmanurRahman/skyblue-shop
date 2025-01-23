import { getOrderById } from "@/lib/actions/order.action";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddress } from "@/types";

export const metadata: Metadata = {
    title: "Order Details",
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
    const { id } = await props.params;
    const order = await getOrderById(id);
    console.log(order);
    if (!order) notFound();

    return (
        <OrderDetailsTable
            order={{
                ...order,
                shippingAddress: order.shippingAddress as ShippingAddress,
            }}
            paymentClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
        />
    );
};

export default OrderDetailsPage;
