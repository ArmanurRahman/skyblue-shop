import { auth } from "@/auth";
import AddToCart from "@/components/shared/product/add-to-cart";
import ProductImage from "@/components/shared/product/product-image";
import ProductPrice from "@/components/shared/product/product-price";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getMyCart } from "@/lib/actions/cart.action";
import { getProductBySlug } from "@/lib/actions/product.action";
import { notFound } from "next/navigation";
import ReviewList from "./review-list";
import Rating from "@/components/shared/product/rating";

const ProductDetailsPage = async (props: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await props.params;
    const product = await getProductBySlug(slug);
    const cart = await getMyCart();

    if (!product) {
        notFound();
    }

    const session = await auth();
    const userId = session?.user.id;
    return (
        <>
            <section>
                <div className='grid grid-cols-1 md:grid-cols-5'>
                    <div className='col-span-2'>
                        <ProductImage images={product.images} />
                    </div>
                    <div className='col-span-2 p-5'>
                        <div className='flex flex-col gap-6'>
                            <p>
                                {product.brand} {product.category}
                            </p>
                            <h1 className='h3-bold'>{product.name}</h1>
                            <Rating value={Number(product.rating)} />
                            <p>{product.numReviews} reviews</p>
                            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                                <ProductPrice
                                    classname='w-24 rounded-full bg-green-100 text-green-700 px-5 py-2'
                                    value={Number(product.price)}
                                />
                            </div>
                        </div>
                        <div className='mt-10'></div>
                        <p className='font-semibold'>Description</p>
                        <p>{product.description}</p>
                    </div>
                    <div>
                        <Card>
                            <CardContent className='p-4'>
                                <div className='mb-2 flex justify-between'>
                                    <div>Price</div>
                                    <ProductPrice
                                        value={Number(product.price)}
                                    />
                                </div>
                                <div className='mb-2 flex justify-between'>
                                    <div>Status</div>
                                    {product.stock > 0 ? (
                                        <Badge variant='outline'>
                                            In Stock
                                        </Badge>
                                    ) : (
                                        <Badge variant='destructive'>
                                            Out of stock
                                        </Badge>
                                    )}
                                </div>
                                {product.stock > 0 && (
                                    <div className='flex-center'>
                                        <AddToCart
                                            cart={cart}
                                            item={{
                                                productId: product.id,
                                                name: product.name,
                                                slug: product.slug,
                                                qty: 1,
                                                price: product.price,
                                                image: product.images[0],
                                            }}
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
            <section className='mt-10'>
                <h2 className='h2-bold'>Customer Reviews</h2>
                <ReviewList
                    userId={userId || ""}
                    productId={product.id}
                    productSlug={product.slug}
                />
            </section>
        </>
    );
};

export default ProductDetailsPage;
