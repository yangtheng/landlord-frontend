import React from 'react';
import { NavLink } from 'react-router-dom';
import { socket } from '../../socket';

const Room = ({
  roomId,
  users,
  user,
  userLeave,
}) => {
  return (
    <div className="room-window">
      <p>Welcome {user} to room {roomId}</p>
      <strong>Users</strong>
      <ol type="1">
        {users.map(user => (
          <li key={user.socketId}>{user.user}</li>
        ))}
      </ol>
      <NavLink
        onClick={() => {
          socket.emit('leaveRoom', roomId);
          userLeave();
        }}
        to="/"
      >
        <button>
          leave room
        </button>
      </NavLink>
      {users.length === 3 && <NavLink
        onClick={() => {
          socket.emit('startGame', users);
          // startGame();
        }}
        to="/game"
      >
        <button>
          start game
        </button>
      </NavLink>}
    </div>
  );
};

export default Room;
