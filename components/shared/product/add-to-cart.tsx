"use client";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.action";
import { Cart, CartItem } from "@/types";
import { Minus, Plus, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const AddToCart = ({ item, cart }: { item: CartItem; cart: Cart }) => {
    const { toast } = useToast();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const handleAddToCart = async () => {
        startTransition(async () => {
            const res = await addItemToCart(item);
            if (!res.success) {
                toast({
                    variant: "destructive",
                    description: res.message,
                });
                return;
            }
            toast({
                description: res.message,
                action: (
                    <ToastAction
                        className='bg-primary text-white hover:bg-gray-200'
                        altText='Go to cart'
                        onClick={() => router.push("/cart")}
                    >
                        Go To Cart
                    </ToastAction>
                ),
            });
        });
    };

    const handleRemoveFromCart = async () => {
        startTransition(async () => {
            const res = await removeItemFromCart(item.productId);

            toast({
                variant: res.success ? "default" : "destructive",
                description: res.message,
            });
            return;
        });
    };
    const productExistInCart = cart.items.find(
        (x) => x.productId === item.productId
    );

    return productExistInCart ? (
        <div className='flex items-center gap-1'>
            <Button
                variant='outline'
                type='button'
                onClick={handleRemoveFromCart}
            >
                {isPending ? (
                    <Loader className='w-4 h-4 animate-spin' />
                ) : (
                    <Minus className='h-4 w-4' />
                )}
            </Button>
            <span className='px-2'>{productExistInCart.qty}</span>
            <Button variant='outline' type='button' onClick={handleAddToCart}>
                {isPending ? (
                    <Loader className='w-4 h-4 animate-spin' />
                ) : (
                    <Plus className='h-4 w-4' />
                )}
            </Button>
        </div>
    ) : (
        <Button type='button' className='w-full' onClick={handleAddToCart}>
            {isPending ? (
                <Loader className='w-4 h-4 animate-spin' />
            ) : (
                <Plus className='h-4 w-4' />
            )}
            Add To Cart
        </Button>
    );
};

export default AddToCart;
