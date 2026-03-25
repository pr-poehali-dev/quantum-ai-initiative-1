import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Phase = "waiting" | "running" | "crashed"

export function CrashGame() {
  const [phase, setPhase] = useState<Phase>("waiting")
  const [multiplier, setMultiplier] = useState(1.0)
  const [bet, setBet] = useState("100")
  const [cashedOut, setCashedOut] = useState(false)
  const [lastCrash, setLastCrash] = useState<number | null>(null)
  const [winAmount, setWinAmount] = useState(0)
  const [history, setHistory] = useState<number[]>([4.2, 1.1, 8.7, 2.3, 1.5, 15.4, 1.0, 3.3])
  const [countdown, setCountdown] = useState(5)
  const [balance, setBalance] = useState(1000)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const crashPointRef = useRef<number>(1)

  const generateCrashPoint = () => {
    const r = Math.random()
    if (r < 0.1) return 1.0 + Math.random() * 0.5
    return 1.0 + Math.pow(Math.random(), 0.3) * 10
  }

  useEffect(() => {
    if (phase !== "waiting") return
    setCountdown(5)
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          startRound()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [phase])

  const startRound = () => {
    crashPointRef.current = parseFloat(generateCrashPoint().toFixed(2))
    setMultiplier(1.0)
    setCashedOut(false)
    setWinAmount(0)
    setPhase("running")
    startTimeRef.current = Date.now()
  }

  useEffect(() => {
    if (phase !== "running") return
    const tick = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const current = parseFloat((1 + elapsed * elapsed * 0.12 + elapsed * 0.3).toFixed(2))
      setMultiplier(current)
      drawGraph(current)
      if (current >= crashPointRef.current) {
        setLastCrash(crashPointRef.current)
        setHistory(h => [crashPointRef.current, ...h.slice(0, 7)])
        setPhase("crashed")
        cancelAnimationFrame(frameRef.current)
        setTimeout(() => setPhase("waiting"), 3000)
        return
      }
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [phase])

  const drawGraph = (current: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const W = canvas.width, H = canvas.height
    ctx.clearRect(0, 0, W, H)

    const elapsed = (Date.now() - startTimeRef.current) / 1000
    const points: [number, number][] = []
    for (let t = 0; t <= elapsed; t += 0.05) {
      const m = 1 + t * t * 0.12 + t * 0.3
      const x = (t / Math.max(elapsed, 1)) * W * 0.9 + W * 0.05
      const y = H - ((m - 1) / Math.max(current - 1, 0.1)) * H * 0.8 - H * 0.1
      points.push([x, y])
    }

    if (points.length < 2) return
    const grad = ctx.createLinearGradient(0, 0, W, H)
    grad.addColorStop(0, "rgba(239,68,68,0.8)")
    grad.addColorStop(1, "rgba(239,68,68,0.2)")
    ctx.beginPath()
    ctx.moveTo(points[0][0], points[0][1])
    points.forEach(([x, y]) => ctx.lineTo(x, y))
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 3
    ctx.stroke()

    ctx.lineTo(points[points.length - 1][0], H)
    ctx.lineTo(points[0][0], H)
    ctx.closePath()
    ctx.fillStyle = "rgba(239,68,68,0.1)"
    ctx.fill()

    const last = points[points.length - 1]
    ctx.beginPath()
    ctx.arc(last[0], last[1], 6, 0, Math.PI * 2)
    ctx.fillStyle = "#ef4444"
    ctx.fill()
  }

  const placeBet = () => {
    const amount = parseFloat(bet)
    if (!amount || amount > balance) return
    setBalance(b => b - amount)
  }

  const cashOut = () => {
    if (phase !== "running" || cashedOut) return
    const amount = parseFloat(bet) * multiplier
    setWinAmount(amount)
    setBalance(b => b + amount)
    setCashedOut(true)
  }

  const betAmount = parseFloat(bet) || 0

  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-700 overflow-hidden">
      <div className="p-4 border-b border-zinc-700 flex items-center justify-between">
        <h3 className="text-white font-bold font-orbitron flex items-center gap-2">
          🚀 Краш
        </h3>
        <div className="flex gap-1">
          {history.map((h, i) => (
            <span key={i} className={`text-xs px-1.5 py-0.5 rounded font-mono font-bold ${h < 2 ? "text-red-400 bg-red-500/10" : "text-green-400 bg-green-500/10"}`}>
              {h.toFixed(1)}x
            </span>
          ))}
        </div>
      </div>

      <div className="relative bg-zinc-950" style={{ height: 200 }}>
        <canvas ref={canvasRef} width={600} height={200} className="w-full h-full" />

        <div className="absolute inset-0 flex items-center justify-center">
          {phase === "waiting" && (
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">Следующий раунд через</p>
              <p className="text-white font-orbitron text-5xl font-bold">{countdown}</p>
            </div>
          )}
          {phase === "running" && (
            <div className="text-center">
              <p className={`font-orbitron font-bold text-6xl transition-colors ${cashedOut ? "text-green-400" : "text-white"}`}>
                {multiplier.toFixed(2)}x
              </p>
              {cashedOut && <p className="text-green-400 font-bold mt-1">+{winAmount.toFixed(0)} ₽</p>}
            </div>
          )}
          {phase === "crashed" && (
            <div className="text-center">
              <p className="text-red-500 font-orbitron font-bold text-4xl">КРАШ!</p>
              <p className="text-red-400 text-xl font-mono mt-1">{lastCrash?.toFixed(2)}x</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 flex gap-3 items-end">
        <div className="flex-1">
          <label className="text-gray-400 text-xs mb-1 block">Ставка (₽)</label>
          <div className="flex gap-1">
            <Input
              value={bet}
              onChange={e => setBet(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
              disabled={phase === "running"}
            />
            {[100, 500, 1000].map(v => (
              <button key={v} onClick={() => setBet(String(v))} className="px-2 py-1 text-xs bg-zinc-700 hover:bg-zinc-600 text-white rounded transition-colors">
                {v}
              </button>
            ))}
          </div>
        </div>
        <div>
          {phase === "running" && !cashedOut ? (
            <Button onClick={cashOut} className="bg-green-500 hover:bg-green-600 text-white font-bold px-6">
              Забрать {(betAmount * multiplier).toFixed(0)} ₽
            </Button>
          ) : (
            <Button
              onClick={placeBet}
              disabled={phase === "running" || betAmount > balance}
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 disabled:opacity-50"
            >
              Ставить
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
