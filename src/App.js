import "./App.css";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [userState, setUserState] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              userState && userState._id ? (
                <Profile setUserState={setUserState} username={userState.fname} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/login" element={<Login setUserState={setUserState} />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
