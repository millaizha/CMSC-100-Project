import UserCard from "../../components/UserCard";
// import Navbar from "../components/Navbar";

export default function AdminUsers({ userList }) {
  const users = [
    {
      name: "Mill Valencia",
      email: "mill@mail.com",
    },
    {
      name: "Kyle Vinuya",
      email: "kyle@mail.com",
    },
    {
      name: "Farrel Beso",
      email: "farrel@mail.com",
    },
  ];
  return (
    <div className="h-screen w-screen">
      {/* <Navbar /> */}

      <div className="main-container mt-3 flex">
        <div className="spacer mx-auto"></div>
        <div className="cart-container w-[800px]">
          <h1 className="font-black text-6xl">Users</h1>
          <UserCard users={users} />
        </div>
        <div className="spacer mx-auto"></div>
      </div>
    </div>
  );
}
