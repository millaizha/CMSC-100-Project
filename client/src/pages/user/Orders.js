import CartListCard from "../../components/CartListCard";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import IMAGE from "../../assets/shop/empty1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Orders({ cartList }) {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        console.error("No token found!");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3001/customer/getOrders",
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
  }, [token]);

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="main-container mt-3 flex">
        <div className="spacer mx-auto"></div>
        <div className="cart-container w-[800px]">
          <h1 className="font-black text-6xl">MY ORDERS</h1>
          <div className="w-full h-[800px] flex flex-col items-center justify-center">
            <img src={IMAGE} alt="No order" />
            <span className="font-semibold">
              You don't have any orders yet!
            </span>
            <button className="form-button mt-3" onClick={() => navigate("/")}>
              Return to Home
            </button>
          </div>
        </div>
        <div className="spacer mx-auto"></div>
      </div>
      <Footer />
    </div>
  );
}
