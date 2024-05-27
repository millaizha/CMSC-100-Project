import InventoryCard from "../../components/InventoryCard";
import AdminNavbar from "../../components/AdminNavbar";
import { FaRegCircleXmark  } from 'react-icons/fa6'
import Popup from "../../components/AdminUpdatePopup";
import { useState } from "react";

export default function Shop() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [popupName, setPopupName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const handleButtonClick = (image, name) => {
    setShowPopup(true);
    setPopupImage(image);
    setPopupName(name);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleProductImageChange = (event) => {
    const newImageURL = event.target.value;
    setImageURL(newImageURL);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const products = [
    {
        name: "Orange",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/2560px-Orange-Fruit-Pieces.jpg",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores cupiditate quam veniam vel fugit error explicabo quaerat ducimus doloremque nesciunt mollitia laborum eius ullam quod velit, nostrum consequuntur delectus illo.",
        type: "Fruit",
        price: 99,
        unit: "piece",
        stock: 100
    },
    {
        name: "Orange orange",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/2560px-Orange-Fruit-Pieces.jpg",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores cupiditate quam veniam vel fugit error explicabo quaerat ducimus doloremque nesciunt mollitia laborum eius ullam quod velit, nostrum consequuntur delectus illo.",
        type: "Fruit",
        price: 299,
        unit: "piece",
        stock: 100
    },
  ]

  return (
    <div className="h-screen w-screen">
      <AdminNavbar />

      <div className="main-container flex flex-grow mt-3">
        <div className="filter-container w-[275px] h-[650px] p-6 m-12 mt-0 bg-[#F2F2F2] rounded-2xl flex-shrink-0">
          <div className="flex flex-row justify-center items-center gap-2">
            <button className="form-button mb-6" 
            // onClick={addProduct}
            onClick={() => openModal()}
            >
              + Add Product
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-black mb-2">FILTER BY</h1>
            <button className="bg-white text-xl rounded-lg w-full p-4 ">
              Name
            </button>
            <button className="bg-white text-xl rounded-lg w-full p-4 ">
              Type
            </button>
            <button className="bg-white text-xl rounded-lg w-full p-4 ">
              Price
            </button>
            <button className="bg-white text-xl rounded-lg w-full p-4 ">
              Quantity
            </button>
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <h1 className="text-2xl font-black mb-2">SORT BY</h1>
            <button className="bg-white text-xl rounded-lg w-full p-4 ">
              Ascending
            </button>
            <button className="bg-white text-xl rounded-lg w-full p-4 ">
              Descending
            </button>
          </div>
        </div>
        <div className="content-container p-6 pt-0 h-screen overflow-y-auto">
          <h1 className="font-black text-6xl mb-6">PRODUCT INVENTORY</h1>
          <div className="flex flex-wrap gap-2">
            <InventoryCard show={handleButtonClick} products={products}/>
          </div>
        </div>
      </div>
      {showModal && (
              <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                              <h3 className="text-3xl font-semibold">Product Information</h3>
                              <button
                                  className="p-1 ml-16 text-black float-right text-3xl"
                                  onClick={() => setShowModal(false)}
                              >
                                  <FaRegCircleXmark />
                              </button>
                          </div>
                          <div className="relative p-6 flex-auto border-b border-solid border-blueGray-200 rounded-t">
                            <form onSubmit={handleSubmit}>
                              <div className="flex flex-row justify-center">
                                <img
                                  src={imageURL}
                                  alt=""
                                  className="object-cover w-20 h-20 "
                                />
                              </div>
                              <div className="flex items-center gap-3">
                                <div class="md:flex md:items-center mb-6">
                                <div class="md:w-1/3">
                                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                    Product Image URL
                                  </label>
                                </div>
                                <div class="md:w-2/3">
                                  <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-emerald-600" 
                                  id="image"
                                  type="text"
                                  placeholder="Product Name"
                                  onChange={handleProductImageChange}
                                  // ref={nameRef}
                                  />
                                </div>
                              </div>
                              </div>
                              <div class="md:flex md:items-center mb-6">
                                <div class="md:w-1/3">
                                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                    Product Name
                                  </label>
                                </div>
                                <div class="md:w-2/3">
                                  <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-emerald-600" 
                                  id="name"
                                  type="text"
                                  placeholder="Product Name"
                                  // ref={nameRef}
                                  />
                                </div>
                              </div>
                              <div class="md:flex md:items-center mb-6">
                                <div class="md:w-1/3">
                                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                    Product Type
                                  </label>
                                </div>
                                <div class="md:w-2/3">
                                  <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-emerald-600" 
                                  id="type"
                                  type="text"
                                  placeholder="Product Type"
                                  // ref={typeRef}
                                  />
                                </div>
                              </div>
                              <div class="md:flex md:items-center mb-6">
                                <div class="md:w-1/3">
                                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                    Product Description
                                  </label>
                                </div>
                                <div class="md:w-2/3">
                                  <textarea class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-emerald-600" 
                                  id="type"
                                  placeholder="Product Description"
                                  // ref={typeRef}
                                  />
                                </div>
                              </div>
                              <div class="md:flex md:items-center mb-6">
                                <div class="md:w-1/3">
                                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                    Product Unit
                                  </label>
                                </div>
                                <div class="md:w-2/3">
                                  <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-emerald-600" 
                                  id="type"
                                  type="text"
                                  placeholder="Product Unit"
                                  // ref={typeRef}
                                  />
                                </div>
                              </div>
                              <div class="md:flex md:items-center mb-6">
                                <div class="md:w-1/3">
                                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                    Product Price
                                  </label>
                                </div>
                                <div class="md:w-2/3">
                                  <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-emerald-600" 
                                  id="type"
                                  type="number"
                                  placeholder="Product Price"
                                  // ref={typeRef}
                                  />
                                </div>
                              </div>
                              <div class="md:flex md:items-center mb-6 flex items-center gap-3">
                                <div class="md:w-1/3">
                                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                    Product Stocks
                                  </label>
                                </div>
                                <div class="md:w-2/3">
                                  <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-emerald-600" 
                                  id="type"
                                  type="number"
                                  placeholder="Product Stocks"
                                  // ref={typeRef}
                                  />
                                </div>
                              </div>
                              <div className="flex items-center justify-end p-6">
                            <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal(false)}
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-[#40573C] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="submit"
                              onClick={() => setShowModal(false)}
                            >
                              Add
                            </button>
                          </div>
                            </form>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            )}
      {/* <Popup
        show={showPopup}
        onClose={handleClosePopup}
        image={popupImage}
        title={popupName}
      /> */}
    </div>
  );
}
