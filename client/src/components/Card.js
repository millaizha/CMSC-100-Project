import { useState } from "react";

/**
 * COMPONENT: Card
 * PURPOSE: Displays a product item with details, image, and "Add to Cart" functionality.
 *
 * PROPS:
 *  - product (Object): Product data including name, image, type, quantity, description, and price.
 *  - addToCart (Function): Callback function to add the product to the shopping cart.
 *
 * STATE:
 *  - quantity (number): The quantity of the product to be added to the cart (default: 1).
 *
 * USAGE:
 *  - Used on the "Shop" page to render individual product cards.
 *
 * NOTES:
 *  - Requires a product object conforming to the ProductSchema.
 *  - addToCart function must be provided to enable the "Add to Cart" feature.
 */

export default function Card({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="h-[470px] w-[270px] bg-[#F2F2F2] rounded-2xl flex flex-col p-2 border-2 border-white hover:border-black">
      <div className="h-[230px] w-full object-cover rounded-2xl overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-1 p-2">
        <span className="font-bold text-xl overflow-hidden whitespace-nowrap text-ellipsis">
          {product.name}
        </span>
        <div className="flex justify-between items-center">
          <div className="bg-white p-1 rounded-md text-sm w-16 flex justify-center">
            {product.type === 1 ? "Crop" : "Poultry"}
          </div>
          <div className="mr-1 text-sm font-bold">
            Stock: {product.quantity}
          </div>
        </div>

        <p className="h-12 w-full overflow-hidden text-ellipsis line-clamp-3 text-sm text-[12px] leading-4">
          {product.description}
        </p>
        <div className="flex gap-1 items-end mb-1">
          <div className="text-xl font-bold">PHP</div>
          <div className="text-4xl font-bold">{product.price}</div>
          <div className="font-bold">/ piece</div>
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            max="99"
            step="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)} // Update quantity state on change
            className="p-2 pl-4 rounded-xl"
          />
          <button
            className="rounded-xl bg-[#40573C] text-white px-4 w-full mx-auto text-md font-bold"
            onClick={
              () => addToCart({ ...product, selectedQuantity: quantity }) // Call addToCart prop with product and selected quantity
            }
          >
            {" "}
            + Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
