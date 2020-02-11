import React from 'react';
import { isMobile } from '../../util';

const CardsOnBoard = ({
  className,
  cards,
}) => {
  const cardWidth = isMobile() ? 42.69 : 80;
  const cardGap = isMobile() ? 20 : 64;
  return (
    <div className={className} style={{ width: `${cards.length * cardWidth - (cards.length - 1) * cardGap}px`}}>
      {cards.map(({ image, type }, i) => (
        <img
          key={image}
          style={{
            left: `${0 - cardGap * i}px`,
          }}
          src={image}
          alt={type}
        />
      ))}
    </div>
  );
};

export default CardsOnBoard;
