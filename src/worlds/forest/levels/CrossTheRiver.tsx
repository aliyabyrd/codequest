
import type {
  Position,
  LevelConfig,
} from '../../../game/types'

import './CrossTheRiver.css'

export const crossTheRiverConfig: LevelConfig = {
  id: 'cross-the-river',
  title: 'Cross the River',

  start: { x: 0, y: 2 },
  goal: { x: 3, y: 2 },

  walkable: [
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
  ],
}

type Props = {
  position: Position
  success: boolean
}

export default function CrossTheRiver({
  position,
  success,
}: Props) {
  const positionStyle = (point: Position) => ({
    left: `${12 + point.x * 24}%`,
    top: `${30 + point.y * 20}%`,
  })

  return (
    <div className="river-level">
      <div className="river-sky" />
      <div className="river-hills" />

      <div className="river-water">
        <span className="river-wave wave-one" />
        <span className="river-wave wave-two" />
      </div>

      <div className="river-left-bank" />
      <div className="river-right-bank" />

      {crossTheRiverConfig.walkable
        .filter(point => point.x === 1 || point.x === 2)
        .map((point, index) => (
          <div
            key={index}
            className="river-stone"
            style={positionStyle(point)}
          />
        ))}

      <div
        className="river-goal"
        style={positionStyle(crossTheRiverConfig.goal)}
      >
        {success ? '🏆' : '🏁'}
      </div>

      <div
        className="river-characters"
        style={positionStyle(position)}
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
        <div className="river-success">
          ✨ You crossed the river! ✨
        </div>
      )}
    </div>
  )
}
