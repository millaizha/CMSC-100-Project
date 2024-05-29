import { FaRegCircleCheck, FaRegCircleXmark  } from 'react-icons/fa6'
// import Navbar from "../components/Navbar";

export default function SaleReportCard({ users }) {
    function getTotal(products) {
        let total = 0;
        products.forEach((product) => {
            total += product.count * product.price;
        });
        return total;
    }

    function getStatusColor(status) {
        if (status == "Confirmed") 
            return "rounded-xl px-4 py-2 font-black bg-[#80EF80]";
        else if (status == "Pending") 
            return "rounded-xl px-4 py-2 font-black bg-[#ffc64d]";
        return "rounded-xl px-4 py-2 font-black bg-[#FF6961]";
    }

    return( 
        <div className="main-container mt-3 flex">
        <div className="spacer mx-auto"></div>
        <div className="cart-container w-[800px]">
          <h1 className="font-black text-6xl">Sales Report</h1>
          <div className="list-container mt-8 flex flex-col gap-2 h-full">
            {users.map((user, key) => {
                return (
                    <div className="list-container mt-8 flex flex-col gap-2 h-full">
                    <div className="w-full h-16 rounded-xl px-4 py-2">
                        <div className="flex h-full items-center gap-3">
                            <div className="flex flex-col gap-1">
                                <h1 className="font-bold">{user.name}</h1>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h1 className="font-light">({user.date})</h1>
                            </div>

                            <div className="spacer mx-auto"></div>

                            <div className="flex flex-col gap-1">
                                <h1 className="font-bold">Total - P{getTotal(user.products)}</h1>
                            </div>
                            
                            <div className="flex flex-col gap-1">
                                <h1 className={getStatusColor(user.status)}>{user.status}</h1>
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
      </div>
      
    );
  }
  