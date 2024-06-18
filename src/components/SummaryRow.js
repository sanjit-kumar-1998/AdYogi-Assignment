import React from "react";

const SummaryRow = ({ data, columns }) => {
  return (
    <tfoot>
      <tr>
        {columns.checked && <td></td>}
        {columns.customer && (
          <td
            colSpan={
              columns.email ||
              columns.created ||
              columns.dueDate ||
              columns.amount ||
              columns.status
                ? 1
                : 6
            }
          ></td>
        )}
        {columns.email && <td></td>}
        {columns.created && <td></td>}
        {columns.dueDate && <td></td>}
        {columns.amount && <td></td>}
        {columns.status && <td></td>}
      </tr>
    </tfoot>
  );
};

export default SummaryRow;
