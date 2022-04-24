import React from "react";
import { useNavigate } from "react-router-dom";
import "./Faunalyn.css";
import { Link } from "react-router-dom";

export const Faunalyn = () => {
  const history = useNavigate();
  const goBack = () => {
    history("/world-map");
  };
  return (
    <div className="mapFaunalyn">
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
      <div className="faunalyn">
        <Link to="/faunalynFountain-map" className="faunalynFountainClickTarget" />
        <img alt="faunalyn" src={"Faunalynpng.png"}></img>
      </div>
    </div>
  );
};
