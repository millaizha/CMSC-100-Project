import { FaRegCircleCheck, FaRegCircleXmark  } from 'react-icons/fa6'
// import Navbar from "../components/Navbar";

export default function AdminOrderCard({ users }) {
    return( 
      <div className="list-container mt-8 flex flex-col gap-2 h-full">
      {users.map((user, key) => {
          return (
            <div className="list-container mt-8 flex flex-col gap-2 h-full">
              <div className="w-full h-16 rounded-xl px-4 py-2">
                  <div className="flex h-full items-center gap-3">
                      <div className="flex flex-col gap-1">
                          <h1 className="font-bold">{user.name}</h1>
                      </div>
                      
                      <div className="flex justify-between items-center">
                          <div className="flex items-end gap-1">
                              <div className="font-light">({user.email})</div>
                          </div>
                      </div>

                      <div className="spacer mx-auto"></div>
                      <button
                        type="button"
                        className="text-red"
                        >
                        <FaRegCircleCheck />
                    </button>
                    <button
                        type="button"
                        className="text-red"
                        >
                        <FaRegCircleXmark />
                    </button>
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

                          <div className="flex bg-white rounded-xl px-4 py-2 justify-between items-center">
                              <div className="flex items-end gap-1">
                                  <div className="font-black">{product.count}</div>
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
    );
  }
  