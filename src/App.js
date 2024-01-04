import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Appointments from "./pages/Appointments";
import AddPatientForm from "./Addpatientform";
// import PrescriptionPage from "./Prescription";
import PrescriptionPageOne from "./PrescriptionOne.js";
import PrescriptionListPage from "./pages/PrescriptionData";
import PatientDetails from "./pages/PatientDetails.js";
import QrCode from "./pages/QrCode.js";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<AddPatientForm />} />
          <Route path="/Prescription/:patientId" element={<PrescriptionPageOne />} />
          <Route path="/Appointments" element={<Appointments />} />
          {/* <Route path="/Prescription/:patientId" element={<PrescriptionPage />} /> */}
          <Route path="/PatientDetails/:patientId" element={<PatientDetails />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/PrescriptionData" element={<PrescriptionListPage />} />
          <Route path="/QrCode" element={<QrCode />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
