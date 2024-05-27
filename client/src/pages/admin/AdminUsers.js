import UserCard from "../../components/UserCard";
import AdminNavbar from "../../components/AdminNavbar";

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
      <AdminNavbar />

      <div className="main-container mt-3 flex">
        <div className="spacer mx-auto"></div>
        <div className="cart-container w-[800px]">
          <h1 className="font-black text-6xl flex flex-row justify-center mb-6">Users</h1>
          <h2 className="font-light text-4xl flex flex-row justify-center">Total: {users.length}</h2>
          <UserCard users={users} />
        </div>
        <div className="spacer mx-auto"></div>
      </div>
    </div>
  );
}
