
import type { Position } from '../../../game/types'
import './FindTheFireflies.css'

type Props = {
  position: Position
  success: boolean
}

const fireflies = [
  { left: '9%', top: '20%', delay: '0s' },
  { left: '18%', top: '40%', delay: '.8s' },
  { left: '29%', top: '15%', delay: '1.4s' },
  { left: '40%', top: '35%', delay: '.3s' },
  { left: '52%', top: '12%', delay: '1.1s' },
  { left: '65%', top: '42%', delay: '.6s' },
  { left: '76%', top: '18%', delay: '1.7s' },
  { left: '88%', top: '34%', delay: '.9s' },
  { left: '57%', top: '66%', delay: '2s' },
  { left: '24%', top: '74%', delay: '1.3s' },
]

const steppingStones: Position[] = [
  { x: 0, y: 2 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 2, y: 2 },
]

export default function FindTheFireflies({
  position,
  success,
}: Props) {
  const pointStyle = (point: Position) => ({
    left: `${12 + point.x * 24}%`,
    top: `${34 + point.y * 20}%`,
  })

  return (
    <div className="firefly-level">
      <div className="firefly-moon" />

      <div className="firefly-stars">
        ✦ · ✧ · ✦ · ✧
      </div>

      <div className="firefly-hill hill-back" />
      <div className="firefly-hill hill-front" />

      <div className="firefly-tree tree-left">
        <div className="tree-trunk" />
        <div className="tree-leaves" />
      </div>

      <div className="firefly-tree tree-right">
        <div className="tree-trunk" />
        <div className="tree-leaves" />
      </div>

      {steppingStones.map((point, index) => (
        <div
          key={index}
          className="firefly-path-stone"
          style={pointStyle(point)}
        />
      ))}

      {fireflies.map((fly, index) => (
        <span
          key={index}
          className="firefly-light"
          style={{
            left: fly.left,
            top: fly.top,
            animationDelay: fly.delay,
          }}
        />
      ))}

      <div
        className="firefly-lantern"
        style={pointStyle({ x: 2, y: 2 })}
      >
        <span className="lantern-glow" />
        <span className="lantern-icon">
          {success ? '🌟' : '🏮'}
        </span>
      </div>

      <div
        className="firefly-characters"
        style={pointStyle(position)}
      >
        <img
          src="/characters/nova.png"
          alt="Nova"
        />
        <img
          src="/characters/byte.png"
          alt="Byte"
        />
      </div>

      {success && (
        <div className="firefly-victory">
          ✨ You found the fireflies! ✨
        </div>
      )}
    </div>
  )
}
