import CodeWorkspace from './CodeWorkspace'
import type { CodeBlockItem } from './CodeWorkspace'
import { useEffect, useState } from 'react'

import CrossTheRiver, {
  crossTheRiverConfig,
} from './worlds/forest/levels/CrossTheRiver'

import { moveCharacter, samePosition } from './game/GameEngine'
import type { MovementCommand, Position } from './game/types'

import './App.css'
import FindTheFireflies from './worlds/forest/levels/FindTheFireflies'
import OpenTheForestGate, { forestGateConfig } from './worlds/forest/levels/OpenTheForestGate'
import ChargeTheRobots from './worlds/robot/levels/ChargeTheRobots'
import FixTheStreetlights from './worlds/robot/levels/FixTheStreetlights'
import type { StreetlightFrame } from './worlds/robot/levels/FixTheStreetlights'
import RescueTheRobots from './worlds/robot/levels/RescueTheRobots'
import type { RescueFrame } from './worlds/robot/levels/RescueTheRobots'

const fireflyConfig = {
  start: { x: 0, y: 2 },
  goal: { x: 2, y: 2 },
  walkable: [
    { x: 0, y: 2 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
  ],
}


type Screen = 'home' | 'worlds' | 'game' | 'progress' | 'creations'
type WorldId = 'forest' | 'robot' | 'mystery' | 'space' | 'studio'
type Command =
  | 'forward' | 'up' | 'down' | 'repeat' | 'if'
  | 'else' | 'collect' | 'launch' | 'paint' | 'search' | 'unlock' | 'charge'

type World = {
  id: WorldId
  title: string
  lesson: string
  icon: string
  place: string
}

type Challenge = {
  title: string
  story: string
  lesson: string
  available: Command[]
  solution: Command[]
  hint: string
}

const worlds: World[] = [
  {
    id: 'forest',
    title: 'Enchanted Forest',
    lesson: 'Sequences & commands',
    icon: '🌿',
    place: 'forest',
  },
  {
    id: 'robot',
    title: 'Robot City',
    lesson: 'Loops & repetition',
    icon: '🏙️',
    place: 'robot',
  },
  {
    id: 'mystery',
    title: 'Mystery Island',
    lesson: 'If / else decisions',
    icon: '🌴',
    place: 'mystery',
  },
  {
    id: 'space',
    title: 'Space Station',
    lesson: 'Variables & events',
    icon: '🪐',
    place: 'space',
  },
  {
    id: 'studio',
    title: "Creator's Studio",
    lesson: 'Creative coding',
    icon: '🎨',
    place: 'studio',
  },
]

const labels: Record<Command, string> = {
  forward: '➡️ Forward',
  up: '⬆️ Up',
  down: '⬇️ Down',
  repeat: '🔁 Repeat 3 times',
  if: '❔ If',
  else: '↪️ Else',
  collect: '⭐ Collect',
  search: '🔍 Search',
  unlock: '🔓 Unlock',
  charge: '⚡ Charge',
  launch: '🚀 Launch',
  paint: '🎨 Paint',
}

const challenges: Record<WorldId, Challenge[]> = {
  forest: [
{
  title: 'Cross the River',
  story: 'Help Nova and Byte cross the magical river using the stepping stones!',
  lesson: 'Build a sequence of commands to reach the other side safely.',
  available: ['forward', 'up', 'down'],
  solution: ['forward', 'up', 'forward', 'down', 'forward'],
  hint: 'Forward, up, forward, down, then forward.',
},
    {
      title: 'Find the Fireflies',
      story: 'Follow the glowing lights through the trees.',
      lesson: 'A sequence runs from first to last.',
      available: ['forward', 'up', 'down'],
      solution: ['up', 'forward', 'forward', 'down'],
      hint: 'Go up, forward twice, then down.',
    },
    {
      title: 'Open the Forest Gate',
      story: 'Find the golden key and open the secret door in the magical tree!',
      lesson: 'Put the actions in order: find the key, pick it up, approach the door, and unlock it.',
      available: ['unlock', 'forward', 'search', 'collect'],
      solution: ['search', 'collect', 'forward', 'unlock'],
      hint: 'Search for the key, collect it, move forward, then unlock the door.',
    },
  ],
  robot: [
    {
      title: 'Charge the Robots',
      story: 'Three little robots need energy! Help Byte recharge all three.',
      lesson: 'Use a loop to move to each robot and charge it. The loop runs three times.',
      available: ['charge', 'repeat', 'forward'],
      solution: ['repeat', 'forward', 'charge'],
      hint: 'Start with Repeat 3 times. Inside the loop, move forward and then charge.',
    },
    {
      title: 'Fix the Streetlights',
      story: 'Four streetlights have gone dark. Help Byte light two on each street!',
      lesson: 'Use two loops, with a turn between them, to light both streets.',
      available: ['repeat', 'forward'],
      solution: ['forward', 'repeat'],
      hint: 'Repeat 2 times: Move Forward, Light Up. Then Turn Left. Repeat those two actions 2 more times.',
    },
    {
      title: 'Robot Rescue: Debug the Code',
      story: 'The robot factory is stuck! Byte wrote a program with a bug. Run it, spot the mistake, and fix it to save three robots.',
      lesson: 'Debugging means finding and fixing mistakes in code.',
      available: ['repeat', 'forward'],
      solution: ['repeat', 'forward'],
      hint: 'Look inside Repeat 3 times. Byte can move forward, but Charge Robot is the wrong action. Remove it and add Rescue Robot instead!',
    },
  ],
  mystery: [
    {
      title: 'The Two Paths',
      story: 'Take the safe path when the bridge is open.',
      lesson: 'IF checks a condition.',
      available: ['if', 'forward', 'else'],
      solution: ['if', 'forward'],
      hint: 'If, then forward.',
    },
    {
      title: 'Treasure Detector',
      story: 'Decide what to do when treasure is nearby.',
      lesson: 'IF and ELSE describe two branches.',
      available: ['if', 'else', 'collect', 'forward'],
      solution: ['if', 'collect', 'else', 'forward'],
      hint: 'If collect, else forward.',
    },
    {
      title: 'The Secret Cave',
      story: 'Find the safe entrance.',
      lesson: 'Practice branching decisions.',
      available: ['if', 'else', 'up', 'forward'],
      solution: ['if', 'up', 'else', 'forward'],
      hint: 'If up, else forward.',
    },
  ],
  space: [
    {
      title: 'Collect Star Energy',
      story: 'Gather fuel for the rocket.',
      lesson: 'Track how many energy points you collect.',
      available: ['collect', 'forward', 'launch'],
      solution: ['collect', 'collect'],
      hint: 'Collect twice.',
    },
    {
      title: 'Launch Countdown',
      story: 'Get ready for takeoff.',
      lesson: 'Launch is an event triggered after collecting.',
      available: ['collect', 'launch', 'forward'],
      solution: ['collect', 'collect', 'launch'],
      hint: 'Collect twice, then launch.',
    },
    {
      title: 'Save the Satellite',
      story: 'Reach the satellite and fly home.',
      lesson: 'Combine actions and events.',
      available: ['collect', 'forward', 'launch'],
      solution: ['forward', 'collect', 'collect', 'launch'],
      hint: 'Forward, collect twice, launch.',
    },
  ],
  studio: [
    {
      title: 'Paint a Scene',
      story: 'Create your first magical scene.',
      lesson: 'Commands can create and move art.',
      available: ['paint', 'forward', 'up'],
      solution: ['paint', 'forward'],
      hint: 'Paint, then forward.',
    },
    {
      title: 'Animate Your Art',
      story: 'Bring your painting to life.',
      lesson: 'Order changes what happens.',
      available: ['paint', 'forward', 'up'],
      solution: ['paint', 'up', 'forward'],
      hint: 'Paint, up, forward.',
    },
    {
      title: 'Final Creation',
      story: 'Complete your masterpiece.',
      lesson: 'Combine creative actions.',
      available: ['paint', 'forward', 'up', 'repeat'],
      solution: ['paint', 'repeat', 'forward', 'up'],
      hint: 'Paint, repeat, forward, up.',
    },
  ],
}

type Progress = Record<WorldId, number>

const emptyProgress: Progress = {
  forest: 0,
  robot: 0,
  mystery: 0,
  space: 0,
  studio: 0,
}

const progressKey = 'codequest-v8-gameplay-progress'

function loadProgress(): Progress {
  try {
    const saved = JSON.parse(localStorage.getItem(progressKey) || '{}')
    return { ...emptyProgress, ...saved }
  } catch {
    return { ...emptyProgress }
  }
}

function Character({
  name,
  className = '',
}: {
  name: 'nova' | 'byte'
  className?: string
}) {
  return (
    <img
      className={`character ${name} ${className}`}
      src={`/characters/${name}.png`}
      alt={name === 'nova' ? 'Nova the inventor' : 'Byte the robot'}
    />
  )
}

/* ORIGINAL V8 FLOATING ISLAND ILLUSTRATIONS */

function IslandArt({ world }: { world: World }) {
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

function Island({
  world,
  unlocked,
  onSelect,
  decorative = false,
}: {
  world: World
  unlocked: boolean
  onSelect?: () => void
  decorative?: boolean
}) {
  const contents = (
    <>
      <IslandArt world={world} />
      {!decorative && (
        <span className="illustrated-island-label">
          <strong>
            {unlocked ? '🌿' : '🔒'} {world.title}
          </strong>
          <small>{world.lesson}</small>
        </span>
      )}
    </>
  )

  if (decorative) {
    return (
      <div
        className={`floating-island ${world.place} decorative`}
        aria-hidden="true"
      >
        {contents}
      </div>
    )
  }

  return (
    <button
      type="button"
      className={`floating-island ${world.place} ${
        unlocked ? 'unlocked' : 'locked'
      }`}
      disabled={!unlocked}
      onClick={onSelect}
      aria-label={`${world.title}: ${world.lesson}, ${
        unlocked ? 'ready to explore' : 'locked'
      }`}
    >
      {contents}
    </button>
  )
}

/* ORIGINAL V8 ENCHANTED FOREST */

function ForestScene() {
  return (
    <div className="forest-scene illustrated-forest">
      <svg
        className="forest-background-art"
        viewBox="0 0 900 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="forestSky" x2="0" y2="1">
            <stop stopColor="#85C9EB" />
            <stop offset="1" stopColor="#DDF6D4" />
          </linearGradient>
          <linearGradient id="forestRiver" x2="0" y2="1">
            <stop stopColor="#A0EAF5" />
            <stop offset="1" stopColor="#268CC8" />
          </linearGradient>
        </defs>

        <rect width="900" height="400" fill="url(#forestSky)" />

        <path
          d="M0 240 L150 95 300 240 460 100 620 250 780 120 900 240Z"
          fill="#A0D2C3"
          opacity=".65"
        />
        <path
          d="M0 275 Q140 175 280 260 T570 245 T900 260 V400 H0Z"
          fill="#74B99B"
        />

        <path
          d="M0 280 Q180 235 360 280 L420 400 H0Z"
          fill="#75BF69"
        />
        <path
          d="M620 285 Q770 230 900 275 V400 H580Z"
          fill="#74BE6C"
        />

        <path
          d="M380 270 Q475 245 570 280 L680 400 H300Z"
          fill="url(#forestRiver)"
        />
        <path
          d="M417 300 Q480 284 540 305 M391 340 Q488 325 580 348"
          stroke="#D7FFFF"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />

        {[
          [440, 325, 34],
          [510, 348, 31],
          [585, 373, 37],
        ].map(([x, y, r], i) => (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx={r}
            ry={r * .36}
            fill="#A5A29A"
            stroke="#777F85"
            strokeWidth="4"
          />
        ))}

        {[75, 205, 720, 825].map((x, i) => (
          <g key={i}>
            <path
              d={`M${x - 12} 290 L${x - 7} 135 L${x + 12} 135 L${x + 18} 290Z`}
              fill="#855C47"
            />
            <circle cx={x} cy="130" r="66" fill="#3B9C68" />
            <circle cx={x - 28} cy="115" r="45" fill="#58BC78" />
            <circle cx={x + 25} cy="105" r="48" fill="#70CC83" />
            <circle
              cx={x - 18}
              cy="90"
              r="21"
              fill="#A1E99D"
              opacity=".4"
            />
          </g>
        ))}

        {[
          [45, 300],
          [135, 335],
          [265, 305],
          [700, 318],
          [785, 344],
          [865, 300],
        ].map(([x, y], i) => (
          <g key={i}>
            <path
              d={`M${x} ${y + 14} v-18`}
              stroke="#3F9A62"
              strokeWidth="3"
            />
            <circle
              cx={x}
              cy={y - 7}
              r="8"
              fill={i % 2 ? '#F6A0D7' : '#FFE09A'}
            />
            <circle cx={x} cy={y - 7} r="3" fill="white" />
          </g>
        ))}
      </svg>

      <div className="forest-characters">
        <Character name="nova" />
        <Character name="byte" />
      </div>
    </div>
  )
}

type StreetlightAction = 'forward' | 'left' | 'right' | 'light'

function expandStreetlightProgram(blocks: CodeBlockItem[]): StreetlightAction[] | null {
  const actions: StreetlightAction[] = []
  function visit(items: CodeBlockItem[], depth: number): boolean {
    if (depth > 6) return false
    for (const block of items) {
      if (block.type === 'repeat') {
        if (!Number.isInteger(block.count) || block.count < 1 || block.count > 5) return false
        for (let i = 0; i < block.count; i++) if (!visit(block.children, depth + 1)) return false
      } else {
        if (block.command === 'charge' || block.command === 'rescue') return false
        actions.push(block.command)
      }
      if (actions.length > 60) return false
    }
    return true
  }
  return visit(blocks, 0) ? actions : null
}

function countStreetlightLoops(blocks: CodeBlockItem[]): number {
  return blocks.reduce((sum, block) => sum + (block.type === 'repeat'
    ? (block.count > 1 && block.children.length > 0 ? 1 : 0) + countStreetlightLoops(block.children)
    : 0), 0)
}

const streetlightPositions = [
  { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: -1 }, { x: 2, y: -2 },
]

function runStreetlightSimulation(actions: StreetlightAction[]): {
  frames: StreetlightFrame[]
  error: string | null
} {
  let x = 0
  let y = 0
  let direction = 0 // 0 east, 1 north, 2 west, 3 south
  const lit = new Set<number>()
  const frames: StreetlightFrame[] = [{ x, y, direction, lit: [] }]
  const route = [{ x: 0, y: 0 }, ...streetlightPositions]
  for (const action of actions) {
    if (action === 'left') direction = (direction + 1) % 4
    if (action === 'right') direction = (direction + 3) % 4
    if (action === 'forward') {
      x += [1, 0, -1, 0][direction]
      y += [0, -1, 0, 1][direction]
      if (!route.some(point => point.x === x && point.y === y)) {
        return { frames, error: 'Byte stepped off the road. Check your turns and try again.' }
      }
    }
    if (action === 'light') {
      const lamp = streetlightPositions.findIndex(point => point.x === x && point.y === y)
      if (lamp === -1) return { frames, error: 'There is no streetlight here yet. Move Byte closer first.' }
      if (lit.has(lamp)) return { frames, error: 'This streetlight is already on. Find the next one.' }
      lit.add(lamp)
    }
    frames.push({ x, y, direction, lit: [...lit] })
  }
  return {
    frames,
    error: lit.size === 4 ? null : `You lit ${lit.size} of 4 streetlights. Keep going!`,
  }
}

type RescueAction = 'forward' | 'rescue' | 'charge'

const initialRescueFrame: RescueFrame = { x: 0, y: 0, direction: 0, rescued: [] }

// Start with a real, editable bug: Charge Robot should be Rescue Robot.
function makeBrokenRescueProgram(): CodeBlockItem[] {
  return [{
    id: 'debug-loop', type: 'repeat', count: 3,
    children: [
      { id: 'debug-forward', type: 'command', command: 'forward' },
      { id: 'debug-wrong', type: 'command', command: 'charge' },
    ],
  }]
}

function expandRescueProgram(blocks: CodeBlockItem[]): { actions: RescueAction[]; error: string | null } {
  const actions: RescueAction[] = []
  function visit(items: CodeBlockItem[], depth: number): string | null {
    if (depth > 6) return 'Too many loops inside loops. Try a simpler program.'
    for (const block of items) {
      if (block.type === 'repeat') {
        if (block.count < 1 || block.count > 5) return 'Check your Repeat count.'
        for (let i = 0; i < block.count; i++) {
          const error = visit(block.children, depth + 1)
          if (error) return error
        }
      } else {
        if (block.command !== 'forward' && block.command !== 'rescue' && block.command !== 'charge') return '🐛 This factory needs Move Forward and Rescue Robot. Check your blocks!'
        actions.push(block.command)
      }
      if (actions.length > 60) return 'Too many steps! Make your code shorter.'
    }
    return null
  }
  const error = visit(blocks, 0)
  return { actions, error }
}

function runRescueSimulation(actions: RescueAction[]): { frames: RescueFrame[]; error: string | null } {
  let x = 0
  const rescued = new Set<number>()
  const frames: RescueFrame[] = [{ ...initialRescueFrame, rescued: [] }]
  for (const action of actions) {
    if (action === 'forward') {
      x += 1
      if (x > 3) return { frames, error: '🐛 Byte moved past the last robot! Check your Repeat count.' }
    } else if (action === 'charge') {
      // Let Byte travel to the robot before showing why this block is wrong.
      frames.push({ x, y: 0, direction: 0, rescued: [...rescued] })
      return { frames, error: '🐛 Byte tried Charge Robot, but the robot is still trapped! Replace Charge Robot with Rescue Robot.' }
    } else {
      if (x < 1) return { frames, error: '🐛 Byte must move to a robot before rescuing it.' }
      if (rescued.has(x - 1)) return { frames, error: '🐛 This robot is already safe. Move to the next one.' }
      rescued.add(x - 1)
    }
    frames.push({ x, y: 0, direction: 0, rescued: [...rescued] })
  }
  return { frames, error: rescued.size === 3 ? null : `Only ${rescued.size} of 3 robots are safe. Find the missing step!` }
}

function isCorrectRobotProgram(blocks: CodeBlockItem[]): boolean {
  if (blocks.length !== 1) return false
  const loop = blocks[0]
  return loop.type === 'repeat' && loop.count === 3 &&
    loop.children.length === 2 &&
    loop.children[0].type === 'command' && loop.children[0].command === 'forward' &&
    loop.children[1].type === 'command' && loop.children[1].command === 'charge'
}

/* GAME LOGIC AND NAVIGATION */

void ForestScene // Keep the original V8 forest illustration available for future levels.

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [progress, setProgress] = useState<Progress>(loadProgress)
  const [worldIndex, setWorldIndex] = useState(0)
  const [level, setLevel] = useState(0)
  const [program, setProgram] = useState<Command[]>([])
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [showHint, setShowHint] = useState(false)

  const [riverPosition, setRiverPosition] = useState<Position>(
    { ...crossTheRiverConfig.start }
  )
  const [robotBlocks, setRobotBlocks] = useState<CodeBlockItem[]>(() => makeBrokenRescueProgram())

  // Initialize the debugging puzzle when Level 3 becomes active, including
  // after a development hot reload. Do not reset blocks while kids edit them.
  useEffect(() => {
    if (screen === 'game' && worldIndex === 1 && level === 2) {
      setRobotBlocks(previous => previous.length ? previous : makeBrokenRescueProgram())
    }
  }, [screen, worldIndex, level])

  const [riverRunning, setRiverRunning] = useState(false)
  const [hasGateKey, setHasGateKey] = useState(false)
  const [gateStage, setGateStage] = useState(0)
  const [robotStage, setRobotStage] = useState(0)
  const [streetlightStage, setStreetlightStage] = useState(0)
  const [rescueStage, setRescueStage] = useState(0)
  const [rescueFrames, setRescueFrames] = useState<RescueFrame[]>([{ ...initialRescueFrame, rescued: [] }])
  const [streetlightFrames, setStreetlightFrames] = useState<StreetlightFrame[]>([
    { x: 0, y: 0, direction: 0, lit: [] },
  ])

  const [creationName, setCreationName] = useState(
    () => localStorage.getItem('codequest-creation-name') || ''
  )
  const [skyColor, setSkyColor] = useState('#bceafa')

  useEffect(() => {
    localStorage.setItem(progressKey, JSON.stringify(progress))
  }, [progress])

  useEffect(() => {
    localStorage.setItem('codequest-creation-name', creationName)
  }, [creationName])

  const isUnlocked = (index: number) =>
    index === 0 || progress[worlds[index - 1].id] >= 3

  const startWorld = (index: number, chosenLevel?: number) => {
    if (!isUnlocked(index) || riverRunning) return

    const selectedLevel = chosenLevel ?? Math.min(progress[worlds[index].id], 2)
    setWorldIndex(index)
    setLevel(selectedLevel)
    setProgram([])
    setSuccess(false)
    setMessage('')
    setShowHint(false)
    setHasGateKey(false)
    setGateStage(0)
    setRobotStage(0)
    setStreetlightStage(0)
    setRescueStage(0)
    setRescueFrames([{ ...initialRescueFrame, rescued: [] }])
    setStreetlightFrames([{ x: 0, y: 0, direction: 0, lit: [] }])
    setRobotBlocks(worlds[index].id === 'robot' && selectedLevel === 2 ? makeBrokenRescueProgram() : [])
    setRiverPosition(
      worlds[index].id === 'forest' && selectedLevel === 1
        ? { ...fireflyConfig.start }
        : worlds[index].id === 'forest' && selectedLevel === 2
          ? { ...forestGateConfig.start }
          : { ...crossTheRiverConfig.start }
    )
    setRiverRunning(false)
    setScreen('game')
  }

  const currentWorld = worlds[worldIndex]
  const challenge = challenges[currentWorld.id][level]

  const stars = worlds.reduce(
    (sum, world) => sum + progress[world.id],
    0
  )

  const addCommand = (command: Command) => {
    if (success || riverRunning) return
    setProgram(previous => [...previous, command])
    setMessage('')
  }

 
  const runCode = async () => {
    if (success || riverRunning || (currentWorld.id === 'robot' && level <= 2 && level !== 2 ? robotBlocks.length === 0 : currentWorld.id === 'robot' && level === 2 ? false : program.length === 0)) return

    if (currentWorld.id === 'forest' && (level === 0 || level === 1)) {
      const activeConfig = level === 0 ? crossTheRiverConfig : fireflyConfig
      let position = { ...activeConfig.start }

      setRiverRunning(true)
      setRiverPosition(position)
      setMessage('Nova and Byte are following your commands! ✨')
      await new Promise<void>(resolve => setTimeout(resolve, 700))

      for (const command of program) {
        const next = moveCharacter(position, command as MovementCommand)
        const safe = activeConfig.walkable.some(point => samePosition(point, next))
        if (!safe) {
          setMessage('Oops! That move is not safe. Try another path! 🌿')
          setRiverRunning(false)
          return
        }
        position = next
        setRiverPosition(position)
        await new Promise<void>(resolve => setTimeout(resolve, 750))
      }

      if (samePosition(position, activeConfig.goal)) {
        setSuccess(true)
        setMessage(level === 0
          ? 'Amazing! You crossed the river! 🌟'
          : 'Amazing! You found the fireflies! ✨')
        setProgress(previous => ({
          ...previous,
          forest: Math.max(previous.forest, level + 1),
        }))
      } else {
        setMessage('Almost there! Add more commands to reach the goal. 💜')
      }
      setRiverRunning(false)
      return
    }

    if (currentWorld.id === 'forest' && level === 2) {
      const expected: Command[] = ['search', 'collect', 'forward', 'unlock']
      const descriptions = [
        '🔍 The golden key appeared behind the flowers!',
        '🔑 Key collected! Now approach the tree.',
        '🌳 Nova and Byte are at the magical door!',
        '🔓 The magical gate is opening!',
      ]
      setRiverRunning(true)
      setGateStage(0)
      setHasGateKey(false)
      setRiverPosition({ ...forestGateConfig.start })
      setMessage('Follow the steps to open the magical tree! ✨')
      await new Promise<void>(resolve => setTimeout(resolve, 600))

      for (let index = 0; index < program.length; index++) {
        if (program[index] !== expected[index]) {
          setMessage(index >= expected.length
            ? 'The gate is already open. Remove the extra commands! 💜'
            : `That action is out of order! ${index === 0 ? 'Try searching first.' : 'Think about what comes next.'} 💜`)
          setRiverRunning(false)
          return
        }
        const stage = index + 1
        setGateStage(stage)
        if (stage === 2) setHasGateKey(true)
        setMessage(descriptions[index])
        await new Promise<void>(resolve => setTimeout(resolve, 900))
      }

      if (program.length === expected.length) {
        setSuccess(true)
        setMessage('You opened the Forest Gate! Robot City is unlocked! 🏙️✨')
        setProgress(previous => ({ ...previous, forest: Math.max(previous.forest, 3) }))
      } else {
        setMessage('Good progress! Add the next action to finish the sequence. 💜')
      }
      setRiverRunning(false)
      return
    }

    // Robot City 1: execute a real 3-iteration loop, not three copied commands.
    if (currentWorld.id === 'robot' && level === 0) {
      setRobotStage(0)
      setRiverRunning(true)
      setMessage('Byte is checking your loop... 🤖')
      await new Promise<void>(resolve => setTimeout(resolve, 450))

      // The loop body is a separate nested program, not flat blocks.
      if (!isCorrectRobotProgram(robotBlocks)) {
        setMessage('Put Forward and Charge inside Repeat, then set it to 3 times. 💜')
        setRiverRunning(false)
        return
      }

      for (let robot = 1; robot <= 3; robot++) {
        setMessage(`🔁 Loop ${robot} of 3: Byte moves to robot ${robot}...`)
        setRobotStage(robot * 2 - 1) // Move to the next robot.
        await new Promise<void>(resolve => setTimeout(resolve, 850))
        setMessage(`⚡ Charging robot ${robot} of 3!`)
        setRobotStage(robot * 2) // Charge that robot.
        await new Promise<void>(resolve => setTimeout(resolve, 850))
      }
      setSuccess(true)
      setMessage('All three robots are charged! You used your first loop! 🌟')
      setProgress(previous => ({ ...previous, robot: Math.max(previous.robot, 1) }))
      setRiverRunning(false)
      return
    }

    // Robot City 2: execute the actual nested blocks, not one hard-coded answer.
    if (currentWorld.id === 'robot' && level === 1) {
      setStreetlightStage(0)
      setStreetlightFrames([{ x: 0, y: 0, direction: 0, lit: [] }])
      setRiverRunning(true)
      const actions = expandStreetlightProgram(robotBlocks)
      if (!actions || actions.length === 0) {
        setMessage('Add movement and lighting commands to your program.')
        setRiverRunning(false)
        return
      }
      if (countStreetlightLoops(robotBlocks) < 2) {
        setMessage('Great start! This level asks you to use two Repeat loops.')
        setRiverRunning(false)
        return
      }
      const result = runStreetlightSimulation(actions)
      setStreetlightFrames(result.frames)
      for (let index = 1; index < result.frames.length; index++) {
        setStreetlightStage(index)
        const frame = result.frames[index]
        setMessage(`Streetlights on: ${frame.lit.length} of 4`)
        await new Promise<void>(resolve => setTimeout(resolve, 480))
      }
      if (result.error) {
        setMessage(result.error)
      } else {
        setSuccess(true)
        setMessage('All four streetlights are glowing! You used two loops to solve the puzzle.')
        setProgress(previous => ({ ...previous, robot: Math.max(previous.robot, 2) }))
      }
      setRiverRunning(false)
      return
    }

    // Robot City 3: execute the real rescue program.
    if (currentWorld.id === 'robot' && level === 2) {
      setRescueStage(0)
      setRescueFrames([{ ...initialRescueFrame, rescued: [] }])
      setRiverRunning(true)
      const { actions, error: debugError } = expandRescueProgram(robotBlocks)
      if (debugError && actions.length === 0) {
        setMessage(debugError)
        setRiverRunning(false)
        return
      }
      if (actions.length === 0) {
        setMessage('Add blocks to fix Byte’s broken program!')
        setRiverRunning(false)
        return
      }
      const result = runRescueSimulation(actions)
      setRescueFrames(result.frames)
      for (let index = 1; index < result.frames.length; index++) {
        setRescueStage(index)
        setMessage(`Robots rescued: ${result.frames[index].rescued.length} of 3`)
        await new Promise<void>(resolve => setTimeout(resolve, 650))
      }
      if (result.error || debugError) {
        setMessage(result.error || debugError || '')
      } else {
        setSuccess(true)
        setMessage('🐛 Bug fixed! All three robots are safe and the factory is running! Robot City complete! 🎉')
        setProgress(previous => ({ ...previous, robot: Math.max(previous.robot, 3) }))
      }
      setRiverRunning(false)
      return
    }

    // Keep the existing sequence-checking behavior for other levels.
    const correct = JSON.stringify(program) === JSON.stringify(challenge.solution)
    if (correct) {
      setSuccess(true)
      setMessage('Amazing! Your code worked! 🌟')
      setProgress(previous => ({
        ...previous,
        [currentWorld.id]: Math.max(previous[currentWorld.id], level + 1),
      }))
    } else {
      setMessage('Not quite! Try a different order. You can do it! 💜')
    }
  }

  const nextLevel = () => {
    if (level < 2) {
      startWorld(worldIndex, level + 1)
    } else {
      setScreen('worlds')
    }
  }

  return (
    <main className="app-shell">
      <div className="sky-sun" aria-hidden="true" />
      <div className="cloud cloud-one" aria-hidden="true" />
      <div className="cloud cloud-two" aria-hidden="true" />
      <div className="cloud cloud-three" aria-hidden="true" />

      {screen === 'home' ? (
        <section className="home-screen">
          <div className="hero-backdrop" aria-hidden="true">
            {worlds.map(world => (
              <Island
                key={world.id}
                world={world}
                unlocked={true}
                decorative
              />
            ))}
          </div>

          <div className="hero-content">
            <div className="eyebrow">
              ✦ A MAGICAL CODING ADVENTURE ✦
            </div>

            <h1>
              Code<span>Quest</span>
            </h1>

            <p className="tagline">
              Imagine it. Code it. Bring it to life.
            </p>

            <p className="hero-description">
              Five magical worlds. Endless possibilities.
            </p>

            <div className="home-characters">
              <Character name="nova" />
              <Character name="byte" />
            </div>

            <div className="home-actions">
              <button
                className="primary"
                onClick={() => setScreen('worlds')}
              >
                ▶ Play Adventure <span>→</span>
              </button>

              <div className="secondary-actions">
                <button onClick={() => setScreen('creations')}>
                  🎨 My Creations
                </button>
                <button onClick={() => setScreen('progress')}>
                  ⭐ My Progress
                </button>
              </div>
            </div>
          </div>

          <div className="foreground-grass" aria-hidden="true" />
        </section>
      ) : (
        <section className="inner-screen">
          <header className="topbar">
            <button
              className="back"
              disabled={riverRunning}
              onClick={() =>
                !riverRunning && setScreen(screen === 'game' ? 'worlds' : 'home')
              }
            >
              ← {screen === 'game' ? 'World Map' : 'Home'}
            </button>

            <span className="mini-logo">
              Code<span>Quest</span>
            </span>

            <span className="topbar-right">
              ⭐ {stars}/15 stars
            </span>
          </header>

          {screen === 'worlds' && (
            <>
              <div className="page-title">
                <div className="eyebrow">
                  ✦ THE ADVENTURE BEGINS ✦
                </div>

                <h2>Choose a World</h2>

                <p>
                  Explore five floating islands. Start in the
                  Enchanted Forest!
                </p>
              </div>

              <div className="map-panel">
                <div className="world-map">
                  {worlds.map((world, index) => (
                    <Island
                      key={world.id}
                      world={world}
                      unlocked={isUnlocked(index)}
                      onSelect={() => startWorld(index)}
                    />
                  ))}
                </div>

                <div className="map-legend">
                  <span>🟢 Ready to explore</span>
                  <span>
                    🔒 Complete three levels to unlock the next world
                  </span>
                </div>
              </div>

              <div className="map-footer">
                <div className="map-friends">
                  <Character name="nova" />
                  <Character name="byte" />
                </div>

                <p>
                  <strong>Nova says:</strong> “Let's explore!
                  Tap the Enchanted Forest to begin our first
                  coding adventure.”
                </p>
              </div>
            </>
          )}

          {screen === 'game' && (
            <div className="gameplay-wrap">
              <div className="eyebrow">
                {currentWorld.icon} WORLD{' '}
                {String(worldIndex + 1).padStart(2, '0')}
                {' · '}
                {currentWorld.title.toUpperCase()}
              </div>

              <h2>{challenge.title}</h2>
              <p>{challenge.story}</p>

              <div className="level-selector">
                {challenges[currentWorld.id].map((_, index) => (
                  <button
                    key={index}
                    className={level === index ? 'active' : ''}
                    disabled={riverRunning || index > progress[currentWorld.id]}
                    onClick={() => startWorld(worldIndex, index)}
                  >
                    Level {index + 1}{' '}
                    {progress[currentWorld.id] > index ? '⭐' : ''}
                  </button>
                ))}
              </div>

              <div className="gameplay-grid">
                <div
                  className={`gameplay-scene ${currentWorld.id}`}
                >
                  {currentWorld.id === 'forest' ? (
  level === 0 ? (
    <CrossTheRiver
      position={riverPosition}
      success={success}
    />
) : level === 1 ? (
  <FindTheFireflies
    position={riverPosition}
    success={success}
  />
  ) : (
    <OpenTheForestGate stage={gateStage} hasKey={hasGateKey} success={success} />
  )
) : currentWorld.id === 'robot' && level === 0 ? (
                    <ChargeTheRobots stage={robotStage} success={success} />
                  ) : currentWorld.id === 'robot' && level === 1 ? (
                    <FixTheStreetlights frame={streetlightFrames[streetlightStage]} success={success} />
                  ) : currentWorld.id === 'robot' && level === 2 ? (
                    <RescueTheRobots frame={rescueFrames[rescueStage]} success={success} />
                  ) : (
                    <div className="gameplay-illustration">
                      <span className="world-symbol">
                        {currentWorld.icon}
                      </span>

                      <div className="gameplay-friends">
                        <Character name="nova" />
                        <Character name="byte" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="code-editor">
                  <h3>Coding Challenge</h3>
                  <p>{challenge.lesson}</p>

                  {currentWorld.id === 'robot' && level <= 2 && (
                    <div className="loop-guide">
                      <strong>Loops repeat everything inside them!</strong>
                      <span>{level === 0 ? 'Add Repeat, then put Forward and Charge inside the loop.' : level === 1 ? 'Light two lamps, turn the corner, then light two more. Use two loops!' : '🐛 Byte’s program has a bug! Press Run Code to see the error, then replace the wrong block inside Repeat 3 times.'}</span>
                    </div>
                  )}
                  {currentWorld.id === 'robot' && level === 2 && message && (
                    <div role="alert" aria-live="assertive" style={{
                      margin: '12px 0', padding: '14px 16px', borderRadius: 14,
                      background: success ? '#e2f8e9' : '#fff0f4',
                      border: `2px solid ${success ? '#81d5a0' : '#ee90b1'}`,
                      color: success ? '#286a43' : '#873957',
                      fontWeight: 800, lineHeight: 1.5,
                    }}>
                      {message}
                    </div>
                  )}
                  {currentWorld.id === 'robot' && level <= 2 ? (
                    <CodeWorkspace blocks={robotBlocks} onChange={blocks => { setRobotBlocks(blocks); if (currentWorld.id === 'robot' && level === 2) setMessage('') }} level={level === 0 ? 1 : level === 1 ? 2 : 3} disabled={riverRunning || success} />
                  ) : (
                    <>
                      <h4>Command blocks</h4>
                      <div className="command-palette">
                        {challenge.available.map(command => (
                          <button
                            key={command}
                            disabled={success || riverRunning}
                            onClick={() => addCommand(command)}
                          >
                            {labels[command]} +
                          </button>
                        ))}
                      </div>
                      <h4>Your code ({program.length} blocks)</h4>
                      <div className="program-blocks">
                        {program.length === 0 ? <span>Tap blocks above to build your code</span> : program.map((command, index) => (
                          <button key={index} disabled={success || riverRunning} title="Remove command" onClick={() => setProgram(previous => previous.filter((_, i) => i !== index))}>
                            {index + 1}. {labels[command]} ×
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="editor-buttons">
                    <button
                      disabled={riverRunning}
                      onClick={() => {
                        setRiverPosition(currentWorld.id === 'forest' && level === 1
                          ? { ...fireflyConfig.start }
                          : currentWorld.id === 'forest' && level === 2
                            ? { ...forestGateConfig.start }
                            : { ...crossTheRiverConfig.start })
                        setHasGateKey(false)
                        setGateStage(0)
                        setRobotStage(0)
                        setStreetlightStage(0)
                        setRescueStage(0)
                        setRescueFrames([{ ...initialRescueFrame, rescued: [] }])
                        setStreetlightFrames([{ x: 0, y: 0, direction: 0, lit: [] }])
                        setRobotBlocks(currentWorld.id === 'robot' && level === 2 ? makeBrokenRescueProgram() : [])
                        setProgram([])
                        setSuccess(false)
                        setMessage('')
                      }}
                    >
                      ↺ Reset
                    </button>

                    {!(currentWorld.id === 'robot' && level <= 2) && (
                      <button
                        disabled={!program.length || success || riverRunning}
                        onClick={() => setProgram(previous => previous.slice(0, -1))}
                      >
                        ↶ Undo
                      </button>
                    )}

                    <button
                      className="primary"
                      disabled={(currentWorld.id === 'robot' && level === 2 ? false : !(currentWorld.id === 'robot' && level <= 1 ? robotBlocks.length : program.length)) || success || riverRunning}
                      onClick={runCode}
                    >
                      ▶ Run Code
                    </button>
                  </div>

                  <button
                    className="hint-button"
                    onClick={() => setShowHint(value => !value)}
                  >
                    💡 {showHint ? 'Hide hint' : 'Need a hint?'}
                  </button>

                  {showHint && (
                    <p className="game-message">
                      {challenge.hint}
                    </p>
                  )}

                  {message && (
                    <p
                      role="status"
                      className={`game-message ${
                        success ? 'success' : ''
                      }`}
                    >
                      {message}
                    </p>
                  )}

                  {success && (
                    <button
                      className="primary next-level"
                      onClick={nextLevel}
                    >
                      {level === 2
                        ? '🏆 World complete! Return to map →'
                        : 'Next challenge →'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {screen === 'progress' && (
            <div className="progress-panel">
              <h2>⭐ My Progress</h2>
              <p>You've earned {stars} of 15 stars!</p>

              <div className="progress-bar">
                <div style={{ width: `${(stars / 15) * 100}%` }} />
              </div>

              {worlds.map(world => (
                <div className="progress-item" key={world.id}>
                  <span>
                    {world.icon} {world.title}
                  </span>

                  <span>
                    {'⭐'.repeat(progress[world.id])}
                    {'☆'.repeat(3 - progress[world.id])}
                  </span>
                </div>
              ))}

              <button
                className="primary"
                onClick={() => setScreen('worlds')}
              >
                Keep Exploring →
              </button>
            </div>
          )}

          {screen === 'creations' && (
            <div className="creation-panel">
              <h2>🎨 My Creations</h2>

              <p>
                Name a magical scene and choose its sky color.
              </p>

              <div
                className="creation-preview"
                style={{ background: skyColor }}
              >
                <Character name="nova" />
                <Character name="byte" />
              </div>

              <label>
                Creation name
                <input
                  value={creationName}
                  maxLength={60}
                  onChange={event =>
                    setCreationName(event.target.value)
                  }
                  placeholder="My magical world"
                />
              </label>

              <label>
                Sky color
                <input
                  type="color"
                  value={skyColor}
                  onChange={event =>
                    setSkyColor(event.target.value)
                  }
                />
              </label>

              <p>Your creation name is saved on this device.</p>

              <button
                className="primary"
                onClick={() => setScreen('worlds')}
              >
                Explore the Worlds →
              </button>
            </div>
          )}
        </section>
      )}
    </main>
  )
}

export default App
