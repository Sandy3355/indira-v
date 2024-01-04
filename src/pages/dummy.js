import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { fetchPatientprescription } from "../Helper/DocFetch";
import { Link, useParams } from "react-router-dom";
import "./PatientDetails.css";

const PatientDetails = () => {
  const { patientId } = useParams();
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [combinedTestOptions, setCombinedTestOptions] = useState([]);

  const handleInputChange = (category, field, value) => {
    console.log(`${category}.${field} changed to: ${value}`);
  };
  const handleTestsRequestedChange = (selectedOptions) => {
    const selectedTests = selectedOptions.map((option) => option.label);
    handleInputChange("testsRequested", "selectedTests", selectedTests);
  };

  const handleFetch = async () => {
    if (patientId) {
      try {
        const prescription = await fetchPatientprescription(patientId);
        setPrescriptionData(prescription);
        // Extract unique test options from prescription data
        const uniqueTestOptions = Array.from(
          new Set(
            prescription.reduce((options, item) => {
              if (item.testsRequested && item.testsRequested.selectedTests) {
                options.push(
                  ...item.testsRequested.selectedTests.map((test) => ({
                    value: test,
                    label: test,
                  }))
                );
              }
              return options;
            }, [])
          ),
          (option) => option.label
        );
        // Filter out options that don't have value and label properties
        const filteredTestOptions = uniqueTestOptions.filter(
          (option) =>
            option &&
            typeof option === "object" &&
            "value" in option &&
            "label" in option
        );
        setCombinedTestOptions(uniqueTestOptions);

        console.log("Fetched prescription data:", prescription);
      } catch (err) {
        console.error("Error fetching Patient details:", err.message);
      }
    } else {
      console.error("patientId not found");
    }
  };

  useEffect(() => {
    handleFetch();
  }, [patientId]);

  useEffect(() => {
    console.log("Prescription Data:", prescriptionData);
  }, [prescriptionData]);

  return (
    <div className="d7app">
      <div className="mainheading123">
        <h1 className="heading123">INDIRA CLINIC</h1>
      </div>
      <div className="patient-details-container">
        {prescriptionData && prescriptionData.length > 0 && (
          <div className="patient-date-details">
            <div>
              {prescriptionData[0].patientName && (
                <>
                  <span>Patient Name: {prescriptionData[0].patientName}</span>
                  <br />
                </>
              )}
              {prescriptionData[0].patientDetails &&
                prescriptionData[0].patientDetails.name && (
                  <>
                    <span>
                      Patient Details:{" "}
                      {prescriptionData[0].patientDetails.patientId}
                    </span>
                    <br />
                  </>
                )}
              {prescriptionData[0].patientDetails &&
                prescriptionData[0].patientDetails.doctorId && (
                  <>
                    <span>
                      Doctor ID: {prescriptionData[0].patientDetails.doctorId}
                    </span>
                    <br />
                  </>
                )}
            </div>
          </div>
        )}
        <ul className="prescription-list">
          {prescriptionData &&
            prescriptionData.map((prescription) => (
              <li key={prescription._id} className="prescription-item">
                <div className="patient-date-details">
                  {prescription.Date && (
                    <>
                      <span className="date-time">
                        Date:{" "}
                        {new Date(prescription.Date).toLocaleDateString(
                          "en-IN",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}
                      </span>
                      <br />
                    </>
                  )}
                </div>

                <div className="hms-first-div">
                  <div>
                    <h4 className="vitailsname">Vitals :</h4>
                    <div className="hms-vitals">
                      <div className="hms-vitals-all-input">
                        <div className="hms-vitals-all-input-div">
                          <div className="hms-vitals-all-input-sub-div">
                            <label>BP(mmHg)</label>
                            <input
                              className="hms-inp1 hms-input-highlight"
                              type="text"
                              value={prescription.vitals?.systolicBP || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "vitals",
                                  "systolicBP",
                                  e.target.value
                                )
                              }
                            />
                            /
                            <input
                              className="hms-inp1 hms-input-highlight"
                              type="text"
                              value={prescription.vitals?.diastolicBP || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "vitals",
                                  "diastolicBP",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="hms-vitals-all-input-sub-div">
                            <label className="hms-vitals-labels">
                              Sugar(bpm)
                            </label>
                            <input
                              className="hms-inp1 hms-input-highlight"
                              type="text"
                              value={prescription.vitals.sugar}
                              onChange={(e) =>
                                handleInputChange(
                                  "vitals",
                                  "sugar",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="hms-vitals-labels">
                              Height(cm)
                            </label>
                            <input
                              className="hms-inp1 hms-input-highlight"
                              type="text"
                              value={prescription.vitals.height}
                              onChange={(e) =>
                                handleInputChange(
                                  "vitals",
                                  "height",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="hms-vitals-labels">
                              Weight(kg)
                            </label>
                            <input
                              className="hms-inp1 hms-input-highlight"
                              type="text"
                              value={prescription.vitals.weight}
                              onChange={(e) =>
                                handleInputChange(
                                  "vitals",
                                  "weight",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="hms-vitals-labels">
                              Temperature(F)
                            </label>
                            <input
                              className="hms-inp1 hms-input-highlight"
                              type="text"
                              value={prescription.vitals.temperature}
                              onChange={(e) =>
                                handleInputChange(
                                  "vitals",
                                  "temperature",
                                  e.target.value
                                )
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
                              value={prescription.vitals.spo2}
                              onChange={(e) =>
                                handleInputChange(
                                  "vitals",
                                  "spo2",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="hms-vitals-labels">
                              Pallor()
                            </label>
                            <input
                              className="hms-inp1 hms-input-highlight"
                              type="text"
                              value={prescription.vitals.pallor}
                              onChange={(e) =>
                                handleInputChange(
                                  "vitals",
                                  "pallor",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="hms-vitals-labels">Edema()</label>
                            <input
                              className="hms-inp1 hms-input-highlight"
                              type="text"
                              value={prescription.vitals.edema}
                              onChange={(e) =>
                                handleInputChange(
                                  "vitals",
                                  "edema",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="hms-vitals-labels">
                              Lcterus(cm)
                            </label>
                            <input
                              className="hms-inp1 hms-input-highlight"
                              type="text"
                              value={prescription.vitals.lcterus}
                              onChange={(e) =>
                                handleInputChange(
                                  "vitals",
                                  "lcterus",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="hms-vitals-labels">
                              Lymphademopathy()
                            </label>
                            <input
                              className="hms-inp1 hms-input-highlight"
                              type="text"
                              value={prescription.vitals.lymphademopathy}
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
                              value={prescription.vitals.clubbing}
                              onChange={(e) =>
                                handleInputChange(
                                  "vitals",
                                  "clubbing",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="hms-vitals-labels">
                              Cyanosis()
                            </label>
                            <input
                              className="hms-inp1 hms-input-highlight"
                              type="text"
                              value={prescription.vitals.cyanosis}
                              onChange={(e) =>
                                handleInputChange(
                                  "vitals",
                                  "cyanosis",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <label className="hms-vitals-labels">JVP()</label>
                            <input
                              className="hms-inp1 hms-input-highlight"
                              type="text"
                              value={prescription.vitals.jvp}
                              onChange={(e) =>
                                handleInputChange(
                                  "vitals",
                                  "jvp",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hms-cmp-dia">
                    <div className="hms-tests-req">
                      {prescription.complaints &&
                        prescription.complaints.selectedComplaint &&
                        prescription.complaints.selectedComplaint.length >
                          0 && (
                          <>
                            <label className="label543">Complaints </label>

                            <div className="tests-box">
                              <ol className="tests-list">
                                {prescription.complaints.selectedComplaint.map(
                                  (complaint) => (
                                    <li
                                      key={complaint}
                                      className="complaint-item"
                                    >
                                      {complaint}
                                    </li>
                                  )
                                )}
                              </ol>
                            </div>
                          </>
                        )}
                    </div>
                    <div className="hms-tests-req">
                      {prescription.complaints &&
                        prescription.complaints.selectedDiagnosis &&
                        prescription.complaints.selectedDiagnosis.length >
                          0 && (
                          <>
                            <label className="label543">Diagnosis </label>

                            <div className="tests-box">
                              <ol className="tests-list">
                                {prescription.complaints.selectedDiagnosis.map(
                                  (diagnosis) => (
                                    <li
                                      key={diagnosis}
                                      className="diagnosis-item"
                                    >
                                      {diagnosis}
                                    </li>
                                  )
                                )}
                              </ol>
                            </div>
                          </>
                        )}
                    </div>
                  </div>
                </div>
                {prescriptionData && prescriptionData.medicines}
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
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptionData && prescriptionData.medicines ? (
                      prescriptionData.medicines.map((medicine, index) => {
                        console.log("Medicine Data:", medicine);
                        return (
                          <tr key={index}>
                            <td className="hms-table-td">{index + 1}</td>
                            <td className="hms-table-td">
                              {medicine.medicine}
                            </td>
                            <td className="hms-table-td">{medicine.dose}</td>
                            <td className="hms-table-td">{medicine.when}</td>
                            <td className="hms-table-td">
                              {medicine.duration}
                            </td>
                            <td className="hms-table-td">
                              {medicine.frequency}
                            </td>
                            <td className="hms-table-td">{medicine.notes}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="7">No medicines available</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="hms-advs-diet">
                  <div className="hms-advs">
                    <label className="label543">Advice </label>
                    <textarea
                      className="hms-prescription-advise"
                      value={prescription.advice?.advice || ""}
                      onChange={(e) =>
                        handleInputChange("advice", "advice", e.target.value)
                      }
                    />
                  </div>

                  <div className="hms-advs">
                    <label className="label543">Diet & Excercise</label>
                    <textarea
                      className="hms-prescription-advise"
                      value={prescription?.advice?.dietExercise || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "advice",
                          "dietExercise",
                          e.target.value
                        )
                      }
                    />
                    {/* Display Diet & Exercise */}
                    {prescriptionData?.advice?.dietExercise && (
                      <>
                        <span className="diet-exercise-list">
                          Diet & Exercise:
                        </span>
                        <br />
                        <span>{prescriptionData.advice.dietExercise}</span>
                        <br />
                      </>
                    )}
                  </div>
                </div>
                <div className="hms-advs-diet mtkr-3">
                  <div className="hms-tests-req">
                    {prescription.testsRequested &&
                      prescription.testsRequested.selectedTests &&
                      prescription.testsRequested.selectedTests.length > 0 && (
                        <>
                          <label className="label543">Tests Requested </label>

                          <div className="tests-box">
                            <ol className="tests-list">
                              {prescription.testsRequested.selectedTests.map(
                                (test) => (
                                  <li key={test} className="test-item">
                                    {test}
                                  </li>
                                )
                              )}
                            </ol>
                          </div>
                        </>
                      )}
                  </div>

                  {prescription.testsRequested &&
                    prescription.testsRequested.when && (
                      <>
                        <label className="hms-lab">Test(When) </label>

                        <input
                        className="hms-inp-when"
                          type="text"
                          value={prescription.testsRequested.when}
                          onChange={(e) =>
                            handleInputChange(
                              "testsRequested",
                              "when",
                              e.target.value
                            )
                          }
                        />
                      </>
                    )}
                </div>
              </li>
            ))}
        </ul>
      </div>
      <Link to={`/otherPage/${patientId}`} className="button-link">
        Go to Other Page
      </Link>
    </div>
  );
};

export default PatientDetails;
