import UserCard from "../components/UserCard";
// import Navbar from "../components/Navbar";

export default function Cart({ userList }) {
  return (
    <div className="h-screen w-screen">
      {/* <Navbar /> */}

      <div className="main-container mt-3 flex">
        <div className="spacer mx-auto"></div>
        <div className="cart-container w-[800px]">
          <h1 className="font-black text-6xl">Users</h1>

          <div className="list-container mt-8 flex flex-col gap-2 h-full">
            <UserCard name="Mill Valencia" email="mill@mail.com" />
            <UserCard name="Kyle Vinuya" email="kyle@mail.com" />
            <UserCard name="Farrel Beso" email="farrel@mail.com" />
          </div>
        </div>
        <div className="spacer mx-auto"></div>
      </div>
    </div>
  );
}
