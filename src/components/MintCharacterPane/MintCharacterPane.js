import React, { useContext } from "react";
import "./MintCharacterPane.css";
import { CharacterType, CharacterIds } from "../CharacterGrid/CharacterGrid";
import { walletContext } from "../../context/WalletContext";

function MintCharacterPane() {
  const { walletData } = useContext(walletContext);
  const mint = (type) => {
    walletData.contract.methods.mint(walletData.account, CharacterIds[type], 1, "0x0000").send({ from: walletData.account });
  };

  return (
    <div className="mintContainer">
      {/* <div className="mintItem">mint cost: 0</div> */}
      <button onClick={() => mint(CharacterType.KNIGHT)} className="mintItem">
        mint lvl 0 knight
      </button>
      <button onClick={() => mint(CharacterType.MAGE)} className="mintItem">
        {" "}
        mint lvl 0 mage
      </button>
      <button onClick={() => mint(CharacterType.ELF)} className="mintItem">
        mint lvl 0 elf
      </button>
      <button onClick={() => mint(CharacterType.DWARF)} className="mintItem">
        mint lvl 0 dwarf
      </button>
    </div>
  );
}

export default MintCharacterPane;
