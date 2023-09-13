import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Auth.css"
import Typewriter from "typewriter-effect";


const Auth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, name } = formData;

    if (isSignUp && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const url = isSignUp ? "/register" : "/login";
    const requrl = "http://localhost:3000/api/v1/auth" + url;

    try {
      e.preventDefault();
      const res = await axios.post(requrl, { email, password, name });
      console.log(res.data);
      setIsSignUp(false);
    } catch (error) {
      console.error(error);
      alert("Error signing up or logging in");
    }
    if(!isSignUp) {
      try {
        e.preventDefault();
        const res = await axios.post(requrl, { email, password, name });
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userid", res.data.user.id);
        navigate("/home");
        
      } catch (error) {
        console.error(error);
        alert("Error signing up or logging in");
      }
    }
  };

  return (
    <div className="holder">
      <div className="heading">
        <Typewriter
          options={{
            strings: ["Welcome to the Social Network"],
            autoStart: true,
            loop: true,
            cursor: "_",
            pauseFor: 10000,
          }}
        />
      </div>
      <div className="login-box">
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email:</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password:</label>
          </div>
          {isSignUp && (
            <>
              <div className="user-box">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="confirmPassword">Confirm Password:</label>
              </div>
              <div className="user-box">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="name">Name:</label>
              </div>
            </>
          )}
          <button type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <br/>
        <button onClick={() => setIsSignUp((prev) => !prev)} className="a2">
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
