import { Button } from 'pixelartui-react'

export default function HomeScreen({ onPlay }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '40px', background: '#ffffff', padding: '48px' }}>
      <h1 style={{ margin: 0, fontSize: '52px', fontWeight: 700, letterSpacing: '3px', textAlign: 'center', lineHeight: 1.3 }}>
        Mind, Machines and Mobs
      </h1>

      <Button
        text="START"
        buttonSize="large"
        buttonType="main"
        buttonStyle="light"
        backgroundColor="#0041BA"
        onClick={onPlay}
      />
    </div>
  )
}
