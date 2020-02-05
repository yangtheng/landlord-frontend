import React from 'react';

const PlayerInfo = ({
  className,
  playerNum,
  users,
  numOfCards,
  landlord,
  displayedPlayer,
  activePlayer,
  leaderBoard,
}) => (
  <div className={`${className}${displayedPlayer === activePlayer ? ' active' : ''}`}>
    <p>{playerNum !== null && users[displayedPlayer].user}</p>
    <p>
      <img className="num-cards-indicator" src="images/back.svg" alt="card-back" />
      {numOfCards[displayedPlayer]}
    </p>
    <p>${leaderBoard[displayedPlayer]}</p>
    {landlord !== null && landlord === displayedPlayer && <div className="landlord-indicator">landlord</div>}
  </div>
);

export default PlayerInfo;
