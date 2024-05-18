import { useState, useRef } from 'react';

import LOGO from "../assets/logo/100_LOGO.svg";

export default function LoginForm({toggleFunc}) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return <div className="form-container sign-in ">
    <form>
          <div className='flex flex-col items-center mb-12'>
            <img src={LOGO} alt="Logo" className='h-24'/>
            <h1 className='font-black text-2xl'>FARM-TO-TABLE</h1>
          </div>

          <div className='mb-6'>
            <h1 className='font-black text-3xl'>WELCOME BACK!</h1>
            <span className='font-medium text-xl'>Please enter your details to log back in!</span>
          </div>

          <input
            type="text"
            required="true"
            id="email"
            className="input-box"
            placeholder="Email"
            ref={emailRef}
          />


          <input
            type="text"
            required="true"
            id="password"
            className="input-box"
            placeholder="Password"
            ref={passwordRef}
          />

        <button className='form-button mt-8'>Log In</button>
        <div className='flex gap-1 mt-4'>
          <span className='font-extralight'>Don't have an account?</span>
          <span className='font-bold text-[#40573C] cursor-pointer' onClick={toggleFunc}>Sign up now!</span>
        </div>
    </form>
  </div>;
}
