import React, { useEffect } from 'react';
import { socket } from '../../socket';
import Routes from '../../routes';
import './App.scss';

const App = ({ dispatch, user, room, history }) => {
  useEffect(() => {
    socket.on('reduxActionReceived', action => {
      if (action.type === 'game/REC_START_GAME') {
        history.push('/game');
      }

      dispatch(action);
    })
  }, []);

  return (
    <div className="app">
      <Routes />
    </div>
  );
};

export default App;
