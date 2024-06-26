import { useRef, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

/**
 * COMPONENT: RegisterForm
 * PURPOSE: Provides a form for users to create a new account.
 *
 * PROPS:
 *  - toggleFunc (Function): Function to switch between login and registration forms.
 *
 * CONTEXT:
 *  - AuthContext: Provides the `register` function for user registration.
 *
 * USAGE:
 *  - Used on registration section of the login page to collect new user information and create accounts.
 */

export default function RegisterForm({ toggleFunc }) {
  const firstNameRef = useRef(null);
  const middleNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const addressRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { register } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      firstName: firstNameRef.current.value,
      middleName: middleNameRef.current.value || "",
      lastName: lastNameRef.current.value,
      address: addressRef.current.value,
      userType: "user",
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    register(user);
  };

  return (
    <div className="form-container sign-up">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h1 className="font-black text-3xl">CREATE YOUR ACCOUNT</h1>
          <span className="font-medium text-xl">
            Let's get started with your shopping experience!{" "}
          </span>
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
          id="address"
          className="input-box"
          placeholder="Address"
          ref={addressRef}
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
          type="password"
          required="true"
          id="password1"
          className="input-box"
          placeholder="Password"
          ref={passwordRef}
        />

        <button className="form-button mt-8" type="submit">
          Sign up
        </button>
        <div className="flex gap-1 mt-4">
          <span className="font-extralight">Already have an account?</span>
          <span
            className="font-bold text-[#40573C] cursor-pointer"
            onClick={toggleFunc}
          >
            Log in instead.
          </span>
        </div>
      </form>
    </div>
  );
}
