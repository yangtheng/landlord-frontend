import React from 'react';
import { isMobile } from '../../util';

const MyCards = ({
  myCards,
  activeCards,
  setActiveCard,
}) => {
  const cardWidth = isMobile() ? 58.34 : 110;
  const cardGap = isMobile() ? 35 : 83;
  return (
    <div className="my-cards" style={{ width: `${myCards.length * cardWidth - (myCards.length - 1) * cardGap}px`}}>
      {myCards.map(({ image, type }, i) => (
        <img
          key={image}
          className={activeCards.includes(i) ? 'selected' : ''}
          onClick={() => setActiveCard(i)}
          style={{ left: `${0 - cardGap * i}px` }}
          src={image}
          alt={type}
        />
      ))}
    </div>
  )
};

export default MyCards;
