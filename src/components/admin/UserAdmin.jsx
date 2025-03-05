import React, { useEffect, useState } from "react";
import { fetchAllUserInfo } from "../../Apis/UserApi";
import placeholderPhoto from "../../assets/teacher.webp";

const UserAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
          console.error("No access token found");
          return;
        }

        const userData = await fetchAllUserInfo(accessToken);

        const formattedUsers = userData.map((user) => ({
          ...user,
          photo: user.photo || placeholderPhoto,
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Our Users</h2>
        </div>

        {/* Scrollable Table Container */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase">
                  Photo
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase">
                  Full Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase">
                  Username
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4">
                    <img
                      src={user.photo}
                      alt={user.fullName}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-700">{user.fullName}</td>
                  <td className="px-6 py-4 text-gray-700">{user.username}</td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-gray-700">{user.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserAdmin;