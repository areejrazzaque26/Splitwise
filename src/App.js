import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Splitwise from "./components/splitwise";
import Navbar from "./components/navbar";

function App() {
  const [user, setUser] = useState("");
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route
            path="/splitwise"
            element={user ? <Splitwise /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Home heading="Home" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
