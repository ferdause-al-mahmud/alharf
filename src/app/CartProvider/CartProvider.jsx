"use client";
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart?.length > 0) {
            setCart(storedCart);
        }
        setLoading(false); // Set loading to false after cart is loaded
    }, []);

    useEffect(() => {
        if (!loading) { // Prevent localStorage update during the initial loading phase
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, loading]);

    const addToCart = (product, selectedSize, quantity) => {
        const newItem = { ...product, selectedSize, quantity };
        setCart(prevCart => {
            const existingItem = prevCart.find(
                item => item.id === product.id && item.selectedSize === selectedSize
            );
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id && item.selectedSize === selectedSize
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, newItem];
        });
    };

    const updateQuantity = (productId, selectedSize, quantity) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId && item.selectedSize === selectedSize
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const removeFromCart = (productId, selectedSize) => {
        setCart(prevCart =>
            prevCart.filter(item => !(item.id === productId && item.selectedSize === selectedSize))
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, loading, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
