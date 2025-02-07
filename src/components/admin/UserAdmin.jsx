import React, { useEffect, useState } from "react";
import { fetchAllUserInfo } from "../../Apis/UserApi"; // Import the fetch function
import placeholderPhoto from "../../assets/teacher.webp"; // Placeholder image

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  // Fetch user data on component mount
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
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Our Users</h2>
      </div>

      {/* Scrollable table container with fixed dimensions */}
      <div className=" w-full max-w-[910px] max-h-[430px]">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2">Photo</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Roles</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">
                  <img
                    src={user.photo}
                    alt={user.fullName}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{user.fullName}</td>
                <td className="px-4 py-2 whitespace-nowrap">{user.username}</td>
                <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                <td className="px-4 py-2 whitespace-nowrap">{user.contact}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {user.roles.length > 0
                    ? user.roles.map((role) => role.name).join(", ")
                    : "No Roles"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAdmin;
