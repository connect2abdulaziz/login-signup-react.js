import React, { useEffect, useState } from "react";
import basestyle from "../Base.module.css";
import registerstyle from "./Register.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // State to manage form data, errors, and submission status
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    fname: "",
    lname: "",
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
    
    if (!values.fname) {
      errors.fname = "First Name is required";
    }
    if (!values.lname) {
      errors.lname = "Last Name is required";
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
  const signupHandler = (e) => {
    e.preventDefault();
    const errors = validateForm(user);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
        fetch("/api/v1/users", {
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
          navigate("/login", { replace: true });
        })
        .catch(error => {
          console.error("Signup Error:", error);
          alert("Signup failed. Please try again.");
        });
      }
      
  };

  // Effect to check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/profile"); // Redirect to profile if logged in
    }
  }, []);

  return (
    <>
      <div className={registerstyle.register}>
        <form>
          <h1>Create your account</h1>
          <input
            type="text"
            name="fname"
            id="fname"
            placeholder="First Name"
            onChange={changeHandler}
            value={user.fname}
          />
          {formErrors.fname && <p className={basestyle.error}>{formErrors.fname}</p>}

          <input
            type="text"
            name="lname"
            id="lname"
            placeholder="Last Name"
            onChange={changeHandler}
            value={user.lname}
          />
          {formErrors.lname && <p className={basestyle.error}>{formErrors.lname}</p>}

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
