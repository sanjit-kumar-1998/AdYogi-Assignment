import React from "react";
import { CiFilter } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { FiMenu } from "react-icons/fi";

const Navbar = ({
  searchValue,
  onSearchChange,
  onToggleColumns,
  onToggleFilters,
}) => {
  return (
    <div
      className="navbar"
      style={{ position: "relative", display: "flex", alignItems: "center" }}
    >
      <div
        style={{ position: "relative", display: "inline-block", width: "100%" }}
      >
        <IoMdSearch
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: "#ccc",
          }}
        />
        <input
          type="text"
          placeholder="Search by anything..."
          value={searchValue}
          onChange={onSearchChange}
          style={{
            width: "20%",
            paddingLeft: "25px", // Adjust padding to make space for the icon
          }}
        />
      </div>
      <button
        onClick={onToggleFilters}
        style={{
          marginLeft: "10px",
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <CiFilter />
        Filters
      </button>
      <button
        onClick={onToggleColumns}
        style={{
          display: "flex",
          marginLeft: "10px",
          border: "1px solid black",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <FiMenu />
        <FiMenu />
      </button>
    </div>
  );
};

export default Navbar;
