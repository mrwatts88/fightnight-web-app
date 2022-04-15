import React from "react";
import "./MintCharacterPane.css";

function MintCharacterPane() {
  return (
    <div className="mintContainer">
      <div className="mintItem">mint cost: 0</div>
      <button className="mintItem"> mint lvl 0 mage</button>
      <button className="mintItem">mint lvl 0 knight</button>
      <button className="mintItem">mint lvl 0 elf</button>
      <button className="mintItem">mint lvl 0 dwarf</button>
    </div>
  );
}

export default MintCharacterPane;
