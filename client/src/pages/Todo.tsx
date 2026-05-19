// src/pages/Todo.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { logoutUser } from "../api/auth.api";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todo.api";

import type { Todo as TodoType } from "../types/todo.types";

const Todo = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<TodoType[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [editErrors, setEditErrors] = useState<{ title?: string; description?: string }>({});

  // Fetch Todos
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTodos();

        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]);
        }
      } catch (err) {
        console.error("Failed to fetch todos:", err);
      }
    };

    fetchTasks();
  }, []);

  const validateNewTodo = () => {
    const nextErrors: { title?: string; description?: string } = {};

    if (!newTask.trim()) {
      nextErrors.title = "Title is required.";
    }

    const trimmedDescription = newDescription.trim();
    if (!trimmedDescription) {
      nextErrors.description = "Description is required.";
    } else if (trimmedDescription.length < 5 || trimmedDescription.length > 100) {
      nextErrors.description = "Description must be 5-100 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateEditTodo = () => {
    const nextErrors: { title?: string; description?: string } = {};

    if (!editingText.trim()) {
      nextErrors.title = "Title is required.";
    }

    const trimmedDescription = editingDescription.trim();
    if (!trimmedDescription) {
      nextErrors.description = "Description is required.";
    } else if (trimmedDescription.length < 5 || trimmedDescription.length > 100) {
      nextErrors.description = "Description must be 5-100 characters.";
    }

    setEditErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // Add Todo
  const handleAddTask = async () => {
    if (!validateNewTodo()) return;

    try {
      const added = await createTodo(newTask.trim(), newDescription.trim());

      setTasks((prev) => [...prev, added]);
      setNewTask("");
      setNewDescription("");
      setErrors({});
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  // Delete Todo
  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTodo(id);

      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  // Toggle Completed
  const handleToggleCompleted = async (task: TodoType) => {
    try {
      const updated = await updateTodo(task._id, {
        completed: !task.completed,
      });

      if (updated) {
        setTasks((prev) =>
          prev.map((t) => (t._id === updated._id ? updated : t))
        );
      }
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  // Edit Todo
  const startEditingTask = (task: TodoType) => {
    setEditingId(task._id);
    setEditingText(task.title);
    setEditingDescription(task.description || "");
    setEditErrors({});
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
    setEditingDescription("");
    setEditErrors({});
  };

  const handleSaveTask = async (id: string) => {
    if (!validateEditTodo()) return;

    try {
      const updated = await updateTodo(id, {
        title: editingText.trim(),
        description: editingDescription.trim(),
      });

      if (updated) {
        setTasks((prev) =>
          prev.map((t) => (t._id === updated._id ? updated : t))
        );

        cancelEditing();
      }
    } catch (err) {
      console.error("Failed to save todo:", err);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout failed:", err);
    }

    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      
      {/* Main Container */}
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            My Todos
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        {/* Add Todo */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleAddTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg font-medium transition"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No tasks yet!
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4"
              >
                
                {/* Left */}
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={!!task.completed}
                    onChange={() => handleToggleCompleted(task)}
                    className="w-5 h-5"
                  />

                  {editingId === task._id ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p
                      className={`text-gray-700 ${
                        task.completed
                          ? "line-through text-gray-400"
                          : ""
                      }`}
                    >
                      {task.title}
                    </p>
                  )}
                </div>

                {/* Right Buttons */}
                <div className="flex gap-2 ml-4">
                  {editingId === task._id ? (
                    <>
                      <button
                        onClick={() => handleSaveTask(task._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm"
                      >
                        Save
                      </button>

                      <button
                        onClick={cancelEditing}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded-lg text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startEditingTask(task)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;