import "./Quiz.css"
import { useState, useEffect } from 'react'
import Question from "../Question/Question"

export default function Quiz() {
  const [questions, setQuestions] = useState([{}])
  const [selectedAnswers, setSelectedAnswers] = useState([])

  useEffect(function() {
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
    .then(resp => resp.json())
    .then(data => {
      setQuestions(data.results)
    })
  }, [])

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

  function answerSelected(answer) {
    setSelectedAnswers(prev => {
      if (prev.includes(answer)) {
        return prev.filter(item => item !== answer)
      } else {
        return [...prev, answer]
      }
    })
  }

  const questionEl = questions.map(question => {

    const correctAnswer = question["correct_answer"]
    const incorrectAnswer = question["incorrect_answers"]
    const possibleAnswers = shuffleArray([correctAnswer, "1", "2", "3"])

   return(
    <Question 
      question={question.question}
      possibleAnswers={possibleAnswers} 
      correctAnswer={correctAnswer}
      selectAnswer={answerSelected}
      selectedAnswers={selectedAnswers}
    />
   ) 
  })

  return (
    <main className="quiz-container">
      <img className="yellow-blob-quiz" src="/src/assets/blob-5.png" alt="yellow blob" />
      <img className="blue-blob-quiz" src="/src/assets/blob-6.png" alt="blue blob" />
      {questionEl}
    </main>
  )
}
