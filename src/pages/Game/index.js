import React, { useState, useEffect } from 'react';
import { socket } from '../../socket';
import PlayerInfo from '../../components/PlayerInfo';
import CardsOnBoard from '../../components/CardsOnBoard';
import Leaderboard from '../../components/Leaderboard';
import MyCards from '../../components/MyCards';
import { beat } from '../../checkCards';
import usePrevious from '../../hooks/usePrevious';

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
    leaderBoard,
    endGame,
    users,
    roomId,
    playCards,
  } = props;
  const [activeCards, setActiveCards] = useState([]);
  const [cardTypes, setCardTypes] = useState([]);

  const prevLeaderboard = usePrevious(leaderBoard);

  const getPrevPlayerCards = (cards) => (cards[(playerNum + 2) % 3].length && cards[(playerNum + 2) % 3]) || (cards[(playerNum + 1) % 3].length && cards[(playerNum + 1) % 3]) || [];

  const getActiveCards = (cards) => {
    return cards.filter((card, i) => {
      let include = false;
      activeCards.forEach(index => {
        if (index === i) include = true;
      })
      return include;
    })
  }

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

  const noCardsOnBoard = (cards) => !cards.filter(el => el.length > 0).length;

  const isBomb = cards => {
    if (cards.length === 4) {
      return cards.every(card => card.type === cards[0].type)
    } else if (cards.length === 2) {
      return cards.every(card => card.type === 'Joker')
    } else return false;
  }

  const bid = (amount) => {
    socket.emit('reduxActionSent', {
      type: 'game/REC_BID',
      bid: amount ? amount : null,
      activePlayer: (amount === 3 || playersBidded === 2) ? playerNum : (playerNum + 1) % 3,
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
        <span>斗地主</span>
      </div>
      {endGame && <Leaderboard {...props} prevLeaderboard={prevLeaderboard} />}
      <MyCards {...props} activeCards={activeCards} setActiveCard={setActiveCard} />
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
      {(playerNum === activePlayer || endGame) && <div className="game-buttons">
          {endGame ?
            <button onClick={() => {
              socket.emit('startGame', { users, roomId });
            }}>New Game</button>
          :
            isBidding ?
              <>
                <button onClick={() => bid()}>Pass</button>
                {currentBid < 1 && <button onClick={() => bid(1)}>Bid 1</button>}
                {currentBid < 2 && <button onClick={() => bid(2)}>Bid 2</button>}
                <button onClick={() => bid(3)}>Bid 3</button>
              </>
            :
              <>
                <button onClick={() => setActiveCards([])}>Clear</button>
                {beat(
                  getPrevPlayerCards(cardsOnBoard),
                  getActiveCards(myCards),
                ) && <button onClick={() => {
                  const remainingCards = myCards.filter((card , i) => {
                    let include = true;
                    activeCards.forEach(index => {
                      if (index === i) include = false;
                    })
                    return include;
                  })

                  playCards(remainingCards);

                  socket.emit('reduxActionSent', {
                    type: 'game/REC_PLAY_CARDS',
                    playerNum,
                    cards: getActiveCards(myCards),
                    bomb: beat(
                      getPrevPlayerCards(cardsOnBoard),
                      getActiveCards(myCards),
                    ).bomb,
                    roomId,
                  })

                  if (!remainingCards.length) {
                    socket.emit('reduxActionSent', {
                      type: 'game/REC_END_GAME',
                      winningPlayer: playerNum,
                      bet: currentBid,
                      roomId,
                    })
                  }

                  setActiveCards([]);
                }}>Submit</button>}
                {!noCardsOnBoard(cardsOnBoard) && <button onClick={() => {
                  socket.emit('reduxActionSent', {
                    type: 'game/REC_PLAY_CARDS',
                    playerNum,
                    cards: [],
                    roomId,
                  })

                  setActiveCards([]);
                }}>Pass</button>}
              </>
          }
      </div>}
    </div>
  );
};

export default Game;
