import { useContext } from "react";
import LOGO from "../assets/logo/100_LOGO.png";
import { HiOutlineReceiptTax } from "react-icons/hi";
import {
  MdPeopleOutline,
  MdOutlineShoppingBag,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="h-32 p-6 w-screen flex sticky top-0 bg-white z-10">
      <div className="left flex gap-12 items-center pl-12">
        <img
          src={LOGO}
          alt="Website Logo"
          className="w-24 cursor-pointer"
          onClick={() => navigate("/admin")}
        />
        <h1 className="font-black text-3xl">FARM-TO-TABLE</h1>
        <h2 className="text-2xl">Hello, Admin!</h2>
      </div>
      <div className="spacer m-auto"></div>
      <div className="right flex gap-12 items-center pr-12">
        <button
          className="flex items-center gap-2"
          onClick={() => navigate("/admin-users")}
        >
          <MdPeopleOutline />
          Users
        </button>
        <button
          className="flex items-center gap-2"
          onClick={() => navigate("/admin")}
        >
          <MdOutlineShoppingBag />
          Products
        </button>
        <button
          className="flex items-center gap-2"
          onClick={() => navigate("/admin-sales")}
        >
          <HiOutlineReceiptTax />
          Orders
        </button>
        <button
          className="flex items-center gap-2"
          onClick={() => navigate("/admin-report")}
        >
          <MdOutlineShoppingCart />
          Sales
        </button>
        <button
          className="form-button"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
