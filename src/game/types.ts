
export type Position = {
  x: number
  y: number
}

export type MovementCommand = 'forward' | 'up' | 'down'

export type LevelConfig = {
  id: string
  title: string
  start: Position
  goal: Position
  walkable: Position[]
}

export type GameResult = {
  position: Position
  success: boolean
  blocked: boolean
}
export type WorldId =
  | 'forest'
  | 'robot'
  | 'mystery'
  | 'space'
  | 'studio'

export type Command =
  | 'forward'
  | 'up'
  | 'down'
  | 'repeat'
  | 'if'
  | 'else'
  | 'collect'
  | 'launch'
  | 'paint'

export type World = {
  id: WorldId
  title: string
  lesson: string
  icon: string
  place: string
}

export type Challenge = {
  title: string
  story: string
  lesson: string
  available: Command[]
  solution: Command[]
  hint: string
}