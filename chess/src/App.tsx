import { useState, type FormEvent } from 'react'
import { useChessGame } from './hooks/useChessGame'
import type { Square } from './lib/chess/types'

/**
 * Step 1 harness: exercises useChessGame with a plain text input so the state
 * layer can be verified before the board exists. Replaced in Step 2.
 */
export default function App() {
  const game = useChessGame()
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  function submit(e: FormEvent) {
    e.preventDefault()
    // Accepts coordinate moves like "e2e4" or "e7e8n".
    const match = /^([a-h][1-8])([a-h][1-8])([qrbn])?$/.exec(input.trim().toLowerCase())
    if (!match) return setError('Use coordinate notation, e.g. e2e4')
    const [, from, to, promotion] = match
    const result = game.move({
      from: from as Square,
      to: to as Square,
      promotion: promotion as 'q' | 'r' | 'b' | 'n' | undefined,
    })
    setError(result ? null : `Illegal move: ${input}`)
    if (result) setInput('')
  }

  const { status } = game

  return (
    <main className="mx-auto max-w-xl space-y-4 p-6 font-mono text-sm">
      <h1 className="text-lg font-bold">useChessGame — state harness</h1>

      <dl className="grid grid-cols-[8rem_1fr] gap-1">
        <dt>FEN</dt>
        <dd className="break-all">{game.fen}</dd>
        <dt>Turn</dt>
        <dd>{status.turn === 'w' ? 'White' : 'Black'} to move</dd>
        <dt>Status</dt>
        <dd>
          {status.result.kind === 'checkmate' && `Checkmate — ${status.result.winner === 'w' ? 'White' : 'Black'} wins`}
          {status.result.kind === 'draw' && `Draw (${status.result.reason})`}
          {status.result.kind === 'in-progress' && (status.isCheck ? 'Check' : 'In progress')}
        </dd>
        <dt>Captured</dt>
        <dd>
          W: {game.captured.w.join(' ') || '—'} · B: {game.captured.b.join(' ') || '—'} (balance{' '}
          {game.materialBalance})
        </dd>
        <dt>History</dt>
        <dd>{game.history.map((m) => m.san).join(' ') || '—'}</dd>
      </dl>

      <form onSubmit={submit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e2e4"
          className="flex-1 border px-2 py-1"
          disabled={status.isGameOver}
        />
        <button className="border px-3">Move</button>
        <button type="button" className="border px-3" onClick={game.undo} disabled={!game.canUndo}>
          Undo
        </button>
        <button type="button" className="border px-3" onClick={() => game.reset()}>
          Reset
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
    </main>
  )
}
