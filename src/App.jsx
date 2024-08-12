import React, { useState } from "react";
import "./Styles/styles.css";
import GameBoard from "./Components/GameBoard/GameBoard";
import PlayerInput from "./Components/PlayerInput/PlayerInput";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [scores, setScores] = useState([0, 0]);

  const handleGameOver = (finalScores, winnerName) => {
    setScores(finalScores);
    setWinner(winnerName);
    setGameOver(true);
  };

  const handleRestart = () => {
    setPlayers([]);
    setGameOver(false);
    setScores([0, 0]);
    setWinner("");
  };

  return (
    <div className="App">
      {players.length === 0 ? (
        <PlayerInput
          onPlayersSet={(player1, player2) => setPlayers([player1, player2])}
        />
      ) : gameOver ? (
        <div className="winner-screen">
          <h2>Congratulations, {winner}!</h2>
          <p>
            {players[0]}: {scores[0]}
          </p>
          <p>
            {players[1]}: {scores[1]}
          </p>
          <button onClick={handleRestart}>Close</button>
        </div>
      ) : (
        <GameBoard players={players} onGameOver={handleGameOver} />
      )}
    </div>
  );
};

export default App;
