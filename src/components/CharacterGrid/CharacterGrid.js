import React from 'react';
import CharacterGridItem from '../CharacterGridItem/CharacterGridItem';
import './CharacterGrid.css';

const imageUrl = 'https://i.pinimg.com/originals/8d/6f/f3/8d6ff31f94e244db66e9e96bb87dfa70.gif';

const characters = [
    { imageUrl }, { imageUrl }, { imageUrl }, { imageUrl },
    { imageUrl }, { imageUrl }, { imageUrl }, { imageUrl },
    { imageUrl }, { imageUrl }, { imageUrl }, { imageUrl },
];

function CharacterGrid() {
  return (
    <div className='container'>
        {characters.map(character => {
            return <CharacterGridItem  character={character} />;
        })}
    </div>
  )
}

export default CharacterGrid