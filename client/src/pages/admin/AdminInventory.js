import InventoryCard from "../../components/InventoryCard";
import AdminNavbar from "../../components/AdminNavbar";
import { FaRegCircleXmark  } from 'react-icons/fa6'
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Popup from "../../components/AdminUpdatePopup";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Lenis from "@studio-freight/lenis";

export default function Shop() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [popupName, setPopupName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterOption, setFilterOption] = useState({});
  const [sortOption, setSortOption] = useState();
  const [activeSort, setActiveSort] = useState(null);
  const filterRef = useRef(null);

  const { token } = useContext(AuthContext);

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

  /**
   * useEffect (for fetching products):
   * - Fetches the product data from the backend API when the component mounts.
   * - Updates the `products` and `filteredProducts` state with the fetched data.
   * - Sets `loading` to `false` after the data is fetched.
   * - This effect has a dependency on the `token` to re-fetch data if the user's authentication changes.
   */
  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) {
        console.error("No token found");
        // setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3001/admin/getProductListings",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched products:", data);
          setProducts(data);
          setFilteredProducts(data);
        } else {
          console.error("Error fetching products:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  useEffect(() => {
    let filtered = [...products];

    if (filterOption.name) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filterOption.name.toLowerCase())
      );
    }

    if (sortOption) {
      const [key, order] = Object.entries(sortOption)[0];
      filtered.sort((a, b) => {
        if (order === 1) return a[key] > b[key] ? 1 : -1;
        else return a[key] < b[key] ? 1 : -1;
      });
    }

    setFilteredProducts(filtered);
  }, [filterOption, sortOption, products]);

  /** handleSort: Sets the sorting option based on the clicked button. */
  const handleSort = (key, order) => {
    setActiveSort({ key, order });
    setSortOption({ [key]: order === "Ascending" ? 1 : -1 });
  };

  /** handleFilter: Updates the filter options based on user input. */
  const handleFilter = (key, value) => {
    setFilterOption((prev) => ({ ...prev, [key]: value }));
  };

  /** handleReset: Clears all filter and sorting options. */
  const handleReset = () => {
    setFilterOption({});
    setSortOption(null);
    setActiveSort(null);
    filterRef.current.value = "";
  };

  return (
    <div className="h-screen w-screen">
      <AdminNavbar />

      <div className="main-container flex flex-grow mt-3">
        <div className="filter-container w-5/6 sm:w-[275px] h-[780px] p-6 m-12 mt-0 bg-[#F2F2F2] rounded-2xl flex-shrink-0 sm:sticky sm:top-36">
          <div className="flex flex-row justify-center items-center gap-2">
            <button className="form-button mb-6" 
            // onClick={addProduct}
            onClick={() => openModal()}
            >
              + Add Product
            </button>
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <h1 className="text-2xl font-black mb-2">SORT BY</h1>
            <button
              className={`bg-white text-xl rounded-lg w-full p-4 py-3  flex items-center gap-2 transition-colors ease-out ${
                activeSort?.key === "name" && activeSort?.order === "Ascending"
                  ? "bg-green-300"
                  : ""
              }`}
              onClick={() => handleSort("name", "Ascending")}
            >
              <FaArrowUp /> Name Ascending
            </button>
            <button
              className={`bg-white text-xl rounded-lg w-full p-4 py-3  flex items-center gap-2 transition-colors ease-out ${
                activeSort?.key === "price" && activeSort?.order === "Ascending"
                  ? "bg-green-300"
                  : ""
              }`}
              onClick={() => handleSort("price", "Ascending")}
            >
              <FaArrowUp />
              Price Ascending
            </button>

            <button
              className={`bg-white text-xl rounded-lg w-full p-4  py-3 flex items-center gap-2 transition-colors ease-out ${
                activeSort?.key === "type" && activeSort?.order === "Ascending"
                  ? "bg-green-300"
                  : ""
              }`}
              onClick={() => handleSort("type", "Ascending")}
            >
              <FaArrowUp /> Type Ascending
            </button>
            <button
              className={`bg-white text-lg rounded-lg w-full p-4 py-3  flex items-center gap-2 transition-colors ease-out ${
                activeSort?.key === "quantity" &&
                activeSort?.order === "Ascending"
                  ? "bg-green-300"
                  : ""
              }`}
              onClick={() => handleSort("quantity", "Ascending")}
            >
              <FaArrowUp /> Quantity Ascending
            </button>
            <button
              className={`bg-white text-xl rounded-lg w-full p-4 py-3  flex items-center gap-2  transition-colors ease-out mt-4 ${
                activeSort?.key === "name" && activeSort?.order === "Descending"
                  ? "bg-green-300"
                  : ""
              }`}
              onClick={() => handleSort("name", "Descending")}
            >
              <FaArrowDown /> Name Descending
            </button>
            <button
              className={`bg-white text-xl rounded-lg w-full p-4 py-3  flex items-center gap-2 transition-colors ease-out ${
                activeSort?.key === "price" &&
                activeSort?.order === "Descending"
                  ? "bg-green-300"
                  : ""
              }`}
              onClick={() => handleSort("price", "Descending")}
            >
              <FaArrowDown />
              Price Descending
            </button>
            <button
              className={`bg-white text-xl rounded-lg w-full p-4 py-3  flex items-center gap-2 transition-colors ease-out ${
                activeSort?.key === "type" && activeSort?.order === "Descending"
                  ? "bg-green-300"
                  : ""
              }`}
              onClick={() => handleSort("type", "Descending")}
            >
              <FaArrowDown />
              Type Descending
            </button>
            <button
              className={`bg-white text-lg rounded-lg w-full p-4  py-3 flex items-center gap-2  transition-colors ease-out ${
                activeSort?.key === "quantity" &&
                activeSort?.order === "Descending"
                  ? "bg-green-300"
                  : ""
              }`}
              onClick={() => handleSort("quantity", "Descending")}
            >
              <FaArrowDown /> Quantity Descending
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mt-4"
              onClick={handleReset}
            >
              Reset Filters
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
