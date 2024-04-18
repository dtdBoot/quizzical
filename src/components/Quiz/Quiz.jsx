import "./Quiz.css"
import { useState, useEffect } from 'react'
import Question from "../Question/Question"

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [show, setShow] = useState(false)
  const [score, setScore] = useState(0)
  const [restart, setRestart] = useState(true)

  useEffect(function() {
    setQuestions([])
    setSelectedAnswers({})
    setShow(false)
    setScore(0)
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
    .then(resp => resp.json())
    .then(data => {
      const results = data["results"]
      const questionObj = results.map(result => {
        return {
          question: result["question"],
          correctAnswer: result["correct_answer"],
          incorrectAnswers: result["incorrect_answers"],
          possibleAnswers: shuffleArray([result["correct_answer"], ...result["incorrect_answers"]])
        }
      })
      setQuestions(questionObj)
    })
    .catch(error => console.log(error))
  }, [restart])

  function selectAnswer(answer, question) {

      setSelectedAnswers(prev => {
        if (Object.keys(prev).includes(question)) {
          for (let item in prev) {
            if (item == question) {
              prev[item] = answer
              return prev
            }
          }
        } else {
          prev[question] = answer
          return prev
        }
      })
  }

  function checkAnswers() {
    for (let question of questions) {
      if (selectedAnswers[question.question] === question.correctAnswer) {
        setScore(prev => prev += 1)
      }
    }
    setShow(true)
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

  const questionEl = questions.map(question => {
    return (
      <Question 
        question={question.question}
        selectAnswer={selectAnswer}
        possibleAnswers={question.possibleAnswers}
        correctAnswer={question.correctAnswer}
        showAnswers={show}
      />
    )
  })

  return (
    <main className="quiz-container">
      <div className="container">
        <img className="yellow-blob-quiz" src="/src/assets/blob-5.png" alt="yellow blob" />
        <img className="blue-blob-quiz" src="/src/assets/blob-6.png" alt="blue blob" />
        {questionEl}
        <div className="score-container">
          {show && <p className="score-text">You Scored {score} / 5</p>}

            {!show && <button
            className="check-btn" 
            onClick={() => checkAnswers()}>
              <p className="check-btn-text">Check Scores</p>
              </button>}

              {show && <button
            className="check-btn" 
            onClick={() => setRestart(prev => !prev)}>
              <p className="check-btn-text">Play Again</p>
              </button>}

        </div>
      </div>
    </main>
  )
}
