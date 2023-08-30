import React, { createContext, useState } from 'react';

export const CartContext = createContext(null);

export const CartProvider = (props) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        // Check if the product is already in the cart
        const exists = cart.some(item => item.id === product.id);
        if (exists) {
            // If the product is already in the cart, update its quantity
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));

            alert('Product quantity updated!');
        } else {
            // If the product is not in the cart, add it to the cart
            setCart([...cart, { ...product, quantity: 1 }]);

            alert('Product added to cart!');
        }
    };

    const removeFromCart = (product) => {
        const newCart = cart.filter(item => item.id !== product.id);
        setCart(newCart);
    };

    const addQty = (product) => {
        setCart(cart.map(item =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    };

    const removeQty = (product) => {
        setCart(cart.map(item =>
            item.id === product.id
                ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                : item
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, addQty, removeQty, clearCart }}>
            {props.children}
        </CartContext.Provider>
    );
};
