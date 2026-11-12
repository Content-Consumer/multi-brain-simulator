import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import InstructionsScreen from './screens/InstructionsScreen'
import GameScreen from './screens/GameScreen'
import TopicScreen from './screens/TopicScreen'
import ResultScreen from './screens/ResultScreen'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [answers, setAnswers] = useState([])
  const [entityCounts, setEntityCounts] = useState(null)

  function handleGameComplete(collectedAnswers, counts) {
    setAnswers(collectedAnswers)
    setEntityCounts(counts)
    setScreen('result')
  }

  function handleRestart() {
    setAnswers([])
    setEntityCounts(null)
    setScreen('home')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', color: '#1a1a1a' }}>
      {screen === 'home' && <HomeScreen onPlay={() => setScreen('instructions')} />}
      {screen === 'instructions' && <InstructionsScreen onStart={() => setScreen('topic')} />}
      {screen === 'topic' && <TopicScreen onContinue={() => setScreen('game')} />}
      {screen === 'game' && <GameScreen onComplete={handleGameComplete} />}
      {screen === 'result' && <ResultScreen answers={answers} entityCounts={entityCounts} onRestart={handleRestart} />}
    </div>
  )
}
