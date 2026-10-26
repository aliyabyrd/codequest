
import { useState } from 'react'
import type { DragEvent } from 'react'
import './CodeWorkspace.css'

export type CodeCommand = 'forward' | 'charge' | 'left' | 'right' | 'light' | 'rescue'

export type CodeBlockItem =
  | {
      id: string
      type: 'command'
      command: CodeCommand
    }
  | {
      id: string
      type: 'repeat'
      count: number
      children: CodeBlockItem[]
    }

type Props = {
  blocks: CodeBlockItem[]
  onChange: (blocks: CodeBlockItem[]) => void
  level?: 1 | 2 | 3
  disabled?: boolean
}

const commands: {
  command: CodeCommand
  label: string
  icon: string
}[] = [
  { command: 'forward', label: 'Move Forward', icon: '→' },
  { command: 'charge', label: 'Charge Robot', icon: '＋' },
  { command: 'left', label: 'Turn Left', icon: '↶' },
  { command: 'right', label: 'Turn Right', icon: '↷' },
  { command: 'light', label: 'Light Up', icon: '✦' },
  { command: 'rescue', label: 'Rescue Robot', icon: '♥' },
]

function makeId() {
  return Math.random().toString(36).slice(2, 11)
}

function makeCommand(command: CodeCommand): CodeBlockItem {
  return {
    id: makeId(),
    type: 'command',
    command,
  }
}

function makeRepeat(count = 3): CodeBlockItem {
  return {
    id: makeId(),
    type: 'repeat',
    count,
    children: [],
  }
}

function removeBlock(
  blocks: CodeBlockItem[],
  id: string
): CodeBlockItem[] {
  return blocks
    .filter(block => block.id !== id)
    .map(block =>
      block.type === 'repeat'
        ? {
            ...block,
            children: removeBlock(block.children, id),
          }
        : block
    )
}

function findBlock(
  blocks: CodeBlockItem[],
  id: string
): CodeBlockItem | undefined {
  for (const block of blocks) {
    if (block.id === id) return block

    if (block.type === 'repeat') {
      const found = findBlock(block.children, id)
      if (found) return found
    }
  }

  return undefined
}

function insertBlock(
  blocks: CodeBlockItem[],
  parentId: string | null,
  newBlock: CodeBlockItem,
  beforeId?: string
): CodeBlockItem[] {
  if (parentId === null) {
    const index = beforeId
      ? blocks.findIndex(block => block.id === beforeId)
      : -1

    if (index >= 0) {
      const next = [...blocks]
      next.splice(index, 0, newBlock)
      return next
    }

    return [...blocks, newBlock]
  }

  return blocks.map(block => {
    if (block.type !== 'repeat') return block

    if (block.id === parentId) {
      const children = [...block.children]

      const index = beforeId
        ? children.findIndex(child => child.id === beforeId)
        : -1

      if (index >= 0) {
        children.splice(index, 0, newBlock)
      } else {
        children.push(newBlock)
      }

      return { ...block, children }
    }

    return {
      ...block,
      children: insertBlock(
        block.children,
        parentId,
        newBlock,
        beforeId
      ),
    }
  })
}

function containsBlock(
  block: CodeBlockItem,
  id: string
): boolean {
  if (block.id === id) return true

  if (block.type === 'repeat') {
    return block.children.some(child =>
      containsBlock(child, id)
    )
  }

  return false
}

