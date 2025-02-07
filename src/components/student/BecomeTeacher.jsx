import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use this for redirection
import teacherBg from "../../assets/become.png";
import teacherphoto from "../../assets/teacher.png";
import axios from "axios"; // Import axios for API calls

// Modal Component
const Modal = ({ isOpen, onClose, sendData }) => {
  const [formData, setFormData] = useState({
    highestQualification: "",
    speciality: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    const uid = localStorage.getItem("id");

    if (!token) {
      alert("You need to log in to perform this action.");
      return;
    }

    const data = {
      id: uid, // Keeping id static for now; you can make it dynamic if needed
      ...formData,
    };

    try {
      // Make the API call with token
      const response = await axios.post(
        "http://localhost:8080/api/user/teacherRegister",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
            "Content-Type": "application/json", // Specify JSON content
          },
        }
      );
      console.log("API Response:", response.data);
      alert("Successfully registered as a teacher!");
      sendData(data); // Call the sendData function
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error registering as teacher:", error);
      alert("you are registered already wait for verification");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4">Become a Teacher</h2>
        <p className="mb-4">Fill in your details to become a teacher.</p>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Highest Qualification
          </label>
          <input
            type="text"
            name="highestQualification"
            value={formData.highestQualification}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your highest qualification"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Speciality</label>
          <input
            type="text"
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your speciality"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Write a short bio about yourself"
          ></textarea>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Submit
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Main Component
const BecomeTeacher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const checkLoginStatus = () => {
    const isLoggedIn = localStorage.getItem("token") !== null;
    return isLoggedIn;
  };

  const openModal = () => {
    if (checkLoginStatus()) {
      setIsModalOpen(true);
    } else {
      navigate("/login"); // Redirect to login page if not logged in
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sendTeacherData = (data) => {
    console.log("Sending data:", data);
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-100 relative"
      style={{
        backgroundImage: { teacherBg },
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full text-center">
        <img
          src={teacherphoto}
          alt="Teacher"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <blockquote className="italic text-xl mb-4 text-gray-700">
          "Teaching is the greatest act of optimism."
        </blockquote>
        <p className="text-gray-600 mb-6">
          Become a teacher today and inspire the world.
        </p>
        <button
          onClick={openModal}
          className="bg-[#5e17eb] text-white px-6 py-2 rounded-full"
        >
          Become a Teacher
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        sendData={sendTeacherData}
      />
    </div>
  );
};

export default BecomeTeacher;
