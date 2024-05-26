import { createContext, useState, useContext } from "react";
import axios from "axios";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item._id === product._id
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].selectedQuantity =
          parseInt(updatedCart[existingProductIndex].selectedQuantity) +
          parseInt(product.selectedQuantity);
        return updatedCart;
      } else {
        return [...prevCart, product];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, selectedQuantity: quantity } : item
      )
    );
  };

  const createOrder = async (name, email, token) => {
    try {
      const orderProducts = cart.map((item) => ({
        productId: item._id,
        name: item.name,
        count: item.selectedQuantity,
        price: item.price,
      }));

      console.log(orderProducts);

      const response = await axios.post(
        "http://localhost:3001/customer/orderProduct",
        {
          name,
          email,
          products: orderProducts,
          status: 0,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setCart([]);
      }
    } catch (error) {
      console.error("Order creation failed", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, createOrder }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
