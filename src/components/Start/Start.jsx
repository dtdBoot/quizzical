import React from "react"
import "./Start.css"

export default function Start({buttonSelect}) {
  return (
    <div className="main-div">
      <img className="yellow-blob" src="/src/assets/blob-5.png" alt="yellow blob" />
      <img className="blue-blob" src="/src/assets/blob-6.png" alt="blue blob" />
      <div className="start-content-container">
        <h1 className="start-title">Quizzical</h1>
        <p className="start-description">Some description if needed</p>
        <button className="start-btn" onClick={buttonSelect}>Start Quiz</button>
      </div>
    </div>
  )
}