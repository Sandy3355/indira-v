import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import { BASE_URL } from "../Helper/Helper";

const Register = () => {
  const [staffId, setStaffId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profession, setProfession] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate(); // useNavigate hook

  const registerUser = async (event) => {
    event.preventDefault();

    const userData = {
      firstName,
      lastName,
      password,
      profession,
      gender,
    };

    try {
      const response = await axios.post(`${BASE_URL}/user`, userData);

      if (response.status === 201) {
        const { staffId } = response.data;
        setStaffId(staffId);
        console.log("User registered successfully:", staffId);

        // Navigate to the login page
        navigate("/Appointments");
      } else {
        console.error("User registration failed:", response.statusText);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="registerbody">
     <div className="indira-clinic">
     <h1> INDIRA CLINIC</h1>
     </div>
      <div className="registration-container">
        <h2 className="registration-title">Register Here</h2>

        {staffId && (
          <div className="user-info">
            <p>Staff ID: {staffId}</p>
            <p>Use This ID For Login!</p>
          </div>
        )}
{/* <div className="d12"> */}
        <form onSubmit={registerUser} className="d14">
          <div className="drao1">
          <label htmlFor="firstName" className="form-label14">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="form-input14"
          />

          <label htmlFor="lastName" className="form-label14">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="form-input14"
          />

<label htmlFor="profession" className="form-label14">
            Profession:
          </label>
          <select
            id="profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            required
            className="form-select14"
          >
            <option value="">Select Profession</option>
            <option value="doctor-Cardiology">Cardiology</option>
            <option value="doctor-Dermatology">Dermatology</option>
            <option value="doctor-Endocrinology">Endocrinology</option>
            <option value="doctor-Gastroenterology">Gastroenterology</option>
            <option value="doctor-Hematology">Hematology</option>
            <option value="doctor-Infectious Disease">
              Infectious Disease
            </option>
            <option value="doctor-Internal Medicine">Internal Medicine</option>
            <option value="doctor-Nephrology">Nephrology</option>
            <option value="doctor-Neurology">Neurology</option>
            <option value="doctor-Obstetrics and Gynecology">
              Obstetrics and Gynecology
            </option>
            <option value="doctor-Oncology">Oncology</option>

          </select>
          </div>

        <div className="drao2">
            <label htmlFor="password" className="form-label14">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input14"
          />

          <label htmlFor="confirmPassword" className="form-label14">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-input14"
          />

        

          <label htmlFor="gender" className="form-label14">
            Gender:
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="form-select14"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          </div>

          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
        {/* </div> */}

        <p className="login-link">
          Already have an account? <Link to="/Login">LOGIN</Link>.
        </p>
      </div>
    </div>
  );
};

export default Register;
