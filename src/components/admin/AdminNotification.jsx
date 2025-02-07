import React, { useEffect, useState } from "react";
import axios from "axios";
const AdminNotification = () => {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/viewUnApproved",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleDecision = async (id, decision) => {
    try {
      if (decision === "accept") {
        await axios.put(
          "http://localhost:8080/api/admin/approveTeacher",
          { id: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `http://localhost:8080/api/teacher-requests/${id}/${decision}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setRequests((prev) => prev.filter((request) => request.id !== id));
      setNotificationCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error(`Error on ${decision}:`, error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Teacher Role Requests
      </h1>
      <div className="grid gap-4">
        {requests.map((teacher) => (
          <div key={teacher.id} className="p-4 shadow-lg rounded-2xl bg-white">
            <h2 className="text-xl font-semibold">{teacher.name}</h2>
            <p>
              <strong>Qualification:</strong> {teacher.highestQualification}
            </p>
            <p>
              <strong>Speciality:</strong> {teacher.speciality}
            </p>
            <p>
              <strong>Bio:</strong> {teacher.bio}
            </p>
            <div className="flex gap-4 mt-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => handleDecision(teacher.id, "accept")}
              >
                Accept
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => handleDecision(teacher.id, "reject")}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotification;
