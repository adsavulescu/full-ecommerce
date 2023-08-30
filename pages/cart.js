import React, { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import {Container, Table, Button} from "react-bootstrap";
import {UserContext} from "@/context/UserContext";

const Cart = () => {
    const { cart, removeFromCart, addQty, removeQty, clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext);

    const handleOrder = async () => {

        // calculate total price
        const totalPrice = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

        // create order object
        const order = {
            userId: user.id,
            products: cart.map(product => ({ productId: product.id, quantity: product.quantity })),
            totalPrice,
            orderStatus: 'pending',
        };

        // send order to server
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });

        if (res.ok) {
            // clear cart
            clearCart();

            // redirect to order confirmation page
            // router.push('/order-confirmation');
        } else {
            alert('Failed to place order');
        }
    };

    return (
        <Container>
            <h2>Your Cart</h2>

            <Table>
                <thead>
                <tr>
                    <th>product</th>
                    <th>quantity</th>
                    <th>remove</th>
                </tr>
                </thead>
                <tbody>
                {cart.map(product => (
                    <tr key={product.id}>
                        <td>
                            <p>{product.name}</p>
                            <p>${product.price}</p>
                        </td>
                        <td>
                            <span>{product.quantity} <button onClick={() => addQty(product)}>+</button> <button onClick={() => removeQty(product)}>-</button></span>
                        </td>
                        <td>
                            <button onClick={() => removeFromCart(product)}>remove</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button onClick={handleOrder}>Place Order</Button>
        </Container>
    );
};

export default Cart;
