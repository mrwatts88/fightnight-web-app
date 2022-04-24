/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from "react";
import "./CharacterGridItem.css";
import { useState, useEffect } from "react";
import { walletContext } from "../../context/WalletContext";
import { CharacterIds } from "../CharacterGrid/CharacterGrid";

function CharacterGridItem({ character }) {
  const { walletData, setWalletData } = useContext(walletContext);
  const [isShown, setIsShown] = useState(false);
  const [metaData, setMetaData] = useState({});

  const selectCharacter = () => {
    setWalletData({
      ...walletData,
      currentCharacter: { id: CharacterIds[character.type], url: character.url, metaData },
    });
  };

  useEffect(() => {
    if (!character.url) return;
    fetch(character.url)
      .then((k) => {
        return k.json();
      })
      .then(setMetaData);
  }, []);
  return (
    <img
      onClick={selectCharacter}
      className={`item ${walletData.currentCharacter?.id === CharacterIds[character.type] ? "selectedCharacter" : ""}`}
      src={metaData.image}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    ></img>
  );
}

export default CharacterGridItem;
