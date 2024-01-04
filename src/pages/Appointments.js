import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import axios from 'axios';
import './Appointments.css';
import { fetchStaffDetails } from '../Helper/DocFetch';
import { BASE_URL } from '../Helper/Helper';
import { useNavigate } from 'react-router-dom';



const AppointmentsPage = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [numPatients, setNumPatients] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [searchValue, setSearchValue] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(10); // Adjust the number of patients per page as needed
  // const [staffDetails, setStaffDetails] = useState(null);

  const popupRef = useRef(null);

  const filteredPatients = searchValue
    ? patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          patient.patientId.toString().toLowerCase().includes(searchValue.toString().toLowerCase())
      )
    : patients;

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/patients`);
      setPatients(response.data);
      setNumPatients(response.data.length);
    } catch (error) {
      console.error('Error fetching patients:', error.message);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = (e) => {
    // This function is just a placeholder for demonstration
    // You can enhance the search logic based on your specific requirements
    // For example, you might want to debounce the search or make it case-insensitive
    // For now, it does a simple case-insensitive string match
    const searchInput = e.target.value;
    setSearchValue(searchInput);

    const filteredPatients = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        patient.patientId.toString().toLowerCase().includes(searchInput.toString().toLowerCase())
    );

    setNumPatients(filteredPatients.length);
  };


  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  const handleNavLink = (patient) => {
    navigate(`/PatientDetails/${patient.patientId}`);
  }

  // const handleFetch = async () => {

  //   const storedStaffId = localStorage.getItem('staffId');

  //   if (storedStaffId) {
  //     try {
  //       const details = await fetchStaffDetails(storedStaffId);
  //       setStaffDetails(details);
  //       console.log('Staff Details:', details);
  //     } catch (error) {
  //       console.error('Error fetching staff details:', error.message);
  //     }
  //   } else {
  //     console.error('StaffId not found in localStorage');
  //   }
  // }

  // useEffect(() => {
  //   handleFetch();
  // }, []);

  


  const handleClosePopup = () => {
    setSelectedPatient(null);
  };

  const handlePopupClick = (e) => {
    // Prevent closing the popup when clicking inside the popup
    e.stopPropagation();
  };

  const handleOutsideClick = (e) => {
    // Close the popup when clicking outside of it
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      handleClosePopup();
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewClick = (patient) => {
    // Store the patientId in localStorage
    localStorage.setItem('selectedPatientId', patient.patientId);
  
    // Navigate to the /Prescription page with the patientId
    navigate(`/Prescription/${patient.patientId}`);
  };
  
  
  
  

  return (
    <div className="appointments-container" onClick={handleOutsideClick}>
       <div className="indira-clinic">
     <h1> INDIRA CLINIC</h1>
     </div>



<div className='d3355app'>
  
<div className="appointments-header">
        <h1>Appointments</h1>
        <p>Total Patients: {numPatients}</p>
        <p>Current Date and Time: {currentDateTime.toLocaleString()}</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by ID or Name"
          value={searchValue}
          onChange={handleSearch}
        />
      </div>

      <div className="popup-container">
        {selectedPatient && (
          <div className="popup" ref={popupRef} onClick={handlePopupClick}>
            <h2>Patient Details</h2>
            <p>ID: {selectedPatient.patientId}</p>
            <p>Name: {selectedPatient.name}</p>
            <p>gender: {selectedPatient.gender}</p>
            <p>age: {selectedPatient.age}</p>
            <p>bloodgroup: {selectedPatient.bloodgroup}</p>
            <p>Date: {new Date(selectedPatient.createdAt).toLocaleDateString()}</p>
            <p>Time: {new Date(selectedPatient.createdAt).toLocaleTimeString()}</p>

            {/* Close button at the end of the data */}
            <button className="close-button" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        )}
      </div>

      <table className="appointments-table">
        <thead>
          <tr>
            <th className='table-head987'>ID</th>
            <th className='table-head987'>Name</th>
            <th className='table-head987'>View</th>
            <th className='table-head987'>gender</th>
            <th className='table-head987'>age</th>
            <th className='table-head987'>bloodgroup</th>
            <th className='table-head987'>Date</th>
            <th className='table-head987'>Time</th>
          </tr>
        </thead>
        <tbody>
          {currentPatients.map((patient) => (
            <tr key={patient._id} >
              <td onClick={() => handlePatientClick(patient)}>{patient.patientId}</td>
              <td onClick={() => handleNavLink(patient)}>{patient.name}</td>
              <td><button onClick={() => handleViewClick(patient)}>View</button></td>
              <td>{patient.gender}</td>
              <td>{patient.age}</td>
              <td>{patient.bloodgroup}</td>
              <td>{new Date(patient.createdAt).toLocaleDateString()}</td>
              <td>{new Date(patient.createdAt).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

       
        <div className="pagination">
        {/* First button with "First" double arrow icon */}
        <button onClick={() => paginate(1)} disabled={currentPage === 1}>
          <FaAngleDoubleLeft />
        </button>

        {/* Previous button with "Previous" icon */}
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          <FaChevronLeft />
        </button>

        {Array.from({ length: Math.ceil(filteredPatients.length / patientsPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}

        {/* Next button with "Next" icon */}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredPatients.length / patientsPerPage)}>
          <FaChevronRight />
        </button>

        {/* Last button with "Last" double arrow icon */}
        <button
          onClick={() => paginate(Math.ceil(filteredPatients.length / patientsPerPage))}
          disabled={currentPage === Math.ceil(filteredPatients.length / patientsPerPage)}
        >
          <FaAngleDoubleRight />
        </button>
      </div>
</div>




    </div>
  );
};

export default AppointmentsPage;