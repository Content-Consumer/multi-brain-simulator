import { Button } from 'pixelartui-react'

export default function TopicScreen({ onContinue }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '24px', background: '#ffffff', padding: '48px' }}>
      <p style={{ margin: 0, fontSize: '20px', color: '#333', textAlign: 'center' }}>
        Today we will be voting to decide on
      </p>
      <h2 style={{ margin: 0, fontSize: '48px', fontWeight: 700, color: '#0041BA', textAlign: 'center', maxWidth: '700px', lineHeight: 1.4 }}>
        What should the government do to restrict the spread of non consensual deepfakes
      </h2>
      <div style={{ marginTop: '24px' }}>
        <Button
          text="CONTINUE"
          buttonSize="large"
          buttonType="main"
          buttonStyle="light"
          backgroundColor="#0041BA"
          onClick={onContinue}
        />
      </div>
    </div>
  )
}
