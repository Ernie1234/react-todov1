import React from "react";

function AppInput({ input, handleChange, handleSubmit }) {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="input"
        onChange={handleChange}
        type="text"
        value={input}
      />
      <button className="btn" type="submit">
        Add Task
      </button>
    </form>
  );
}

export default AppInput;
