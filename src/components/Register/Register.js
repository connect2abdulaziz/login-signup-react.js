import React, { useState } from "react";
import basestyle from "../Base.module.css";
import registerstyle from "./Register.module.css";
import { useNavigate, NavLink } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // State to manage form data, errors, and submission status
  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Function to handle input changes
  const changeHandler = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  // Function to validate form inputs
  const validateForm = (values) => {
    const errors = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    return errors;
  };

  // Function to handle form submission
  const signupHandler = async(e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);
    if(Object.keys(errors).length !== 0) return;
    const USERS_URL = "https://669a14139ba098ed61fe3c1c.mockapi.io/api/users";
    try{
      const response = await fetch(USERS_URL,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Success:", data);
      alert("Signup Success!");
      navigate("/login", { replace: true });
      
    }catch(error){
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <div className={registerstyle.register}>
        <form>
          <h1>Create your account</h1>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            onChange={changeHandler}
            value={user.firstName}
          />
          {formErrors.firstName && (
            <p className={basestyle.error}>{formErrors.firstName}</p>
          )}

          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            onChange={changeHandler}
            value={user.lastName}
          />
          {formErrors.lastName && (
            <p className={basestyle.error}>{formErrors.lastName}</p>
          )}

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={user.email}
          />
          {formErrors.email && (
            <p className={basestyle.error}>{formErrors.email}</p>
          )}

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
          />
          {formErrors.password && (
            <p className={basestyle.error}>{formErrors.password}</p>
          )}

          <button className={basestyle.button_common} onClick={signupHandler}>
            Register
          </button>
        </form>
        <NavLink to="/login">Already registered? Login</NavLink>
      </div>
    </>
  );
};

export default Register;
