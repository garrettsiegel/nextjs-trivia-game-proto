import TriviaGame from '../components/TriviaGame'
import questions from '../data/questions.json'

export default function Home() {
  return <TriviaGame triviaData={questions} />
}
