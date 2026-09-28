import type { Color, Move, PieceSymbol, Square } from 'chess.js'

export type { Color, Move, PieceSymbol, Square }

/** Pieces a player can promote a pawn to. */
export type PromotionPiece = Extract<PieceSymbol, 'q' | 'r' | 'b' | 'n'>

export interface MoveInput {
  from: Square
  to: Square
  /** Required only when the move is a promotion. Defaults to queen. */
  promotion?: PromotionPiece
}

export type DrawReason =
  | 'stalemate'
  | 'insufficient-material'
  | 'threefold-repetition'
  | 'fifty-move-rule'

export type GameResult =
  | { kind: 'in-progress' }
  | { kind: 'checkmate'; winner: Color }
  | { kind: 'draw'; reason: DrawReason }

export interface GameStatus {
  turn: Color
  isCheck: boolean
  isGameOver: boolean
  result: GameResult
}

/** Pieces each side has captured (i.e. the opponent's pieces off the board). */
export interface CapturedPieces {
  w: PieceSymbol[]
  b: PieceSymbol[]
}
