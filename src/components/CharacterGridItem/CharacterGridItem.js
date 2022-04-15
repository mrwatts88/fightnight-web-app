import React from "react";
import "./CharacterGridItem.css";
import { useState } from "react";

function CharacterGridItem({ character }) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div>
      {character.imageUrl ? (
        <img
          className="item"
          src={character.imageUrl}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        ></img>
      ) : character.mageUrl ? (
        <img
          className="item"
          src={character.mageUrl}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        ></img>
      ) : character.dwarfUrl ? (
        <img
          className="item"
          src={character.dwarfUrl}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        ></img>
      ) : character.elfUrl ? (
        <img
          className="item"
          src={character.elfUrl}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        ></img>
      ) : (
        <div className="item" />
      )}
      {isShown && <div>lvl 0 fighter</div>}
    </div>
  );
}

export default CharacterGridItem;
