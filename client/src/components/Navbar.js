import { useContext } from "react";
import LOGO from "../assets/logo/100_LOGO.png";
import { AiOutlineShopping } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoPowerOutline } from "react-icons/io5";

export default function Navbar() {
  const { logout, userFirstName } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="h-32 p-6 w-screen flex sticky top-0 bg-white z-10">
      <div className="left flex gap-12 flex items-center pl-12">
        <img
          src={LOGO}
          alt="Website Logo"
          className="w-24 h-24 cursor-pointer object-contain"
          onClick={() => navigate("/")}
        />
        <h1 className="font-black text-3xl hidden xl:inline ">FARM-TO-TABLE</h1>
        <h2 className="text-2xl hidden xl:inline">Hello, {userFirstName}!</h2>
      </div>
      <div className="spacer flex-grow"></div>
      <div className="right flex gap-6 items-center pr-12">
        {/* Responsive Order Button */}
        <button
          className="flex items-center gap-2 xl:gap-2 xl:px-4"
          onClick={() => navigate("/my-orders")}
        >
          <AiOutlineShopping />
          <span className="hidden xl:inline">My Orders</span>{" "}
        </button>

        <button
          className="flex items-center gap-2 md:gap-2 md:px-4"
          onClick={() => navigate("/cart")}
        >
          <MdOutlineShoppingCart />
          <span className="hidden xl:inline">Cart</span>
        </button>

        <button
          className="flex sm:w-[200px] sm:h-[65px] items-center bg-[#40573C] justify-center rounded-full gap-2 text-white font-semibold"
          onClick={logout}
        >
          <div className="icon-circle">
            <IoPowerOutline />
          </div>
          <span className="hidden xl:inline">Log Out</span>
        </button>
      </div>
    </div>
  );
}
