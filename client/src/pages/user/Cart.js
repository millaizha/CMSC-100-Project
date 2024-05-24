import CartListCard from "../../components/CartListCard";
import Navbar from "../../components/Navbar";
import { FaTrash } from "react-icons/fa";
import { useContext } from 'react';
import { CartContext } from "../../contexts/CartContext";

export default function Cart({ cartList }) {
  const { cart } = useContext(CartContext);

  return (
    <div className="h-screen w-screen">
      <Navbar />

      <div className="main-container mt-3 flex">
        <div className="spacer mx-auto"></div>
        <div className="cart-container w-[800px]">
          <h1 className="font-black text-6xl">SHOPPING CART</h1> 
          {cart.length === 0 ? (<p>Your cart empty.</p>) : (
          <div className="list-container mt-8 flex flex-col gap-2 h-full">
            {cart.map((item, index) => <CartListCard product={item}
            />)}

            <div className="self-end mt-4 flex flex-col items-end gap-6">
              <div className="flex items-end gap-1">
                <h1 className="text-xl font-bold mr-12">TOTAL</h1>

                <div className="text-xl font-bold">PHP</div>
                <div className="text-4xl font-bold">41.99</div>

                <div className="spacer w-[90px]"></div>
              </div>

              <button className="form-button">Confirm Order</button>
            </div>
          </div>)}
        </div>
        <div className="spacer mx-auto"></div>
      </div>
    </div>
  );
}
