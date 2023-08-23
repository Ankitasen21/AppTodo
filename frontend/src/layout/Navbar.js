import React from "react";
import "./Navbar.css";
import { SiTodoist } from "react-icons/si";

function Navbar() {
  return (
    <>
      <nav
        className="navbar fixed-top bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <SiTodoist style={{margin: 0, color: "#fefae0"}}/>
            <span style={{marginLeft: "0.8rem", fontFamily: "Poppins", fontWeight: "800", color: "#fefae0"}}>WhatDO: Task Tracker</span>
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
