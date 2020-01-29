import React, { useEffect, useState } from 'react';
import { socket } from '../../socket';

const Home = ({ dispatch, rooms }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    socket.on('reduxActionReceived', action => {
      dispatch(action);
    })
  }, []);

  return (
    <div>
      <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
      <button
        onClick={() => socket.emit('createRoom', userName)}
      >
        create room
      </button>
      <ul>
        {rooms.map(room => (
          <li key={room.roomId}>
            {room.roomId}
            <button>
              join room
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
