import React, { useEffect, useState } from 'react';
import { socket } from '../../socket';
import { NavLink } from 'react-router-dom';

import './Home.scss';


const Home = ({ userJoin, rooms }) => {
  const [userName, setUserName] = useState('');

  return (
    <div className="home">
      <label>Your Name:</label>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="input name"
      />
      <NavLink
        onClick={() => socket.emit('createRoom', userName)}
        to="/room"
      >
        <button>
          create room
        </button>
      </NavLink>
      <p>All Rooms</p>
      <ul>
        {rooms.map(room => (
          <li key={room.roomId}>
            <span className="room-list-room-id">{room.roomId}</span>
            <span className="room-list-room-size">{room.users.length} / 3</span>
            <NavLink
              onClick={() => {
                userJoin(userName, room.roomId);
                socket.emit('joinRoom', {
                  user: userName,
                  roomId: room.roomId,
                });
              }}
              to="/room"
            >
              <button>
                join room
              </button>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
