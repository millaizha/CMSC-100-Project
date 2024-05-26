import OrderListCard from "../../components/OrderListCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import IMAGE from "../../assets/shop/empty1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { parseJSON, format } from "date-fns";

export default function Orders({ }) {
  const navigate = useNavigate();
  const { token, userEmail } = useContext(AuthContext);
  const [ orders, setOrders ] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        console.error("No token found!");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3001/customer/getOrders?email=${userEmail}&status=0`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setOrders(response.data);
        } else {
          console.error("Error fetching orders: ", response.data.error);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchOrders();
  }, [token, userEmail]);

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <div className="main-container mt-3 flex ">
        <div className="spacer mx-auto"></div>
        <div className="cart-container w-[800px]">
          <h1 className="font-black text-6xl">MY ORDERS</h1>
          {orders.length === 0 ? (
            <div className="w-full h-[800px] flex flex-col items-center justify-center">
              <img src={IMAGE} alt="No order" />
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
                    {order.status === 0 ? <button className="form-button mt-4 ">Cancel Order</button> : (<></>)}
                  </div>
              
               
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="spacer mx-auto"></div>
      </div>
      <Footer />
    </div>
  );
}
