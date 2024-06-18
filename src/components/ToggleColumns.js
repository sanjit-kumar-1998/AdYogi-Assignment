import React from "react";

const ToggleColumns = ({ columns, toggleColumn }) => {
  return (
    <div className="toggle-columns">
      <h4>Toggle Columns</h4>
      {Object.keys(columns).map((column) => (
        <label key={column}>
          <input
            type="checkbox"
            checked={columns[column]}
            onChange={() => toggleColumn(column)}
          />
          {column.charAt(0).toUpperCase() + column.slice(1)}
        </label>
      ))}
    </div>
  );
};

export default ToggleColumns;
