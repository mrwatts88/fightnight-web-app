import React from "react";
import { useNavigate } from "react-router-dom";
import "./Nurmock.css";
import { Link } from "react-router-dom";

export const Nurmock = () => {
  const history = useNavigate();
  const goBack = () => {
    history("/world-map");
  };
  return (
    <div className="mapNurmock">
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
      <div className="nurmock">
        <Link to="/nurmockCenter-map" className="nurmockCenterClickTarget" />
        <img src={"Nurmock.jpg"}></img>
      </div>
    </div>
  );
};
