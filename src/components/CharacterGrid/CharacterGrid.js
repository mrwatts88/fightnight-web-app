import React from "react";
import CharacterGridItem from "../CharacterGridItem/CharacterGridItem";
import "./CharacterGrid.css";

const imageUrl =
  "https://thumbs.dreamstime.com/b/fairytale-mage-d-digital-render-fairy-tale-isolated-white-background-46714348.jpg";
const mageUrl =
  "https://i.pinimg.com/originals/8d/6f/f3/8d6ff31f94e244db66e9e96bb87dfa70.gif";
const dwarfUrl =
  "https://i.pinimg.com/736x/90/61/60/906160ae6ade93cf98ffe31e3ba743e1.jpg";
const elfUrl =
  "https://cdna.artstation.com/p/assets/images/images/022/634/826/large/daniel-spagnol-elf-small.jpg?1576149892";

const knights = [{ imageUrl }, "", ""];
const mages = [{ mageUrl }, { mageUrl }, { mageUrl }];
const dwarf = [{ dwarfUrl }, { dwarfUrl }, { dwarfUrl }];
const elf = [{ elfUrl }, { elfUrl }, ""];

function CharacterGrid() {
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
