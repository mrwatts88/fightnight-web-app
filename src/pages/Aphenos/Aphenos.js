import React from "react";
import { useNavigate } from "react-router-dom";
import "./Aphenos.css";

export const Aphenos = () => {
  const history = useNavigate();
  const goBack = () => {
    history("/world-map");
  };
  return (
    <div className="mapAphenos">
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
      <img className="aphenos" src={"Apheno.jpg"}></img>
    </div>
  );
};
