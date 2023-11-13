import React from "react";

const Boton = ({ label, onClick }) => {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      {label}
    </button>
  );
};

export default Boton;