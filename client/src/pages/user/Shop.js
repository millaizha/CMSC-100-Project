import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import Popup from "../../components/Popup";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";

export default function Shop() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [popupName, setPopupName] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState(1);

  const { addToCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/customer/getProductListings",
          {
            method: "GET",
            headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          console.log(products);
        } else {
          console.error("Error fetching products:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (token) {
      fetchProducts();
    }
  }, [sortOption, token]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowPopup(true);
    setPopupImage(product.imageURL);
    setPopupName(product.name);
  };

  const handleSort = (key, order) => {
    setSortOption({ [key]: order === "Ascending" ? 1 : -1 });
  };

  return (
    <div className="h-screen w-screen">
      <Navbar />

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
            <button
              className="bg-white text-xl rounded-lg w-full p-4 "
              onClick={() => handleSort("name", "Ascending")}
            >
              Ascending
            </button>
            <button
              className="bg-white text-xl rounded-lg w-full p-4 "
              onClick={() => handleSort("name", "Descending")}
            >
              Descending
            </button>
          </div>
        </div>
        <div className="content-container p-6 pt-0 h-screen overflow-y-auto">
          <h1 className="font-black text-6xl mb-6">OUR PRODUCTS</h1>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {products.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  addToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
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
