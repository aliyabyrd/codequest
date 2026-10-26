import './ChargeTheRobots.css'

type Props = { stage: number; success: boolean }

// Stage 0 = start. Odd stages = Byte arrives at a robot.
// Even stages = the robot has been charged (2, 4, 6).
export default function ChargeTheRobots({ stage, success }: Props) {
  const position = stage === 0 ? 0 : Math.ceil(stage / 2)
  const charged = Math.floor(stage / 2)
  return (
    <div className="robot-level" aria-label="Robot City charging challenge">
      <div className="robot-sun" />
      <div className="robot-building building-a"><span>▦ ▦</span><span>▦ ▦</span></div>
      <div className="robot-building building-b"><span>▥ ▥ ▥</span><span>▥ ▥ ▥</span></div>
      <div className="robot-building building-c"><span>▦ ▦</span><span>▦ ▦</span></div>
      <div className="robot-road" />
      <div className="robot-sidewalk" />
      {[1, 2, 3].map(number => (
        <div key={number} className={`robot-station station-${number} ${charged >= number ? 'charged' : ''}`}>
          <div className="robot-bot" aria-label={`Robot ${number} ${charged >= number ? 'charged' : 'needs power'}`}>
            <span className="robot-antenna" />
            <span className="robot-face"><i /><i /></span>
            <span className="robot-mouth" />
          </div>
          <div className="robot-battery">{charged >= number ? '⚡ 100%' : '🪫 0%'}</div>
          <div className="robot-station-label">Robot {number}</div>
          {charged >= number && <span className="robot-charged-sparkle">✦</span>}
        </div>
      ))}
      <div className="robot-friends" style={{ left: `${7 + position * 25}%` }}>
        <img src="/characters/nova.png" alt="Nova" />
        <img src="/characters/byte.png" alt="Byte" />
      </div>
      <div className="robot-counter">⚡ Robots charged: {charged}/3</div>
      {success && <div className="robot-victory">🌟 Mission complete! All robots powered up! 🌟</div>}
    </div>
  )
}
