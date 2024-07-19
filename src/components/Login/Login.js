import React, { useState, useEffect } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Login = ({ setUserState }) => {
  const navigate = useNavigate();

  // State to manage form data, errors, and submission status
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

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
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  // Function to handle form submission
  const loginHandler = (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      fetch("https://auth-backend1.herokuapp.com/api/v1/users/auth", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        alert(data.message); 
        setUserState(data.user); 
        navigate("/profile", { replace: true }); 
      })
      .catch(error => {
        console.error("Login Error:", error);
        alert("Invalid credentials. Please try again."); 
      });
    }
    
  };

  // Effect to check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/profile"); 
    }
  }, []);

  return (
    <div className={loginstyle.login}>
      <form>
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={changeHandler}
          value={user.email}
        />
        {formErrors.email && <p className={basestyle.error}>{formErrors.email}</p>}

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
        />
        {formErrors.password && <p className={basestyle.error}>{formErrors.password}</p>}

        <button className={basestyle.button_common} onClick={loginHandler}>
          Login
        </button>
      </form>
      <NavLink to="/signup">Not yet registered? Register Now</NavLink>
    </div>
  );
};

export default Login;
