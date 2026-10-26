import type { World } from '../game/types'

export default function IslandArt({ world }: { world: World }) {

  const isForest = world.id === 'forest'

  const isRobot = world.id === 'robot'

  const isMystery = world.id === 'mystery'

  const isSpace = world.id === 'space'

  return (

    <svg

      viewBox="0 0 320 260"

      className="island-illustration"

      aria-hidden="true"

    >

      <defs>

        <linearGradient id={`grass-${world.id}`} x2="0" y2="1">

          <stop offset="0%" stopColor={

            isForest ? '#A6E77B' :

            isRobot ? '#A7C8F5' :

            isMystery ? '#F6D88D' :

            isSpace ? '#B5A5F1' : '#F7B5D5'

          } />

          <stop offset="100%" stopColor={

            isForest ? '#3EAE73' :

            isRobot ? '#758BD6' :

            isMystery ? '#56C8AE' :

            isSpace ? '#7067C5' : '#C88BDB'

          } />

        </linearGradient>

        <linearGradient id={`rock-${world.id}`} x2="0.7" y2="1">

          <stop stopColor="#D3B999" />

          <stop offset="0.5" stopColor="#9A8190" />

          <stop offset="1" stopColor="#625D80" />

        </linearGradient>

      </defs>

      <path

        d="M32 126 Q160 175 288 126 L243 186 189 230 148 248 94 207Z"

        fill={`url(#rock-${world.id})`}

        stroke="#726C87"

        strokeWidth="3"

      />

      <path

        d="M94 169 L117 212 146 236 131 183Z"

        fill="#E5C8A7"

        opacity=".55"

      />

      <path

        d="M209 176 L188 225 221 192 238 163Z"

        fill="#615E7F"

        opacity=".5"

      />

      <ellipse

        cx="160"

        cy="125"

        rx="140"

        ry="48"

        fill={`url(#grass-${world.id})`}

        stroke="#E7F8C8"

        strokeWidth="7"

      />

      <path

        d="M175 165 Q168 193 180 245 L202 245 Q189 197 199 164"

        fill="#69D8F6"

        opacity=".8"

      />

      <path

        d="M185 167 Q178 204 190 242"

        stroke="#E5FFFF"

        strokeWidth="7"

        fill="none"

      />

      {isForest && (

        <g>

          <path

            d="M147 120 Q152 88 144 56 L161 52 Q168 86 174 121Z"

            fill="#87533D"

            stroke="#6D443D"

            strokeWidth="3"

          />

          <path

            d="M157 92 Q121 84 115 62 M162 83 Q191 70 201 50"

            fill="none"

            stroke="#87533D"

            strokeWidth="9"

            strokeLinecap="round"

          />

          {[

            [119, 50, 33],

            [156, 35, 39],

            [194, 52, 33],

            [139, 62, 38],

            [179, 67, 32],

          ].map(([x, y, r], i) => (

            <circle

              key={i}

              cx={x}

              cy={y}

              r={r}

              fill={i % 2 ? '#3EAD6A' : '#67C879'}

              stroke="#2E8D65"

              strokeWidth="3"

            />

          ))}

          <circle cx="125" cy="52" r="12" fill="#A3E989" opacity=".6" />

          <circle cx="175" cy="33" r="13" fill="#B4ED96" opacity=".5" />

          <path d="M56 128 l10 -19 10 19Z" fill="#F782B8" />

          <path d="M241 133 l10 -20 11 20Z" fill="#B48AF4" />

          <circle cx="100" cy="117" r="4" fill="#FFE584" />

          <circle cx="222" cy="110" r="4" fill="#FFE584" />

        </g>

      )}

      {isRobot && (

        <g strokeLinejoin="round">

          <rect x="86" y="61" width="47" height="65" rx="5"

            fill="#738AE4" stroke="#4D69B9" strokeWidth="3" />

          <rect x="137" y="37" width="57" height="91" rx="7"

            fill="#F3A5C2" stroke="#9876C5" strokeWidth="3" />

          <rect x="199" y="70" width="37" height="57" rx="4"

            fill="#6FC9E5" stroke="#4E95C4" strokeWidth="3" />

          <path d="M160 37 V21 M148 21 H172"

            stroke="#7C68B5" strokeWidth="5" />

          {Array.from({ length: 9 }, (_, i) => (

            <rect

              key={i}

              x={148 + (i % 3) * 14}

              y={54 + Math.floor(i / 3) * 20}

              width="7"

              height="10"

              rx="2"

              fill="#FFF3A4"

            />

          ))}

          {[98, 116, 213].map((x, i) => (

            <circle key={i} cx={x} cy="88" r="5" fill="#D9FAFF" />

          ))}

          <circle cx="166" cy="119" r="12" fill="#6E66BB" />

          <circle cx="166" cy="119" r="5" fill="#FFE09A" />

        </g>

      )}

      {isMystery && (

        <g>

          <path d="M64 119 Q155 91 256 119"

            fill="none" stroke="#FCE5A3" strokeWidth="16"

            strokeLinecap="round" />

          <path d="M155 121 Q163 82 153 42"

            stroke="#936341" strokeWidth="12" fill="none" />

          {[-1, 1].map((dir) => (

            <g key={dir} transform={`translate(153 48) scale(${dir} 1)`}>

              <path d="M0 0 Q-58 -50 -86 -10 Q-41 -15 0 0Z"

                fill="#4BBE8C" />

              <path d="M0 0 Q-43 -74 -13 -80 Q9 -44 0 0Z"

                fill="#79D98D" />

              <path d="M0 0 Q-62 14 -75 37 Q-28 26 0 0Z"

                fill="#36A98B" />

            </g>

          ))}

          <rect x="202" y="100" width="32" height="24"

            rx="3" fill="#B77B48" stroke="#83563D" strokeWidth="3" />

          <path d="M202 107 H234" stroke="#E9C07B" strokeWidth="4" />

          <circle cx="218" cy="111" r="4" fill="#FFDE74" />

        </g>

      )}

      {isSpace && (

        <g>

          <ellipse cx="158" cy="72" rx="55" ry="43"

            fill="#A77FEA" stroke="#7867CE" strokeWidth="4" />

          <ellipse cx="158" cy="75" rx="82" ry="19"

            fill="none" stroke="#F5C76E" strokeWidth="11"

            transform="rotate(-18 158 75)" />

          <circle cx="143" cy="58" r="13" fill="#C9B0FF" opacity=".7" />

          <rect x="109" y="111" width="100" height="21" rx="10"

            fill="#8A9CE6" />

          <path d="M124 112 Q124 88 159 88 Q194 88 194 112Z"

            fill="#B8E8FA" stroke="#7B86D3" strokeWidth="4" />

          <circle cx="160" cy="104" r="8" fill="#FFF3B2" />

          <path d="M219 116 l15 -43 14 43Z" fill="#F8F5FF" />

          <path d="M231 117 v16" stroke="#F3A45B" strokeWidth="6" />

        </g>

      )}

      {!isForest && !isRobot && !isMystery && !isSpace && (

        <g>

          <rect x="98" y="79" width="111" height="49" rx="9"

            fill="#F7C1DE" stroke="#C47FB5" strokeWidth="4" />

          <path d="M88 83 L153 32 220 83Z"

            fill="#B98CE7" stroke="#8E6AC7" strokeWidth="4" />

          <rect x="145" y="99" width="25" height="29" rx="5"

            fill="#A37BD6" />

          <ellipse cx="229" cy="70" rx="29" ry="36"

            fill="#FFDAA6" stroke="#DCA7A5" strokeWidth="4"

            transform="rotate(-22 229 70)" />

          {[

            [218, 54, '#8F75E9'],

            [237, 54, '#F58BB8'],

            [215, 78, '#63C6D2'],

            [238, 82, '#F5A84F'],

          ].map(([x, y, color], i) => (

            <circle

              key={i}

              cx={Number(x)}

              cy={Number(y)}

              r="6"

              fill={String(color)}

            />

          ))}

          <path d="M251 99 L272 42"

            stroke="#9E6B42" strokeWidth="7" />

          <path d="M272 42 Q294 48 275 72Z" fill="#8B73E5" />

        </g>

      )}

      <path

        d="M260 44 l5 11 11 5 -11 5 -5 11 -5 -11 -11 -5 11 -5Z"

        fill="#FFF1A0"

      />

      <circle cx="67" cy="75" r="3" fill="white" />

    </svg>

  )

}
