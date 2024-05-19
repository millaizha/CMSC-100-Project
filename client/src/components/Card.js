export default function Card() {
  return (
    <div className="h-[470px] w-[270px] bg-[#EED8D8] rounded-2xl flex flex-col p-2">
      <div className="h-[230px] w-full object-cover rounded-2xl overflow-hidden">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Orange-Fruit-Pieces.jpg/2560px-Orange-Fruit-Pieces.jpg"
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
 
      <div className="flex flex-col gap-1 p-2">
        <span className="font-bold text-xl overflow-hidden whitespace-nowrap text-ellipsis">Orange Tangerine</span>
        <div className="bg-white p-1 rounded-md text-sm w-16 flex justify-center">
          Fruit
        </div>
        <p className="h-12 w-full overflow-hidden text-ellipsis line-clamp-3 text-sm text-[12px] leading-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores cupiditate quam veniam vel fugit error explicabo quaerat ducimus doloremque nesciunt mollitia laborum eius ullam quod velit, nostrum consequuntur delectus illo.</p>
       <div className="flex gap-1 items-end mb-1">
        <div className="text-xl font-bold">PHP</div>
        <div className="text-4xl font-bold">20.99</div>
        <div className="font-bold">/ piece</div>
       </div>
      
      <div className="flex gap-2">
        <input type='number' min='1' max='99' step='1' className="p-2 pl-4 rounded-xl"/>
        <button className="rounded-xl bg-[#40573C] text-white px-4 w-full mx-auto text-md font-bold"> + Add to cart</button>
      </div>
      </div>
      
    </div>
  );
}
