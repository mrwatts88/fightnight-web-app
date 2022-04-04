import React from 'react';
import './CharacterGridItem.css';

function CharacterGridItem({ character }) {
  return (
    <div>
        { character.imageUrl ?
            <img className='item' src={character.imageUrl}></img> :
            <div className='item' />
        }
    </div>
  )
}

export default CharacterGridItem;
