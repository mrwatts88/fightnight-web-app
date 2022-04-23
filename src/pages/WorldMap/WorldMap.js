import React from "react";
import "./WorldMap.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
      <div className="worldMapWrapper">
        <Link to="/aphenos-map" className="aphenosClickTarget" />
        <Link to="/gamos-map" className="gamosClickTarget" />

        <Link to="/faunalyn-map" className="faunalynClickTarget" />
        <div className="okanClickTarget" />
        <Link to="/mistLands-map" className="mistLandsClickTarget" />
        <Link to="/nurmock-map" className="nurmockClickTarget" />
        <img src={"map1.png"}></img>
      </div>
    </div>
  );
};
