import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";

/**
 * COMPONENT: CartListCard
 * PURPOSE: Displays a product item within a user's shopping cart, including quantity selection, image, name, type, total price, and a delete option.
 *
 * PROPS:
 *  - product (Object): Object containing product details and quantity in the cart.
 *
 * STATE:
 *  - quantity (number): The quantity of the product currently in the cart.
 *
 * CONTEXT:
 *  - useCart: A React Context hook providing functions for updating quantity and removing items from the cart.
 *
 * USAGE:
 *  - Used within a shopping cart page to display individual items added by the user.
 */

export default function CartListCard({ product }) {
  let item = product.product;
  const [quantity, setQuantity] = useState(product.quantity);
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    updateQuantity(product._id, newQuantity);
  };

  const handleDelete = () => {
    removeFromCart(product._id);
  };

  return (
    <div className="w-full h-24 bg-[#EEDBDB] rounded-xl px-4 py-2">
      <div className="flex h-full items-center gap-3">
        <select
          value={quantity}
          onChange={handleQuantityChange}
          className="p-2 pl-4 h-10 rounded-xl"
        >
          {Array.from({ length: product.quantity }, (_, i) => i + 1).map(
            (num) => (
              <option key={num} value={num}>
                {num}
              </option>
            )
          )}
        </select>
        <div className="overflow-hidden h-full w-24 bg-red-300 rounded-xl">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="object-cover h-full w-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="font-black">{item.name}</h1>
          <div className="bg-white p-1 rounded-md text-sm w-16 flex justify-center">
            {product.type === 1 ? "Crop" : "Poultry"}
          </div>
        </div>

        <div className="spacer mx-auto"></div>

        <div className="flex justify-between items-center">
          <div className="flex items-end gap-1">
            <div className="text-xl font-bold">PHP</div>
            <div className="text-4xl font-bold">
              {(item.price * quantity).toFixed(2)}
            </div>
          </div>

          <div className="spacer w-16"></div>

          <div className="text-red-600" onClick={handleDelete}>
            <FaTrash />
          </div>
        </div>
      </div>
    </div>
  );
}
