
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Helper/Helper";

const PrescriptionListPage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("para");

  useEffect(() => {
    // Fetch prescription data
    axios
      .get(`${BASE_URL}/prescriptions`)
      .then((response) => setPrescriptions(response.data))
      .catch((error) =>
        console.error("Error fetching prescription data:", error)
      );

    // Fetch additional medicine data
    const fetchMedicineData = async () => {
      const url =
        `https://medicine-search-and-autocomplete.p.rapidapi.com/api/medicine/search?searchterm=${searchTerm}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "f38873a401mshf70d8b6402d63f0p165681jsn93d2f8afcf63",
          "X-RapidAPI-Host": "medicine-search-and-autocomplete.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedicineData();
  }, [searchTerm]); // Empty dependency array ensures the effect runs once when the component mounts

  
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Prescription List</h1>

      <label>
        Search Term:
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </label>

      <ul>
        {prescriptions.map((prescription) => (
          <li key={prescription._id}>
            {prescription.patientName && <>{prescription.patientName}, </>}
            {prescription.patientDetails.name && (
              <>{prescription.patientDetails.name}, </>
            )}
            {prescription.patientDetails.doctorId && (
              <>{prescription.patientDetails.doctorId}, </>
            )}
            {prescription.medicines.length > 0 && (
              <>
                Medicines:
                <ul>
                  {prescription.medicines.map((med) => (
                    <li key={med._id}>
                      {med.dose} {med.frequency} {med.medicine}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {prescription.complaints.selectedComplaint.length > 0 && (
              <>
                Complaints:
                <ul>
                  {prescription.complaints.selectedComplaint.map((comp) => (
                    <li key={comp}>{comp}</li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrescriptionListPage;
