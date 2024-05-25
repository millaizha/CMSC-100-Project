import "react-loading-skeleton/dist/skeleton.css";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import Popup from "../../components/Popup";
import SkeletonCard from "../../components/SkeletonCard";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import Lenis from "@studio-freight/lenis";

export default function Shop() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [popupName, setPopupName] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState();
  const [filterOption, setFilterOption] = useState({});

  const { addToCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3001/customer/getProductListings",
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
        setLoading(false);
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

  const handleFilter = (key, value) => {
    setFilterOption((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />

      <div className="main-container flex pt-3">
        <div className="filter-container w-[275px] h-[800px] p-6 m-12 mt-0 bg-[#F2F2F2] rounded-2xl flex-shrink-0 sticky top-36">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-black mb-2">SEARCH</h1>
            <input
              type="text"
              placeholder="Name"
              className="bg-white text-xl rounded-lg w-full p-4"
              onChange={(e) => handleFilter("name", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <h1 className="text-2xl font-black mb-2">SORT BY</h1>
            <button
              className="bg-white text-xl rounded-lg w-full p-4"
              onClick={() => handleSort("name", "Ascending")}
            >
              Name Ascending
            </button>
            <button
              className="bg-white text-xl rounded-lg w-full p-4"
              onClick={() => handleSort("name", "Descending")}
            >
              Name Descending
            </button>
            <button
              className="bg-white text-xl rounded-lg w-full p-4"
              onClick={() => handleSort("price", "Ascending")}
            >
              Price Ascending
            </button>
            <button
              className="bg-white text-xl rounded-lg w-full p-4"
              onClick={() => handleSort("price", "Descending")}
            >
              Price Descending
            </button>
            <button
              className="bg-white text-xl rounded-lg w-full p-4"
              onClick={() => handleSort("type", "Ascending")}
            >
              Type Ascending
            </button>
            <button
              className="bg-white text-xl rounded-lg w-full p-4"
              onClick={() => handleSort("type", "Descending")}
            >
              Type Descending
            </button>
            <button
              className="bg-white text-xl rounded-lg w-full p-4"
              onClick={() => handleSort("quantity", "Ascending")}
            >
              Quantity Ascending
            </button>
            <button
              className="bg-white text-xl rounded-lg w-full p-4"
              onClick={() => handleSort("quantity", "Descending")}
            >
              Quantity Descending
            </button>
          </div>
        </div>
        <div className="content-container p-6 pt-0 h-full overflow-y-auto">
          <h1 className="font-black text-6xl mb-6">OUR PRODUCTS</h1>
          {loading ? (
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 12 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {filteredProducts.map((product) => (
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
