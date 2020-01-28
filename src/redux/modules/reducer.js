import { combineReducers } from 'redux';
import roomInfo from './roomInfo';
import userInfo from './userInfo';

export default combineReducers({
  roomInfo,
  userInfo,
});
