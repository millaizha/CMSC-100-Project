import AdminOrderCard from "../../components/AdminOrderCard";
import AdminNavbar from "../../components/AdminNavbar";

export default function Cart({ userList }) {
  const items = [
    {
      name: "Mill Valencia",
      email: "mill@mail.com",
      address: "Manila",
      products: [
        {
          name: "Product 1",
          count: 1,
          imageURL: "https://via.placeholder.com/150",
          type: "Fruit",
          price: 100,
        },
        {
          name: "Product 2",
          count: 2,
          imageURL: "https://via.placeholder.com/150",
          type: "Veggie",
          price: 200,
        },
      ],
    },
    {
      name: "Kyle Vinuya",
      email: "kyle@mail.com",
      address: "Manila",
      products: [
        {
          name: "Product 1",
          count: 1,
          imageURL: "https://via.placeholder.com/150",
          type: "Fruit",
          price: 100,
        },
      ],
    },
    {
      name: "Farrel Beso",
      email: "farrel@mail.com",
      address: "Manila",
      products: [
        {
          name: "Product 1",
          count: 1,
          imageURL: "https://via.placeholder.com/150",
          type: "Fruit",
          price: 100,
        },
        {
          name: "Product 1",
          count: 1,
          imageURL: "https://via.placeholder.com/150",
          type: "Fruit",
          price: 100,
        },
        {
          name: "Product 1",
          count: 1,
          imageURL: "https://via.placeholder.com/150",
          type: "Fruit",
          price: 100,
        },
      ],
    },
  ];
  return (
    <div className="h-screen w-screen">
      <AdminNavbar />

      <div className="main-container mt-3 flex">
        <div className="spacer mx-auto"></div>
        <div className="cart-container w-[800px]">
          <h1 className="font-black text-6xl flex flex-row justify-center">Orders</h1>
          <AdminOrderCard users={items} />
        </div>
        <div className="spacer mx-auto"></div>
      </div>
    </div>
  );
}
