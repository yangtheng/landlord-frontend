import React from 'react';
import { socket } from '../../socket';

const Leaderboard = ({
  leaderBoard,
  users,
}) => {
  const usersAndScores = leaderBoard.map((score, i) => ({
    score,
    user: users[i]
  }));
  const leaderboardSorted = usersAndScores.sort((a, b) => b.score - a.score)
  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      {leaderboardSorted.map(({ score, user }) => (
        <div className="user-score">
          <span>{user.user}</span>
          <span>${score}</span>
        </div>
      ))}
    </div>
  )
};

export default Leaderboard;
