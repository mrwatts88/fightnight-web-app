import React from "react";
import "./WorldMap.css";
import { useNavigate } from "react-router-dom";

export const WorldMap = () => {
  const history = useNavigate();
  const goBack = () => {
    history("/");
  };
  return (
    <div className="mappy">
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
      <img src={"map.png"}></img>
    </div>
  );
};
