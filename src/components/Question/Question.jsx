import React from "react"
import "./Question.css"

export default function Question({question, selectAnswer, possibleAnswers, correctAnswer, showAnswers}) {

  const [userAnswer, setUserAnswer] = React.useState("")
  
  function updateSelection(answer) {
    setUserAnswer(answer)
    selectAnswer(answer, question)
  }

  const answerEl = possibleAnswers.map(answer => {
    const selectedAnswer = userAnswer === answer ? "selected" : "";
    const notSelectedFalse = userAnswer !== answer && correctAnswer !== answer && showAnswers ? "nonSelected" : ""

    const correctAnswerClass = answer === correctAnswer && showAnswers ? "correct" : ""
    const falseAnswerClass = answer === userAnswer && userAnswer !== correctAnswer && showAnswers ? "false" : ""

    return (
      <button 
        className={`answer-btn ${selectedAnswer} ${correctAnswerClass} ${falseAnswerClass} ${notSelectedFalse} `}
        onClick={() => !showAnswers && updateSelection(answer)}>
          {answer}
      </button>
    )
  })

  return (
    <div className="question-container">
        <p className="question-text">{question}</p>
        <div className="answer-container">
          {answerEl}
        </div>
    </div>
  )
}