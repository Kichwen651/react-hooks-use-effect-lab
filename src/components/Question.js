import React, {useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    // Only start the countdown if the timer is not already at 0
    if (timeRemaining === 0) {}

    // Set the timeout to decrease the time every second
    const timer = setTimeout(() => {
      setTimeRemaining(prevTime => {
        if (prevTime === 1) {
          // When time reaches 0, reset the timer to 10 and trigger the callback
          onAnswered(false);
          return 10; // Reset the timer to 10 seconds
        }
        return prevTime - 1; // Decrease time by 1 second
      });
    }, 1000);

    // Cleanup function to clear timeout when component unmounts or before running 
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]); // Re-run effect when timeRemaining changes

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
