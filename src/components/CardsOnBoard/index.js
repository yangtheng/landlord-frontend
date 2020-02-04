import React from 'react';

const CardsOnBoard = ({
  className,
  cards,
}) => (
  <div className={className} style={{ width: `${cards.length * 110 - (cards.length - 1) * 83}px`}}>
    {cards.map(({ image, type }, i) => (
      <img
        key={image}
        style={{ left: `${0 - 83 * i}px` }}
        src={image}
        alt={type}
      />
    ))}
  </div>
);

export default CardsOnBoard;
