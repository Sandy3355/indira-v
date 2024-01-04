//Prescription.js

import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import axios from "axios";
import "./Prescription.css";
import ReactSelect from "react-select";
import CreatableSelect from "react-select/creatable";
import { BASE_URL } from "./Helper/Helper";
import { fetchPatientDetails, fetchStaffDetails } from "./Helper/DocFetch";
import { useParams } from "react-router-dom";

const ComplaintsOptions = [
  { value: "fever", label: "fever" },
  { value: "cold", label: "cold" },
  { value: "cough", label: "cough" },
  { value: "headache", label: "headache" },
  { value: "nausea", label: "nausea" },
  { value: "fatigue", label: "fatigue" },
  { value: "joint pain", label: "joint pain" },
  { value: "shortness of breath", label: "shortness of breath" },
];

const DiagnosisOptions = [
  { value: "malaria", label: "malaria" },
  { value: "viral fever", label: "viral fever" },
  { value: "dengue", label: "dengue" },
  { value: "typoid", label: "typoid" },
  { value: "flu", label: "flu" },
  { value: "pneumonia", label: "pneumonia" },
  { value: "bronchitis", label: "bronchitis" },
  { value: "hypertension", label: "hypertension" },
  { value: "diabetes", label: "diabetes" },
];

const PredefinedMedicines = [
  { value: "Paracetamol", label: "Paracetamol" },
  { value: "Aspirin", label: "Aspirin" },
  { value: "Ibuprofen", label: "Ibuprofen" },
  { value: "Amoxicillin", label: "Amoxicillin" },
  { value: "Loratadine", label: "Loratadine" },
  { value: "Omeprazole", label: "Omeprazole" },
  { value: "Metformin", label: "Metformin" },
];
const TestsOptions = [
  { value: "cbp", label: "cbp" },
  { value: "lft", label: "lft" },
  { value: "rnf", label: "rnf" },
  { value: "t3", label: "t3" },
  { value: "lipid panel", label: "Lipid Panel" },
  { value: "thyroid profile", label: "Thyroid Profile" },
  { value: "kidney function test", label: "Kidney Function Test" },
  { value: "urinalysis", label: "Urinalysis" },
  { value: "ECG", label: "Electrocardiogram (ECG)" },
];

const initialMedicineEntry = {
  id: 1,
  medicine: [],
  dose: "1-0-1",
  when: "After Food",
  duration: "once daily",
  frequency: "4 days",
  notes: "",
  searchResults: [],
};

