export type Screen = 'home' | 'worlds' | 'game' | 'progress' | 'creations'

export type WorldId = 'forest' | 'robot' | 'mystery' | 'space' | 'studio'

export type Command =

  | 'forward' | 'up' | 'down' | 'repeat' | 'if'

  | 'else' | 'collect' | 'launch' | 'paint'

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
