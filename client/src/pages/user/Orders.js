import OrderListCard from "../../components/OrderListCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import IMAGE from "../../assets/shop/empty1.png";
import BG from "../../assets/shop/orders.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { parseJSON, format } from "date-fns";
import Lenis from "@studio-freight/lenis";
import { MdPendingActions } from "react-icons/md";
import { FaCircleMinus, FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

export default function Orders({}) {
  const navigate = useNavigate();
  const { token, userEmail } = useContext(AuthContext);
  const { cancelOrder } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        console.error("No token found!");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3001/customer/getOrders?email=${userEmail}&status=${activeStatus}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setOrders(response.data);
          console.log(response.data);
        } else {
          console.error("Error fetching orders: ", response.data.error);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchOrders();

    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, [token, userEmail, activeStatus, forceUpdate]);

  async function handleCancelOrder(orderId) {
    await cancelOrder(orderId);
    setForceUpdate(forceUpdate + 1);
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />

      <div className="main-container pt-3 flex flex-grow mb-12">
        <div className="spacer mx-auto"></div>
        <div className="cart-container w-[800px]">
          <h1 className="font-black text-6xl">MY ORDERS</h1>
          <div className="flex gap-2 mt-4">
            <button
              className={`p-2 px-4 flex items-center justify-center gap-2 transition-colors ease-out rounded-full border-2 border-green-600 hover:bg-green-50 ${
                activeStatus === 0
                  ? "bg-green-600 hover:bg-green-600 text-white"
                  : ""
              }`}
              onClick={() => setActiveStatus(0)}
            >
              <FaCircleMinus />
              Pending
            </button>
            <button
              className={`p-2 px-4 flex items-center justify-center gap-2 transition-colors ease-out rounded-full border-2 border-green-600 hover:bg-green-50 ${
                activeStatus === 1
                  ? "bg-green-600 hover:bg-green-600 text-white"
                  : ""
              }`}
              onClick={() => setActiveStatus(1)}
            >
              <FaCircleCheck />
              Completed
            </button>
            <button
              className={`p-2 px-4 flex items-center justify-center gap-2 transition-colors ease-out rounded-full border-2 border-green-600 hover:bg-green-50 ${
                activeStatus === 2
                  ? "bg-green-600 hover:bg-green-600 text-white"
                  : ""
              }`}
              onClick={() => setActiveStatus(2)}
            >
              <FaCircleXmark />
              Cancelled
            </button>
          </div>
          {orders.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center">
              <img src={IMAGE} alt="No order" className="h-96 mt-4" />
              <span className="font-semibold">No orders found!</span>
            </div>
          ) : (
            <div className="mt-4 mb-10">
              {orders.map((order) => {
                const itemSubtotal = order.products.reduce((acc, product) => {
                  return acc + product.price * product.count;
                }, 0);

                return (
                  <div
                    key={order._id}
                    className="mb-4 bg-[#EEDBDB] p-4 rounded-xl"
                  >
                    <div className="mt-2 flex flex-col gap-2">
                      {order.products.map((product) => (
                        <OrderListCard
                          key={product._id.$oid}
                          product={product}
                        />
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <div className="flex">
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
                              {itemSubtotal.toFixed(2)}
                            </div>

                            <div className="spacer w-[75px]"></div>
                          </div>
                          <div className="flex items-end gap-1">
                            {order.shippingFee === 0 ? (
                              <>
                                <div className="text-xl font-bold text-gray-400">
                                  PHP
                                </div>
                                <div className="text-4xl font-bold text-gray-400">
                                  {order.shippingFee.toFixed(2)}
                                </div>
                              </>
                            ) : (
                              <div className="text-4xl font-bold text-gray-400">
                                FREE
                              </div>
                            )}

                            <div className="spacer w-[75px]"></div>
                          </div>
                          <div className="flex items-end gap-1">
                            <div className="text-xl font-bold">PHP</div>

                            <div className="text-4xl font-bold">
                              {order.totalOrderSales}
                              {}
                            </div>

                            <div className="spacer w-[75px]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-4 items-center">
                      <div className="mt-4 ml-2">
                        <p className="text-gray-600">
                          Ordered on:{" "}
                          {format(
                            parseJSON(order.dateTimeOrdered),
                            "MMMM d, yyyy h:mm a"
                          )}
                        </p>
                        <p className="text-gray-600 font-bold">
                          Status:{" "}
                          {order.status === 0
                            ? "Pending"
                            : order.status === 1
                            ? "Confirmed"
                            : "Canceled"}
                        </p>
                      </div>
                      <div>
                        {order.status === 0 ? (
                          <button
                            className="form-button mt-4"
                            onClick={() => handleCancelOrder(order._id)}
                          >
                            Cancel Order
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
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
