import React from "react";
import Die from "./components/Die";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";
export default function App() {
  const [dices, setDices] = React.useState(newDices());
  const [tenzies, setTenzies] = React.useState(false);
  React.useEffect(() => {
    const isHeld = dices.every((die) => die.isHeld);
    const firstValue = dices[0].value;
    const isAllSame = dices.every((die) => die.value === firstValue);
    if (isHeld && isAllSame) {
      setTenzies(true);
      console.log("you won");
    }
  }, [dices]);

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 10),
      isHeld: false,
      id: nanoid(),
    };
  }
  function newDices() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }
  const dicesArray = dices.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => {
        hold(die.id);
      }}
    />
  ));
  function rollDices() {
    if (!tenzies) {
      setDices((oldDices) => {
        return oldDices.map((die) => {
          return die.isHeld ? die : generateNewDie();
        });
      });
    } else {
      setTenzies(false);
      setDices(newDices());
    }
  }
  function hold(id) {
    setDices((prevDices) => {
      return prevDices.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">
        Tenzies<span> 🎲</span>
      </h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container">{dicesArray}</div>
      <button className="btn" onClick={rollDices}>
        {tenzies ? "reaset Game" : "ROLL"}
      </button>
    </main>
  );
}
