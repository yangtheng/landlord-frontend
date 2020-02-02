import { combineReducers } from 'redux';
import roomInfo from './roomInfo';
import rooms from './rooms';
import game from './game';

export default combineReducers({
  roomInfo,
  rooms,
  game,
});
