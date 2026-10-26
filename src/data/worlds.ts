
export type WorldId =
  | 'forest'
  | 'robot'
  | 'mystery'
  | 'space'
  | 'studio'

export type World = {
  id: WorldId
  title: string
  lesson: string
  icon: string
  place: string
}

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
