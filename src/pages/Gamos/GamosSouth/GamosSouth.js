import React from "react";
import { useNavigate } from "react-router-dom";
import "./GamosSouth.css";
import { Link } from "react-router-dom";

export const GamosSouth = () => {
  const history = useNavigate();
  const goBack = () => {
    history("/world-map");
  };
  return (
    <div className="mapGamosSouth">
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
      <div className="gamosSouth">
        <Link to="/gamos-map" className="gamosNorthClickTarget">
          {" "}
          Go To Gamos North{" "}
        </Link>
        <img src={"GamosSouth.jpg"}></img>
      </div>
    </div>
  );
};
