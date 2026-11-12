import { Button } from 'pixelartui-react'
import { ENTITY_RESPONSES } from '../gameData'

function scoreAgainstEntity(answers, entityKey) {
  const responses = ENTITY_RESPONSES[entityKey]
  let matches = 0
  for (const { questionId, answer } of answers) {
    const entityVote = responses[questionId - 1] === 1 ? 'yes' : 'no'
    if (answer === entityVote) matches++
  }
  return matches
}

export default function ResultScreen({ answers, onRestart }) {
  const expertScore  = scoreAgainstEntity(answers, 'experts')
  const mobScore     = scoreAgainstEntity(answers, 'mob')
  const machineScore = scoreAgainstEntity(answers, 'machine')

  const yesCount = answers.filter(a => a.answer === 'yes').length
  const noCount  = answers.length - yesCount

  // Placeholder result — replace with real logic later
  const topScore = Math.max(expertScore, mobScore, machineScore)
  const result =
    topScore === expertScore ? { title: 'THE EXPERT', desc: 'Your views align most closely with the expert panel.' }
    : topScore === mobScore  ? { title: 'THE MOB',    desc: 'Your views align most closely with the crowd.' }
    :                          { title: 'THE MACHINE', desc: 'Your views align most closely with the AI.' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '40px', background: '#ffffff', padding: '48px' }}>
      <p style={{ margin: 0, fontSize: '24px', color: '#888', letterSpacing: '3px' }}>YOUR RESULT</p>
      <h2 style={{ margin: 0, fontSize: '52px', fontWeight: 700, color: '#0041BA', letterSpacing: '3px', textAlign: 'center' }}>
        {result.title}
      </h2>
      <p style={{ margin: 0, fontSize: '26px', lineHeight: 1.8, textAlign: 'center', maxWidth: '600px', color: '#333' }}>
        {result.desc}
      </p>

      <div style={{ display: 'flex', gap: '48px', fontSize: '20px', color: '#888', textAlign: 'center' }}>
        <div>
          <div style={{ color: '#0041BA', fontSize: '32px', fontWeight: 700 }}>{expertScore}/13</div>
          <div>Experts</div>
        </div>
        <div>
          <div style={{ color: '#0041BA', fontSize: '32px', fontWeight: 700 }}>{mobScore}/13</div>
          <div>Mob</div>
        </div>
        <div>
          <div style={{ color: '#0041BA', fontSize: '32px', fontWeight: 700 }}>{machineScore}/13</div>
          <div>Machine</div>
        </div>
      </div>

      <div style={{ fontSize: '20px', color: '#aaa' }}>
        You voted YES on {yesCount} / {answers.length} questions
      </div>

      <div className="no-btn">
        <Button
          text="PLAY AGAIN"
          buttonSize="large"
          buttonType="outline"
          buttonStyle="light"
          backgroundColor="#0041BA"
          onClick={onRestart}
        />
      </div>
    </div>
  )
}
