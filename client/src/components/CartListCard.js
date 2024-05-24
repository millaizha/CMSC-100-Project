import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";

export default function CartListCard({ product }) {
  const [quantity, setQuantity] = useState(product.selectedQuantity);
  const { updateQuantity } = useCart();

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    updateQuantity(product.id, newQuantity);
  };

  return (
    <div className="w-full h-24 bg-[#EEDBDB] rounded-xl px-4 py-2">
      <div className="flex h-full items-center gap-3">
        <input
          type="number"
          min="1"
          max="99"
          step="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="p-2 pl-4 h-10 rounded-xl"
        />
        <div className="overflow-hidden h-full w-24 bg-red-300 rounded-xl">
          <img
            src={product.imageURL}
            alt={product.name}
            className="object-cover h-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="font-black">{product.name}</h1>
          <div className="bg-white p-1 rounded-md text-sm w-16 flex justify-center">
            {product.type === 1 ? "Crop" : "Poultry"}
          </div>
        </div>

        <div className="spacer mx-auto"></div>

        <div className="flex justify-between items-center">
          <div className="flex items-end gap-1">
            <div className="text-xl font-bold">PHP</div>
            <div className="text-4xl font-bold">{product.price * quantity}</div>
          </div>

          <div className="spacer w-16"></div>

          <div className="text-red-600">
            {" "}
            <FaTrash />
          </div>
        </div>
      </div>
    </div>
  );
}
