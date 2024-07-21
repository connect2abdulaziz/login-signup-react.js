import React, { useContext } from "react";
import basestyle from "../Base.module.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  // Function to handle logout
  const logoutHandler = (e) => {
    e.preventDefault();
    setUser(null);
    navigate("/login", { replace: true }); // Redirect to login page
  };

  return (
    <div className="profile">
      <h1 style={{ color: "white" }}>Welcome {user.firstName} !!</h1>
      <button className={basestyle.button_common} onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
