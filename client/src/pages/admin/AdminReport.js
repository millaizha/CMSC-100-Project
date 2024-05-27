import SaleReportCard from "../../components/SaleReportCard";
import TimeReportCard from "../../components/TimeReportCard";
import AdminNavbar from "../../components/AdminNavbar";

export default function AdminReport() {
    const items = [
        {
          name: "Mill Valencia",
          email: "mill@mail.com",
          products: [
            {
              name: "Product 1",
              count: 1,
              price: 100,
            },
            {
              name: "Product 2",
              count: 2,
              price: 200,
            },
          ],
          date: "2024-01-18",
          status: "Pending"
        },
        {
          name: "Kyle Vinuya",
          email: "kyle@mail.com",
          products: [
            {
              name: "Product 1",
              count: 1,
              price: 100,
            },
          ],
          date: "2024-01-01",
          status: "Confirmed"
        },
        {
          name: "Farrel Beso",
          email: "farrel@mail.com",
          products: [
            {
              name: "Product 1",
              count: 1,
              price: 100,
            },
            {
              name: "Product 1",
              count: 1,
              price: 100,
            },
            {
              name: "Product 1",
              count: 1,
              price: 100,
            },
          ],
          date: "2024-01-01",
          status: "Confirmed"
        },
        {
            name: "Kyle Vinuya",
            email: "kyle@mail.com",
            products: [
              {
                name: "Product 1",
                count: 1,
                price: 100,
              },
            ],
            date: "2024-01-01",
            status: "Confirmed"
          },
      ];
    return (
        <div className="h-screen w-screen">
          <AdminNavbar />
    
          <div className="main-container flex flex-grow mt-3">
            
            <div className="filter-container w-[700px] p-6 m-12 mt-0 rounded-2xl flex-shrink-0">
              <SaleReportCard users={items}/>
            </div>

            <div className="spacer mx-auto"></div>

            <div className="filter-container w-[1000px] p-6 m-12 mt-0 rounded-2xl flex-shrink-0">
              <TimeReportCard items={items}/>
            </div>

        </div>
        </div>
      );
}