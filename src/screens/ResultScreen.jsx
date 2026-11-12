import { Button } from 'pixelartui-react'
import { QUESTIONS, ENTITY_RESPONSES } from '../gameData'

function cohensKappa(answers, entityKey) {
  const responses = ENTITY_RESPONSES[entityKey]
  const n = answers.length
  let agree = 0, playerYes = 0, entityYes = 0

  for (const { questionId, answer } of answers) {
    const p = answer === 'yes' ? 1 : 0
    const e = responses[questionId - 1]
    if (p === e) agree++
    playerYes += p
    entityYes += e
  }

  const Po = agree / n
  const pYesRate = playerYes / n
  const eYesRate = entityYes / n
  const Pe = (pYesRate * eYesRate) + ((1 - pYesRate) * (1 - eYesRate))

  if (Pe === 1) return 1
  return (Po - Pe) / (1 - Pe)
}

function computeQuestionResults(answers, entityCounts) {
  const answerMap = Object.fromEntries(answers.map(a => [a.questionId, a.answer]))

  return QUESTIONS.map(q => {
    const userYes = answerMap[q.id] === 'yes' ? 1 : 0
    const expertYes  = entityCounts.experts * ENTITY_RESPONSES.experts[q.id - 1]
    const mobYes     = entityCounts.mob     * ENTITY_RESPONSES.mob[q.id - 1]
    const machineYes = entityCounts.machine * ENTITY_RESPONSES.machine[q.id - 1]

    const totalVoters = entityCounts.experts + entityCounts.mob + entityCounts.machine + 1
    const totalYes = expertYes + mobYes + machineYes + userYes
    const totalNo  = totalVoters - totalYes

    return {
      id: q.id,
      text: q.text,
      totalYes,
      totalNo,
      result: totalYes >= totalNo ? 'YES' : 'NO',
    }
  })
}

const ENTITIES = [
  { key: 'experts', label: 'Experts' },
  { key: 'mob',     label: 'Mob'     },
  { key: 'machine', label: 'Machine' },
]

export default function ResultScreen({ answers, entityCounts, onRestart }) {
  const scores = Object.fromEntries(
    ENTITIES.map(({ key }) => [key, cohensKappa(answers, key)])
  )
  const topEntity = ENTITIES.reduce((best, e) =>
    scores[e.key] > scores[best.key] ? e : best
  ).key

  const questionResults = computeQuestionResults(answers, entityCounts)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#ffffff', padding: '64px 48px', gap: '64px' }}>

      {/* Alignment result */}
      <p style={{ margin: 0, fontSize: '48px', lineHeight: 1.5, textAlign: 'center', color: '#333', maxWidth: '700px' }}>
        Your views aligned most closely with the{' '}
        <span style={{ color: '#0041BA', fontWeight: 700 }}>{ENTITIES.find(e => e.key === topEntity).label}</span>
      </p>

      {/* Entity voter counts */}
      <div style={{ display: 'flex', gap: '48px', fontSize: '22px', color: '#888', textAlign: 'center' }}>
        {ENTITIES.map(({ key, label }) => (
          <div key={key}>
            <div style={{ color: '#0041BA', fontSize: '40px', fontWeight: 700 }}>{entityCounts[key]}</div>
            <div>{label}</div>
            <div style={{ fontSize: '16px', marginTop: '4px' }}>{entityCounts[key] === 1 ? 'voter' : 'voters'}</div>
          </div>
        ))}
      </div>

      {/* Per-question results */}
      <div style={{ width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ margin: '0 0 8px', fontSize: '24px', textAlign: 'center', color: '#333' }}>Final Tally for Each Question</p>
        {questionResults.map(q => (
          <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', fontSize: '16px', color: '#555', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
            <span style={{ flex: 1, lineHeight: 1.5 }}>
              <span style={{ color: '#aaa', marginRight: '8px' }}>Q{q.id}</span>
              {q.text}
            </span>
            <span style={{ fontWeight: 700, color: q.result === 'YES' ? '#0041BA' : '#888', whiteSpace: 'nowrap' }}>
              {q.result}
            </span>
          </div>
        ))}
      </div>

      {/* Play again */}
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
