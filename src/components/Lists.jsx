import React from "react";

function Lists({ todos, handleDelete, handleComplete, handleEditClick }) {
  const element = todos?.map((todo) => (
    <li key={todo.id} className={`item ${todo.isCompleted ? "completed" : ""}`}>
      <p
        style={{
          textDecoration: todo.isCompleted ? "line-through" : "none",
        }}
      >
        {todo.title}
      </p>
      <div className="icon-group">
        <span
          className=" icon icon-complete--btn"
          onClick={() => handleComplete(todo)}
        >
          C
        </span>
        <span
          className=" icon icon-delete--btn"
          onClick={() => handleDelete(todo)}
        >
          D
        </span>
        <span
          className="icon icon-edit--btn"
          onClick={() => handleEditClick(todo)}
        >
          E
        </span>
      </div>
    </li>
  ));

  return <>{element}</>;
}

export default Lists;
