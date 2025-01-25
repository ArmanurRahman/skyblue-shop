import DealCountdown from "@/components/deal-countdown";
import IconBoxes from "@/components/icon-boxes";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductsButton from "@/components/view-all-products-button";
import {
    getFeaturedProducts,
    getLatestProduct,
} from "@/lib/actions/product.action";

export default async function Home() {
    const latestProducts = await getLatestProduct();
    const featureProduct = await getFeaturedProducts();
    console.log(featureProduct);
    return (
        <>
            {featureProduct.length > 1 && (
                <ProductCarousel data={featureProduct} />
            )}
            <ProductList
                data={latestProducts}
                title='Recent Products'
                limit={4}
            />
            <ViewAllProductsButton />
            <DealCountdown />
            <IconBoxes />
        </>
    );
}
