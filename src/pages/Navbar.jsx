import React, { useState, useContext } from "react";
import { GlobalContext } from "./GlobalState";

const Navbar = () => {
  const { globalData, setGlobalData } = useContext(GlobalContext);
  const [search, setSearch] = useState("");
  const updateGlobal = (e) => {
    e.preventDefault();
    setGlobalData(search);
    setSearch("");
  };
  return (
    <div className="Navbar">
      <div className="user">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2.5rem"
          height="2.5rem"
          viewBox="0 0 15 15"
        >
          <path d="M5 5.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0" />
          <path d="M7.5 0a7.5 7.5 0 1 0 0 15a7.5 7.5 0 0 0 0-15M1 7.5a6.5 6.5 0 1 1 10.988 4.702A3.5 3.5 0 0 0 8.5 9h-2a3.5 3.5 0 0 0-3.488 3.202A6.48 6.48 0 0 1 1 7.5" />
        </svg>
        <h3>Godfred Obeng</h3>
      </div>

      <form className="search-area" onSubmit={updateGlobal}>
        <input
          type="text"
          placeholder="Search Contact..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Navbar;
