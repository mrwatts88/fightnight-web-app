import React, { useContext } from "react";
import CharacterGridItem from "../CharacterGridItem/CharacterGridItem";
import "./CharacterGrid.css";
import { walletContext } from "../../context/WalletContext";

export const CharacterType = { KNIGHT: "KNIGHT", MAGE: "MAGE", ELF: "ELF", DWARF: "DWARF" };

function CharacterGrid() {
  const context = useContext(walletContext);

  if (!context.walletData) return null;

  console.log(context.walletData.characterBalances);

  const [numKnights, numMages, numElfs, numDwarfs] = context.walletData.characterBalances;
  console.log([numKnights, numMages, numElfs, numDwarfs]);
  const uriFormat = context.walletData.uri;

  const knightUrl = uriFormat.replace("{id}", "0".padStart(64, "0"));
  const mageUrl = uriFormat.replace("{id}", "1".padStart(64, "0"));
  const elfUrl = uriFormat.replace("{id}", "2".padStart(64, "0"));
  const dwarfUrl = uriFormat.replace("{id}", "3".padStart(64, "0"));

  const knights = populateClass(numKnights, knightUrl, CharacterType.KNIGHT);
  const mages = populateClass(numMages, mageUrl, CharacterType.MAGE);
  const elf = populateClass(numElfs, elfUrl, CharacterType.ELF);
  const dwarf = populateClass(numDwarfs, dwarfUrl, CharacterType.DWARF);

  function populateClass(num, url, type) {
    const arr = ["", "", ""];
    for (let i = 0; i < 3; i++) {
      if (num >= i + 1) {
        arr[i] = { url, type };
      }
    }
    return arr;
  }

  return (
    <div className="container">
      {knights.map((character) => {
        return <CharacterGridItem character={character} />;
      })}
      {mages.map((character) => {
        return <CharacterGridItem character={character} />;
      })}{" "}
      {elf.map((character) => {
        return <CharacterGridItem character={character} />;
      })}
      {dwarf.map((character) => {
        return <CharacterGridItem character={character} />;
      })}
    </div>
  );
}

export default CharacterGrid;
