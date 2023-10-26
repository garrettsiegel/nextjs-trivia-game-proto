import { useState, useEffect } from 'react'
import questions from '../data/questions.json'
import styles from '../styles/Game.module.sass'
import Image from 'next/image'

const GameOverScreen = ({ score, handleRestart }) => (
  <div>
    <h1>End of Game</h1>
    <p>Final Score: {score} Correct Answer{score !== 1 ? 's' : ''}</p>
    <button onClick={handleRestart}>Play Again</button>
    <p>{score === 0 ? 'No correct answers. Try again.' : 'Better luck next time.'}</p>
  </div>
)


export default function TriviaGame({ triviaData }) {
  const [mainQuestionIndex, setMainQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const getNextQuestion = () => mainQuestionIndex < triviaData.length 
    ? getRandomQuestion(triviaData[mainQuestionIndex].questions)
    : null

  useEffect(() => {
    setCurrentQuestion(getNextQuestion())
    if (mainQuestionIndex >= triviaData.length) {
      setGameOver(true)
    }
  }, [mainQuestionIndex, triviaData])
  

  const getRandomQuestion = questionGroup => {
    const index = Math.floor(Math.random() * questionGroup.length)
    return questionGroup[index]
  }

  const handleAnswer = selectedOptionIndex => {
    const answerIsCorrect = selectedOptionIndex === currentQuestion?.correctAnswer
    setIsCorrect(answerIsCorrect)
    setShowFeedback(true)
    setScore(prevScore => answerIsCorrect ? prevScore + 1 : prevScore)
  
    setTimeout(() => {
      setMainQuestionIndex(prevIndex => prevIndex + 1)
      setShowFeedback(false)
    }, 2000)
  }
  
  
  

  const handleRestart = () => {
    setScore(0)
    setMainQuestionIndex(0)
    setGameOver(false)
  }

  if (gameOver) return <GameOverScreen score={score} handleRestart={handleRestart} />

  return (
    <>
      <div className={styles.main}>
        {questions[mainQuestionIndex] && (
          <div className={styles.questionContainer}>
            <div>
              <Image
                src={questions[mainQuestionIndex].image}
                alt="Description here"
                width={1000}
                height={500}
                className={styles.image}
              />
            </div>
            <div className={styles.question}>
              <h1>{questions[mainQuestionIndex].month}</h1>
              <h2>{currentQuestion?.question}</h2>
              <div className={styles.buttons}>
                {currentQuestion?.options?.map((option, index) => (
                  <button key={index} disabled={showFeedback} onClick={() => handleAnswer(index)}>{option}</button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className={styles.results}>
        {showFeedback && (
          <div>
            <p>{isCorrect ? 'Correct!' : 'Wrong!'}</p>
          </div>
        )}
        {!gameOver && <p className={styles.score}>Your Score: {score}</p>}
        </div>
        
      </div>
    </>
  )
}