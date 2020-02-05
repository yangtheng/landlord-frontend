import React, { useState, useEffect } from 'react';
import { socket } from '../../socket';
import PlayerInfo from '../../components/PlayerInfo';
import CardsOnBoard from '../../components/CardsOnBoard';

import './styles.scss';

const Game = (props) => {
  const {
    myCards,
    activePlayer,
    currentBid,
    playersBidded,
    playerLastBid,
    playerNum,
    isBidding,
    landlord,
    numOfCards,
    leftovers,
    cardsOnBoard,
    users,
    roomId,
    playCards,
  } = props;
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

  const bid = (amount) => {
    socket.emit('reduxActionSent', {
      type: 'game/REC_BID',
      bid: amount ? amount : null,
      activePlayer: (playerNum + 1) % 3,
      playersBidded: playersBidded + 1,
      playerLastBid: amount ? playerNum : null,
      roomId,
    })

    if (amount === 3 || playersBidded === 2) {
      socket.emit('bidEnd', {
        landlord: amount ? playerNum : playerLastBid,
        roomId,
      })
    }
  }

  useEffect(() => {
    setCardTypes(activeCards.map((index) => {
      return myCards[index].type;
    }))
  }, [activeCards]);

  return (
    <div className="game-window">
      <div className="logo-wrapper">
        <img className="logo" src="images/logo.svg" alt="logo" />
        <span>CASINO</span>
      </div>
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
      <div className="leftovers">
        {leftovers.length ? leftovers.map(({image, type}) => (
          <img
            key={image}
            src={image}
            alt={type}
          />
        )) : new Array(3).fill().map((el, i) => (
          <img
            key={i}
            src="images/back.svg"
            alt="card-back"
          />
        ))}
      </div>
      <div className="current-bid">
        Current Bid: {currentBid}
      </div>
      <PlayerInfo className="player-info" {...props} displayedPlayer={playerNum} />
      <PlayerInfo className="player-info left" {...props} displayedPlayer={(playerNum + 1) % 3} />
      <PlayerInfo className="player-info right" {...props} displayedPlayer={(playerNum + 2) % 3} />
      <CardsOnBoard className="cards-on-board" cards={cardsOnBoard[playerNum] || []} />
      <CardsOnBoard className="cards-on-board left" cards={cardsOnBoard[(playerNum + 1) % 3] || []} />
      <CardsOnBoard className="cards-on-board right" cards={cardsOnBoard[(playerNum + 2) % 3] || []} />
      <div
        className="opp-cards left"
        style={{ height: `${numOfCards[(playerNum + 1) % 3] * 160.23 - (numOfCards[(playerNum + 1) % 3] - 1) * 150}px`}}
      >
        {new Array(numOfCards[(playerNum + 1) % 3]).fill().map((el, i) => (
          <img
            key={i}
            style={{ top: `${0 - 150 * i}px` }}
            src="images/back.svg"
            alt="card-back"
          />
        ))}
      </div>
      <div
        className="opp-cards right"
        style={{ height: `${numOfCards[(playerNum + 2) % 3] * 160.23 - (numOfCards[(playerNum + 2) % 3] - 1) * 150}px`}}
      >
        {new Array(numOfCards[(playerNum + 2) % 3]).fill().map((el, i) => (
          <img
            key={i}
            style={{ top: `${0 - 150 * i}px` }}
            src="images/back.svg"
            alt="card-back"
          />
        ))}
      </div>
      {playerNum === activePlayer && <div className="game-buttons">
          {isBidding ?
            <>
              <button onClick={() => bid()}>Pass</button>
              {currentBid < 1 && <button onClick={() => bid(1)}>Bid 1</button>}
              {currentBid < 2 && <button onClick={() => bid(2)}>Bid 2</button>}
              <button onClick={() => bid(3)}>Bid 3</button>
            </>
          :
            <>
              <button onClick={() => setActiveCards([])}>Clear</button>
              <button onClick={() => {
                playCards(myCards.filter((card , i) => {
                  let include = true;
                  activeCards.forEach(index => {
                    if (index === i) include = false;
                  })
                  return include;
                }));

                socket.emit('reduxActionSent', {
                  type: 'game/REC_PLAY_CARDS',
                  playerNum,
                  cards: myCards.filter((card, i) => {
                    let include = false;
                    activeCards.forEach(index => {
                      if (index === i) include = true;
                    })
                    return include;
                  }),
                  roomId,
                })

                setActiveCards([]);
              }}>Submit</button>
              <button onClick={() => {
                socket.emit('reduxActionSent', {
                  type: 'game/REC_PLAY_CARDS',
                  playerNum,
                  cards: [],
                  roomId,
                })

                setActiveCards([]);
              }}>Pass</button>
            </>
          }
      </div>}
    </div>
  );
};

export default Game;
