import { useState } from "react"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { CrashGame } from "@/components/games/crash-game"
import { MinesGame } from "@/components/games/mines-game"
import { DiceGame } from "@/components/games/dice-game"

interface User {
  id: number
  username: string
  email: string
  balance: number
}

interface PlayerDashboardProps {
  user: User
  onLogout: () => void
}

const categories = [
  { id: "quick", label: "⚡ Быстрые игры", count: "3" },
  { id: "slots", label: "🎰 Слоты", count: "800+" },
  { id: "live", label: "🎥 Live", count: "120+" },
  { id: "crash", label: "🚀 Краш", count: "30+" },
  { id: "table", label: "🃏 Столы", count: "80+" },
]

const extGames: Record<string, { name: string; tag: string; hot?: boolean }[]> = {
  slots: [
    { name: "Gates of Olympus", tag: "Pragmatic Play", hot: true },
    { name: "Sweet Bonanza", tag: "Pragmatic Play", hot: true },
    { name: "Big Bass Bonanza", tag: "Pragmatic Play" },
    { name: "Book of Dead", tag: "Play'n GO" },
    { name: "Starburst", tag: "NetEnt" },
    { name: "Wanted Dead or a Wild", tag: "Hacksaw Gaming", hot: true },
    { name: "Dog House", tag: "Pragmatic Play" },
    { name: "Wolf Gold", tag: "Pragmatic Play" },
  ],
  live: [
    { name: "Lightning Roulette", tag: "Evolution", hot: true },
    { name: "Crazy Time", tag: "Evolution", hot: true },
    { name: "Monopoly Live", tag: "Evolution", hot: true },
    { name: "Live Blackjack", tag: "Evolution" },
    { name: "Dream Catcher", tag: "Evolution" },
    { name: "Speed Baccarat", tag: "Evolution" },
  ],
  crash: [
    { name: "Aviator", tag: "Spribe", hot: true },
    { name: "JetX", tag: "SmartSoft", hot: true },
    { name: "Spaceman", tag: "Pragmatic Play", hot: true },
    { name: "Plinko", tag: "BGaming" },
    { name: "Balloon", tag: "Hacksaw" },
    { name: "Crash X", tag: "BGaming" },
  ],
  table: [
    { name: "European Roulette", tag: "NetEnt" },
    { name: "Blackjack Pro", tag: "Microgaming", hot: true },
    { name: "Texas Hold'em", tag: "NetEnt" },
    { name: "Baccarat Gold", tag: "Microgaming" },
    { name: "Pontoon", tag: "Microgaming" },
    { name: "Casino Hold'em", tag: "NetEnt" },
  ],
}

const emojis: Record<string, string> = {
  slots: "🎰", live: "🎥", crash: "🚀", table: "🃏"
}

export function PlayerDashboard({ user, onLogout }: PlayerDashboardProps) {
  const [activeCategory, setActiveCategory] = useState("quick")
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {menuOpen && (
        <div className="fixed inset-0 z-[99999] bg-zinc-950 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 py-6">

            {/* Шапка */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center">
                  <span className="text-red-400 font-bold text-lg font-orbitron">
                    {user.username[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-white font-bold font-orbitron">{user.username}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>
              <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors p-2">
                <Icon name="X" size={28} />
              </button>
            </div>

            {/* Баланс */}
            <div className="bg-gradient-to-r from-red-500/20 to-red-900/10 border border-red-500/30 rounded-2xl p-5 mb-6">
              <p className="text-gray-400 text-sm mb-1">Ваш баланс</p>
              <p className="text-4xl font-bold text-white font-orbitron">
                {user.balance.toLocaleString("ru-RU")} <span className="text-red-400">₽</span>
              </p>
              <div className="flex gap-3 mt-4">
                <a href="https://t.me/send?start=IVc2aZhZoklF" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold">💳 Пополнить</Button>
                </a>
                <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent">
                  💸 Вывести
                </Button>
              </div>
            </div>

            {/* Категории */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 border ${
                    activeCategory === cat.id
                      ? "bg-red-500 border-red-500 text-white"
                      : "bg-white/5 border-white/10 text-gray-300 hover:border-red-500/40"
                  }`}
                >
                  {cat.label}
                  <span className="ml-1 text-xs opacity-70">{cat.count}</span>
                </button>
              ))}
            </div>

            {/* Быстрые игры */}
            {activeCategory === "quick" && (
              <div className="space-y-6 mb-8">
                <p className="text-gray-400 text-sm">⚡ Играй прямо здесь — без перехода на другой сайт</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CrashGame />
                  <MinesGame />
                </div>
                <DiceGame />
              </div>
            )}

            {/* Внешние игры */}
            {activeCategory !== "quick" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                {extGames[activeCategory]?.map((game, i) => (
                  <a
                    key={i}
                    href="https://t.me/send?start=IVc2aZhZoklF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-red-500/50 rounded-xl p-4 transition-all duration-200 text-center"
                  >
                    {game.hot && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">🔥</span>
                    )}
                    <div className="text-3xl mb-2">{emojis[activeCategory]}</div>
                    <p className="text-white text-sm font-bold leading-tight mb-1">{game.name}</p>
                    <p className="text-gray-500 text-xs">{game.tag}</p>
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-red-400 font-bold">Играть →</span>
                    </div>
                  </a>
                ))}
              </div>
            )}

            <button
              onClick={onLogout}
              className="w-full py-3 rounded-xl border border-zinc-700 text-gray-400 hover:text-white hover:border-red-500/50 transition-all text-sm font-semibold"
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>
      )}

      {/* Кнопка открытия меню */}
      <button
        onClick={() => setMenuOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-red-500/50 transition-all duration-200"
      >
        <div className="w-7 h-7 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center flex-shrink-0">
          <span className="text-red-400 font-bold text-sm">{user.username[0].toUpperCase()}</span>
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-white text-xs font-bold leading-tight">{user.username}</p>
          <p className="text-green-400 text-xs font-mono">{user.balance.toLocaleString("ru-RU")} ₽</p>
        </div>
        <Icon name="ChevronDown" size={14} className="text-gray-400" />
      </button>
    </>
  )
}
