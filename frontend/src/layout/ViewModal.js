import React from "react";
import "./modal.css"; // Import the modal styles
import { FcClock, FcApproval } from "react-icons/fc";

function ViewModal({ message, status, onClose }) {
  return (
    <div className="backdrop">
      <div className="content">
        <h3>{message}</h3>
        <p className="h5">
          Status:{" "}
          {status ? (
            <FcApproval style={{ fontSize: "36px", textAlign: "center" }} />
          ) : (
            <FcClock style={{ fontSize: "36px", textAlign: "center" }} />
          )}
        </p>
        <button className="btn btn-outline-dark" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ViewModal;
