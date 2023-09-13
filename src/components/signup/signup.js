import React, { useState } from "react";
import "./signup.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

function Signup({ user }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setErrorMsg("");

    try {
      // Create a user account in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the user's UID
      const user = userCredential.user;

      const docRef = await addDoc(collection(db, "users"), {
        email: user.email,
      });
      console.log(docRef);

      // Redirect the user to another page (e.g., dashboard)
      navigate("/splitwise");
    } catch (error) {
      setErrorMsg("Signup failed. Please check your credentials.");
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="signUpText">Sign Up</div>
      <div className="card LoginForm">
        <form className="form formText" onSubmit={handleSignup}>
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
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
          <div className="signUpLink flex">
            <span>Already have an account? &nbsp;</span>
            <Link to="/login">Login</Link>
          </div>
          <b className="errorMsg">{errorMsg}</b>
          <button
            type="submit"
            onClick={() => {
              user ? navigate("/splitwise") : navigate("/signup");
            }}
            className="btn btn-info loginButton"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
