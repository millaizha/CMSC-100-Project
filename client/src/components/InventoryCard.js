import { useState, useEffect } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";

export default function InventoryCard({ show, products }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productImage, setProductImage] = useState('');
  const [imageURL, setImageURL] = useState('');
  
  const openModal = (index) => {
    setShowModal(true);
    setSelectedIndex(index);
  };

  useEffect(() => {
      if (selectedIndex !== null && products[selectedIndex] && products.length > 0) {
          setProductName(products[selectedIndex].name);
          setProductType(products[selectedIndex].type);
          setProductDescription(products[selectedIndex].description);
          setProductPrice(products[selectedIndex].price);
          setProductStock(products[selectedIndex].quantity);
          setProductImage(products[selectedIndex].imageUrl);
          setImageURL(products[selectedIndex].imageUrl); // Initialize imageURL with the product image
      }
  }, [selectedIndex, products]);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
  };

  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const handleProductStockChange = (event) => {
    setProductStock(event.target.value);
  };

  const handleProductImageChange = (event) => {
    const newImageURL = event.target.value;
    setImageURL(newImageURL); // Update imageURL with the new value from the input field
    setProductImage(newImageURL); // Update productImage with the new value from the input field
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      {products.map((product, i) => {
        return (
          <div
            className="h-[470px] w-[270px] bg-[#F2F2F2] rounded-2xl flex flex-col p-2"
            key={i}
          >
            <div className="h-[230px] w-full object-cover rounded-2xl overflow-hidden">
              <img
                src={product.imageUrl}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-col gap-1 p-2">
              <span className="font-bold text-xl overflow-hidden whitespace-nowrap text-ellipsis">
                {product.name}
              </span>
              <div className="bg-white p-1 rounded-md text-sm w-16 flex justify-center">
                {product.type == 1 ? "Crop" : "Poultry"}
              </div>
              <p className="h-12 w-full overflow-hidden text-ellipsis line-clamp-3 text-sm text-[12px] leading-4">{product.description}</p>
            <div className="flex gap-1 items-end mb-1">
              <div className="text-xl font-bold">PHP</div>
              <div className="text-4xl font-bold">{product.price}</div>
              <div className="font-bold">/ piece</div>
            </div>
            <div className="flex gap-1 items-end mb-1">
              <div className="text-xl font-bold">Stocks:</div>
              <div className="text-xl font-bold">{product.quantity}</div>
            </div>
            
            <div className="flex gap-2">
              <button className="rounded-xl bg-[#40573C] text-white px-4 w-full mx-auto text-md font-bold" onClick={() => openModal(i)}>Edit Product</button>
            </div>
            </div>
            {showModal && selectedIndex !== null && (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Product Information
                        </h3>
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
                                <label
                                  class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                  for="inline-full-name"
                                >
                                  Product Image URL
                                </label>
                              </div>
                              <div class="md:w-2/3">
                                <input
                                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-emerald-600"
                                  id="image"
                                  type="text"
                                  placeholder="Product Name"
                                  value={productImage}
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
                                  value={productName}
                                  onChange={handleProductNameChange}
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
                                  value={productType}
                                  onChange={handleProductTypeChange}
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
                                  value={productDescription}
                                  onChange={handleProductDescriptionChange}
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
                                  value={productPrice}
                                  onChange={handleProductPriceChange}
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
                                  value={productStock}
                                  onChange={handleProductStockChange}
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
                              Delete
                            </button>
                            <button
                              className="bg-[#40573C] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="submit"
                              onClick={() => setShowModal(false)}
                            >
                              Update
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
          </div>
        );
      })}
    </>
  );
}
