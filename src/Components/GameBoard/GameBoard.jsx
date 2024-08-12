import React, { useState, useEffect } from "react";
import "../../Styles/styles.css";
import Card from "../Card/Card";

const initialCards = [
  { id: 1, content: "A", isMatched: false },
  { id: 2, content: "A", isMatched: false },
  { id: 3, content: "B", isMatched: false },
  { id: 4, content: "B", isMatched: false },
  { id: 5, content: "C", isMatched: false },
  { id: 6, content: "C", isMatched: false },
  { id: 7, content: "D", isMatched: false },
  { id: 8, content: "D", isMatched: false },
  { id: 9, content: "E", isMatched: false },
  { id: 10, content: "E", isMatched: false },
  { id: 11, content: "F", isMatched: false },
  { id: 12, content: "F", isMatched: false },
  { id: 13, content: "G", isMatched: false },
  { id: 14, content: "G", isMatched: false },
  { id: 15, content: "H", isMatched: false },
  { id: 16, content: "H", isMatched: false },
  { id: 17, content: "I", isMatched: false },
  { id: 18, content: "I", isMatched: false },
  { id: 19, content: "J", isMatched: false },
  { id: 20, content: "J", isMatched: false },
];

const shuffleCards = () => {
  return [...initialCards].sort(() => Math.random() - 0.5);
};

const GameBoard = ({ players, onGameOver }) => {
  const [cards, setCards] = useState(shuffleCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [scores, setScores] = useState([0, 0]);
  const [timeLeft, setTimeLeft] = useState(300); 

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (
      scores.some((score) => score >= 10) ||
      cards.every((card) => card.isMatched)
    ) {
      onGameOver(scores, players[scores[0] > scores[1] ? 0 : 1]);
    }
  }, [scores, cards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.content === secondCard.content) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.content === firstCard.content
              ? { ...card, isMatched: true }
              : card
          )
        );
        setScores((prevScores) => {
          const newScores = [...prevScores];
          newScores[currentPlayer] += 1;
          return newScores;
        });
      } else {
        setTimeout(
          () => setCurrentPlayer((prevPlayer) => (prevPlayer === 0 ? 1 : 0)),
          1000
        );
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards]);

  const handleCardClick = (card) => {
    if (
      flippedCards.length < 2 &&
      !card.isMatched &&
      !flippedCards.includes(card)
    ) {
      setFlippedCards((prev) => [...prev, card]);
    }
  };

  const handleRestart = () => {
    setCards(shuffleCards());
    setFlippedCards([]);
    setScores([0, 0]);
    setCurrentPlayer(0);
    setTimeLeft(300);
  };

  return (
    <div className="game-board">
      <h2>Current Player: {players[currentPlayer]}</h2>
      <div className="timer">
        Time Left: {Math.floor(timeLeft / 60)}:
        {("0" + (timeLeft % 60)).slice(-2)}
      </div>
      <div className="cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={handleCardClick}
            isFlipped={flippedCards.includes(card)}
            isMatched={card.isMatched}
          />
        ))}
      </div>
      <div className="scoreboard">
        <p>
          {players[0]}: {scores[0]}
        </p>
        <p>
          {players[1]}: {scores[1]}
        </p>
      </div>
      <button onClick={handleRestart}>Restart Game</button>
    </div>
  );
};

export default GameBoard;
