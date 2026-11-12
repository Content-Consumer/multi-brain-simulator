import { useState } from 'react'
import { Button, ProgressBar } from 'pixelartui-react'
import { shuffleQuestions, generateEntityCounts } from '../gameData'

export default function GameScreen({ onComplete }) {
  const [questions] = useState(() => shuffleQuestions())
  const [entityCounts] = useState(() => generateEntityCounts())
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState([])

  function handleVote(vote) {
    const newAnswers = [...answers, { questionId: questions[current].id, answer: vote }]
    if (current + 1 >= questions.length) {
      onComplete(newAnswers, entityCounts)
    } else {
      setAnswers(newAnswers)
      setCurrent(current + 1)
    }
  }

  const progress = Math.round((current / questions.length) * 100)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: '100vh', background: '#ffffff', padding: '48px' }}>
      <div style={{ width: '100%', maxWidth: '700px' }}>
        <div style={{ marginBottom: '16px', fontSize: '20px', color: '#888' }}>
          QUESTION {current + 1} / {questions.length}
        </div>
        <ProgressBar
          value={progress}
          max={100}
          fillColor="#0041BA"
        />
      </div>

      <p style={{ margin: 0, fontSize: '32px', lineHeight: 1.7, textAlign: 'center', maxWidth: '700px', fontWeight: 600 }}>
        {questions[current].text}
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
