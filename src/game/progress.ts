import type { World, Command, WorldId, Challenge } from '../game/types'

export const worlds: World[] = [

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

export const labels: Record<Command, string> = {

  forward: '➡️ Forward',

  up: '⬆️ Up',

  down: '⬇️ Down',

  repeat: '🔁 Repeat',

  if: '❔ If',

  else: '↪️ Else',

  collect: '⭐ Collect',

  launch: '🚀 Launch',

  paint: '🎨 Paint',

}

export const challenges: Record<WorldId, Challenge[]> = {

  forest: [

    {

      title: 'Cross the River',

      story: 'Help Nova cross the magical river!',

      lesson: 'Arrange movement commands in the correct order.',

      available: ['forward', 'up', 'down'],

      solution: ['forward', 'up', 'forward'],

      hint: 'Move forward, jump up, then move forward again.',

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

      story: 'Unlock the gate with a movement pattern.',

      lesson: 'Debug a longer sequence.',

      available: ['forward', 'up', 'down'],

      solution: ['forward', 'up', 'down', 'forward', 'up'],

      hint: 'Forward, up, down, forward, up.',

    },

  ],

  robot: [

    {

      title: 'Charge the Robots',

      story: 'Help Byte visit the charging stations.',

      lesson: 'Repeat represents a repeated action.',

      available: ['repeat', 'forward'],

      solution: ['repeat', 'forward'],

      hint: 'Repeat, then forward.',

    },

    {

      title: 'Fix the Streetlights',

      story: 'Light up Robot City.',

      lesson: 'Combine movement and repetition.',

      available: ['repeat', 'forward', 'up'],

      solution: ['up', 'repeat', 'forward'],

      hint: 'Up, repeat, forward.',

    },

    {

      title: 'Power the City',

      story: 'Finish the repair sequence.',

      lesson: 'Practice ordering reusable actions.',

      available: ['repeat', 'forward', 'up'],

      solution: ['repeat', 'forward', 'up', 'repeat'],

      hint: 'Repeat, forward, up, repeat.',

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
