/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./CharacterGridItem.css";
import { useState, useEffect } from "react";

function CharacterGridItem({ character }) {
  // eslint-disable-next-line no-unused-vars
  const [isShown, setIsShown] = useState(false);

  const [metaData, setMetaData] = useState({});
  console.log(metaData);

  useEffect(() => {
    if (!character.url) return;
    fetch(character.url)
      .then((k) => {
        return k.json();
      })
      .then(setMetaData);
  }, []);
  return <img className="item" src={metaData.image} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}></img>;
}

export default CharacterGridItem;
