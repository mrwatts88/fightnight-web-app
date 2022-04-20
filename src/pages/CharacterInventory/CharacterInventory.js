import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CharacterGrid from "../../components/CharacterGrid/CharacterGrid";
import MintCharacterPane from "../../components/MintCharacterPane/MintCharacterPane";
import { walletContext } from "../../context/WalletContext";
import "./CharacterInventory.css";

const CharacterInventory = () => {
  const history = useNavigate();
  const context = useContext(walletContext);
  const goBack = () => {
    history("/");
  };

  return (
    <div
      className="page"
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/1559442.jpg")`,
      }}
    >
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
      <div className="header">
        <h3>
          <div>Character Inventory</div>
          <span>{context.walletData.account}</span>
        </h3>
      </div>
      <div className="leftPane">
        <MintCharacterPane />
      </div>
      <div className="rightPane">
        <CharacterGrid />
      </div>
    </div>
  );
};

export default CharacterInventory;
