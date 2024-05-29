import { FaRegCircleCheck, FaRegCircleXmark  } from 'react-icons/fa6'
import { useState, useEffect, useContext, useRef } from "react";

export default function SaleReportCard({ users }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

    
  const openModal = (index) => {
    setShowModal(true);
    setSelectedIndex(index);
  };

    function getTotal(products) {
        let total = 0;
        products.forEach((product) => {
            total += product.count * product.price;
        });
        return total;
    }

    const getOverallSales = () => {
        let total = 0;
        if (
          selectedIndex !== null &&
          users[selectedIndex] &&
          users[selectedIndex].products
        ) {
          users[selectedIndex].products.forEach((product) => {
            total += product.count * product.price;
          });
        }
        return total;
      };

    return( 
        <div className="main-container mt-3 flex">
        <div className="spacer mx-auto"></div>
        <div className="cart-container w-[800px]">
          <h1 className="font-black text-6xl">Sales Report</h1>
          <div className="list-container mt-8 flex flex-col gap-2 h-full">
            {users.map((user, i) => {
                return (
                    <div 
                    className="list-container mt-8 flex flex-col gap-2 h-full cursor-pointer"
                    onClick={() => openModal(i)}
                    key={i}>
                    <div className="w-full h-16 rounded-xl px-4 py-2">
                        <div className="flex h-full items-center gap-3">
                            <div className="flex flex-col gap-1">
                                <h1 className="font-bold">{user.name}</h1>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h1 className="font-light">({new Date(user.dateTimeOrdered).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })})</h1>
                            </div>

                            <div className="spacer mx-auto"></div>

                            <div className="flex flex-col gap-1">
                                <h1 className="font-bold">Total - P{getTotal(user.products)}</h1>
                            </div>
                            
                            <div className="flex flex-col gap-1 rounded-xl px-4 py-2 font-black bg-[#80EF80]">
                                <h1>Confirmed</h1>
                            </div>
                        </div>
                    </div>
                    {user.products.map((product, key) => {
                        return (
                        <div className="w-full h-16 bg-[#EEDBDB] rounded-xl px-4 py-2">
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-black">{product.name}</h1>
                                </div>
                                
                                <div className="spacer mx-auto"></div>

                                <div className="flex items-end gap-1">
                                    <div className="font-black">P{product.price}</div>
                                </div>

                                <div className="flex bg-white rounded-xl px-4 py-2 justify-between items-center">
                                    <div className="flex items-end gap-1">
                                        <div className="font-black">x{product.count}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                    </div>
                )
            })}
        </div>
        </div>
        <div className="spacer mx-auto"></div>
        {showModal && selectedIndex !== null && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <h3 className="text-3xl font-semibold">Order Information</h3>
                          <button
                              className="p-1 ml-16 text-black float-right text-3xl"
                              onClick={() => setShowModal(false)}
                          >
                              <FaRegCircleXmark />
                          </button>
                      </div>
                      <div className="relative p-6 flex-auto border-b border-solid border-blueGray-200 rounded-t">
                          <h1 className="font-bold">Delivery Information </h1>
                          <p className="font-medium">{users[selectedIndex].name}</p>
                          <p className="font-medium">{users[selectedIndex].email}</p>
                          <p className="font-medium">{users[selectedIndex].address}</p>
                      </div>
                      <div className="relative p-6 flex-auto border-b border-solid border-blueGray-200 rounded-t">
                          <h1 className="font-bold">{users[selectedIndex].products.length === 1 ? "Order" : "Orders"}</h1>
                          {users[selectedIndex].products.map((product, key) => {
                          return (
                              <div className="w-full h-24 px-4 py-2 ">
                                  <div className="flex items-center gap-3">
                                      <img
                                        src={product.imageUrl}
                                        alt=""
                                        className="object-cover w-20 h-20"
                                      />
                                      <div className="flex flex-col gap-1">
                                        <h1 className="font-black">{product.name}</h1>
                                        <h1 className="font-regular">{product.type}</h1>
                                      </div>
                                      
                                      <div className="spacer mx-auto"></div>

                                      <div className="flex flex-col items-end gap-1">
                                        <div className="font-regular">x{product.count}</div>
                                        <div className="font-semibold">P{product.count * product.price}</div>
                                      </div>
                                  </div>
                              </div>
                            )
                          })}
                      </div>
                      <div className="flex items-center relative p-6 flex-auto">
                          <h1 className="font-bold">Order Total </h1>
                          <div className="spacer mx-auto"></div>
                          <h1 className="font-bold">P{getOverallSales()}</h1>
                      </div>
                  </div>
              </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      </div>
      
    );
  }
  