import type { WorldId } from './types'

export type Progress = Record<WorldId, number>

export const emptyProgress: Progress = {

  forest: 0,

  robot: 0,

  mystery: 0,

  space: 0,

  studio: 0,

}

export const progressKey = 'codequest-v8-gameplay-progress'

export function loadProgress(): Progress {

  try {

    const saved = JSON.parse(localStorage.getItem(progressKey) || '{}')

    return { ...emptyProgress, ...saved }

  } catch {

    return { ...emptyProgress }

  }

}
