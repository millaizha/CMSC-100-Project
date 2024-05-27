import CartListCard from "../../components/CartListCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaTrash } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import IMAGE from "../../assets/shop/empty.png";
import BG from "../../assets/shop/cart.png";
import { useNavigate } from "react-router-dom";

/**
 * PAGE: Cart
 * PURPOSE: Displays the user's shopping cart, including a list of items, total price, shipping fee, and option to confirm the order.
 *
 * CONTEXT:
 *  - CartContext: Used to access and manage the cart data, including creating orders.
 *  - AuthContext: Used to access user authentication details.
 *
 * STATE:
 *  - totalPrice (number): The total price of the items in the cart.
 *  - shippingFee (number): The shipping fee based on the total price.
 *
 * USAGE:
 *  - Renders the main cart page, allowing users to review and confirm their orders.
 */

export default function Cart() {
  const { cart, createOrder } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(25);

  /**
   * useEffect (for updating price and shipping):
   * - Calculates the total price and shipping fee whenever the cart contents (the 'cart' variable) change.
   * - If the total price exceeds 500 PHP, shipping is free.
   */
  useEffect(() => {
    let newTotalPrice = 0;
    for (const item of cart) {
      newTotalPrice += item.product.price * item.quantity;
    }
    setTotalPrice(newTotalPrice);
    setShippingFee(newTotalPrice > 500 ? 0 : 25);
  }, [cart]);

  /**
   * handleConfirmOrder:
   * - Creates an order by calling the 'createOrder' function from CartContext.
   * - Redirects the user to their order history page ("/my-orders") after successful order creation.
   */
  const handleConfirmOrder = async () => {
    await createOrder(shippingFee, token);
    navigate("/my-orders");
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />

      <div className="main-container mt-3 flex flex-grow mb-12">
        <div className="spacer mx-auto"></div>
        <div className="cart-container w-[800px]">
          <h1 className="font-black text-6xl">SHOPPING CART</h1>
          {cart.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <img src={IMAGE} alt="No product" />
              <span className="font-semibold">Your cart is empty!</span>
              <button
                className="form-button mt-3"
                onClick={() => navigate("/")}
              >
                Return to Home
              </button>
            </div>
          ) : (
            <div className="list-container mt-8 flex flex-col gap-2 h-full">
              {cart.map((item, index) => (
                <CartListCard product={item} />
              ))}
              <div className="flex justify-end">
                <div className="flex flex-col gap-7 mt-8 items-end">
                  <h1 className="text-xl font-bold mr-12 text-gray-400">
                    ITEM SUBTOTAL
                  </h1>
                  <h1 className="text-xl font-bold mr-12 text-gray-400">
                    SHIPPING FEE
                  </h1>
                  <h1 className="text-xl font-bold mr-12">TOTAL</h1>
                </div>
                <div className="self-end mt-4 flex flex-col items-end gap-4">
                  <div className="flex items-end gap-1 text-gray-400">
                    <div className="text-xl font-bold">PHP</div>

                    <div className="text-4xl font-bold">
                      {totalPrice.toFixed(2)}
                    </div>

                    <div className="spacer w-[90px]"></div>
                  </div>
                  <div className="flex items-end gap-1">
                    {totalPrice <= 500 ? (
                      <>
                        <div className="text-xl font-bold text-gray-400">
                          PHP
                        </div>
                        <div className="text-4xl font-bold text-gray-400">
                          {shippingFee}
                        </div>
                      </>
                    ) : (
                      <div className="text-4xl font-bold text-gray-400">
                        FREE
                      </div>
                    )}

                    <div className="spacer w-[90px]"></div>
                  </div>
                  <div className="flex items-end gap-1">
                    <div className="text-xl font-bold">PHP</div>

                    <div className="text-4xl font-bold">
                      {(totalPrice + shippingFee).toFixed(2)}
                    </div>

                    <div className="spacer w-[90px]"></div>
                  </div>
                </div>
              </div>
              <div className="self-end">
                <button
                  className="form-button mt-3"
                  onClick={handleConfirmOrder}
                >
                  Confirm Order
                </button>
              </div>

              <span className="text-gray-600">
                * Orders with a total above 500 PHP will get FREE delivery!
              </span>
            </div>
          )}
        </div>
        <div className="spacer mx-auto"></div>
      </div>
      <Footer />
      <img
        src={BG}
        alt=""
        className="fixed -z-20 w-[500px] bottom-12 right-5 opacity-30"
      />
    </div>
  );
}
