import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";

/**
 * COMPONENT: OrderListCard
 * PURPOSE: Displays a product item within an order summary, including quantity, image, name, type, and total price.
 *
 * PROPS:
 *  - product (Object): Object containing product details and quantity in the order.
 *
 * STATE:
 *  - quantity (number): The quantity of the product in the order (this is set to the initial product count and doesn't change).
 *
 * USAGE:
 *  - Used within the order page to display the individual items included in the order.
 */

export default function OrderListCard({ product }) {
  const [quantity, setQuantity] = useState(product.count);

  console.log(product);
  return (
    <div className="w-full h-24 bg-gray-50 rounded-xl px-4 py-2">
      <div className="flex h-full items-center gap-3">
        <div className="p-4 h-10 rounded-xl bg-white flex items-center justify-center">
          {product.count}
        </div>
        <div className="overflow-hidden h-full w-24 bg-red-300 rounded-xl">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover h-full w-full"
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
            <div className="text-4xl font-bold">
              {(product.price * quantity).toFixed(2)}
            </div>
          </div>

          <div className="spacer w-16"></div>
        </div>
      </div>
    </div>
  );
}
