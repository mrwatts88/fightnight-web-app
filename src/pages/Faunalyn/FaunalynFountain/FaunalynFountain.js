import { useNavigate } from "react-router-dom";
import "./FaunalynFountain.css";
import React, { useRef } from "react";

export const FaunalynFountain = () => {
  const history = useNavigate();

  const statPreviewRef = useRef(null);
  const showStatPreview = () => {
    statPreviewRef.current.style.visibility = "visible";
  };
  const hideStatPreview = () => {
    statPreviewRef.current.style.visibility = "hidden";
  };

  const statPreviewRef1 = useRef(null);
  const showStatPreview1 = () => {
    statPreviewRef1.current.style.visibility = "visible";
  };
  const hideStatPreview1 = () => {
    statPreviewRef1.current.style.visibility = "hidden";
  };

  const statPreviewRef2 = useRef(null);
  const showStatPreview2 = () => {
    statPreviewRef2.current.style.visibility = "visible";
  };
  const hideStatPreview2 = () => {
    statPreviewRef2.current.style.visibility = "hidden";
  };

  const statPreviewRef3 = useRef(null);
  const showStatPreview3 = () => {
    statPreviewRef3.current.style.visibility = "visible";
  };
  const hideStatPreview3 = () => {
    statPreviewRef3.current.style.visibility = "hidden";
  };

  const goBack = () => {
    history("/faunalyn-map");
  };
  return (
    <div className="mapFaunalynFountain">
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
      <div className="faunalynFountainImgWrapper">
        <div onMouseLeave={hideStatPreview} onMouseOver={showStatPreview} className="meWrapperFountain">
          <div ref={statPreviewRef} className="statPreviewFountain">
            <div className="flex statPreviewInnerFountain">
              <div>HEYO!</div>
            </div>
          </div>
          <div className="meFountain" />
        </div>

        <div onMouseLeave={hideStatPreview1} onMouseOver={showStatPreview1} className="meWrapperFountain1">
          <div ref={statPreviewRef1} className="statPreviewFountain1">
            <div className="flex statPreviewInnerFountain1">
              <div>We da clerics!</div>
            </div>
          </div>
          <div className="meFountain" />
        </div>

        <div onMouseLeave={hideStatPreview2} onMouseOver={showStatPreview2} className="meWrapperFountain2">
          <div ref={statPreviewRef2} className="statPreviewFountain2">
            <div className="flex statPreviewInnerFountain2">
              <div>Watch it!</div>
            </div>
          </div>
          <div className="meFountain" />
        </div>

        <div onMouseLeave={hideStatPreview3} onMouseOver={showStatPreview3} className="meWrapperFountain3">
          <div ref={statPreviewRef3} className="statPreviewFountain3">
            <div className="flex statPreviewInnerFountain3">
              <div>Ive gotta poo..</div>
            </div>
          </div>
          <div className="meFountain" />
        </div>

        <img className="faunalynFountain" src={"FaunalynFountain.jpg"}></img>
      </div>
    </div>
  );
};
