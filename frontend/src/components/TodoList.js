import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import ErrorModal from "../layout/ErrorModal";
import "./TodoList.css";
import { FaEye, FaPen, FaMinusCircle } from "react-icons/fa";
import ViewTodo from "./ViewTodo";

function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const API_URL = "http://localhost:8081/todos";

  useEffect(() => {
    loadTodos();
  }, []);

  // get all tasks
  const loadTodos = () => {
    fetch(`${API_URL}`)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.error("error fetch tasks: ", error);
        setErrorMessage("Error fetching tasks! Please try again later.");
      });
  };

  const handleViewClick = (todo) => {
    setSelectedTodo(todo);
  };

  const viewedTodo = () => {
    setSelectedTodo(null);
  };

  // add task
  const addTaskHandler = () => {
    if (newTodo.trim() !== "") {
      fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTodo, completed: false }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error creating new task");
          }
          console.log("Task added successfully");
          setNewTodo("");
          loadTodos();
        })
        .catch((error) => {
          console.error("Error adding task: ", error);
          setErrorMessage("Error adding tasks! Please try again later.");
        });
    } else {
      setErrorMessage("Please enter a valid task! ");
      return (
        <ErrorModal errorMessage={errorMessage} onClose={closeErrorModal} />
      );
    }
  };

  // delete tasks
  const deleteTodos = (todo) => {
    const taskId = todo.id;

    fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("error deleting task: response not ok");
        }
        loadTodos();
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        setErrorMessage("Error deleting tasks! Please try again later.");
      });
  };

  // delete all tasks
  const deleteAll = () => {
    if (todos.length !== 0) {
      fetch(`${API_URL}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("error deleting task: response not ok");
          }
          loadTodos();
        })
        .catch((error) => {
          console.error("Error deleting task:", error);
          setErrorMessage("Error deleting tasks! Please try again later");
          console.log(error);
        });
    } else {
      setErrorMessage("No tasks to be deleted! Add a task instead ");
    }
  };

  // update task
  const todoUpdateHandler = (todo) => {
    // console.log(todoId)
    setSelectedTodoId(todo.id);
  };
  const updatedTodo = () => {
    setSelectedTodoId(null);
    loadTodos();
  };

  // status handler
  const toggleStatus = (todo) => {
    const todoId = todo.id;
    const todoTitle = todo.title;
    const todoStatus = todo.completed;

    fetch(`${API_URL}/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: todoTitle, completed: !todoStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating task status");
        }
        console.log("Task status updated successfully");
        loadTodos(); // Fetch the updated list after updating status
      })
      .catch((error) => {
        console.error("Error updating task status:", error);
      });
  };

  // sort the status
  const sortedTodos = todos.slice().sort((todoA, todoB) => {
    if (todoA.completed && !todoB.completed) {
      return 1;
    } else if (!todoA.completed && todoB.completed) {
      return -1;
    } else {
      return 0;
    }
  });

  const closeErrorModal = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control w-50 p-2"
          placeholder="another task to be done"
          aria-label="new task to be done"
          id="input"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="submit"
          onClick={() => addTaskHandler()}
        >
          Add Task
        </button>
        <button
          className="btn btn-outline-danger"
          type="button"
          onClick={() => deleteAll()}
        >
          Delete all tasks
        </button>
      </div>
      <div>
        {errorMessage && (
          <ErrorModal
            errorMessage={errorMessage}
            onClose={closeErrorModal}
            target="#staticBackdrop"
          />
        )}
      </div>
      <div className="py-4">
        {sortedTodos.length === 0 ? (
          <p className="default"> Do not have any tasks in the list yet! </p>
        ) : (
          <>
            <table className="table table-hover" id="tablelist">
              <thead className="table-dark">
                <tr>
                  <th scope="col">TaskID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedTodos.map((todo, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td className={todo.completed ? "completed" : ""}>
                      {todo.title}
                    </td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => toggleStatus(todo)}
                      >
                        {todo.completed ? "Completed" : "Pending"}
                      </button>
                    </td>
                    <td>
                      <div className="container top-0">
                        {" "}
                        <button
                          className="btn"
                          onClick={() => handleViewClick(todo)}
                          id="action"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="btn"
                          onClick={() => todoUpdateHandler(todo)}
                          id="edit"
                        >
                          <FaPen />
                        </button>
                        <button
                          className="btn"
                          onClick={() => deleteTodos(todo)}
                          id="action-delete"
                        >
                          <FaMinusCircle />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {selectedTodoId && (
          <EditTodo todoId={selectedTodoId} onUpdate={updatedTodo} />
        )}
        {selectedTodo && (
          <ViewTodo todoId={selectedTodo.id} onView={viewedTodo} />
        )}
      </div>
    </>
  );
}

export default TodoList;
