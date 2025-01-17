import ProductList from "@/components/shared/product/product-list";
import { getLatestProduct } from "@/lib/actions/product.action";

export default async function Home() {
    const latestProducts = await getLatestProduct();
    return (
        <>
            <ProductList
                data={latestProducts}
                title='Recent Products'
                limit={4}
            />
        </>
    );
}
