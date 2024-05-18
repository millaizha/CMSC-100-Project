import Card from "../components/Card";
import Navbar from "../components/Navbar";

export default function Shop() {
  return <div className="h-screen w-screen">
    <Navbar />

    <div className="main-container flex">
        <div className="filter-container w-64 p-6 m-12 bg-[#EED8D8] rounded-2xl">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-black mb-2">FILTER BY</h1>
                <button className="bg-white text-xl rounded-lg w-full p-4 ">Name</button>
                <button className="bg-white text-xl rounded-lg w-full p-4 ">Type</button>
                <button className="bg-white text-xl rounded-lg w-full p-4 ">Price</button>
                <button className="bg-white text-xl rounded-lg w-full p-4 ">Quantity</button>
            </div>
            <div className="flex flex-col gap-2 mt-6">
                <h1 className="text-2xl font-black mb-2">SORT BY</h1>
                <button className="bg-white text-xl rounded-lg w-full p-4 ">Ascending</button>
                <button className="bg-white text-xl rounded-lg w-full p-4 ">Descending</button>
            </div>
        </div>
        <div className="content-container p-6 pt-12">
            <h1 className="font-black text-6xl mb-6">OUR PRODUCTS</h1>
            <div className="flex flex-wrap gap-1">
                <Card />
            </div>
        </div>
    </div>
  </div>;
}
