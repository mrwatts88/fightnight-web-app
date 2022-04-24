import React from "react";
import { useNavigate } from "react-router-dom";
import "./Okan.css";
//import { Link } from "react-router-dom";

export const Okan = () => {
  const history = useNavigate();
  const goBack = () => {
    history("/world-map");
  };
  return (
    <div className="mapOkan">
      <div
        style={{
          position: "fixed",
          top: -5,
          left: 15,
          fontSize: 48,
          cursor: "pointer",
        }}
        onClick={goBack}
      >
        «
      </div>

      <img className="okan" src={"Okan.jpg"}></img>
    </div>
  );
};
