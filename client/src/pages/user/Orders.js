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
              className={`p-2 px-4 rounded-full border-2 border-green-600 hover:bg-green-50 ${
                activeStatus === 0
                  ? "bg-green-600 hover:bg-green-600 text-white"
                  : ""
              }`}
              onClick={() => setActiveStatus(0)}
            >
              Pending
            </button>
            <button
              className={`p-2 px-4 rounded-full border-2 border-green-600 hover:bg-green-50 ${
                activeStatus === 1
                  ? "bg-green-600 hover:bg-green-600 text-white"
                  : ""
              }`}
              onClick={() => setActiveStatus(1)}
            >
              Completed
            </button>
            <button
              className={`p-2 px-4 rounded-full border-2 border-green-600 hover:bg-green-50 ${
                activeStatus === 2
                  ? "bg-green-600 hover:bg-green-600 text-white"
                  : ""
              }`}
              onClick={() => setActiveStatus(2)}
            >
              Cancelled
            </button>
          </div>
          {orders.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center">
              <img src={IMAGE} alt="No order" className="h-96 mt-4" />
              <span className="font-semibold">
                You don't have any orders yet!
              </span>
              <button
                className="form-button mt-3"
                onClick={() => navigate("/")}
              >
                Return to Home
              </button>
            </div>
          ) : (
            <div className="mt-4 mb-10">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="mb-4 bg-[#EEDBDB] p-4 rounded-xl"
                >
                  <div className="mt-2 flex flex-col gap-2">
                    {order.products.map((product) => (
                      <OrderListCard key={product._id.$oid} product={product} />
                    ))}
                  </div>
                  <div className="flex justify-between">
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
              ))}
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
