import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./MenuBar";
import Arbitrage from "../components/arbitrage";
import "../TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("ZAR");
  const [loading, setLoading] = useState(false);

  const fetchArbitrageRate = async () => {
    try {
      // Fetch the arbitrage rate from your endpoint
      const response = await axios.get(
        "https://final-pricing-server-accfd4e36d9a.herokuapp.com/arbitrage-rate"
      );
      const arbitrageRate = parseFloat(response.data.arbitrageRate);

      return arbitrageRate.toFixed(2);
    } catch (error) {
      console.error("Failed to fetch arbitrage rate", error);
      throw error;
    }
  };
  const usdRate = async () => {
    try {
      // Fetch the USD rate from your endpoint
      const response = await axios.get(
        "https://final-pricing-server-accfd4e36d9a.herokuapp.com/kraken-price"
      );
      const usd = response.data.krakenPrice;

      return usd;
    } catch (error) {
      console.error("Failed to fetch USD rate", error);
      throw error;
    }
  };
  const zarRate = async () => {
    try {
      // Fetch the ZAR rate from your endpoint
      const response = await axios.get(
        "https://final-pricing-server-accfd4e36d9a.herokuapp.com/luno-price"
      );
      const zar = response.data.lunoPrice;

      return zar;
    } catch (error) {
      console.error("Failed to fetch ZAR rate", error);
      throw error;
    }
  };

  useEffect(() => {
    // Fetch tasks from the server upon component mount
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://finaltask-server-950d32b6c3a7.herokuapp.com/api/tasks",
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );

        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Failed to fetch tasks", error.response.data);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleAddTask = async () => {
    try {
      setLoading(true);

      if (newTask.length > 140) {
        console.error("Task cannot exceed 140 characters");
        alert("Task cannot exceed 140 characters");
        return;
      }

      // Get the current arbitrage rate (modify this logic based on your app structure)
      const arbitrageRate = await fetchArbitrageRate();
      const usd = await usdRate();
      const zar = await zarRate();
      console.log("Arbitrage Rate:", arbitrageRate);
      console.log("USD Price:", usd);
      console.log("ZAR Price:", zar);

      // Optimistically update UI
      const optimisticTask = {
        _id: Date.now(),
        task: newTask,
        currency: selectedCurrency,
        arbitrageRate,
        usd,
        zar,
      };
      setTasks([...tasks, optimisticTask]);
      setNewTask("");

      // Send request to add task with the Authorization header
      const token = localStorage.getItem("token");
      await axios.post(
        "https://finaltask-server-950d32b6c3a7.herokuapp.com/api/addTask",
        {
          task: newTask,
          currency: selectedCurrency,
          arbitrageRate,
          usd,
          zar,
          username: localStorage.getItem("username"),
        },
        { headers: { Authorization: token } }
      );

      // Fetch updated tasks after adding a new task
      const response = await axios.get(
        "https://finaltask-server-950d32b6c3a7.herokuapp.com/api/tasks",
        {
          headers: { Authorization: token },
        }
      );

      setTasks(response.data.tasks);
    } catch (error) {
      console.error(
        "Failed to add task",
        error.response?.data || error.message
      );
      // Handle task addition failure, e.g., show an error message to the user
      alert("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = async (taskId, updatedTask) => {
    try {
      // Optimistically update UI
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, task: updatedTask } : task
      );
      setTasks(updatedTasks);

      // Send request to edit task
      await axios.put(
        `https://finaltask-server-950d32b6c3a7.herokuapp.com/api/editTask/${taskId}`,
        { task: updatedTask },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
    } catch (error) {
      console.error("Failed to edit task", error.response.data);
      // Handle task editing failure, e.g., show an error message
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      // Optimistically update UI
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);

      // Send request to delete task
      const token = localStorage.getItem("token");
      console.log("Deleting task with ID:", taskId);

      await axios.delete(
        `https://finaltask-server-950d32b6c3a7.herokuapp.com/api/removeTask/${taskId}`,
        {
          headers: { Authorization: token },
        }
      );

      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Failed to delete task", error.response.data);
      // Handle task deletion failure, e.g., show an error message
    }
  };

  return (
    <div className="todo-list-container">
      <Navbar />
      <Arbitrage />
      <div className="transactions-container">
        <h2 className="title-trans">Transactions</h2>
        <label>
          New Transaction Amount:
          <input
            type="number"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="trans-input"
          />
        </label>
        <label className="trans-label">
          Currency:
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="trans-select"
          >
            <option value="USD">USD</option>
            <option value="ZAR">ZAR</option>
          </select>
        </label>
        <div className="button-container">
          <button
            onClick={handleAddTask}
            disabled={loading}
            className="trans-button"
          >
            {loading ? "Adding..." : "Add Transaction"}
          </button>
        </div>
        <div className="tasks-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Currency</th>
                <th>Arbitrage Rate</th>
                <th>USD</th>
                <th>ZAR</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.task}</td>
                  <td>{task.currency}</td>
                  <td>{task.arbitrageRate} %</td>
                  <td>${task.usd}</td>
                  <td>R{task.zar}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() =>
                        handleEditTask(
                          task._id,
                          prompt("Edit task:", task.task)
                        )
                      }
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
