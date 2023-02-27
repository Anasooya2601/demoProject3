import React from "react";

import { TextField } from "@mui/material";

function Form({
  onValChange,
  formObject,
  onFormSubmit,
  onFileChange,
  onSearchChange
}) {
  return (
    <div className="row mb-4">
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="page-no"
          onChange={onValChange}
          value={formObject.pageno}
          name="pageno"
        />
      </div>
      <div className="mb-3">
        <input
          type="date"
          placeholder="date"
          className="form-control"
          onChange={onValChange}
          value={formObject.date}
          name="date"
        />
      </div>

      <div className="mb-3">
        <input
          type="time"
          className="form-control"
          placeholder="time"
          onChange={onValChange}
          value={formObject.time}
          name="time"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          onChange={onValChange}
          value={formObject.Title}
          name="Title"
        />
      </div>
      <div className="mb-3">
        <input
          type="file"
          className="form-control"
          onChange={onFileChange}
          value={formObject.pdfFile}
          name="pdfFile"
        />
      </div>

      <div className="d-grid">
        <button
          type="button"
          className="btn btn-success"
          onClick={onFormSubmit}
        >
          Add files
        </button>
      </div>

      <div>
        {/* <label>Search:</label>
        <input
          className="search_bar"
          type="text"
          name="search"
          value={formObject.search}
          onChange={onSearchChange}
        ></input> */}

        <TextField
          type="text"
          name="search"
          label="search by title"
          value={formObject.search}
          onChange={onSearchChange}
          multiline
          maxRows={4}
          variant="standard"
        />
      </div>

      {formObject.pdf && (
        <div className="d-grid">
          {/* <button
            type="button"
            className="btn btn-danger"
            onClick={onDeleteRow}
          >
            Delete Row
          </button> */}
        </div>
      )}
    </div>
  );
}

export default Form;
