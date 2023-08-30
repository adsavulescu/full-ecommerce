import {useContext, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import data from '../../data.json';
import { CartContext } from '@/context/CartContext';
import Product from "@/components/Product";
import {Container} from "react-bootstrap";

const ProductDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);


    useEffect(() => {
        if (router.isReady) {
            setProduct(data.find(p => p.id === parseInt(id)));
        }
    }, [router.isReady, id]);

    if (!product) {
        return null;
    }

    return (
        <Container>
            <h2>Product</h2>
            <Product
                product={product}
                actionText="Add to Cart"
                onAction={addToCart}
            />
        </Container>
    );

}

export default ProductDetails;

