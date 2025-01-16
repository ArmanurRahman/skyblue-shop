import ProductList from "@/components/shared/product/product-list";
import db from "@/db/sample-data";

export default function Home() {
    return (
        <>
            <ProductList data={db.products} title='Recent Products' limit={4} />
        </>
    );
}
