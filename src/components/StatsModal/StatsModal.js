import React, { useContext } from "react";
import "./StatsModal.css";
import { walletContext } from "../../context/WalletContext";

const StatsModal = ({ closeModal }) => {
  const { walletData, setWalletData } = useContext(walletContext);

  const attributes = walletData.currentCharacter?.metaData?.attributes;

  console.log(walletData);

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

        <div className="modalBodySection modalBodySectionRight">
          <div> Attack: {attributes?.[0]?.value} </div>
          <div> Attack Speed: {attributes?.[1]?.value} </div>
          <div> Power: {attributes?.[2]?.value} </div>
          <div> Defence: {attributes?.[3]?.value} </div>
          <div> Hitpoints: {attributes?.[4]?.value} </div>
          <div> Faction: {attributes?.[5]?.value} </div>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
