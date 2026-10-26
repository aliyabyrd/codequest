
import type {
  Position,
  MovementCommand,
  LevelConfig,
  GameResult,
} from './types'

export function samePosition(
  a: Position,
  b: Position
): boolean {
  return a.x === b.x && a.y === b.y
}

export function moveCharacter(
  position: Position,
  command: MovementCommand
): Position {
  switch (command) {
    case 'forward':
      return {
        x: position.x + 1,
        y: position.y,
      }

    case 'up':
      return {
        x: position.x,
        y: position.y - 1,
      }

    case 'down':
      return {
        x: position.x,
        y: position.y + 1,
      }
  }
}

export function runMovement(
  level: LevelConfig,
  commands: MovementCommand[]
): GameResult {
  let position = { ...level.start }

  for (const command of commands) {
    const next = moveCharacter(position, command)

    const safe = level.walkable.some(point =>
      samePosition(point, next)
    )

    if (!safe) {
      return {
        position,
        success: false,
        blocked: true,
      }
    }

    position = next
  }

  return {
    position,
    success: samePosition(position, level.goal),
    blocked: false,
  }
}
