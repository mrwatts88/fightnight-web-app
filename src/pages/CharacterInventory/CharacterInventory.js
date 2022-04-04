import React from 'react';
import CharacterGrid from '../../components/CharacterGrid/CharacterGrid';
import MintCharacterPane from '../../components/MintCharacterPane/MintCharacterPane';
import './CharacterInventory.css';

const CharacterInventory = () => {
  return (
    <div className='page'>
      <div className='leftPane'>
        <MintCharacterPane />
      </div>
      <div className='rightPane'>
        <CharacterGrid />
      </div>
    </div>
  );
};

export default CharacterInventory;
