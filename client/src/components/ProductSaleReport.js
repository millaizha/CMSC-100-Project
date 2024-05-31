import { FaRegCircleXmark } from 'react-icons/fa6'
import { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function ProductSaleReport({ product }) {
  const [showModal, setShowModal] = useState(false);

   /**
   * useEffect (for smooth scrolling):
   * - Initializes and configures the Lenis smooth scrolling library.
   * - This effect runs only once when the component mounts.
   */
   useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const openModal = (e) => {
    setShowModal(true);
    e.stopPropagation();
    }

    const closeModal = (e) => {
        setShowModal(false);
        e.stopPropagation();
    }

    return( 
        <div 
        className="w-full h-24 bg-[#EEDBDB] rounded-xl px-4 py-2 m-3 cursor-pointer"
        onClick={(e) => openModal(e)}>
        <div className="flex items-center gap-3">
            <div className="flex gap-4">
                <img
                    src={product.imageUrl}
                    alt=""
                    className="object-cover w-20 h-20 rounded-xl"
                />
                <h1 className="font-black">{product.name}</h1>
            </div>
            
            <div className="spacer mx-auto"></div>

        <div className="flex justify-between items-center">
            <div className="flex items-end gap-1">
            <div className="font-bold">Total Sale: <span className=" bg-white rounded-xl px-4 py-2 font-black">P{product.totalSales.toFixed(2)}</span></div>
            </div>
        </div>
        </div>
        {showModal ? (
        <>
          <div className="cursor-default justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <h3 className="text-3xl font-semibold">Product Sale Summary</h3>
                          <button
                              className="p-1 ml-16 text-black float-right text-3xl"
                              onClick={(e) => closeModal(e)}>
                              <FaRegCircleXmark/>
                          </button>
                      </div>
                      <div className="relative p-6 flex-auto border-b border-solid border-blueGray-200 rounded-t">
                          <p className="font-bold">Product Name:</p>
                          <p className="font-medium">{product.name}</p>
                          <p className="font-bold">Product Type:</p>
                          <p className="font-medium">{product.type === 1 ? "Crop" : "Poultry"}</p>
                          <p className="font-bold">Product Description:</p>
                          <p className="font-medium">{product.description}</p>
                      </div>
                      <div className="relative p-6 flex-auto border-b border-solid border-blueGray-200 rounded-t">
                          <div className="font-bold">Product Price: <span className="font-medium">{product.price}</span></div>
                          <div className="font-bold">Product Total Number Sold: <span className="font-medium">{product.totalQuantity}</span></div>
                      </div>
                      <div className="flex items-center justify-center relative p-6 flex-auto border-b border-solid border-blueGray-200 rounded-t">
                          <p className="font-black text-3xl">Total Sale</p>    
                          <div className="spacer mx-5"></div>
                          <p className="font-black text-3xl">P{product.totalSales.toFixed(2)}</p>
                      </div>
                  </div>
              </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )  : null}
    </div>
    )
}
