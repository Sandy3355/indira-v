import React, { useState } from "react";
import "./AddPatient.css";
import { BASE_URL } from "./Helper/Helper";
import image45 from "./pages/images/indira.png";

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    mobile: "",
    bloodgroup: "",
    email: "",        
    address: "",
    city: "",
    referredby: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name.toLowerCase()]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("first");

    try {
      const response = await fetch(`${BASE_URL}/api/patients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Patient added successfully");
        alert("Patient added successfully");
      } else {
        console.error("Failed to add patient");
        alert("Failed to add patient");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error adding patient");
    }

    // Reset the form data
    setFormData({
      name: "",
      gender: "",
      age: "",
      mobile: "",
      bloodgroup: "",
      email: "",
      address: "",
      city: "",
      referredby: "",
    });
  };

  return (
    <div className="add-patient-form">
      <div className="mainheading123">
        <h1 className="heading123">INDIRA CLINIC</h1>
      </div>
      <div className="bgimg">
        <h2 className="heading543">Hospital Reception System</h2>
        <form onSubmit={handleSubmit}>
          <div className="responsive-row">
            <div className="flexrow">
              <div className="form-group">
                <label className="label1234" htmlFor="name">
                  Name:
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
              </div>

              <div className="form-group">
                <label className="label1234" htmlFor="gender">
                  Gender:
                </label>
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label1234" htmlFor="age">
                  Age:
                </label>
                <input
                  className="form-input"
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Age"
                />
              </div>

              <div className="form-group">
                <label className="label1234" htmlFor="mobile">
                  Mobile:
                </label>
                <input
                  className="form-input"
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Mobile"
                />
              </div>

              <div className="form-group">
                <label className="label1234" htmlFor="bloodgroup">
                  Blood Group:
                </label>
                <select
                  className="form-select"
                  name="bloodgroup"
                  value={formData.bloodgroup}
                  onChange={handleInputChange}
                >
                  <option value="">Select Blood Group</option>
                  <option value="o+">O+</option>
                  <option value="o-">O-</option>
                  <option value="a-">A-</option>
                  <option value="a+">A+</option>
                  <option value="b-">B-</option>
                  <option value="b+">B+</option>
                  <option value="ab+">AB+</option>
                  <option value="ab-">AB-</option>
                </select>
              </div>
            </div>
            <div className="flexrow2">   
              <div className="form-group">
                <label className="label1234" htmlFor="email">
                  Email:
                </label>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </div>

              <div className="form-group">
                <label className="label1234" htmlFor="address">
                  Address:
                </label>
                <textarea
                  className="form-textarea"
                  name="address"
                  rows="4"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                ></textarea>
              </div>

              <div className="form-group">
                <label className="label1234" htmlFor="city">
                  City:
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                />
              </div>

              <div className="form-group">
                <label className="label1234" htmlFor="referredby">
                  Referred By:
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="referredby"
                  value={formData.referredby}
                  onChange={handleInputChange}
                  placeholder="Referred By"
                />
              </div>
            </div>
          </div>
        </form>
        <div className="addbutton">
          <button className="form-button" type="submit" onClick={handleSubmit}>
            Add Patient
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPatientForm;
