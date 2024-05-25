import CartListCard from "../../components/CartListCard";
import Navbar from "../../components/Navbar";
import { FaTrash } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import IMAGE from "../../assets/shop/empty1.png";
import { useNavigate } from "react-router-dom";

export default function Orders({ cartList }) {
  const navigate = useNavigate();

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
    </div>
  );
}
