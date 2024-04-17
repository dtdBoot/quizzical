import React from "react"
import "./Question.css"

export default function Question({question, possibleAnswers, correctAnswer, selectAnswer, selectedAnswers}) {


  const answerEl = possibleAnswers.map(answer => {
    return <button 
              className={`answer-btn ${selectedAnswers.includes(answer) && "selected"}`}
              onClick={() => selectAnswer(answer)}>
                {answer}
              </button>
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