import { FaTrash } from "react-icons/fa6";

export default function InventoryCard({ show, products }) {
    return (
      <>
         {products.map((product) => {
          return(
            <div className="h-[470px] w-[270px] bg-[#F2F2F2] rounded-2xl flex flex-col p-2">
              <div className="h-[230px] w-full object-cover rounded-2xl overflow-hidden">
                <img
                  src={product.imageURL}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
        
              <div className="flex flex-col gap-1 p-2">
                <span className="font-bold text-xl overflow-hidden whitespace-nowrap text-ellipsis">{product.name}</span>
                <div className="bg-white p-1 rounded-md text-sm w-16 flex justify-center">
                  {product.type}
                </div>
                <p className="h-12 w-full overflow-hidden text-ellipsis line-clamp-3 text-sm text-[12px] leading-4">{product.description}</p>
              <div className="flex gap-1 items-end mb-1">
                <div className="text-xl font-bold">PHP</div>
                <div className="text-4xl font-bold">{product.price}</div>
                <div className="font-bold">/ {product.item}</div>
              </div>
              
              <div className="flex gap-2">
                <input type='number' min='1' max='99' step='1' value='1' className="p-2 pl-4 rounded-xl"/>
                <button className="rounded-xl bg-[#40573C] text-white px-4 w-full mx-auto text-md font-bold" onClick={() => show(product.imageURL, product.name)}> + Add to cart</button>
              </div>
              </div>
                  
            </div>
          )
    })}
    </>
    );
  }
  