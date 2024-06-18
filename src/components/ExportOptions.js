import React from "react";
import { exportToCSV, exportToExcel, exportToPDF } from "../utils/exportUtils";

const ExportOptions = ({ data }) => {
  return (
    <div className="export-options">
      <button onClick={() => exportToCSV(data)}>Export to CSV</button>
      <button onClick={() => exportToExcel(data)}>Export to Excel</button>
      <button onClick={() => exportToPDF(data)}>Export to PDF</button>
    </div>
  );
};

export default ExportOptions;
