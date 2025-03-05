import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

const EnrolledUser = () => {
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEnrolledUsers = async () => {
      try {
        const { data, status } = await axios.get(
          "http://localhost:8080/api/showEnroll",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (status === 200) setEnrolledUsers(data);
        else setError("Failed to fetch enrolled users.");
      } catch (err) {
        console.error("Error fetching enrolled users:", err);
        setError("An error occurred while fetching enrolled users.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledUsers();
  }, [token]);

  const handleDeleteUser = async (id) => {
    try {
      const { status } = await axios.delete(
        `http://localhost:8080/api/deleteEnroll/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (status === 200) {
        setEnrolledUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } else {
        setError("Failed to delete user.");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("An error occurred while deleting the user.");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading enrolled users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Enrolled Users</h2>
      
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Course Title</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrolledUsers.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.courseTitle}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className=" text-red-500 px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledUser;
