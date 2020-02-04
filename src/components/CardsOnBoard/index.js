import React from 'react';

const CardsOnBoard = ({
  className,
  cards,
}) => (
  <div className={className} style={{ width: `${cards.length * 80 - (cards.length - 1) * 64}px`}}>
    {cards.map(({ image, type }, i) => (
      <img
        key={image}
        style={{ left: `${0 - 64 * i}px` }}
        src={image}
        alt={type}
      />
    ))}
  </div>
);

export default CardsOnBoard;
