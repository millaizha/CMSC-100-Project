export default function Card() {
  return <div className="h-[450px] w-[270px] bg-[#EED8D8] rounded-2xl flex flex-col p-2">
    <div className="h-[230px] w-full object-cover rounded-2xl overflow-hidden">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/2560px-Orange-Fruit-Pieces.jpg" alt="" className="object-cover w-full h-full"/>
    </div>

    <div className="p-2">
        <span className="font-bold text-xl">Orange Tangerine</span>
    </div>

  </div>
}
