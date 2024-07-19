import React from "react";
import basestyle from "../Base.module.css";
import { useNavigate } from "react-router-dom";

const Profile = ({ setUserState, username }) => {
  const navigate = useNavigate();

  // Function to handle logout
  const logoutHandler = () => {
    setUserState({}); // Clear user state
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate("/login", { replace: true }); // Redirect to login page
  };

  return (
    <div className="profile">
      <h1 style={{ color: "white" }}>Welcome {username} !!</h1>
      <button
        className={basestyle.button_common}
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
