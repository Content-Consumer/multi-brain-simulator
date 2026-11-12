import { Button } from 'pixelartui-react'
import { ENTITY_RESPONSES } from '../gameData'

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

  // Pe === 1 means both raters agreed on every label by chance (degenerate case)
  if (Pe === 1) return 1
  return (Po - Pe) / (1 - Pe)
}

const ENTITIES = [
  { key: 'experts', label: 'Experts' },
  { key: 'mob',     label: 'Mob'     },
  { key: 'machine', label: 'Machine' },
]


export default function ResultScreen({ answers, onRestart }) {
  const scores = Object.fromEntries(
    ENTITIES.map(({ key }) => [key, cohensKappa(answers, key)])
  )

  const topEntity = ENTITIES.reduce((best, e) =>
    scores[e.key] > scores[best.key] ? e : best
  ).key

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: '100vh', background: '#ffffff', padding: '48px' }}>
      <div />
      <p style={{ margin: 0, fontSize: '48px', lineHeight: 1.5, textAlign: 'center', color: '#333', maxWidth: '700px' }}>
        Your views aligned most closely with the{' '}
        <span style={{ color: '#0041BA', fontWeight: 700 }}>{ENTITIES.find(e => e.key === topEntity).label}</span>
      </p>

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
