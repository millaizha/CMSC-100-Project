import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { userEmail, token } = useContext(AuthContext);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (userEmail) {
        try {
          const response = await axios.get(
            `http://localhost:3001/customer/getCart?email=${userEmail}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setCart(response.data.items);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      } else {
        setCart([]);
      }
    };

    fetchCartItems();
  }, [userEmail, token, forceUpdate]);

  const addToCart = async (product) => {
    if (!userEmail) {
      console.error("User email is not available");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/customer/addToCart",
        { email: userEmail, product },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(response.data.items);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/customer/removeFromCart",
        { email: userEmail, productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(response.data.items);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity) {
      try {
        console.log(productId);
        const response = await axios.post(
          "http://localhost:3001/customer/updateCartQuantity",
          { email: userEmail, productId, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCart(response.data.items);
        setForceUpdate(forceUpdate + 1);
      } catch (error) {
        console.error("Error updating cart quantity:", error);
      }
    }
  };

  const createOrder = async (name, email, token) => {
    try {
      const orderData = {
        name: userEmail,
        email: userEmail,
        products: cart.map((item) => ({
          productId: item.product._id,
          name: item.product.name,
          count: item.quantity,
          price: item.product.price,
        })),
        dateTimeOrdered: new Date().toISOString(),
        status: 0,
      };

      await axios.post(
        "http://localhost:3001/customer/orderProduct",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Clear the cart after ordering
      setCart([]);
    } catch (error) {
      console.error("Error creating order:", error);
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
