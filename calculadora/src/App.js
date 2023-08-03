import React, { useState } from "react";
import "./App.css";
import { RiDeleteBinLine } from "react-icons/ri";

const App = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const updateDisplay = (value) => {
    setDisplayValue(value);
  };

  const addDigit = (digit) => {
    if (waitingForSecondValue) {
      setDisplayValue(digit);
      setWaitingForSecondValue(false);
    } else {
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  };

  const addDecimal = () => {
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  const clearDisplay = () => {
    setDisplayValue("0");
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(false);
  };

  const toggleNegative = () => {
    setDisplayValue((prevValue) => {
      if (prevValue === "0") return "0";
      return prevValue.charAt(0) === "-" ? prevValue.slice(1) : "-" + prevValue;
    });
  };

  const deleteCharacter = () => {
    setDisplayValue((prevValue) => {
      if (prevValue.length === 1) return "0";
      return prevValue.slice(0, -1);
    });
  };

  const calculate = () => {
    const secondValue = parseFloat(displayValue);
    let result;

    switch (operator) {
      case "+":
        result = firstValue + secondValue;
        break;
      case "-":
        result = firstValue - secondValue;
        break;
      case "*":
        result = firstValue * secondValue;
        break;
      case "/":
        result = firstValue / secondValue;
        break;
      default:
        return;
    }

    setDisplayValue(result.toString());
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(true);
  };

  const handleOperationClick = (op) => {
    if (op === "positive-negative") {
      toggleNegative();
      return;
    } else if (op === "percent") {
      const percentValue = parseFloat(displayValue) / 100;
      setDisplayValue(percentValue.toString());
      return;
    }

    if (firstValue === null) {
      setFirstValue(parseFloat(displayValue));
      setOperator(op);
      setWaitingForSecondValue(true);
    } else {
      calculate();
      setOperator(op);
    }
  };

  const handleEqualClick = () => {
    calculate();
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="buttons">
        <button
          onClick={() => handleOperationClick("positive-negative")}
          className="number"
        >
          ±
        </button>
        <button
          onClick={() => handleOperationClick("percent")}
          className="number"
        >
          %
        </button>
        <button onClick={() => deleteCharacter()} className="delete">
          <RiDeleteBinLine />
        </button>
        <button onClick={() => handleOperationClick("/")} className="operator">
          ÷
        </button>
        <button onClick={() => addDigit("7")} className="number">
          7
        </button>
        <button onClick={() => addDigit("8")} className="number">
          8
        </button>
        <button onClick={() => addDigit("9")} className="number">
          9
        </button>
        <button onClick={() => handleOperationClick("*")} className="operator">
          ×
        </button>
        <button onClick={() => addDigit("4")} className="number">
          4
        </button>
        <button onClick={() => addDigit("5")} className="number">
          5
        </button>
        <button onClick={() => addDigit("6")} className="number">
          6
        </button>
        <button onClick={() => handleOperationClick("-")} className="operator">
          -
        </button>
        <button onClick={() => addDigit("1")} className="number">
          1
        </button>
        <button onClick={() => addDigit("2")} className="number">
          2
        </button>
        <button onClick={() => addDigit("3")} className="number">
          3
        </button>
        <button onClick={() => handleOperationClick("+")} className="operator">
          +
        </button>
        <button onClick={() => addDigit("0")} className="number zero">
          0
        </button>
        <button onClick={() => addDecimal()} className="number">
          .
        </button>
        <button onClick={() => handleEqualClick()} className="operator equal">
          =
        </button>
      </div>
    </div>
  );
};

export default App;
