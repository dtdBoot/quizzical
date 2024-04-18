import React from "react"
import "./Question.css"

export default function Question({question, selectAnswer, possibleAnswers}) {

  const [userAnswer, setUserAnswer] = React.useState("")

  function updateSelection(answer) {
    setUserAnswer(answer)
    selectAnswer(question, answer)
  }

  const answerEl = possibleAnswers.map(answer => {
    return (
      <button 
        className={`answer-btn ${userAnswer === answer ? "selected" : ""}`}
        onClick={() => updateSelection(answer)}>
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