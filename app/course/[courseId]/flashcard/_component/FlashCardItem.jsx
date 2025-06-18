'use client';

import React from 'react';
import ReactCardFlip from 'react-card-flip';

function FlashcardItem({ isFlipped, handleClick, flashcard }) {
  return (
    <div className='flex items-center justify-center'>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        {/* Front */}
        <div
          className="w-[300px] h-[250px] p-6 bg-blue-600 text-white flex flex-col items-center justify-center rounded-xl shadow-lg"
          onClick={handleClick}
        >
          <h2 className="text-lg font-semibold text-center">{flashcard?.front}</h2>
        </div>

        {/* Back */}
        <div
          className="w-[300px] h-[250px] p-6 bg-white text-gray-800 flex flex-col items-center justify-center rounded-xl shadow-lg"
          onClick={handleClick}
        >
          <h2 className="text-lg font-semibold text-center">{flashcard?.back}</h2>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default FlashcardItem;
