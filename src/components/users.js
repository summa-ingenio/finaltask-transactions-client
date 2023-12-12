// UserList.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../UserList.css";
import Navbar from "./MenuBar";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token"); // Assuming you store the token in localStorage

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://finaltask-server-950d32b6c3a7.herokuapp.com/api/users",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, [token]); // Include token as a dependency to re-fetch when it changes

  // Function to handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(
        `https://finaltask-server-950d32b6c3a7.herokuapp.com/api/users/${userId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Update the users list after deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="user-table-container">
        <h2 className="users-title">List of Registered Users</h2>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th> {/* Add a new column for the delete button */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="user-button-container">
          <Link to="/transactions">
            <button className="users-button">View Transactions</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserList;
