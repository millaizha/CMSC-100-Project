import { useContext } from "react";
import LOGO from "../assets/logo/100_LOGO.svg";
import { AiOutlineShopping } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="h-32 p-6 w-screen flex sticky top-0 bg-white z-10">
      <div className="left flex gap-12 flex items-center pl-12">
        <img src={LOGO} alt="Website Logo" className="w-24" />
        <h1 className="font-black text-3xl">FARM-TO-TABLE</h1>
        <h2 className="text-2xl">Hello, Genevieve!</h2>
      </div>
      <div className="spacer m-auto"></div>
      <div className="right flex gap-12 items-center pr-12">
        <button className="flex items-center gap-2">
          <AiOutlineShopping />
          My Orders
        </button>
        <button className="flex items-center gap-2">
          <MdOutlineShoppingCart />
          Cart
        </button>
        <button className="form-button" onClick={logout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
