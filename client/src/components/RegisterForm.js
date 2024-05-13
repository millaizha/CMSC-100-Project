import { useState, useRef } from 'react';

export default function RegisterForm() {
  const firstNameRef = useRef(null);
  const middleNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordRef_dup = useRef(null);

  return <div className="form-container sign-up">
    <form>
          <div className='mb-6'>
            <h1 className='font-black text-3xl'>CREATE YOUR ACCOUNT</h1>
            <span className='font-medium text-xl'>Let's get started with your shopping experience! </span>
          </div>

          <input
            type="text"
            required="true"
            id="fname"
            className="input-box"
            placeholder="First Name"
            ref={firstNameRef}
          />
          <input
            type="text"
            required="true"
            id="mname"
            className="input-box"
            placeholder="Middle Name (Optional)"
            ref={middleNameRef}
          />


          <input
            type="text"
            required="true"
            id="lname"
            className="input-box"
            placeholder="Last Name"
            ref={lastNameRef}
          />


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
            placeholder="password"
            ref={passwordRef}
          />

          <input
            type="text"
            required="true"
            id="password_dup"
            className="input-box"
            placeholder="Password (Again)"
            ref={passwordRef_dup}
          />
        <button className='form-button mt-8'>Sign up</button>
        <div className='flex gap-1 mt-4'>
          <span className='font-extralight'>Already have an account?</span>
          <span className='font-bold text-[#40573C]'>Log in instead.</span>
        </div>
    </form>
  </div>;
}
