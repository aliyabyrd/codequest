import type { Command } from './types'

export type ForestPosition = { x: number; y: number }
export type ForestPuzzle = { start: ForestPosition; goal: ForestPosition; path: ForestPosition[] }
export const forestPuzzles: ForestPuzzle[] = [
  { start: { x: 0, y: 2 }, goal: { x: 2, y: 1 }, path: [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 1 }] },
  { start: { x: 0, y: 2 }, goal: { x: 2, y: 2 }, path: [{ x: 0, y: 2 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }] },
  { start: { x: 0, y: 2 }, goal: { x: 3, y: 1 }, path: [{ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }] },
]
export const forestPointEqual = (a: ForestPosition, b: ForestPosition) => a.x === b.x && a.y === b.y
export function forestMove(p: ForestPosition, command: Command): ForestPosition {
  if (command === 'forward') return { x: p.x + 1, y: p.y }
  if (command === 'up') return { x: p.x, y: p.y - 1 }
  if (command === 'down') return { x: p.x, y: p.y + 1 }
  return p
}
