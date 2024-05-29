import AdminOrderCard from "../../components/AdminOrderCard";
import IMAGE from "../../assets/shop/empty.png";
import AdminNavbar from "../../components/AdminNavbar";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Lenis from "@studio-freight/lenis";

export default function Cart() {
  const { token } = useContext(AuthContext);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const status = 0; 
        const response = await fetch(
          `http://localhost:3001/admin/getOrders?status=${status}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched orders:", data);
          setItems(data);
        } else {
          console.error("Error fetching orders:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="h-screen w-screen">
      <AdminNavbar />

      <div className="main-container mt-3 flex">
        <div className="spacer mx-auto"></div>
        <div className="cart-container w-[800px]">
          <h1 className="font-black text-6xl flex flex-row justify-center">Orders</h1>
          {items.length === 0 ? 
          <div className="flex flex-col items-center justify-center mt-20">
          <img src={IMAGE} alt="No product" />
          <span className="font-semibold">Oops! No orders placed yet.</span>
        </div>:
         <AdminOrderCard users={items} />}
        </div>
        <div className="spacer mx-auto"></div>
      </div>
    </div>
  );
}
