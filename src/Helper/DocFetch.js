// api.js
import { BASE_URL } from "./Helper";

export const fetchStaffDetails = async (staffId) => {
  try {
    const response = await fetch(`${BASE_URL}/userget?staffId=${staffId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const staffDetails = await response.json();
      return staffDetails;
    } else {
      // Handle error
      console.error("Error fetching staff details:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching staff details:", error);
    return null;
  }
};

export const fetchPatientDetails = async (patientId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/getpatients?patientId=${patientId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const staffDetails = await response.json();
      return staffDetails;
    } else {
      // Handle error
      console.error("Error fetching staff details:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching staff details:", error);
    return null;
  }
};

export const fetchPatientprescription = async (patientId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/prescriptionOne?patientId=${patientId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const patientprescription = await response.json();
      return patientprescription;
    } else {
      console.error("Error fetching staff details:", response.statusText);
      return null;
    }
  } catch (err) {
    console.error("Error fetching staff details:", err)
    return null;
  }
};
