import React, { useState, useEffect } from 'react';

import './styles.scss';

const Game = ({
  myCards,
  activePlayer,
  currentBid,
  playerNum,
  isBidding,
  landlord,
  numOfCards,
  users,
}) => {
  const [activeCards, setActiveCards] = useState([]);
  const [cardTypes, setCardTypes] = useState([]);

  const setActiveCard = index => {
    if (activeCards.includes(index)) {
      setActiveCards(activeCards.filter(i => i !== index));
    } else {
      setActiveCards([
        ...activeCards,
        index,
      ]);
    }
  };

  useEffect(() => {
    setCardTypes(activeCards.map((index) => {
      return myCards[index].type;
    }))
  }, [activeCards]);

  return (
    <div className="game-window">
      <div className="my-cards" style={{ width: `${myCards.length * 110 - (myCards.length - 1) * 83}px`}}>
        {myCards.map(({ image, type }, i) => (
          <img
            key={image}
            className={activeCards.includes(i) ? 'selected' : ''}
            onClick={() => setActiveCard(i)}
            style={{ left: `${0 - 83 * i}px` }}
            src={image}
            alt={type}
          />
        ))}
      </div>
      <div className="player-info">
        <p>{playerNum !== null && users[playerNum].user}</p>
        {landlord !== null && landlord === playerNum && <div className="landlord-indicator">landlord</div>}
      </div>
      <div className="player-info left">
        <p>{playerNum !== null && users[(playerNum + 1) % 3].user}</p>
        <p>{numOfCards[(playerNum + 1) % 3]}</p>
      </div>
      <div className="player-info right">
        <p>{playerNum !== null && users[(playerNum + 2) % 3].user}</p>
        <p>{numOfCards[(playerNum + 2) % 3]}</p>
      </div>
      {playerNum === activePlayer && <div className="game-buttons">
          {isBidding ?
            <>
              <button>Pass</button>
              <button>Bid 1</button>
              <button>Bid 2</button>
              <button>Bid 3</button>
            </>
          :
            <>
              <button onClick={() => setActiveCards([])}>Clear</button>
            </>
          }
      </div>}
    </div>
  );
};

export default Game;
