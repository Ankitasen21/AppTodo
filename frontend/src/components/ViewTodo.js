import React, { useState, useEffect } from "react";
import ViewModal from "../layout/ViewModal";

function ViewTodo({ todoId, onView }) {
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8081/todos/${todoId}`)
      .then((response) => response.json())
      .then((data) => {
        setTodo(data);
      })
      .catch((error) => {
        console.error("Error fetching todo:", error);
      });
  }, [todoId]);

  return (
    <>
      {todo ? (
        <ViewModal
          message={todo.title}
          status={todo.completed}
          onClose={onView}
        />
      ) : (
        <p>Loading todo...</p>
      )}
    </>
  );
}

export default ViewTodo;
