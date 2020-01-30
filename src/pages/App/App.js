import React, { useEffect } from 'react';
import { socket } from '../../socket';
import Routes from '../../routes';
import './App.scss';

const App = ({ dispatch, user, room }) => {
  useEffect(() => {
    socket.on('reduxActionReceived', action => {
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
