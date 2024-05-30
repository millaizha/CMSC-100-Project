import ProductSaleReport from "../../components/ProductSaleReport";
import TimeReportCard from "../../components/TimeReportCard";
import AdminNavbar from "../../components/AdminNavbar";
import Lenis from "@studio-freight/lenis";
import { useEffect, useState, useContext, useRef  } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function AdminReport() {
  const { token } = useContext(AuthContext);

  const [items, setItems] = useState([]);


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
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3001/report/getProductsSold`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched products:", data);
          setItems(data);
        } else {
          console.error("Error fetching products:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching orproductsders:", error);
      }
    };

    fetchProducts();
  }, [token]);

    return (
        <div className="h-screen w-screen">
          <AdminNavbar />
    
          <div className="main-container flex flex-grow mt-3">
            
            <div className="filter-container w-[700px] p-6 m-12 mt-0 rounded-2xl flex-shrink-0">
              <h1 className="font-black text-4xl mb-6">PRODUCT SALES REPORT</h1>
              {items.map((product) => (
                <ProductSaleReport product={product}/>
              ))}
            </div>

            <div className="spacer mx-auto"></div>

            <div className="filter-container w-[1000px] p-6 m-12 mt-0 rounded-2xl flex-shrink-0">
            <h1 className="font-black text-4xl mb-6"> SALES REPORT</h1>
              {/* <TimeReportCard items={items}/> */}
            </div>

        </div>
        </div>
      );
}