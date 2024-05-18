import { useState } from 'react';
import PICTURE1 from '../assets/login/login1.jpg';
import PICTURE2 from '../assets/login/login2.jpg';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function Login() {
    const [topImageOpacity, setTopImageOpacity] = useState(1);
    const [toggle, setToggle] = useState(0);

  function toggleImages() { 
    setTopImageOpacity(topImageOpacity === 1 ? 0 : 1);
    setToggle(toggle === 0 ? 1 : 0);
  }
  
  return <>
  <div className="relative h-screen w-screen overflow-hidden">
    <img src={PICTURE1} alt="Background 1" className={`absolute h-full w-full object-cover transition-opacity duration-1000`} /> 
    <img src={PICTURE2} alt="Background 2" className={`absolute h-full w-full object-cover transition-opacity duration-1000 ${topImageOpacity === 0 ? 'opacity-100' : 'opacity-0'} `} />
 
    <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
        {/* ADD CONDITION HERE (active) */}
        <div className={`container ${toggle == 1 ? 'active' : ''
        }`}> 
            <LoginForm toggleFunc={toggleImages}/>
            <RegisterForm toggleFunc={toggleImages}/>

            <div className="toggle-container bg-white">
                <div className='toggle '>
                    <div className="toggle-panel toggle-left bg-slate-600">
                        <img src={PICTURE2} alt="" className='h-full w-full object-cover'/>
                    </div>
                    <div className="toggle-panel toggle-right bg-slate-600">
                        <img src={PICTURE1} alt="" className='h-full w-full object-cover'/>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
    </div>
    </>;
}
