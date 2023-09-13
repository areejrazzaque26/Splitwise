import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

import "./login.css";

function Login({ setUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmission = async (event) => {
    event.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      setErrorMsg("Please fill in both email and password fields.");
      return;
    }

    setErrorMsg("");

    try {
      // Sign in the user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(true);
      // const docRef = await addDoc(collection(db, "users"), {
      //   email: user.email,
      // });
      // console.log(docRef);
      // debugger;

      navigate("/splitwise");
    } catch (error) {
      setErrorMsg("Login failed. Please check your credentials.");
      console.error("Login Error:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container">
      <div className="loginText">Login</div>
      <div className="card LoginForm">
        <form className="form formText" onSubmit={handleSubmission}>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div id="passwordHelp" className="form-text formText">
            We'll never share your password with anyone else.
          </div>
          <div className="signUpLink">
            <span>Not logged in? &nbsp;</span>
            <Link to="/signup">Sign Up</Link>
          </div>
          <b className="errorMsg">{errorMsg}</b>
          <button type="submit" className="btn btn-info loginButton">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
