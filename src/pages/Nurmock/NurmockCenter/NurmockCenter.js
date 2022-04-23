import React from "react";
import { useNavigate } from "react-router-dom";
import "./NurmockCenter.css";
//import { Link } from "react-router-dom";

export const NurmockCenter = () => {
  const history = useNavigate();
  const goBack = () => {
    history("/nurmock-map");
  };
  return (
    <div className="mapNurmockCenter">
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
      <img className="nurmockCenter" src={"NurmockCenter.jpg"}></img>
    </div>
  );
};
