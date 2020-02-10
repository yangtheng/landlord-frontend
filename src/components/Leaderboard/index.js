import React from 'react';
import { socket } from '../../socket';

const Leaderboard = ({
  leaderBoard,
  prevLeaderboard,
  users,
}) => {
  const usersAndScores = leaderBoard.map((score, i) => ({
    score,
    user: users[i],
    oldScore: prevLeaderboard[i],
    difference: score - prevLeaderboard[i],
    winner: score - prevLeaderboard[i] > 0,
  }));
  const leaderboardSorted = usersAndScores.sort((a, b) => b.score - a.score)
  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      {leaderboardSorted.map(({ score, user, oldScore, difference, winner }, i) => (
        <div key={i} className="user-score">
          <span>
            {user.user}
          </span>
          <span>
            ${score}
            <span style={{ color: difference > 0 ? 'green' : 'red'}}>({difference > 0 ? `+${difference}` : difference})</span>
          </span>
        </div>
      ))}
    </div>
  )
};

export default Leaderboard;
