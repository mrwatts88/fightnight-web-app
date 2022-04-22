import React from "react";
import "./StatsModal.css";

const StatsModal = ({ closeModal }) => {
  return (
    <div className="statsModal">
      <div style={{ cursor: "pointer", padding: "15px 22px", textAlign: "right", color: "gold", fontWeight: "bold" }} onClick={closeModal}>
        X
      </div>
      <div className="modalHeader">
        <div> location </div>

        <div> coin balance </div>
      </div>
      <div className="modalBody">
        <div className="modalBodySection">
          <div className="equipmentGrid">
            <div className="equipmentSword"> sword </div>
            <div className="equipmentHelm"> helmet </div>
            <div className="equipmentChest"> chest </div>
            <div className="equipmentLegs"> legs </div>
            <div className="equipmentBoots"> boots </div>
            <div className="equipmentShield"> shield </div>
          </div>
        </div>

        <div className="modalBodySection">stats</div>
      </div>
    </div>
  );
};

export default StatsModal;
