import AdminOrderCard from "../components/AdminOrderCard";
// import Navbar from "../components/Navbar";

export default function Cart({ userList }) {
    const items = [
        {
          name: "Mill Valencia",
          email: "mill@mail.com",
          products: [
            {
              name: "Product 1",
              count: 1
            },
            {
              name: "Product 2",
              count: 2
            }
          ]
        },
        {
            name: "Kyle Vinuya",
            email: "kyle@mail.com",
            products: [
              {
                name: "Product 1",
                count: 1
              }
            ]
          },
          {
            name: "Farrel Beso",
            email: "farrel@mail.com",
            products: [
              {
                name: "Product 1",
                count: 1
              },
              {
                name: "Product 1",
                count: 1
              },
              {
                name: "Product 1",
                count: 1
              }
            ]
          }
      ]
  return (
    <div className="h-screen w-screen">
      {/* <Navbar /> */}

      <div className="main-container mt-3 flex">
        <div className="spacer mx-auto"></div>
        <div className="cart-container w-[800px]">
          <h1 className="font-black text-6xl">Orders</h1>
            <AdminOrderCard users={items}/>
        </div>
        <div className="spacer mx-auto"></div>
      </div>
    </div>
  );
}
