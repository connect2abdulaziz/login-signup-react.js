import React, { useState, useContext} from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();

  // State to manage form data, errors, and submission status
  const [formErrors, setFormErrors] = useState({});
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(UserContext);

  // Function to handle input changes
  const changeHandler = (e) => {
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
    if (!values.email) {
      errors.email = "Username is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }
    return errors;
  };

  // Function to handle form submission
  const loginHandler = async(e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);
    if (Object.keys(errors).length !== 0) return;
  
    // Mock API call to fetch user data
    const USERS_URL = "https://669a14139ba098ed61fe3c1c.mockapi.io/api/users";
    try{
      const response = await fetch(USERS_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const users = await response.json();

      const validUser = users.find(
        (u) => u.email === user.email && u.password === user.password
      );
      if (validUser) {
        setUser(validUser);
        navigate("/profile", { replace: true });
        alert("Login successful!");
      } else {
        throw new Error("Invalid credentials. Please try again.");
      }
    }catch(error){
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className={loginstyle.login}>
      <form>
        <h1>Login</h1>
        <input
          type="text"
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

        <button className={basestyle.button_common} onClick={loginHandler}>
          Login
        </button>
      </form>
      <NavLink to="/signup">Not yet registered? Register Now</NavLink>
    </div>
  );
};

export default Login;
