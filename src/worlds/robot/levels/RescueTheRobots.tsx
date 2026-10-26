import './RescueTheRobots.css'

export type RescueFrame = {
  x: number
  y: number
  direction: number
  rescued: number[]
}

type Props = { frame?: RescueFrame; success?: boolean }

const bots = [
  { x: 210, color: '#ffc0d9', name: 'PIP' },
  { x: 350, color: '#cbbcff', name: 'BOP' },
  { x: 490, color: '#a6e5cf', name: 'ZIG' },
]

export default function RescueTheRobots({ frame, success = false }: Props) {
  const state = frame ?? { x: 0, y: 0, direction: 0, rescued: [] }
  const count = success ? 3 : state.rescued.length
  const byteX = 70 + state.x * 140

  return (
    <div className="rescue-factory">
      <svg viewBox="0 0 680 390" className="rescue-factory__art" role="img" aria-label={`Robot factory. ${count} of 3 robots rescued.`}>
        <defs>
          <linearGradient id="factory-wall" x2="0" y2="1"><stop stopColor="#aaa0df"/><stop offset="1" stopColor="#e7c8e8"/></linearGradient>
          <linearGradient id="factory-floor" x2="0" y2="1"><stop stopColor="#a4b6d9"/><stop offset="1" stopColor="#798ab9"/></linearGradient>
        </defs>
        <rect width="680" height="390" rx="18" fill="url(#factory-wall)" />
        <rect x="0" y="250" width="680" height="140" fill="url(#factory-floor)" />
        <rect x="25" y="25" width="630" height="58" rx="16" fill="#675b9d" />
        <text x="340" y="62" fill="#fff6d5" fontSize="23" fontWeight="900" textAnchor="middle">ROBOT RESCUE FACTORY</text>
        {[60,155,250,345,440,535,630].map((x,i) => (
          <g key={x}>
            <path d={`M${x} 83 V110`} stroke="#eee7ff" strokeWidth="5"/>
            <circle cx={x} cy="123" r="12" fill={i % 2 ? '#ffb8d2' : '#ffefaa'} opacity=".9" />
          </g>
        ))}
        <rect x="26" y="164" width="628" height="105" rx="17" fill="#8d8fc5" stroke="#6c70a5" strokeWidth="5" />
        <rect x="36" y="185" width="608" height="60" rx="12" fill="#555d91" />
        {[75,125,175,225,275,325,375,425,475,525,575,625].map(x => (
          <rect key={x} x={x} y="210" width="22" height="8" rx="4" fill="#d5d3f1" opacity=".65" />
        ))}
        <rect x="26" y="275" width="628" height="18" rx="9" fill="#f4dcff" />
        {bots.map((bot,i) => {
          const saved = success || state.rescued.includes(i)
          return (
            <g key={bot.name} transform={`translate(${bot.x} 184)`}>
              <rect x="-39" y="-38" width="78" height="87" rx="16" fill={saved ? '#b8f0cf' : '#fff0f2'} stroke={saved ? '#6abf9d' : '#f38caa'} strokeWidth="4" strokeDasharray={saved ? undefined : '8 5'} />
              <rect x="-22" y="-20" width="44" height="39" rx="12" fill={bot.color} stroke="#7778b3" strokeWidth="3" />
              <rect x="-15" y="-11" width="30" height="17" rx="7" fill="#4e598d" />
              <circle cx="-7" cy="-3" r="3" fill="#fff4b4"/><circle cx="7" cy="-3" r="3" fill="#fff4b4"/>
              <path d="M0 -20 V-29" stroke="#eeeaff" strokeWidth="3"/><circle cy="-31" r="5" fill="#ffe69d" />
              <text x="0" y="35" fontSize="10" fontWeight="900" textAnchor="middle" fill="#60578c">{bot.name}</text>
              <circle cx="31" cy="-32" r="15" fill={saved ? '#76d5a0' : '#fa8fa9'} />
              <text x="31" y="-26" textAnchor="middle" fontWeight="900" fontSize="18" fill="white">{saved ? '✓' : '!'}</text>
            </g>
          )
        })}
        <path d="M70 321 H490" stroke="#edf4ff" strokeWidth="5" strokeDasharray="12 12" opacity=".85" />
        <g transform={`translate(${byteX} 327)`} className="rescue-factory__travelers">
          <image href="/characters/nova.png" x="-65" y="-95" width="52" height="85" preserveAspectRatio="xMidYMid meet" />
          <ellipse cy="9" rx="21" ry="6" fill="#49577c" opacity=".35" />
          <rect x="-18" y="-46" width="36" height="40" rx="12" fill="#a9e3f3" stroke="#5d7fba" strokeWidth="3" />
          <rect x="-13" y="-34" width="26" height="16" rx="6" fill="#465a8c" />
          <circle cx="-6" cy="-26" r="3" fill="#fff4bd"/><circle cx="6" cy="-26" r="3" fill="#fff4bd" />
          <path d="M0 -46 V-54" stroke="#d4e9f8" strokeWidth="3"/><circle cy="-57" r="4" fill="#ffb6d4" />
          <path d="M-11 -6 V3 M11 -6 V3" stroke="#a9e3f3" strokeWidth="5" strokeLinecap="round" />
        </g>
        <rect x="12" y="349" width="125" height="28" rx="14" fill="#fff5df" />
        <text x="74" y="368" textAnchor="middle" fontSize="12" fontWeight="900" fill="#71608b">DEBUG THE CODE!</text>
      </svg>
      <div className="rescue-factory__hud"><span>🐛 Find the bug, save the bots!</span><strong>{count} / 3 rescued</strong></div>
      {success && <div className="rescue-factory__success" role="status">🎉 Factory fixed! All three robots are safe!</div>}
    </div>
  )
}
