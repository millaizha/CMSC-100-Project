import SaleReportCard from "../../components/SaleReportCard";
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
    const fetchOrders = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3001/report/getRecentSales`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ earliestDate: "2024-01-01", limit: 5}),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched orders:", data);
          setItems(data);
        } else {
          console.error("Error fetching orders:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [token]);

    // const items = [
    //     {
    //       name: "Mill Valencia",
    //       email: "mill@mail.com",
    //       products: [
    //         {
    //           name: "Product 1",
    //           count: 1,
    //           price: 100,
    //         },
    //         {
    //           name: "Product 2",
    //           count: 2,
    //           price: 200,
    //         },
    //       ],
    //       date: "2024-01-18",
    //       status: "Pending"
    //     },
    //     {
    //       name: "Kyle Vinuya",
    //       email: "kyle@mail.com",
    //       products: [
    //         {
    //           name: "Product 1",
    //           count: 1,
    //           price: 100,
    //         },
    //       ],
    //       date: "2024-01-01",
    //       status: "Confirmed"
    //     },
    //     {
    //       name: "Farrel Beso",
    //       email: "farrel@mail.com",
    //       products: [
    //         {
    //           name: "Product 1",
    //           count: 1,
    //           price: 100,
    //         },
    //         {
    //           name: "Product 1",
    //           count: 1,
    //           price: 100,
    //         },
    //         {
    //           name: "Product 1",
    //           count: 1,
    //           price: 100,
    //         },
    //       ],
    //       date: "2024-01-01",
    //       status: "Confirmed"
    //     },
    //     {
    //         name: "Kyle Vinuya",
    //         email: "kyle@mail.com",
    //         products: [
    //           {
    //             name: "Product 1",
    //             count: 1,
    //             price: 100,
    //           },
    //         ],
    //         date: "2024-01-01",
    //         status: "Confirmed"
    //       },
    //   ];
    return (
        <div className="h-screen w-screen">
          <AdminNavbar />
    
          <div className="main-container flex flex-grow mt-3">
            
            <div className="filter-container w-[700px] p-6 m-12 mt-0 rounded-2xl flex-shrink-0">
              <SaleReportCard users={items}/>
            </div>

            <div className="spacer mx-auto"></div>

            <div className="filter-container w-[1000px] p-6 m-12 mt-0 rounded-2xl flex-shrink-0">
              {/* <TimeReportCard items={items}/> */}
            </div>

        </div>
        </div>
      );
}