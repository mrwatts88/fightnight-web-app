import React from "react";
import { useNavigate } from "react-router-dom";
import CharacterGrid from "../../components/CharacterGrid/CharacterGrid";
import MintCharacterPane from "../../components/MintCharacterPane/MintCharacterPane";
import "./CharacterInventory.css";

const CharacterInventory = () => {
  const history = useNavigate();

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
          <span>{"8x04435879128712983791873101"}</span>
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
