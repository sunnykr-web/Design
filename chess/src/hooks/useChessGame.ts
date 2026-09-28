import { Chess, DEFAULT_POSITION } from 'chess.js'
import { useCallback, useMemo, useRef, useState } from 'react'
import { deriveCaptured, deriveStatus, materialBalance } from '../lib/chess/derive'
import type { Move, MoveInput, Square } from '../lib/chess/types'

interface Snapshot {
  fen: string
  history: Move[]
}

function snapshot(game: Chess): Snapshot {
  return { fen: game.fen(), history: game.history({ verbose: true }) }
}

/**
 * Wraps a single chess.js instance. chess.js is the source of truth for rules;
 * React state holds an immutable snapshot (FEN + verbose history) that is
 * refreshed after every mutation so components re-render.
 */
export function useChessGame(initialFen: string = DEFAULT_POSITION) {
  const gameRef = useRef<Chess>(null)
  if (gameRef.current === null) gameRef.current = new Chess(initialFen)
  const game = gameRef.current

  const [state, setState] = useState<Snapshot>(() => snapshot(game))
  const sync = useCallback(() => setState(snapshot(game)), [game])

  /** Attempts a move. Returns the move on success, or null if it is illegal. */
  const move = useCallback(
    (input: MoveInput): Move | null => {
      try {
        const result = game.move({
          from: input.from,
          to: input.to,
          promotion: input.promotion ?? 'q',
        })
        sync()
        return result
      } catch {
        // chess.js throws on illegal moves.
        return null
      }
    },
    [game, sync],
  )

  const undo = useCallback((): Move | null => {
    const undone = game.undo()
    if (undone) sync()
    return undone
  }, [game, sync])

  const reset = useCallback(
    (fen: string = initialFen) => {
      game.load(fen)
      sync()
    },
    [game, sync, initialFen],
  )

  /** All legal moves for the piece on `square` (empty if none / not its turn). */
  const getLegalMoves = useCallback(
    (square: Square): Move[] => game.moves({ square, verbose: true }),
    // state.fen: legal moves change whenever the position does.
    [game, state.fen],
  )

  /** True if moving from → to is a legal pawn promotion (UI should ask for a piece). */
  const isPromotion = useCallback(
    (from: Square, to: Square): boolean =>
      getLegalMoves(from).some((m) => m.to === to && m.promotion !== undefined),
    [getLegalMoves],
  )

  const derived = useMemo(() => {
    const captured = deriveCaptured(state.history)
    return {
      board: game.board(),
      status: deriveStatus(game),
      captured,
      materialBalance: materialBalance(captured),
      lastMove: state.history.at(-1) ?? null,
      /** Square of the king currently in check, for highlighting. */
      checkedKingSquare: game.isCheck() ? findKing(game, game.turn()) : null,
    }
    // Derived purely from the position the snapshot describes.
  }, [game, state])

  return {
    fen: state.fen,
    history: state.history,
    ...derived,
    canUndo: state.history.length > 0,
    move,
    undo,
    reset,
    getLegalMoves,
    isPromotion,
  }
}

export type ChessGame = ReturnType<typeof useChessGame>

function findKing(game: Chess, color: 'w' | 'b'): Square | null {
  for (const row of game.board()) {
    for (const cell of row) {
      if (cell?.type === 'k' && cell.color === color) return cell.square
    }
  }
  return null
}
