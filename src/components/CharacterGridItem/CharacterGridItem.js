/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./CharacterGridItem.css";
import { useState } from "react";

function CharacterGridItem({ character }) {
  // eslint-disable-next-line no-unused-vars
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      {character.imageUrl ? (
        <img className="item" src={character.imageUrl} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}></img>
      ) : character.mageUrl ? (
        <img className="item" src={character.mageUrl} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}></img>
      ) : character.dwarfUrl ? (
        <img className="item" src={character.dwarfUrl} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}></img>
      ) : character.elfUrl ? (
        <img className="item" src={character.elfUrl} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}></img>
      ) : (
        <div className="item" />
      )}
    </>
  );
}

export default CharacterGridItem;
