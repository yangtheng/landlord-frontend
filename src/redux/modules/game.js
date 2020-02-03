const REC_START_GAME = 'game/REC_START_GAME';
const REC_BID = 'game/REC_BID';
const REC_BID_END = 'game/REC_BID_END';

const defaultState = {
  myCards: [],
  activePlayer: null,
  currentBid: 0,
  playersBidded: 0,
  playerLastBid: null,
  playerNum: null,
  isBidding: true,
  landlord: null,
  numOfCards: [17, 17, 17],
  leftovers: [],
};

const types = ['3','4','5','6','7','8','9','T','J','Q','K','A','2'];

const sort = (cards, types) => {
  cards.sort((a, b) => {
    if (a.suit === 'red' && b.suit === 'black') return 1;
    if (a.suit === 'black' && b.suit === 'red') return -1;
    if (a.type === 'Joker') return 1;
    if (b.type === 'Joker') return -1;
    if (a.type === b.type) return 0;
    if (types.indexOf(a.type) > types.indexOf(b.type)) return 1;
    if (types.indexOf(a.type) < types.indexOf(b.type)) return -1;
  })
  return cards;
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case REC_START_GAME:
      return {
        ...state,
        myCards: action.myCards,
        activePlayer: action.activePlayer,
        playerNum: action.playerNum,
      };
    case REC_BID:
      return {
        ...state,
        ...action.bid && { currentBid: action.bid },
        activePlayer: action.activePlayer,
        playersBidded: action.playersBidded,
        ...action.playerLastBid !== null && { playerLastBid: action.playerLastBid },
      };
    case REC_BID_END:
      return {
        ...state,
        landlord: action.landlord,
        numOfCards: state.numOfCards.map((num, i) => {
          if (i === action.landlord) return num + 3;
          return num;
        }),
        activePlayer: action.landlord,
        leftovers: action.leftovers,
        isBidding: false,
        ...state.playerNum === action.landlord && {
          myCards: sort(
            [
              ...state.myCards,
              ...action.leftovers,
            ],
            types,
          ),
        },
      }
    default:
      return state;
  }
};
