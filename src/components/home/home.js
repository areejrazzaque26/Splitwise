import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import "./home.css";
function Home(props) {
  const [users, setUsers] = useState([]);

  const fetchPost = async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(newData);
      localStorage.setItem("users", JSON.stringify(newData));
      console.log(users, newData);
    });
  };
  const logo =
    "https://lh3.googleusercontent.com/UNLIFgowBm3_NV0Tj2l11HGwdcTSmSqzOxrIJ0HCKCtgM9QXkedejQBbjx7N7o8-eY5R";

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <>
      <div className="homePage">
        <div className="imageDivS column">
          <img src={logo} className="imageSplitwise" />
          <h4 className="my-4 welcomeText">Welcome to</h4>
          <h2 className="my-5 splitwiseText">Splitwise</h2>
        </div>
        <div className="loginLink">
          <h1>Login Please &nbsp; </h1>
          <span className="my-1">
            <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default Home;
