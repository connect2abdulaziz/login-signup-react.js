import "./App.css";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UserContextProvider from "./context/UserContextProvider";

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </div>
    </UserContextProvider>
  );
}

export default App;
