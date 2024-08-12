import React from "react";
import "../../Styles/styles.css";

const Card = ({ card, onClick, isFlipped, isMatched }) => {
  return (
    <div
      className={`card ${isFlipped || isMatched ? "flipped" : ""}`}
      onClick={() => onClick(card)}
    >
      {isFlipped || isMatched ? <span>{card.content}</span> : <span>?</span>}
    </div>
  );
};

export default Card;
