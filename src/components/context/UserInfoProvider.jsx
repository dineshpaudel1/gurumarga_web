import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [role, setRole] = useState("");
  const [id, setId] = useState();

  const token = localStorage.getItem("token");
  localStorage.setItem("id", id);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/user/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const data = await response.json();
      setUserInfo(data);
      setId(data.id);
      setRole(data.roles.name);
    } catch (err) {
      console.log(err.message);
    }
  };

  const checkServer = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users/check");
      if (response.data === "hello") {
      } else {
        localStorage.removeItem("token");
        console.log("Token removed");
        setUserInfo(null); // Clear user info if token is removed
      }
    } catch (error) {
      console.error("Error checking the API:", error);
      localStorage.removeItem("token");
      setUserInfo(null);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    checkServer(); // Call the checkServer function on initialization
  }, [token]);

  useEffect(() => {
    if (!token) {
      setUserInfo(null);
    }
  }, [token]);

  const contextValue = [userInfo, fetchUserInfo, role];

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;
