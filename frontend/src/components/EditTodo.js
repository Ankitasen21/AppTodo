import React, { useEffect, useState } from "react";
import ErrorModal from "../layout/ErrorModal";

import { FcClock, FcApproval } from "react-icons/fc";
import "../layout/modal.css";

function EditTodo({ todoId, onUpdate }) {
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8081/todos/${todoId}`)
      .then((response) => response.json())
      .then((data) => {
        setTodo(data);

        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching todo:", error);
      });
  });

  const handleUpdate = () => {
    if (updatedTitle.trim() !== "") {
      fetch(`http://localhost:8081/todos/${todoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: updatedTitle }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error updating task");
          }
          console.log("Task updated successfully");
          onUpdate();
          // Notify the parent component that the task has been updated
        })
        .catch((error) => {
          console.error("Error updating task:", error);
          setErrorMessage("Error updating tasks! Please try again later.");
          // Handle the error appropriately
        });
    } else {
      setErrorMessage("Enter an updated title first!");
    }
  };

  const closeErrorModal = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <div className="backdrop">
        <div className="content">
          <p className="h2"> Update Task </p>
          <input
            className="form-control mb-3"
            type="text"
            value={updatedTitle ? updatedTitle : todo.title}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            placeholder={todo.title}
          />
          <p className="h5">
            Status:
            {todo.completed ? (
              <FcApproval
                style={{
                  fontSize: "36px",
                  textAlign: "center",
                  marginLeft: "0.8rem",
                }}
              />
            ) : (
              <FcClock
                style={{
                  fontSize: "36px",
                  textAlign: "center",
                  marginLeft: "0.8rem",
                }}
              />
            )}
          </p>
          <div className="d-flex col column-gap-3">
            <button
              type="submit"
              className="btn btn-success mb-3"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className="btn btn-outline-dark mb-3"
              onClick={onUpdate}
            >
              Close
            </button>
            {errorMessage && (
              <ErrorModal
                errorMessage={errorMessage}
                onClose={closeErrorModal}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTodo;
