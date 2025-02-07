import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();
const BASE_URL = "http://localhost:8080";

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [role, setRole] = useState("");
  const [id, setId] = useState(null);
  const [categoryInfo, setCategoryInfo] = useState([]);

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/category`);
      setCategoryInfo(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchUserInfo = async () => {
    if (!token) return; // Prevent API call if no token is found

    try {
      const response = await fetch(`${BASE_URL}/api/user/info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const data = await response.json();
      setUserInfo(data);
      setId(data.id);
      setRole(data.roles?.name || ""); // Avoids undefined error

      // Store user ID in localStorage after fetching
      localStorage.setItem("id", data.id);
    } catch (err) {
      console.error("Error fetching user info:", err.message);
    }
  };

  const checkServer = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/check`);
      if (response.data !== "hello") {
        localStorage.removeItem("token");
        console.log("Token removed due to failed check");
        setUserInfo(null);
      }
    } catch (error) {
      console.error("Error checking API:", error);
      localStorage.removeItem("token");
      setUserInfo(null);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    checkServer();
    fetchCategories(); // Corrected function call
  }, [token]);

  const contextValue = [userInfo, fetchUserInfo, role, categoryInfo];

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;
