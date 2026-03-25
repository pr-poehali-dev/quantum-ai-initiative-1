import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export function DiceGame() {
  const [bet, setBet] = useState("100")
  const [target, setTarget] = useState(50)
  const [mode, setMode] = useState<"under" | "over">("under")
  const [result, setResult] = useState<number | null>(null)
  const [won, setWon] = useState<boolean | null>(null)
  const [balance, setBalance] = useState(1000)
  const [rolling, setRolling] = useState(false)

  const chance = mode === "under" ? target : 100 - target
  const multiplier = parseFloat(((97 / chance) * 0.97).toFixed(4))

  const roll = async () => {
    const amount = parseFloat(bet)
    if (!amount || amount > balance || rolling) return
    setRolling(true)
    setResult(null)
    setWon(null)
    setBalance(b => b - amount)

    await new Promise(r => setTimeout(r, 600))
    const rolled = parseFloat((Math.random() * 100).toFixed(2))
    const win = mode === "under" ? rolled < target : rolled > target
    setResult(rolled)
    setWon(win)
    if (win) setBalance(b => b + amount * multiplier)
    setRolling(false)
  }

  const resultColor = won === null ? "text-white" : won ? "text-green-400" : "text-red-400"

  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-700 overflow-hidden">
      <div className="p-4 border-b border-zinc-700 flex items-center justify-between">
        <h3 className="text-white font-bold font-orbitron">🎲 Кости</h3>
        <span className="text-gray-400 font-mono text-sm">{balance.toLocaleString("ru-RU")} ₽</span>
      </div>

      <div className="p-4">
        {/* Результат */}
        <div className="text-center my-6">
          <div className={`text-7xl font-bold font-mono transition-all duration-300 ${resultColor} ${rolling ? "animate-pulse" : ""}`}>
            {rolling ? "..." : result !== null ? result.toFixed(2) : "—"}
          </div>
          {won !== null && !rolling && (
            <p className={`font-bold text-lg mt-2 ${won ? "text-green-400" : "text-red-400"}`}>
              {won ? `+${(parseFloat(bet) * multiplier).toFixed(0)} ₽ 🎉` : "Не повезло 😞"}
            </p>
          )}
        </div>

        {/* Слайдер */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>0</span>
            <span className="text-white font-bold">{target}</span>
            <span>100</span>
          </div>
          <Slider
            value={[target]}
            onValueChange={v => setTarget(v[0])}
            min={5} max={95} step={1}
            className="mb-3"
          />
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="bg-zinc-800 rounded-lg p-2">
              <p className="text-gray-400 text-xs">Шанс</p>
              <p className="text-white font-bold">{chance}%</p>
            </div>
            <div className="bg-zinc-800 rounded-lg p-2">
              <p className="text-gray-400 text-xs">Множитель</p>
              <p className="text-yellow-400 font-bold">{multiplier}x</p>
            </div>
            <div className="bg-zinc-800 rounded-lg p-2">
              <p className="text-gray-400 text-xs">Выплата</p>
              <p className="text-green-400 font-bold">{(parseFloat(bet) * multiplier || 0).toFixed(0)} ₽</p>
            </div>
          </div>
        </div>

        {/* Режим */}
        <div className="flex gap-2 mb-4">
          {(["under", "over"] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === m ? "bg-red-500 text-white" : "bg-zinc-700 text-gray-300 hover:bg-zinc-600"}`}
            >
              {m === "under" ? `< ${target}` : `> ${target}`}
            </button>
          ))}
        </div>

        {/* Ставка */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Input value={bet} onChange={e => setBet(e.target.value)} className="bg-zinc-800 border-zinc-700 text-white" placeholder="Ставка ₽" />
          </div>
          <Button onClick={roll} disabled={rolling} className="bg-red-500 hover:bg-red-600 text-white font-bold px-6">
            {rolling ? "Бросок..." : "Бросить"}
          </Button>
        </div>
      </div>
    </div>
  )
}