const PrescriptionPage = () => {
  const [patientDetails, setPatientDetails] = useState({});
  const [staffDetails, setStaffDetails] = useState({});
  const { patientId } = useParams();

  const patientName = patientDetails.name;

  // Combine options
  const [complaintOptions, setComplaintOptions] = useState([]);
  const [diagnosisOptions, setDiagnosisOptions] = useState([]);
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [testOptions, setTestOptions] = useState([]);

  const handleFetch = async () => {
    const storedPatientId = patientId;

    if (storedPatientId) {
      try {
        const details = await fetchPatientDetails(storedPatientId);
        setPatientDetails(details);
        console.log("Patient Details:", details);

        // Include patient name in prescriptionData
        setPrescriptionData((prevData) => ({
          ...prevData,
          patientName: details.name,
          patientDetails: {
            ...prevData.patientDetails,
            name: details.name,
          },
        }));
      } catch (error) {
        console.error("Error fetching Patient details:", error.message);
      }
    } else {
      console.error("PatientId not found in localStorage");
    }
  };

  const storedstaffId = localStorage.getItem("staffId");
  const handleFetchDoc = async () => {
    if (storedstaffId) {
      try {
        const details = await fetchStaffDetails(storedstaffId);
        setStaffDetails(details);
        console.log("Staff Details:", details);
      } catch (error) {
        console.error("Error fetching Staff details:", error.message);
      }
    } else {
      console.error("StaffId not found in localStorage");
    }
  };

  useEffect(() => {
    handleFetch();
    handleFetchDoc();
  }, []);

  const [prescriptionData, setPrescriptionData] = useState({
    patientName: patientName,
    patientDetails: {
      name: patientName,
      patientId: patientId,
      doctorId: storedstaffId,
    },
    vitals: {
      systolicBP: "",
      diastolicBP: "",
      sugar: "",
      height: "",
      weight: "",
      temperature: "",
      spo2: "",
      pallor: "",
      edema: "",
      lcterus: "",
      lymphademopathy: "",
      clubbing: "",
      cyanosis: "",
      jvp: "",
    },
    complaints: {
      searchComplaint: "",
      selectedComplaint: [],
      searchResults: [],
      searchDiagnosis: "",
      selectedDiagnosis: [],
    },
    medicines: [initialMedicineEntry],
    advice: {
      advice: "",
      dietExercise: "",
    },
    testsRequested: {
      searchTest: "",
      selectedTests: [],
      searchTestResults: [],
      when: "none",
    },
  });

  prescriptionData.vitals.bp = `${prescriptionData.vitals.systolicBP}/${prescriptionData.vitals.diastolicBP};`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const complaintsResponse = await axios.get(
          `${BASE_URL}/complaints/options`
        );
        setComplaintOptions(complaintsResponse.data);

        const diagnosesResponse = await axios.get(
          `${BASE_URL}/diagnoses/options`
        );
        setDiagnosisOptions(diagnosesResponse.data);

        const medicinesResponse = await axios.get(
          `${BASE_URL}/medicines/options`
        );
        const apiMedicineOptions = medicinesResponse.data.map((medicine) => ({
          value: medicine,
          label: medicine,
        }));
        const combinedMedicineOptions = [
          ...apiMedicineOptions,
          ...PredefinedMedicines,
        ];
        setMedicineOptions(combinedMedicineOptions);

        const testsResponse = await axios.get(`${BASE_URL}/tests/options`);
        setTestOptions(testsResponse.data);
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Combine options
  const combinedComplaintOptions = [
    ...ComplaintsOptions,
    ...prescriptionData.complaints.searchResults.map((result) => ({
      value: result.name,
      label: result.name,
    })),
  ];
  const combinedDiagnosisOptions = [
    ...DiagnosisOptions,
    ...diagnosisOptions.map((diagnosis) => ({
      value: diagnosis,
      label: diagnosis,
    })),
  ];
  const combinedTestOptions = [
    ...TestsOptions,
    ...testOptions.map((test) => ({ value: test.name, label: test.name })),
  ];

  const handleInputChange = (section, field, value) => {
    if (
      section === "vitals" &&
      (field === "systolicBP" || field === "diastolicBP")
    ) {
      setPrescriptionData((prevData) => ({
        ...prevData,
        vitals: {
          ...prevData.vitals,
          [field]: value,
        },
      }));
    } else {
      setPrescriptionData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: value,
        },
      }));
    }
  };
  const handleComplaintsDiagnosisChange = (selectedOptions) => {
    const selectedComplaints = selectedOptions.map((option) => option.value);
    handleInputChange("complaints", "selectedComplaint", selectedComplaints);
  };
  const handleDiagnosisChange = (selectedOptions) => {
    const selectedDiagnosis = selectedOptions.map((option) => option.value);
    handleInputChange("complaints", "selectedDiagnosis", selectedDiagnosis);
  };
  const handleTestsRequestedChange = (selectedOptions) => {
    const selectedTests = selectedOptions.map((option) => option.value);
    setPrescriptionData((prevData) => ({
      ...prevData,
      testsRequested: {
        ...prevData.testsRequested,
        selectedTests: selectedTests,
      },
    }));
  };

  const handleMedicineChange = (index, field, selectedOption) => {
    console.log("Selected Option:", selectedOption);
    console.log("Field:", field);
    setPrescriptionData((prevData) => ({
      ...prevData,
      medicines: prevData.medicines.map((medicine, i) =>
        i === index
          ? {
              ...medicine,
              [field]: selectedOption ? selectedOption.value : "",
            }
          : medicine
      ),
    }));
  };

  const addMedicineEntry = () => {
    setPrescriptionData((prevData) => ({
      ...prevData,
      medicines: [
        ...prevData.medicines,
        {
          id: prevData.medicines.length + 1,
          medicine: "",
          dose: "1-0-1",
          when: "After Food",
          duration: "once daily",
          frequency: "4 days",
          notes: "",
        },
      ],
    }));
  };

  const deleteMedicineEntry = (index) => {
    setPrescriptionData((prevData) => {
      if (prevData.medicines.length === 1) {
        const updatedMedicines = [
          {
            id: 1,
            medicine: "",
            dose: "1-0-1",
            when: "after food",
            duration: "once daily",
            frequency: "4 days",
            notes: "",
            searchResults: [],
          },
        ];
        return {
          ...prevData,
          medicines: updatedMedicines,
        };
      } else if (index === 0) {
        const updatedMedicines = prevData.medicines
          .slice(1)
          .map((medicine, i) => ({
            ...medicine,
            id: i + 1,
          }));
        return {
          ...prevData,
          medicines: updatedMedicines,
        };
      } else {
        const updatedMedicines = prevData.medicines.filter(
          (_, i) => i !== index
        );
        return {
          ...prevData,
          medicines: updatedMedicines,
        };
      }
    });
  };
  const handleSubmit = async () => {
    try {
      console.log("Submitting Prescription Data:", prescriptionData);
      const response = await axios.post(
        `${BASE_URL}/prescriptions`,
        prescriptionData
      );
      console.log("Server response:", response.data);
      if (response.status === 200) {
        alert("Prescription submitted successfully!");
      } else {
        alert(
          "Error submitting prescription. Please check the console for details."
        );
      }
      // alert("Prescription submitted successfully!");
      setPrescriptionData({
        patientDetails: {
          name: "",
          patientId: "",
          doctorId: "",
        },
        vitals: {
          bp: "",
          sugar: "",
          height: "",
          weight: "",
          temperature: "",
          spo2: "",
          pallor: "",
          edema: "",
          lcterus: "",
          lymphademopathy: "",
          clubbing: "",
          cyanosis: "",
          jvp: "",
        },
        complaints: {
          searchComplaint: "",
          selectedComplaint: [],
          searchResults: [],
          searchDiagnosis: "",
          selectedDiagnosis: [],
        },
        medicines: [initialMedicineEntry],
        advice: {
          advice: "",
          dietExercise: "",
        },
        testsRequested: {
          searchTest: "",
          selectedTests: [],
          searchTestResults: [],
          when: "none",
        },
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error.response) {
        console.error("Validation Errors:", error.response.data.error);
      }
      alert("Error submitting prescription. Please try again.");
    }
  };
  return (
    <div>
      <div className="hms-body">
        <div className="mainheading123">
          <h1 className="heading123">INDIRA CLINIC</h1>
        </div>
        <div className="hms-details">
          <CgProfile style={{ color: "black", fontSize: "24px" }} />
          <br />
          {patientDetails && (
            <div>
              <input
                type="text"
                placeholder="Name"
                value={patientName}
                onChange={(e) =>
                  handleInputChange("patientDetails", "name", e.target.value)
                }
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <input
                placeholder="Patient Id"
                type="text"
                value={patientDetails.patientId}
                onChange={(e) =>
                  handleInputChange(
                    "patientDetails",
                    "patientId",
                    e.target.value
                  )
                }
              />
            </div>
          )}
          {staffDetails && (
            <input
              type="text"
              placeholder="Doctor ID"
              value={staffDetails.staffId}
              onChange={(e) =>
                handleInputChange("staffDetails", "staffId", e.target.value)
              }
            />
          )}
        </div>
        <h4 className="vitailsname">Vitals :</h4>
        <div className="hms-vitals">
          <div className="hms-vitals-all-input">
            <div className="hms-vitals-all-input-div">
              <div className="hms-vitals-all-input-sub-div" style={{display:"flex"}}>
                <label>BP(mmHg)</label>
                <input
                  className="hms-inp1 hms-input-highlight"
                  type="text"
                  value={prescriptionData.vitals.systolicBP}
                  onChange={(e) =>
                    handleInputChange("vitals", "systolicBP", e.target.value)
                  }
                />
                /
                <input
                  className="hms-inp1 hms-input-highlight"
                  type="text"
                  value={prescriptionData.vitals.diastolicBP}
                  onChange={(e) =>
                    handleInputChange("vitals", "diastolicBP", e.target.value)
                  }
                />
              </div>
              <div className="hms-vitals-all-input-sub-div">
                <label className="hms-vitals-labels">Sugar(bpm)</label>
                <input
                  className="hms-inp1 hms-input-highlight"
                  type="text"
                  value={prescriptionData.vitals.sugar}
                  onChange={(e) =>
                    handleInputChange("vitals", "sugar", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="hms-vitals-labels">Height(cm)</label>
                <input
                  className="hms-inp1 hms-input-highlight"
                  type="text"
                  value={prescriptionData.vitals.height}
                  onChange={(e) =>
                    handleInputChange("vitals", "height", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="hms-vitals-labels">Weight(kg)</label>
                <input
                  className="hms-inp1 hms-input-highlight"
                  type="text"
                  value={prescriptionData.vitals.weight}
                  onChange={(e) =>
                    handleInputChange("vitals", "weight", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="hms-vitals-labels">Temperature(F)</label>
                <input
                  className="hms-inp1 hms-input-highlight"
                  type="text"
                  value={prescriptionData.vitals.temperature}
                  onChange={(e) =>
                    handleInputChange("vitals", "temperature", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="hms-vitals-all-input-div">
              <div>
                <label>SPO2(%)</label>
                <input
                  className="hms-inp1 hms-input-highlight"
                  type="text"
                  value={prescriptionData.vitals.spo2}
                  onChange={(e) =>
                    handleInputChange("vitals", "spo2", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="hms-vitals-labels">Pallor()</label>
                <input
                  className="hms-inp1 hms-input-highlight"
                  type="text"
                  value={prescriptionData.vitals.pallor}
                  onChange={(e) =>
                    handleInputChange("vitals", "pallor", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="hms-vitals-labels">Edema()</label>
                <input
                  className="hms-inp1 hms-input-highlight"
                  type="text"
                  value={prescriptionData.vitals.edema}
                  onChange={(e) =>
                    handleInputChange("vitals", "edema", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="hms-vitals-labels">Lcterus(cm)</label>
                <input
                  className="hms-inp1 hms-input-highlight"
                  type="text"
                  value={prescriptionData.vitals.lcterus}
                  onChange={(e) =>
                    handleInputChange("vitals", "lcterus", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="hms-vitals-labels">Lymphademopathy()</label>
                <input
                  className="hms-inp1 hms-input-highlight"
                  type="text"
                  value={prescriptionData.vitals.lymphademopathy}
                  onChange={(e) =>
                    handleInputChange(
                      "vitals",
                      "lymphademopathy",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
            <div className="hms-vitals-all-input-div">
              <div>
                <label>Clubbing()</label>
                <input
                  className="hms-inp1 hms-input-highlight"
                  type="text"
                  value={prescriptionData.vitals.clubbing}
                  onChange={(e) =>
                    handleInputChange("vitals", "clubbing", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="hms-vitals-labels">Cyanosis()</label>
                <input
                  className="hms-inp1 hms-input-highlight"
                  type="text"
                  value={prescriptionData.vitals.cyanosis}
                  onChange={(e) =>
                    handleInputChange("vitals", "cyanosis", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="hms-vitals-labels">JVP()</label>
                <input
                  className="hms-inp1 hms-input-highlight"
                  type="text"
                  value={prescriptionData.vitals.jvp}
                  onChange={(e) =>
                    handleInputChange("vitals", "jvp", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="hms-complaints-diagnosis-div">
            <div className="flex1234">
              <label className="hms-complaints-diagnosis-label">
                Complaints:
              </label>
              <CreatableSelect
                className="hms-complaints-ReactSelect1"
                isMulti
                options={combinedComplaintOptions}
                onChange={handleComplaintsDiagnosisChange}
                value={prescriptionData.complaints.selectedComplaint.map(
                  (complaint) => ({
                    value: complaint,
                    label: complaint,
                  })
                )}
              />

              {prescriptionData.complaints.searchResults &&
                prescriptionData.complaints.searchResults.length > 0 && (
                  <div>
                    <label>Select Complaint:</label>
                    <ReactSelect
                      isMulti
                      options={prescriptionData.complaints.searchResults.map(
                        (result) => ({
                          value: result.name,
                          label: result.name,
                        })
                      )}
                      onChange={handleDiagnosisChange}
                      value={prescriptionData.complaints.selectedDiagnosis.map(
                        (diagnosis) => ({
                          value: diagnosis,
                          label: diagnosis,
                        })
                      )}
                    />
                  </div>
                )}
            </div>
            <div className="flex12345 ">
              <label className="hms-complaints-diagnosis-label">
                Diagnosis :
              </label>
              <CreatableSelect
                className="hms-complaints-ReactSelect1"
                isMulti
                options={combinedDiagnosisOptions}
                onChange={handleDiagnosisChange}
                value={prescriptionData.complaints.selectedDiagnosis.map(
                  (diagnosis) => ({
                    value: diagnosis,
                    label: diagnosis,
                  })
                )}
              />
              {prescriptionData.complaints.searchResults &&
                prescriptionData.complaints.searchResults.length > 0 && (
                  <div>
                    <label>Select Diagnosis:</label>
                    <ReactSelect
                      options={prescriptionData.complaints.searchResults.map(
                        (result) => ({
                          value: result.name,
                          label: result.name,
                        })
                      )}
                      onChange={(selectedOption) =>
                        handleInputChange(
                          "complaints",
                          "selectedDiagnosis",
                          selectedOption ? selectedOption.value : ""
                        )
                      }
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
        <table className="hms-table">
          <thead>
            <tr className="hms-table-th">
              <th className="hms-table-th1">S No</th>
              <th className="hms-table-th1">Medicine</th>
              <th className="hms-table-th1">Dose</th>
              <th className="hms-table-th1">When</th>
              <th className="hms-table-th1">Duration</th>
              <th className="hms-table-th1">Frequency</th>
              <th className="hms-table-th1">Notes / Instructions</th>
              <th className="hms-table-th1">Add / Delete Entry</th>
            </tr>
          </thead>
          <tbody>
            {prescriptionData.medicines.map((medicine, index) => (
              <tr key={index}>
                <td className="hms-table-td">{index + 1}</td>
                <td className="hms-table-td">
                  <CreatableSelect
                    className="hms-medicine"
                    options={medicineOptions}
                    onChange={(selectedOptions) =>
                      handleMedicineChange(index, "medicine", selectedOptions)
                    }
                    value={
                      medicine.medicine
                        ? [
                            {
                              value: medicine.medicine,
                              label: medicine.medicine,
                            },
                          ]
                        : []
                    }
                  />
                </td>
                <td className="hms-table-td">
                  <select
                    className="hms-table-medicine-dose"
                    value={medicine.dose}
                    onChange={(e) =>
                      handleMedicineChange(index, "dose", {
                        value: e.target.value,
                      })
                    }
                  >
                    {["1-0-1", "1-1-1", "0-0-1", "1-0-0", "1-1-0"].map(
                      (doseOption) => (
                        <option key={doseOption} value={doseOption}>
                          {doseOption}
                        </option>
                      )
                    )}
                  </select>
                </td>
                <td className="hms-table-td">
                  <select
                    className="hms-table-medicine-dose"
                    value={medicine.when}
                    onChange={(e) =>
                      handleMedicineChange(index, "when", {
                        value: e.target.value,
                      })
                    }
                  >
                    {["after food", "before food", "none"].map((whenOption) => (
                      <option key={whenOption} value={whenOption}>
                        {whenOption}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="hms-table-td">
                  <select
                    className="hms-table-medicine-dose"
                    value={medicine.duration}
                    onChange={(e) =>
                      handleMedicineChange(index, "duration", {
                        value: e.target.value,
                      })
                    }
                  >
                    {["once daily", "once week", "once month"].map(
                      (durationOption) => (
                        <option key={durationOption} value={durationOption}>
                          {durationOption}
                        </option>
                      )
                    )}
                  </select>
                </td>
                <td className="hms-table-td">
                  <select
                    className="hms-table-medicine-dose"
                    value={medicine.frequency}
                    onChange={(e) =>
                      handleMedicineChange(index, "frequency", {
                        value: e.target.value,
                      })
                    }
                  >
                    {["4 days", "6 days", "10 days", "15 days"].map(
                      (frequencyOption) => (
                        <option key={frequencyOption} value={frequencyOption}>
                          {frequencyOption}
                        </option>
                      )
                    )}
                  </select>
                </td>
                <td className="hms-table-td">
                  <input
                    className="hms-table-notes"
                    type="text"
                    value={medicine.notes}
                    onChange={(e) =>
                      handleMedicineChange(index, "notes", {
                        value: e.target.value,
                      })
                    }
                  />
                </td>
                <td className="hms-table-td">
                  <IoIosAdd
                    className="hms-table-add-icon"
                    onClick={() => addMedicineEntry(index)}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <MdDelete
                    onClick={() => deleteMedicineEntry(index)}
                    className="hms-table-delete-icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="hms-advs-diet">
          <div className="hms-advs">
            <label className="label543">Advice </label>
            <textarea
            
              className="hms-prescription-advise"
              value={prescriptionData.advice.advice}
              onChange={(e) =>
                handleInputChange("advice", "advice", e.target.value)
                
              }
              data-gramm="false"
            />
          </div>
          <div className="hms-advs">
            <label className="label543">Diet & Excercise</label>
            <textarea
              className="hms-prescription-advise"
              value={prescriptionData.advice.dietExercise}
              onChange={(e) =>
                handleInputChange("advice", "dietExercise", e.target.value)
              }
              data-gramm="false"
            />
          </div>
        </div>
        <div className="hms-advs-diet mtkr-3">
          <div className="hms-tests-req">
            <label className="label543">Tests Requested </label>
            <CreatableSelect
              className="hms-tests-list"
              isMulti
              options={combinedTestOptions}
              onChange={handleTestsRequestedChange}
              value={prescriptionData.testsRequested.selectedTests.map(
                (test) => ({
                  value: test,
                  label: test,
                })
              )}
            />
            {prescriptionData.testsRequested.searchTestResults &&
              prescriptionData.testsRequested.searchTestResults.length > 0 && (
                <div>
                  <label>Select Test:</label>
                  <ReactSelect
                    options={prescriptionData.testsRequested.searchTestResults.map(
                      (result) => ({
                        value: result.name,
                        label: result.name,
                      })
                    )}
                    onChange={(selectedOption) =>
                      handleInputChange(
                        "testsRequested",
                        "selectedTest",
                        selectedOption ? selectedOption.value : ""
                      )
                    }
                  />
                </div>
              )}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <div className="hms-tests-req ">
            <label className="label543">Test(When)</label>
            <select
              className="hms-tests-list"
              value={prescriptionData.testsRequested.when}
              onChange={(e) =>
                handleInputChange("testsRequested", "when", e.target.value)
              }
            >
              {["none", "fasting", "after food"].map((whenOption) => (
                <option key={whenOption} value={whenOption}>
                  {whenOption}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <br />
        <button className="hms-prescription-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
export default PrescriptionPage;
