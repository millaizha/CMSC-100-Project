import InventoryCard from "../../components/InventoryCard";
import AdminNavbar from "../../components/AdminNavbar";
import Popup from "../../components/Popup";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Lenis from "@studio-freight/lenis";

export default function Shop() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [popupName, setPopupName] = useState("");
  const [products, setProducts] = useState([]);

  const { token } = useContext(AuthContext);

  const handleButtonClick = (image, name) => {
    setShowPopup(true);
    setPopupImage(image);
    setPopupName(name);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
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
          // setFilteredProducts(data);
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

  return (
    <div className="h-screen w-screen">
      <AdminNavbar />

      <div className="main-container flex flex-grow mt-3">
        <div className="filter-container w-[275px] h-[600px] p-6 m-12 mt-0 bg-[#F2F2F2] rounded-2xl flex-shrink-0">
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
            {/* <Card show={handleButtonClick} />
            <Card show={handleButtonClick} />
            <Card show={handleButtonClick} />
            <Card show={handleButtonClick} />
            <Card show={handleButtonClick} />
            <Card show={handleButtonClick} />
            <Card show={handleButtonClick} />
            <Card show={handleButtonClick} />
            <Card show={handleButtonClick} />
            <Card show={handleButtonClick} />
            <Card show={handleButtonClick} /> */}
            <InventoryCard show={handleButtonClick} products={products} />
          </div>
        </div>
      </div>
      <Popup
        show={showPopup}
        onClose={handleClosePopup}
        image={popupImage}
        title={popupName}
      />
    </div>
  );
}
