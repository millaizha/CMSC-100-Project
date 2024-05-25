import { useState, useRef, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

import LOGO from "../assets/logo/100_LOGO.png";

export default function LoginForm({ toggleFunc }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const error = await login(email, password);
    if (error) {
      setLoginError(error);
    }
  };

  const togglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="form-container sign-in ">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mb-12">
          <img src={LOGO} alt="Logo" className="h-24" />
          <h1 className="font-black text-2xl">FARM-TO-TABLE</h1>
        </div>

        <div className="mb-6">
          <h1 className="font-black text-3xl">WELCOME BACK!</h1>
          <span className="font-medium text-xl">
            Please enter your details to log back in!
          </span>
        </div>

        <input
          type="text"
          required={true}
          id="email"
          className="input-box"
          placeholder="Email"
          ref={emailRef}
        />
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            required={true}
            id="password"
            className="input-box"
            placeholder="Password"
            ref={passwordRef}
          />

          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-5 flex items-center text-xl leading-5"
            onClick={togglePassword}
          >
            {showPassword ? <IoEyeOffSharp /> : <IoEyeSharp />}
          </button>
        </div>

        <div className="text-red-500 mt-3">{loginError}</div>
        <button className="form-button mt-8" type="submit">
          Log In
        </button>
        <div className="flex gap-1 mt-4">
          <span className="font-extralight">Don't have an account?</span>
          <span
            className="font-bold text-[#40573C] cursor-pointer"
            onClick={toggleFunc}
          >
            Sign up now!
          </span>
        </div>
      </form>
    </div>
  );
}
