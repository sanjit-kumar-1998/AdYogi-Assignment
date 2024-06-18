import React, { useState, useEffect } from "react";
import ToggleColumns from "./ToggleColumns";
import TableFilters from "./TableFilters";
import ExportOptions from "./ExportOptions";
import SummaryRow from "./SummaryRow";
import Navbar from "./Navbar";
import Modal from "./Modal";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../utils/localStorageUtils";
import ProfileImg from "./data/Profile.json";

const initialData = [
  {
    profilePicture: `/Assets/${ProfileImg.imgSrc[0]}`,
    customer: "Camille Jenkins",
    email: "retha.lehner47@hotmail.com",
    created: "October 20, 2022",
    dueDate: "July 1, 2024",
    amount: 295.0,
    status: "Draft",
  },
  {
    profilePicture: `/Assets/${ProfileImg.imgSrc[1]}`,
    customer: "Genevieve Hammes",
    email: "bernard63@yahoo.com",
    created: "January 25, 2023",
    dueDate: "July 29, 2024",
    amount: 384.0,
    status: "Draft",
  },
  {
    profilePicture: `/Assets/${ProfileImg.imgSrc[2]}`,
    customer: "Alejandro Reichert",
    email: "wava.muller47@gmail.com",
    created: "October 10, 2022",
    dueDate: "May 4, 2023",
    amount: 437.0,
    status: "Draft",
  },
  {
    profilePicture: `/Assets/${ProfileImg.imgSrc[3]}`,
    customer: "Carl Bode",
    email: "virgil.skiles@hotmail.com",
    created: "October 2, 2022",
    dueDate: "May 28, 2024",
    amount: 825.0,
    status: "Draft",
  },
  {
    profilePicture: `/Assets/${ProfileImg.imgSrc[4]}`,
    customer: "Connie Braun",
    email: "mervin.rutherford@hotmail.com",
    created: "July 3, 2023",
    dueDate: "December 28, 2024",
    amount: 135.0,
    status: "Draft",
  },
  {
    profilePicture: `/Assets/${ProfileImg.imgSrc[5]}`,
    customer: "Jessie Green",
    email: "carole17@gmail.com",
    created: "April 17, 2023",
    dueDate: "May 11, 2023",
    amount: 295.0,
    status: "Draft",
  },
  {
    profilePicture: `/Assets/${ProfileImg.imgSrc[6]}`,
    customer: "Kelli Gutmann",
    email: "ismael.schneider@hotmail.com",
    created: "November 27, 2022",
    dueDate: "November 22, 2025",
    amount: 384.0,
    status: "Draft",
  },
  {
    profilePicture: `/Assets/${ProfileImg.imgSrc[7]}`,
    customer: "Dr. Winston Koelpin I",
    email: "janet.hand4@yahoo.com",
    created: "April 12, 2023",
    dueDate: "January 28, 2023",
    amount: 437.0,
    status: "Draft",
  },
];

const Table = () => {
  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState(
    loadFromLocalStorage("columns") || {
      checked: true,
      customer: true,
      email: true,
      created: true,
      dueDate: true,
      amount: true,
      status: true,
    }
  );
  const [sortConfig, setSortConfig] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [isToggleColumnsOpen, setIsToggleColumnsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Set rows per page

  useEffect(() => {
    saveToLocalStorage("columns", columns);
  }, [columns]);

  const toggleColumn = (column) => {
    setColumns((prevState) => ({
      ...prevState,
      [column]: !prevState[column],
    }));
  };

  const handleSort = (column) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === column &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key: column, direction: direction });
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFilterChange = (filters) => {
    setFilters(filters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const filteredData = React.useMemo(() => {
    let filteredItems = [...data];
    if (searchValue) {
      filteredItems = filteredItems.filter((item) =>
        Object.values(item).some((val) =>
          val.toString().toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filteredItems = filteredItems.filter((item) =>
          item[key]
            .toString()
            .toLowerCase()
            .includes(filters[key].toString().toLowerCase())
        );
      }
    });
    return filteredItems;
  }, [data, filters, searchValue]);

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return filteredData;
    const sortedItems = [...filteredData];
    sortedItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    return sortedItems;
  }, [filteredData, sortConfig]);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <Navbar
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onToggleColumns={() => setIsToggleColumnsOpen(true)}
        onToggleFilters={() => setIsFilterOpen(true)}
      />
      <Modal
        show={isToggleColumnsOpen}
        onClose={() => setIsToggleColumnsOpen(false)}
      >
        <ToggleColumns columns={columns} onToggleColumn={toggleColumn} />
      </Modal>
      <Modal show={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
        <TableFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      </Modal>
      <ExportOptions data={sortedData} />
      <table>
        <thead>
          <tr>
            {columns.checked && <th></th>}
            {columns.customer && (
              <th onClick={() => handleSort("customer")}>Customer</th>
            )}
            {columns.email && (
              <th onClick={() => handleSort("email")}>Email</th>
            )}
            {columns.created && (
              <th onClick={() => handleSort("created")}>Created</th>
            )}
            {columns.dueDate && (
              <th onClick={() => handleSort("dueDate")}>Due Date</th>
            )}
            {columns.amount && (
              <th onClick={() => handleSort("amount")}>Amount</th>
            )}
            {columns.status && (
              <th onClick={() => handleSort("status")}>Status</th>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              {columns.checked && (
                <td>
                  <input type="checkbox" />
                </td>
              )}
              {columns.customer && (
                <td style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={item.profilePicture}
                    alt={item.customer}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  />
                  {item.customer}
                </td>
              )}
              {columns.email && <td>{item.email}</td>}
              {columns.created && <td>{item.created}</td>}
              {columns.dueDate && <td>{item.dueDate}</td>}
              {columns.amount && <td>{item.amount.toFixed(2)}</td>}
              {columns.status && <td>{item.status}</td>}
            </tr>
          ))}
        </tbody>
        <SummaryRow data={sortedData} columns={columns} />
      </table>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
         {currentPage} , {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
