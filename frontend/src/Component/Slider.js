import '../css/Slider.css';
import React from 'react';

const MovingList = ({ sentences }) => {
  const repeatedSentences = Array.from({ length: 10 }, (_, index) => sentences[index % sentences.length]);

  return (
    <div className="moving-list-container">
      <div className="moving-list">
        {repeatedSentences.map((sentence, index) => (
          <span key={index} className="space text-danger mx">{sentence}</span>
        ))}
      </div>
    </div>
  );
};

export default MovingList;
