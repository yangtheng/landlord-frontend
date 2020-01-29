import { combineReducers } from 'redux';
import roomInfo from './roomInfo';
import rooms from './rooms';

export default combineReducers({
  roomInfo,
  rooms,
});
