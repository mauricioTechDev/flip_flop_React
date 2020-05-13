import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="jumbotron mt-5">
      <h1>FLIP FLOP PHOTO APP</h1>
      <p>Sign In to start sharring with others</p>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
      <Link to="/register" className="btn btn-primary ml-3">
        Sign UP
      </Link>
    </div>
  );
};

export default Landing;
