import React from "react";

const Alert = ({ msg, type, isActive }) => {

  let response = null;
  if (isActive) {
    return response = (
      <div className={`alert ${type}`} role="alert">
        {msg}
      </div>
    );
  }

  return response;
};

export default Alert;
