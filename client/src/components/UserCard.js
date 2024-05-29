import { useState } from "react";
import { FaRegCircleXmark  } from 'react-icons/fa6'

export default function UserCard({ users }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const openModal = (index) => {
        setShowModal(true);
        setSelectedIndex(index);
    };

    return (
        <div className="list-container mt-8 flex flex-col gap-2 h-full">
            {users.map((user, i) => (
                <div key={i}>
                    <button 
                        className="w-full h-16 bg-[#EEDBDB] rounded-xl px-4 py-2 "
                        onClick={() => openModal(i)}
                        type="button"
                    >
                        <div className="flex h-full items-center gap-3">
                            <div className="flex flex-col gap-1">
                                <h1 className="font-black">{user.firstName} {user.middleName} {user.lastName}</h1>
                            </div>
                    
                            <div className="spacer mx-auto"></div>
                            
                            <div className="flex justify-between items-center">
                                <div className="flex items-end gap-1">
                                    <div className="font-black">{user.email}</div>
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            ))}
            {showModal && selectedIndex !== null && (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">User Information</h3>
                                    <button
                                        className="p-1 ml-16 text-black float-right text-3xl"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <FaRegCircleXmark />
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <h1 className="font-bold">Name: <p className="font-medium">{users[selectedIndex].firstName} {users[selectedIndex].middleName} {users[selectedIndex].lastName}</p></h1>
                                    <div className="font-bold">Email: <p className="font-medium">{users[selectedIndex].email}</p></div>
                                    <div className="font-bold">Address: <p className="font-medium">{users[selectedIndex].address}</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}
    </div>
    );
};