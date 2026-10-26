
import './FixTheStreetlights.css'

export type StreetlightFrame = {
  x: number
  y: number
  direction: number
  lit: number[]
}

type Props = {
  frame?: StreetlightFrame
  success?: boolean
}

const lamps = [
  { x: 220, y: 296 },
  { x: 350, y: 296 },
  { x: 350, y: 202 },
  { x: 350, y: 108 },
]

export default function FixTheStreetlights({
  frame,
  success = false,
}: Props) {
  const state = frame ?? {
    x: 0,
    y: 0,
    direction: 0,
    lit: [],
  }

  const byteX = 90 + state.x * 130
  const byteY = 296 + state.y * 94

  const litCount = success ? 4 : state.lit.length

  return (
    <div
      className="streetlight-level"
      aria-label={`Robot City at night. ${litCount} of 4 lights are on.`}
    >
      <svg
        className="streetlight-level__art"
        viewBox="0 0 680 390"
        role="img"
        aria-label="Two connected streets with four streetlights"
      >
        <defs>
          <linearGradient
            id="cq-night-sky"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0" stopColor="#4e548f" />
            <stop offset="1" stopColor="#a4b8d9" />
          </linearGradient>

          <linearGradient
            id="cq-night-road"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0" stopColor="#777fa9" />
            <stop offset="1" stopColor="#555d88" />
          </linearGradient>

          <filter
            id="cq-night-glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="11" />
          </filter>
        </defs>

        {/* Night sky */}
        <rect
          width="680"
          height="390"
          rx="20"
          fill="url(#cq-night-sky)"
        />

        <circle
          cx="593"
          cy="51"
          r="23"
          fill="#fff0c2"
          opacity=".95"
        />

        {[
          [46, 42],
          [138, 65],
          [255, 35],
          [423, 46],
          [530, 94],
          [646, 118],
          [190, 113],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 2 ? 2 : 3}
            fill="#f7f0ff"
            opacity=".85"
          />
        ))}

        {/* Pastel city buildings */}
        <g>
          {([
            [13, 122, 102, 164, '#a998d8'],
            [115, 151, 80, 136, '#8caad3'],
            [225, 87, 97, 192, '#9b91d1'],
            [398, 115, 89, 175, '#ba9ed5'],
            [506, 100, 89, 194, '#8ca4d2'],
            [594, 155, 75, 146, '#a79bda'],
          ] as [number, number, number, number, string][]).map(
            ([x, y, w, h, color], i) => (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx="9"
                  fill={color}
                />

                {[0, 1, 2].map(j => (
                  <rect
                    key={`top-${j}`}
                    x={x + 16 + j * 24}
                    y={y + 25}
                    width="11"
                    height="16"
                    rx="2"
                    fill={
                      j === 1 ? '#ffe9a5' : '#d6e7fa'
                    }
                  />
                ))}

                {[0, 1, 2].map(j => (
                  <rect
                    key={`bottom-${j}`}
                    x={x + 16 + j * 24}
                    y={y + 62}
                    width="11"
                    height="16"
                    rx="2"
                    fill="#d6e7fa"
                    opacity=".8"
                  />
                ))}
              </g>
            )
          )}

          <path
            d="M0 283 Q145 256 278 282 T680 275 V390 H0Z"
            fill="#638b93"
          />
        </g>

        {/* Connected streets */}
        <path
          d="M90 296 H350 V108"
          fill="none"
          stroke="#c7d7d9"
          strokeWidth="84"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M90 296 H350 V108"
          fill="none"
          stroke="url(#cq-night-road)"
          strokeWidth="72"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M90 296 H350 V108"
          fill="none"
          stroke="#ffedb6"
          strokeWidth="3"
          strokeDasharray="14 16"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".85"
        />

        {/* Four streetlights */}
        {lamps.map((lamp, i) => {
          const lit = success || state.lit.includes(i)

          return (
            <g key={i}>
              {lit && (
                <circle
                  cx={lamp.x + 15}
                  cy={lamp.y - 65}
                  r="46"
                  fill="#ffe4a1"
                  opacity=".55"
                  filter="url(#cq-night-glow)"
                />
              )}

              <path
                d={`M${lamp.x} ${lamp.y - 12}
                    V${lamp.y - 67}
                    Q${lamp.x} ${lamp.y - 78}
                    ${lamp.x + 12} ${lamp.y - 78}
                    H${lamp.x + 22}`}
                fill="none"
                stroke="#ecedfa"
                strokeWidth="6"
                strokeLinecap="round"
              />

              <rect
                x={lamp.x + 16}
                y={lamp.y - 81}
                width="23"
                height="16"
                rx="6"
                fill={lit ? '#ffe394' : '#7887a8'}
                stroke="#e9ecff"
                strokeWidth="2"
              />

              <ellipse
                cx={lamp.x}
                cy={lamp.y - 8}
                rx="10"
                ry="4"
                fill="#405276"
              />
            </g>
          )
        })}

        {/* Nova follows Byte */}
        <image
          href="/characters/nova.png"
          x={byteX - 76}
          y={byteY - 94}
          width="62"
          height="88"
          preserveAspectRatio="xMidYMid meet"
          className="streetlight-level__nova-follow"
        />

        {/* Byte */}
        <g
          transform={`translate(${byteX} ${byteY - 23})`}
          className="streetlight-level__byte"
        >
          <ellipse
            cy="26"
            rx="20"
            ry="6"
            fill="#303d68"
            opacity=".3"
          />

          <path
            d="M-10 10 L-12 20 M10 10 L12 20"
            stroke="#d8e5fb"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <rect
            x="-18"
            y="-24"
            width="36"
            height="36"
            rx="11"
            fill="#b4e5f5"
            stroke="#627fc0"
            strokeWidth="3"
          />

          <rect
            x="-12"
            y="-13"
            width="24"
            height="15"
            rx="6"
            fill="#455d8f"
          />

          <circle
            cx="-6"
            cy="-6"
            r="3"
            fill="#fff6c0"
          />

          <circle
            cx="6"
            cy="-6"
            r="3"
            fill="#fff6c0"
          />

          <path
            d="M0 -24 V-31"
            stroke="#d6e8fa"
            strokeWidth="3"
          />

          <circle
            cy="-33"
            r="4"
            fill="#ffc4dc"
          />

          <path
            d="M-18 -4 L-25 2 M18 -4 L25 2"
            stroke="#b4e5f5"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>

        {/* Starting point */}
        <g transform="translate(27 336)">
          <rect
            width="113"
            height="29"
            rx="14"
            fill="#f8edff"
          />

          <text
            x="56"
            y="19"
            fontSize="12"
            fontWeight="800"
            textAnchor="middle"
            fill="#655389"
          >
            START HERE
          </text>
        </g>
      </svg>

      {/* Level progress */}
      <div className="streetlight-level__hud">
        <span className="streetlight-level__mission">
          Light up both streets
        </span>

        <span className="streetlight-level__counter">
          <strong>{litCount} / 4</strong> lights on
        </span>
      </div>

      {success && (
        <div
          className="streetlight-level__success"
          role="status"
        >
          Robot City is glowing again!
        </div>
      )}
    </div>
  )
}
