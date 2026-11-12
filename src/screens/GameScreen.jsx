import { useState } from 'react'
import { Button, ProgressBar } from 'pixelartui-react'
import { shuffleQuestions, generateEntityCounts, ENTITY_RESPONSES } from '../gameData'

const ENTITIES = [
  { key: 'experts', label: 'Experts' },
  { key: 'mob', label: 'Mob' },
  { key: 'machine', label: 'Machine' },
]

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

  function voteAsEntity(entityKey) {
    const questionId = questions[current].id
    const entityVote = ENTITY_RESPONSES[entityKey][questionId - 1] === 1 ? 'yes' : 'no'
    handleVote(entityVote)
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

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
        {/* Yes / No buttons */}
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

        {/* Vote as entity */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
          <span style={{ fontSize: '18px', color: '#444' }}>or vote using one of these</span>
          <div style={{ display: 'flex', gap: '56px', marginTop: "-0.8em" }}>
            {ENTITIES.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => voteAsEntity(key)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px', padding: '8px 16px', color: '#888' }}
              >
                <span style={{ fontSize: '60px', lineHeight: 1 }}>🧠</span>
                <span style={{ fontSize: '16px', marginTop: "-0.4em" }}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
