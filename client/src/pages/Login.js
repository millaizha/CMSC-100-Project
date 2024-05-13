import { useState } from 'react';
import PICTURE1 from '../assets/login/login1.jpg';
import PICTURE2 from '../assets/login/login2.jpg';

export default function Login() {
    const [topImageOpacity, setTopImageOpacity] = useState(1);

  function toggleImages() { 
    setTopImageOpacity(topImageOpacity === 1 ? 0 : 1);
  }
  
  return <>
  <div className="relative h-screen w-screen overflow-hidden">
    <img src={PICTURE1} alt="Background 1" className={`absolute h-full w-full object-cover transition-opacity duration-1000`} /> <img src={PICTURE2} alt="Background 2" className={`absolute h-full w-full object-cover transition-opacity duration-1000 ${topImageOpacity === 1 ? 'opacity-100' : 'opacity-0'} `} />

    <div className="absolute inset-0 flex items-center justify-center pointer-events-none backdrop-blur-sm">
        <div className="bg-white p-8 w-2/3 h-2/3 rounded-lg shadow-lg pointer-events-auto">Hello</div>
    </div>
    </div>
    </>;
}
