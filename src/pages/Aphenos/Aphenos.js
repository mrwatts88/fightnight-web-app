import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Aphenos.css";

export const Aphenos = () => {
  const statPreviewRef = useRef(null);
  const history = useNavigate();
  const goBack = () => {
    history("/world-map");
  };

  const showStatPreview = () => {
    statPreviewRef.current.style.visibility = "visible";
  };

  const hideStatPreview = () => {
    statPreviewRef.current.style.visibility = "hidden";
  };

  const openModal = () => {
    console.log("modal open");
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
      <div className="aphenosImgWrapper">
        <div onMouseLeave={hideStatPreview} onMouseOver={showStatPreview} className="meWrapper">
          <div ref={statPreviewRef} className="statPreview">
            <div className="flex statPreviewInner">
              <img src="sword-icon.jpeg" alt="sword" className="sword" />
              <div>40</div>
            </div>
            <div className="flex statPreviewInner">
              <img src="shield-icon.jpeg" alt="shield" className="shield" />
              <div>60</div>
            </div>
            <div onClick={openModal} className="flex statPreviewInner">
              <img src="bar-graph.webp" alt="graph" className="graph" />
            </div>
          </div>
          <img src="knight.png" alt="knight" className="me" />
        </div>
        <img className="aphenos" alt="city" src={"Apheno.jpg"}></img>
      </div>
    </div>
  );
};
