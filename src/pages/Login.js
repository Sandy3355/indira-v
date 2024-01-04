// Login.js    
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { BASE_URL } from "../Helper/Helper";
import image from "./images/ss-removebg-preview.png";
const Login = () => {
  const navigate = useNavigate();
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    role: "Option",
    username: "",
    password: "",
  });
  const [roleError, setRoleError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${BASE_URL}/user?staffId=${formData.username}&password=${formData.password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();

        // Check if the response contains a valid staffId
        if (userData.staffId) {
          localStorage.setItem("staffId", userData.staffId);

          
          navigate("/Appointments");
        } else {
          alert("Invalid staff ID. Please try again.");
        }
      } else {
        // Handle failed login (e.g., incorrect credentials)
        alert("Invalid user ID or password. Please try again.");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Login error:", error);
    }
  };

  const handleRememberMeChange = () => {
    // Add logic to handle the "Remember Me" checkbox state
    // You can use a state variable similar to passwordVisible
  };

  const handleForgotPassword = () => {
    // Add logic to handle the "Forgot Password" action
    // You can navigate to a forgot password page or show a modal
  };
  const roleEmailHeadingMap = {};

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setRoleError("");
    setLoginError(""); // Clear any previous login error when the user makes a change
  };
  const handleSignup = () => {
    navigate("/Register");
  };

  return (
    <div className="admin">
      <div></div>
      <div className="signinpage">
        <form className="forml" onSubmit={handleLogin}>
          <div className="image">
            <div className="ind-Main-123">
              <h1 className="main-heading987">INDIRA CLINIC</h1>
            </div>
            <img
              loading="lazy"
              src={image}
              alt="Left Image"
              className="body-imge123"
            />
          </div>
          <div className="AnotherBody">
            <div className="SignInHome">
              <h1>Log in</h1>
            </div>

            <div className="head2for-lk">
              {/* <h4> Please login to continue to your account.</h4> */}
            </div>
            <div className="sigin-form987">
            <label className='Label1' htmlFor="username">
              <h3 className="email-654">Email ID</h3>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />

            <label className='Label1' htmlFor="password">
              <h3 className="email-654">Password</h3>
            </label>
            <div id="password" className="password-input">
              <input
                type={passwordVisible ? "text" : "password"}
                id="passwordInput"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            </div>

            <p className="text-center mt-4">
              <button className="buttonn_13" type="submit" value={handleLogin}>
                {" "}
                Login{" "}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
