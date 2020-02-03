import { connect } from 'react-redux';

import Game from '../../pages/Game';

const GameContainer = connect(
  state => ({
    myCards: state.game.myCards,
    activePlayer: state.game.activePlayer,
    currentBid: state.game.currentBid,
    playersBidded: state.game.playersBidded,
    playerLastBid: state.game.playerLastBid,
    playerNum: state.game.playerNum,
    isBidding: state.game.isBidding,
    landlord: state.game.landlord,
    numOfCards: state.game.numOfCards,
    leftovers: state.game.leftovers,
    users: state.roomInfo.users,
    roomId: state.roomInfo.roomId,
  }),
)(Game);

export default GameContainer;
