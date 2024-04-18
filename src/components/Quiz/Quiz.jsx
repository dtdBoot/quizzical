import "./Quiz.css"
import { useState, useEffect } from 'react'
import Question from "../Question/Question"

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})

  const selectAnswer1 = (answer, question) => {
    selectAnswer(answer, question)
  }

  useEffect(function() {
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
    .then(resp => resp.json())
    .then(data => {
      const results = data["results"]
      const questionObj = results.map(result => {
        return {
          question: result["question"],
          correctAnswer: result["correct_answer"],
          incorrectAnswers: result["incorrect_answers"],
          possibleAnswers: ["1", "2", "3", "4"]
        }
      })
      setQuestions(questionObj)
    })
    .catch(error => console.log(error))
  }, [])

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

  const questionEl = questions.map(question => {
    const selectedAnswer = selectedAnswers[question.question]
    console.log("Hello")
    return (
      <Question 
        question={question.question}
        selectAnswer={selectAnswer1}
        possibleAnswers={question.possibleAnswers}
      />
    )
  })

  // function answerSelected(question, answer) {
  //   setSelectedAnswers(prev => {
  //     prev[question] = answer
  //     return prev
  //   })
  // }

  // let questionEl

  // if(questions && questions.length !== 0) {
  //    questionEl = questions.map(question => {

  //     const correctAnswer = question["correct_answer"]
  //     const incorrectAnswer = question["incorrect_answers"]
  
  //     const possibleAnswers = [correctAnswer, ...incorrectAnswer]  
  //    return(
  //     <Question 
  //       question={question.question}
  //       possibleAnswers={possibleAnswers} 
  //       selectAnswer={answerSelected}
  //       selectedAnswers={selectedAnswers}
  //     />
  //    ) 
  //   })
  // }

  return (
    <main className="quiz-container">
      <img className="yellow-blob-quiz" src="/src/assets/blob-5.png" alt="yellow blob" />
      <img className="blue-blob-quiz" src="/src/assets/blob-6.png" alt="blue blob" />
      {questionEl}
    </main>
  )
}
