const REC_START_GAME = 'game/REC_START_GAME';

const defaultState = {
  myCards: [],
  activePlayer: null,
  currentBid: 0,
  playerNum: null,
  isBidding: true,
  landlord: null,
  numOfCards: [17, 17, 17],
};


export default (state = defaultState, action) => {
  switch (action.type) {
    case REC_START_GAME:
      return {
        ...state,
        myCards: action.myCards,
        activePlayer: action.activePlayer,
        playerNum: action.playerNum,
      };
    default:
      return state;
  }
};
