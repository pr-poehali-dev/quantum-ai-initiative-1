import { useEffect, useRef, useState } from "react"

const initialWins = [
  { name: "Алекс***", game: "Gates of Olympus", amount: 47800, currency: "₽" },
  { name: "Дмит***", game: "Aviator", amount: 12500, currency: "₽" },
  { name: "Серг***", game: "Sweet Bonanza", amount: 93200, currency: "₽" },
  { name: "Ната***", game: "Crazy Time", amount: 8400, currency: "₽" },
  { name: "Иван***", game: "Lightning Roulette", amount: 31000, currency: "₽" },
  { name: "Олег***", game: "Spaceman", amount: 22600, currency: "₽" },
  { name: "Мари***", game: "Blackjack Pro", amount: 5700, currency: "₽" },
  { name: "Андр***", game: "JetX", amount: 68000, currency: "₽" },
  { name: "Катя***", game: "Book of Dead", amount: 14300, currency: "₽" },
  { name: "Паве***", game: "Wanted Dead or a Wild", amount: 39500, currency: "₽" },
  { name: "Юли***", game: "Big Bass Bonanza", amount: 7200, currency: "₽" },
  { name: "Рома***", game: "Plinko", amount: 55000, currency: "₽" },
]

function randomAmount() {
  const base = [4200, 8900, 15600, 23000, 41000, 67000, 99500, 5500, 12000, 31000]
  return base[Math.floor(Math.random() * base.length)]
}

const names = ["Алекс***", "Дмит***", "Серг***", "Ната***", "Иван***", "Олег***", "Мари***", "Андр***", "Катя***", "Паве***", "Юли***", "Рома***", "Вита***", "Леон***", "Арт***"]
const gameNames = ["Gates of Olympus", "Aviator", "Sweet Bonanza", "Crazy Time", "Lightning Roulette", "Spaceman", "Blackjack Pro", "JetX", "Book of Dead", "Wanted Dead or a Wild", "Plinko", "Monopoly Live"]

export function WinsTicker() {
  const [wins, setWins] = useState(initialWins)
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const newWin = {
        name: names[Math.floor(Math.random() * names.length)],
        game: gameNames[Math.floor(Math.random() * gameNames.length)],
        amount: randomAmount(),
        currency: "₽",
      }
      setWins(prev => [newWin, ...prev.slice(0, 19)])
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const doubled = [...wins, ...wins]

  return (
    <div className="bg-black border-y border-red-500/20 py-3 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div
        ref={tickerRef}
        className="flex gap-8 animate-ticker whitespace-nowrap"
        style={{ animationDuration: "40s" }}
      >
        {doubled.map((win, i) => (
          <div key={i} className="flex items-center gap-2 flex-shrink-0">
            <span className="text-yellow-400 text-sm">🏆</span>
            <span className="text-gray-300 text-sm font-mono">{win.name}</span>
            <span className="text-gray-500 text-sm">выиграл в</span>
            <span className="text-white text-sm font-bold">{win.game}</span>
            <span className="text-green-400 text-sm font-bold font-mono">
              +{win.amount.toLocaleString("ru-RU")} {win.currency}
            </span>
            <span className="text-red-500/40 mx-2">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}
