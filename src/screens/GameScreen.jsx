import { useState } from 'react'
import { Button, ProgressBar } from 'pixelartui-react'

const QUESTIONS = [
  'Do you often feel like two different people?',
  'Can you hold two opposing opinions at once?',
  'Do you make decisions with your gut?',
  'Do you often change your mind mid-thought?',
  'Do you enjoy being alone with your thoughts?',
  'Do you sometimes argue with yourself?',
  'Do you have recurring dreams with consistent characters?',
  'Do you feel different around different people?',
  'Do you have a voice in your head that critiques you?',
  'Do you sometimes act against your own advice?',
  "Do you have strong moral intuitions you can't explain?",
  'Do you feel like your past self is a stranger?',
  'Do you believe you contain multitudes?',
]

export default function GameScreen({ onComplete }) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])

  function handleVote(vote) {
    const newAnswers = [...answers, vote]
    if (current + 1 >= QUESTIONS.length) {
      onComplete(newAnswers)
    } else {
      setAnswers(newAnswers)
      setCurrent(current + 1)
    }
  }

  const progress = Math.round((current / QUESTIONS.length) * 100)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: '100vh', background: '#ffffff', padding: '48px' }}>
      <div style={{ width: '100%', maxWidth: '700px' }}>
        <div style={{ marginBottom: '16px', fontSize: '20px', color: '#888' }}>
          QUESTION {current + 1} / {QUESTIONS.length}
        </div>
        <ProgressBar
          value={progress}
          max={100}
          fillColor="#0041BA"
        />
      </div>

      <p style={{ margin: 0, fontSize: '32px', lineHeight: 1.7, textAlign: 'center', maxWidth: '700px', fontWeight: 600 }}>
        {QUESTIONS[current]}
      </p>

      <div style={{ display: 'flex', gap: '32px' }}>
        <Button
          text="YES"
          buttonSize="large"
          buttonType="main"
          buttonStyle="light"
          backgroundColor="#0041BA"
          onClick={() => handleVote('yes')}
        />
        <div className="no-btn">
          <Button
            text="NO"
            buttonSize="large"
            buttonType="outline"
            buttonStyle="light"
            backgroundColor="#0041BA"
            onClick={() => handleVote('no')}
          />
        </div>
      </div>
    </div>
  )
}
