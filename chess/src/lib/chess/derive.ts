import type { Chess } from 'chess.js'
import type { CapturedPieces, GameStatus, Move, PieceSymbol } from './types'

/** Material values, used to sort captured pieces (highest first). */
export const PIECE_VALUE: Record<PieceSymbol, number> = {
  q: 9,
  r: 5,
  b: 3,
  n: 3,
  p: 1,
  k: 0,
}

export function deriveStatus(game: Chess): GameStatus {
  const turn = game.turn()
  const isCheck = game.isCheck()

  // Order matters: chess.js counts stalemate as a draw too, so check the
  // specific conditions before the generic isDraw().
  let result: GameStatus['result'] = { kind: 'in-progress' }
  if (game.isCheckmate()) {
    result = { kind: 'checkmate', winner: turn === 'w' ? 'b' : 'w' }
  } else if (game.isStalemate()) {
    result = { kind: 'draw', reason: 'stalemate' }
  } else if (game.isInsufficientMaterial()) {
    result = { kind: 'draw', reason: 'insufficient-material' }
  } else if (game.isThreefoldRepetition()) {
    result = { kind: 'draw', reason: 'threefold-repetition' }
  } else if (game.isDrawByFiftyMoves()) {
    result = { kind: 'draw', reason: 'fifty-move-rule' }
  }

  return { turn, isCheck, isGameOver: result.kind !== 'in-progress', result }
}

/** Groups captures by the side that made them, highest value first. */
export function deriveCaptured(history: readonly Move[]): CapturedPieces {
  const captured: CapturedPieces = { w: [], b: [] }
  for (const move of history) {
    if (move.captured) captured[move.color].push(move.captured)
  }
  const byValue = (a: PieceSymbol, b: PieceSymbol) => PIECE_VALUE[b] - PIECE_VALUE[a]
  captured.w.sort(byValue)
  captured.b.sort(byValue)
  return captured
}

/** Material lead for white (positive) or black (negative), from captures. */
export function materialBalance(captured: CapturedPieces): number {
  const sum = (pieces: PieceSymbol[]) => pieces.reduce((n, p) => n + PIECE_VALUE[p], 0)
  return sum(captured.w) - sum(captured.b)
}
