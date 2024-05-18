import LOGO from "../assets/logo/100_LOGO.svg";

export default function Navbar() {
  return <div className="h-24 pt-6 w-screen flex">
    <div className="left flex gap-12 flex items-center pl-12">
        <img src={LOGO} alt="Website Logo" className="w-24"/>
        <h1 className="font-black text-2xl">FARM-TO-TABLE</h1>
        <h2>Hello, Genevieve!</h2>
    </div>
    <div className="spacer m-auto"></div>
    <div className="right flex gap-12 items-center pr-12">
        <button>My Orders</button>
        <button>Cart</button>
        <button className="form-button">Log Out</button>
    </div>
  </div>
}
