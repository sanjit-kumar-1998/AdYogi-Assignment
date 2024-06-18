import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportToCSV = (data) => {
  const csvData = data.map((row) => ({
    ...row,
    amount: row.amount.toFixed(2),
  }));

  const csvContent =
    "data:text/csv;charset=utf-8," +
    csvData.map((e) => Object.values(e).join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "data.csv");
  document.body.appendChild(link);
  link.click();
};

export const exportToExcel = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  XLSX.writeFile(workbook, "data.xlsx");
};

export const exportToPDF = (data) => {
  const doc = new jsPDF();

  const tableColumn = Object.keys(data[0]);
  const tableRows = data.map((row) => Object.values(row));

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
  });

  doc.save("data.pdf");
};
