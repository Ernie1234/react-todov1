import React from "react";

function EditInput({
  handleEditChange,
  handleEditSubmit,
  currentEdit,
  handleCancel,
}) {
  return (
    <form className="form" onSubmit={handleEditSubmit}>
      <input
        className="input"
        onChange={handleEditChange}
        type="text"
        value={currentEdit.title}
      />
      <button className="btn" type="submit">
        Save
      </button>
      <button className="clc" type="text" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default EditInput;
