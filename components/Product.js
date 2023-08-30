import Link from "next/link"
import { Button } from "react-bootstrap";

const Product = ({ product, actionText, onAction }) => (
    <div className="product" key={product.id}>
        <div className="img">
            <img src={`uploads/${product.image}`} alt={product.name} />
        </div>
        <div className="text">
            <h3><Link href={`/product/${product.id}`}>{product.name}</Link></h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <Button onClick={() => onAction(product)}>{actionText}</Button>
        </div>
    </div>
);

export default Product;
