import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const TableFilters = ({ onFilterChange, onClearFilters }) => {
  const [amountRange, setAmountRange] = useState({ min: 1, max: 100 });
  const [createdDate, setCreatedDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");

  const handleFilterApply = () => {
    const filters = {
      amount: amountRange,
      created: createdDate,
      dueDate: dueDate,
      status: status,
    };
    onFilterChange(filters);
  };

  const handleCreatedDateFocus = (e) => {
    if (e.target.type === "text") {
      e.target.type = "date";
      e.target.value = createdDate;
    }
  };

  const handleCreatedDateBlur = (e) => {
    if (e.target.value === "") {
      e.target.type = "text";
      e.target.placeholder = "Select created date";
    }
  };

  const handleDueDateFocus = (e) => {
    if (e.target.type === "text") {
      e.target.type = "date";
      e.target.value = dueDate;
    }
  };

  const handleDueDateBlur = (e) => {
    if (e.target.value === "") {
      e.target.type = "text";
      e.target.placeholder = "Select due date";
    }
  };

  const handleStatusBlur = (e) => {
    if (e.target.value === "") {
      e.target.type = "text";
      e.target.placeholder = "Status";
    }
  };

  return (
    <div
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "20px" }}>Table Filter</h1>
      <div>
        <label>Amount Range: </label>
        <div className="amount-inputs">
          <input
            type="number"
            value={amountRange.min}
            onChange={(e) =>
              setAmountRange({ ...amountRange, min: e.target.value })
            }
          />
          <span> - </span>
          <input
            type="number"
            value={amountRange.max}
            onChange={(e) =>
              setAmountRange({ ...amountRange, max: e.target.value })
            }
          />
        </div>
      </div>
      <div className="filter-group">
        <label>Created Date:</label>
        <input
          type="text"
          value={createdDate}
          placeholder="Select created date"
          onFocus={handleCreatedDateFocus}
          onBlur={handleCreatedDateBlur}
          onChange={(e) => setCreatedDate(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label>Due Date:</label>
        <input
          type="text"
          value={dueDate}
          placeholder="Select due date"
          onFocus={handleDueDateFocus}
          onBlur={handleDueDateBlur}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Status:</label>
        <input
          type="text"
          value={status}
          placeholder="Status"
          onBlur={handleStatusBlur}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <div className="filter-actions">
        <button className="clear-button" onClick={onClearFilters}>
          <RiDeleteBin6Line />
          Clear
        </button>
        <button className="show-results-button" onClick={handleFilterApply}>
          Show Results
        </button>
      </div>
    </div>
  );
};

export default TableFilters;
