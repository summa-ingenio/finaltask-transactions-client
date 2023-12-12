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

  const handleDeleteUser = async (username) => {
    try {
      // Make a DELETE request to delete the user
      await axios.delete(
        `https://finaltask-server-950d32b6c3a7.herokuapp.com/api/users/${username}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // After successful deletion, fetch the updated user list
      const updatedUsers = await axios.get(
        "https://finaltask-server-950d32b6c3a7.herokuapp.com/api/users",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Update the local state with the new user list
      setUsers(updatedUsers.data);
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
                  <button onClick={() => handleDeleteUser(user.username)}>
                    Delete User
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
