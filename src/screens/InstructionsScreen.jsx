import { Button } from 'pixelartui-react'

const steps = [
  'You will be shown 13 questions.',
  'For each question, vote YES or NO.',
  'All questions must be answered.',
  'At the end, discover your brain type!',
]

export default function InstructionsScreen({ onStart }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '48px', background: '#ffffff', padding: '48px' }}>
      <h2 style={{ margin: 0, fontSize: '40px', fontWeight: 700, letterSpacing: '2px' }}>HOW TO PLAY</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '560px', width: '100%' }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span style={{ fontSize: '32px', fontWeight: 700, color: '#0041BA', minWidth: '48px' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontSize: '24px', lineHeight: 1.5 }}>{step}</span>
          </div>
        ))}
      </div>
      <Button
        text="LET'S GO!"
        buttonSize="large"
        buttonType="main"
        buttonStyle="light"
        backgroundColor="#0041BA"
        onClick={onStart}
      />
    </div>
  )
}
