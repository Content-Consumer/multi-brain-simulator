import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import InstructionsScreen from './screens/InstructionsScreen'
import GameScreen from './screens/GameScreen'
import ResultScreen from './screens/ResultScreen'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [answers, setAnswers] = useState([])

  function handleGameComplete(collectedAnswers) {
    setAnswers(collectedAnswers)
    setScreen('result')
  }

  function handleRestart() {
    setAnswers([])
    setScreen('home')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', color: '#1a1a1a' }}>
      {screen === 'home' && <HomeScreen onPlay={() => setScreen('instructions')} />}
      {screen === 'instructions' && <InstructionsScreen onStart={() => setScreen('game')} />}
      {screen === 'game' && <GameScreen onComplete={handleGameComplete} />}
      {screen === 'result' && <ResultScreen answers={answers} onRestart={handleRestart} />}
    </div>
  )
}
