import { Button } from 'pixelartui-react'

export default function ResultScreen({ answers, onRestart }) {
  const yesCount = answers.filter(a => a === 'yes').length
  const noCount = answers.length - yesCount

  // Placeholder computation — replace with real logic later
  const result = yesCount >= 10
    ? { title: 'THE MULTITUDE', desc: 'You contain many selves. Each one valid. Each one you.' }
    : yesCount >= 7
    ? { title: 'THE DIVIDED', desc: 'Two strong forces pull at your mind. The tension is your strength.' }
    : yesCount >= 4
    ? { title: 'THE NEGOTIATOR', desc: 'You bridge inner worlds others cannot see.' }
    : { title: 'THE SINGULAR', desc: 'One clear voice. One steady path. Rare and resolute.' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '40px', background: '#ffffff', padding: '48px' }}>
      <p style={{ margin: 0, fontSize: '24px', color: '#888', letterSpacing: '3px' }}>YOUR RESULT</p>
      <h2 style={{ margin: 0, fontSize: '52px', fontWeight: 700, color: '#0041BA', letterSpacing: '3px', textAlign: 'center' }}>
        {result.title}
      </h2>
      <p style={{ margin: 0, fontSize: '26px', lineHeight: 1.8, textAlign: 'center', maxWidth: '600px', color: '#333' }}>
        {result.desc}
      </p>
      <div style={{ display: 'flex', gap: '48px', fontSize: '22px', color: '#888' }}>
        <span>YES: <strong style={{ color: '#0041BA' }}>{yesCount}</strong></span>
        <span>NO: <strong style={{ color: '#0041BA' }}>{noCount}</strong></span>
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
