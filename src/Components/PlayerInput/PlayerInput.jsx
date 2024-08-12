import React, { useState } from "react";

const PlayerInput = ({ onPlayersSet }) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlayersSet(player1, player2);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Player 1 Name:</label>
        <input
          type="text"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
        />
      </div>
      <div>
        <label>Player 2 Name:</label>
        <input
          type="text"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />
      </div>
      <button type="submit">Start Game</button>
    </form>
  );
};

export default PlayerInput;
