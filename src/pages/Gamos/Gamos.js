import React from "react";
import { useNavigate } from "react-router-dom";
import "./Gamos.css";
import { Link } from "react-router-dom";

export const Gamos = () => {
  const history = useNavigate();
  const goBack = () => {
    history("/world-map");
  };
  return (
    <div className="mapGamos">
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
      <div className="gamos">
        <Link to="/gamosSouth-map" className="gamosSouthClickTarget">
          {" "}
          Go To Gamos South{" "}
        </Link>
        <img src={"GamosNorth.jpg"}></img>
      </div>
    </div>
  );
};
