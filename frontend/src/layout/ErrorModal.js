import React from 'react';
import './modal.css'; // Import the modal styles
import {BiError} from "react-icons/bi"

function ErrorModal({ errorMessage, onClose }) {
  return (
    <div className="backdrop">
      <div className="content">
        <BiError style={{fontSize: "5rem", color: "red"}}/>
        <h3>Error</h3>
        <p>{errorMessage}</p>
        <button className="btn btn-outline-danger" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ErrorModal;