export default function CodeWorkspace({
  blocks,
  onChange,
  level = 1,
  disabled = false,
}: Props) {
  const [dragging, setDragging] = useState(false)

  function beginPaletteDrag(
    event: DragEvent<HTMLElement>,
    type: string
  ) {
    if (disabled) { event.preventDefault(); return }
    event.dataTransfer.setData(
      'application/codequest',
      JSON.stringify({
        source: 'palette',
        type,
      })
    )

    event.dataTransfer.effectAllowed = 'copy'
    setDragging(true)
  }

  function beginBlockDrag(
    event: DragEvent<HTMLElement>,
    id: string
  ) {
    event.stopPropagation()

    if (disabled) { event.preventDefault(); return }
    event.dataTransfer.setData(
      'application/codequest',
      JSON.stringify({
        source: 'workspace',
        id,
      })
    )

    event.dataTransfer.effectAllowed = 'move'
    setDragging(true)
  }

  function handleDrop(
    event: DragEvent<HTMLElement>,
    parentId: string | null,
    beforeId?: string
  ) {
    event.preventDefault()
    event.stopPropagation()
    if (disabled) return
    setDragging(false)

    const raw = event.dataTransfer.getData(
      'application/codequest'
    )

    if (!raw) return

    let data: {
      source: string
      type?: string
      id?: string
    }

    try {
      data = JSON.parse(raw)
    } catch {
      return
    }

    let newBlock: CodeBlockItem
    let remaining = blocks

    if (data.source === 'palette') {
      if (data.type === 'repeat') {
        newBlock = makeRepeat(level === 2 ? 2 : 3)
      } else if (
        data.type === 'forward' ||
        data.type === 'charge' ||
        data.type === 'left' ||
        data.type === 'right' ||
        data.type === 'light' ||
        data.type === 'rescue'
      ) {
        newBlock = makeCommand(data.type)
      } else {
        return
      }
    } else if (
      data.source === 'workspace' &&
      data.id
    ) {
      const existing = findBlock(blocks, data.id)

      if (!existing) return

      if (
        parentId &&
        containsBlock(existing, parentId)
      ) {
        return
      }

      if (beforeId === existing.id) return

      newBlock = existing
      remaining = removeBlock(blocks, existing.id)
    } else {
      return
    }

    onChange(
      insertBlock(
        remaining,
        parentId,
        newBlock,
        beforeId
      )
    )
  }

  function allowDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault()
    event.stopPropagation()
  }

  function changeCount(id: string, count: number) {
    function update(items: CodeBlockItem[]): CodeBlockItem[] {
      return items.map(block => {
        if (block.type !== 'repeat') return block

        return {
          ...block,
          count: block.id === id ? count : block.count,
          children: update(block.children),
        }
      })
    }

    if (!disabled) onChange(update(blocks))
  }

  function renderBlock(block: CodeBlockItem) {
    if (block.type === 'command') {
      const info = commands.find(
        item => item.command === block.command
      )!

      return (
        <div
          key={block.id}
          className={`cq-code-block cq-${block.command}`}
          draggable
          onDragStart={event =>
            beginBlockDrag(event, block.id)
          }
          onDragEnd={() => setDragging(false)}
          onDragOver={allowDrop}
          onDrop={event =>
            handleDrop(event, null, block.id)
          }
        >
          <span className="cq-block-icon">
            {info.icon}
          </span>

          <span>{info.label}</span>

          <button
            type="button"
            className="cq-remove"
            aria-label={`Remove ${info.label}`}
            disabled={disabled}
            onClick={() =>
              onChange(removeBlock(blocks, block.id))
            }
          >
            ×
          </button>
        </div>
      )
    }

    return (
      <div
        key={block.id}
        className="cq-repeat-block"
        draggable
        onDragStart={event =>
          beginBlockDrag(event, block.id)
        }
        onDragEnd={() => setDragging(false)}
      >
        <div className="cq-repeat-header">
          <span className="cq-repeat-icon">↻</span>
          <span>Repeat</span>

          <select
            aria-label="Number of repetitions"
            value={block.count}
            disabled={disabled}
            onChange={event =>
              changeCount(
                block.id,
                Number(event.target.value)
              )
            }
            onMouseDown={event => event.stopPropagation()}
          >
            {[1, 2, 3, 4, 5].map(number => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>

          <span>times</span>

          <button
            type="button"
            className="cq-remove cq-repeat-remove"
            disabled={disabled}
            aria-label="Remove Repeat block"
            onClick={() =>
              onChange(removeBlock(blocks, block.id))
            }
          >
            ×
          </button>
        </div>

        <div className="cq-repeat-body">
          <div
            className="cq-repeat-contents"
            onDragOver={allowDrop}
            onDrop={event =>
              handleDrop(event, block.id)
            }
          >
            {block.children.length === 0 ? (
              <div className="cq-drop-hint">
                Drop blocks here
              </div>
            ) : (
              block.children.map(child => (
                <div
                  key={child.id}
                  onDragOver={allowDrop}
                  onDrop={event => {
                    event.stopPropagation()
                    handleDrop(
                      event,
                      block.id,
                      child.id
                    )
                  }}
                >
                  {renderBlock(child)}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="cq-repeat-bottom" />
      </div>
    )
  }

  return (
    <div className="cq-workspace">
      <div className="cq-workspace-heading">
        <div>
          <span className="cq-eyebrow">
            CODEQUEST
          </span>
          <h3>My Code</h3>
        </div>

        <span className="cq-block-count">
          {blocks.length} blocks
        </span>
      </div>

      <p className="cq-instructions">
        {level === 3 ? 'A bug is hiding in Byte’s code! Run it, then fix the wrong block.' : 'Drag blocks into your program to help Byte!'}
      </p>

      <div className="cq-palette">
        <div className="cq-section-label">
          YOUR BLOCKS
        </div>

        <div className="cq-palette-items">
          {commands.filter(item => level === 1
            ? ['forward', 'charge'].includes(item.command)
            : level === 2
              ? ['forward', 'left', 'right', 'light'].includes(item.command)
              : ['forward', 'charge', 'rescue'].includes(item.command)
          ).map(item => (
            <div key={item.command} className={`cq-code-block cq-${item.command}`}
              draggable={!disabled}
              onDragStart={event => beginPaletteDrag(event, item.command)}
              onDragEnd={() => setDragging(false)}>
              <span>{item.icon}</span> {item.label}
            </div>
          ))}
          <div className="cq-code-block cq-repeat-palette"
            draggable={!disabled}
            onDragStart={event => beginPaletteDrag(event, 'repeat')}
            onDragEnd={() => setDragging(false)}>
            <span>↻</span> Repeat
          </div>
        </div>
      </div>

      <div className="cq-program-section">
        <div className="cq-section-label">
          YOUR PROGRAM
        </div>

        <div
          className={`cq-program-area ${
            dragging ? 'cq-dragging' : ''
          }`}
          onDragOver={allowDrop}
          onDrop={event => handleDrop(event, null)}
        >
          {blocks.length === 0 ? (
            <div className="cq-empty-state">
              <div className="cq-empty-icon">▦</div>
              <strong>Start building!</strong>
              <span>
                Drag your first block here.
              </span>
            </div>
          ) : (
            blocks.map(renderBlock)
          )}
        </div>
      </div>

      <button
        type="button"
        className="cq-clear-button"
        onClick={() => onChange([])}
        disabled={disabled || blocks.length === 0}
      >
        Clear Program
      </button>
    </div>
  )
}
