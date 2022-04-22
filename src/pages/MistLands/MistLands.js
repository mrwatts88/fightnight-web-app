import React from "react";
import { useNavigate } from "react-router-dom";
import "./MistLands.css";

export const MistLands = () => {
  const history = useNavigate();
  const goBack = () => {
    history("/world-map");
  };
  return (
    <div className="mapMistLands">
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
      <img className="mistLands" src={"mistLands.png"}></img>
    </div>
  );
};
