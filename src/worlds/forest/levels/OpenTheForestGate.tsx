import './OpenTheForestGate.css'
export const forestGateConfig = {
  start: { x: 0, y: 0 },
  goal: { x: 1, y: 0 },
}

type Props = { stage: number; hasKey: boolean; success: boolean }

const sparkles = [
  { left: '14%', top: '18%' },
  { left: '72%', top: '23%' },
  { left: '38%', top: '14%' },
  { left: '58%', top: '60%' },
]

export default function OpenTheForestGate({ stage, hasKey, success }: Props) {
  const keyFound = stage >= 1
  const atDoor = stage >= 3
  return (
    <div className="gate-level">
      <div className="gate-sun" />
      <div className="gate-hill gate-hill-back" />
      <div className="gate-hill gate-hill-front" />
      <div className="gate-ground" />
      <div className="gate-tree">
        <div className="gate-canopy" />
        <div className="gate-trunk" />
      </div>
      {sparkles.map((spot, index) => (
        <span key={index} className="gate-sparkle" style={spot}>✦</span>
      ))}
      <div className="gate-flowers">🌸 🌼 🌷</div>
      {keyFound && !hasKey && <div className="gate-key gate-hidden-key">🔑</div>}
      <div className={`gate-door ${success ? 'gate-door-open' : ''}`}>
        <span>{success ? '✨' : '🚪'}</span>
        {!success && <small>{hasKey ? '🔑' : '🔒'}</small>}
      </div>
      <div className={`gate-characters ${atDoor ? 'gate-at-door' : ''}`}>
        <img src="/characters/nova.png" alt="Nova" />
        <img src="/characters/byte.png" alt="Byte" />
      </div>
      <div className="gate-inventory">
        {hasKey ? '🔑 Key in inventory' : keyFound ? '✨ You found a key!' : '🔍 Search for a hidden key'}
      </div>
      {success && <div className="gate-victory">🌟 The Forest Gate is open! Robot City unlocked! 🌟</div>}
    </div>
  )
}
