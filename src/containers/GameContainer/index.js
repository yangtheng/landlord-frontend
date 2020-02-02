import { connect } from 'react-redux';

import Game from '../../pages/Game';

const GameContainer = connect(
  state => ({
    myCards: state.game.myCards,
    activePlayer: state.game.activePlayer,
    currentBid: state.game.currentBid,
    playerNum: state.game.playerNum,
    isBidding: state.game.isBidding,
    landlord: state.game.landlord,
    numOfCards: state.game.numOfCards,
    users: state.roomInfo.users,
  }),
)(Game);

export default GameContainer;
