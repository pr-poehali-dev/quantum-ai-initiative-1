import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Cell = "hidden" | "gem" | "mine" | "revealed"

const GRID = 25

function generateMines(count: number, exclude: number): Set<number> {
  const mines = new Set<number>()
  while (mines.size < count) {
    const idx = Math.floor(Math.random() * GRID)
    if (idx !== exclude) mines.add(idx)
  }
  return mines
}

function calcMultiplier(revealed: number, mines: number): number {
  let mult = 1
  for (let i = 0; i < revealed; i++) {
    mult *= (GRID - mines - i) / (GRID - i)
  }
  return parseFloat((0.97 / mult).toFixed(2))
}

export function MinesGame() {
  const [bet, setBet] = useState("100")
  const [minesCount, setMinesCount] = useState(3)
  const [cells, setCells] = useState<Cell[]>(Array(GRID).fill("hidden"))
  const [mines, setMines] = useState<Set<number>>(new Set())
  const [revealed, setRevealed] = useState(0)
  const [phase, setPhase] = useState<"idle" | "playing" | "won" | "lost">("idle")
  const [balance, setBalance] = useState(1000)

  const multiplier = revealed > 0 ? calcMultiplier(revealed, minesCount) : 1

  const startGame = () => {
    const amount = parseFloat(bet)
    if (!amount || amount > balance) return
    setBalance(b => b - amount)
    setCells(Array(GRID).fill("hidden"))
    setMines(new Set())
    setRevealed(0)
    setPhase("playing")
  }

  const revealCell = useCallback((idx: number) => {
    if (phase !== "playing" || cells[idx] !== "hidden") return

    let currentMines = mines
    if (mines.size === 0) {
      currentMines = generateMines(minesCount, idx)
      setMines(currentMines)
    }

    if (currentMines.has(idx)) {
      const newCells = cells.map((c, i) => {
        if (i === idx) return "mine"
        if (currentMines.has(i)) return "mine"
        return c === "revealed" ? "gem" : c
      }) as Cell[]
      setCells(newCells)
      setPhase("lost")
    } else {
      const newCells = [...cells]
      newCells[idx] = "revealed"
      setCells(newCells)
      setRevealed(r => r + 1)
    }
  }, [phase, cells, mines, minesCount])

  const cashOut = () => {
    if (phase !== "playing" || revealed === 0) return
    const win = parseFloat(bet) * multiplier
    setBalance(b => b + win)
    const newCells = cells.map((c, i) =>
      mines.has(i) ? "mine" : c === "revealed" ? "gem" : c
    ) as Cell[]
    setCells(newCells)
    setPhase("won")
  }

  const reset = () => {
    setCells(Array(GRID).fill("hidden"))
    setMines(new Set())
    setRevealed(0)
    setPhase("idle")
  }

  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-700 overflow-hidden">
      <div className="p-4 border-b border-zinc-700 flex items-center justify-between">
        <h3 className="text-white font-bold font-orbitron">💣 Мины</h3>
        <div className="flex items-center gap-2 text-sm">
          {phase === "playing" && revealed > 0 && (
            <span className="text-green-400 font-mono font-bold">{multiplier}x</span>
          )}
          <span className="text-gray-400 font-mono">{balance.toLocaleString("ru-RU")} ₽</span>
        </div>
      </div>

      <div className="p-4">
        {/* Сетка */}
        <div className="grid grid-cols-5 gap-2 mb-4" style={{ maxWidth: 320, margin: "0 auto 16px" }}>
          {cells.map((cell, i) => (
            <button
              key={i}
              onClick={() => revealCell(i)}
              disabled={phase !== "playing" || cell !== "hidden"}
              className={`aspect-square rounded-xl text-xl font-bold transition-all duration-200 flex items-center justify-center border ${
                cell === "hidden"
                  ? "bg-zinc-700 hover:bg-zinc-600 border-zinc-600 hover:border-red-500/50 cursor-pointer hover:scale-105"
                  : cell === "revealed"
                  ? "bg-green-500/20 border-green-500/50 scale-105"
                  : cell === "gem"
                  ? "bg-green-500/20 border-green-500/50"
                  : "bg-red-500/20 border-red-500/50 animate-pulse"
              }`}
            >
              {cell === "revealed" && "💎"}
              {cell === "gem" && "💎"}
              {cell === "mine" && "💥"}
            </button>
          ))}
        </div>

        {/* Статус */}
        {phase === "won" && (
          <div className="text-center mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
            <p className="text-green-400 font-bold text-lg">Выигрыш! +{(parseFloat(bet) * multiplier).toFixed(0)} ₽</p>
          </div>
        )}
        {phase === "lost" && (
          <div className="text-center mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
            <p className="text-red-400 font-bold text-lg">💥 Вы попали на мину!</p>
          </div>
        )}

        {/* Контролы */}
        {phase === "idle" || phase === "won" || phase === "lost" ? (
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="text-gray-400 text-xs mb-1 block">Ставка (₽)</label>
              <Input value={bet} onChange={e => setBet(e.target.value)} className="bg-zinc-800 border-zinc-700 text-white" />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Мин: {minesCount}</label>
              <div className="flex gap-1">
                {[1, 3, 5, 10].map(v => (
                  <button
                    key={v}
                    onClick={() => setMinesCount(v)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${minesCount === v ? "bg-red-500 text-white" : "bg-zinc-700 text-gray-300 hover:bg-zinc-600"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={phase === "idle" ? startGame : reset} className="bg-red-500 hover:bg-red-600 text-white font-bold">
              {phase === "idle" ? "Играть" : "Заново"}
            </Button>
          </div>
        ) : (
          <div className="flex gap-3">
            <div className="flex-1 text-center">
              <p className="text-gray-400 text-xs">Открыто: {revealed} | Множитель: {multiplier}x</p>
              <p className="text-green-400 font-bold">Потенциал: {(parseFloat(bet) * multiplier).toFixed(0)} ₽</p>
            </div>
            <Button onClick={cashOut} disabled={revealed === 0} className="bg-green-500 hover:bg-green-600 text-white font-bold px-6">
              Забрать
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
