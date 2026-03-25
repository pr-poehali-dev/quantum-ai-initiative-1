import { useState } from "react"

const categories = [
  { id: "slots", label: "🎰 Слоты", count: "800+" },
  { id: "live", label: "🎥 Live-казино", count: "120+" },
  { id: "table", label: "🃏 Карты и столы", count: "80+" },
  { id: "crash", label: "🚀 Краш-игры", count: "30+" },
  { id: "sport", label: "⚽ Ставки", count: "1000+" },
]

const games: Record<string, { name: string; rtp: string; tag: string; hot?: boolean }[]> = {
  slots: [
    { name: "Gates of Olympus", rtp: "RTP 96.5%", tag: "Pragmatic Play", hot: true },
    { name: "Sweet Bonanza", rtp: "RTP 96.5%", tag: "Pragmatic Play", hot: true },
    { name: "Big Bass Bonanza", rtp: "RTP 96.7%", tag: "Pragmatic Play" },
    { name: "Book of Dead", rtp: "RTP 96.2%", tag: "Play'n GO" },
    { name: "Starburst", rtp: "RTP 96.1%", tag: "NetEnt" },
    { name: "Wanted Dead or a Wild", rtp: "RTP 96.4%", tag: "Hacksaw Gaming", hot: true },
  ],
  live: [
    { name: "Lightning Roulette", rtp: "RTP 97.3%", tag: "Evolution", hot: true },
    { name: "Crazy Time", rtp: "RTP 96.1%", tag: "Evolution", hot: true },
    { name: "Dream Catcher", rtp: "RTP 96.6%", tag: "Evolution" },
    { name: "Live Blackjack", rtp: "RTP 99.3%", tag: "Evolution" },
    { name: "Monopoly Live", rtp: "RTP 96.2%", tag: "Evolution", hot: true },
    { name: "Speed Baccarat", rtp: "RTP 98.9%", tag: "Evolution" },
  ],
  table: [
    { name: "European Roulette", rtp: "RTP 97.3%", tag: "NetEnt" },
    { name: "Blackjack Pro", rtp: "RTP 99.3%", tag: "Microgaming", hot: true },
    { name: "Texas Hold'em", rtp: "RTP 97.8%", tag: "NetEnt" },
    { name: "Baccarat Gold", rtp: "RTP 98.9%", tag: "Microgaming" },
    { name: "Casino Hold'em", rtp: "RTP 97.8%", tag: "NetEnt" },
    { name: "Pontoon", rtp: "RTP 99.6%", tag: "Microgaming", hot: true },
  ],
  crash: [
    { name: "Aviator", rtp: "RTP 97%", tag: "Spribe", hot: true },
    { name: "JetX", rtp: "RTP 97%", tag: "SmartSoft", hot: true },
    { name: "Crash X", rtp: "RTP 97%", tag: "BGaming" },
    { name: "Spaceman", rtp: "RTP 96.5%", tag: "Pragmatic Play", hot: true },
    { name: "Balloon", rtp: "RTP 97%", tag: "Hacksaw Gaming" },
    { name: "Plinko", rtp: "RTP 99%", tag: "BGaming" },
  ],
  sport: [
    { name: "Футбол", rtp: "Live ставки", tag: "Все лиги мира", hot: true },
    { name: "Хоккей", rtp: "Live ставки", tag: "НХЛ, КХЛ, MHL" },
    { name: "Баскетбол", rtp: "Live ставки", tag: "НБА, Евролига", hot: true },
    { name: "Теннис", rtp: "Live ставки", tag: "ATP, WTA, ITF" },
    { name: "UFC / Бокс", rtp: "Live ставки", tag: "Бои", hot: true },
    { name: "Киберспорт", rtp: "Live ставки", tag: "CS2, Dota 2, LoL" },
  ],
}

const emojis: Record<string, string> = {
  slots: "🎰",
  live: "🎥",
  table: "🃏",
  crash: "🚀",
  sport: "⚽",
}

export function TechnologySection() {
  const [active, setActive] = useState("slots")

  return (
    <section id="technology" className="py-24 bg-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono mb-4">
            ИГРОВОЙ КАТАЛОГ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Игры и режимы</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Более 2 000 игр от лучших мировых провайдеров — найди свой формат
          </p>
        </div>

        {/* Категории */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 border ${
                active === cat.id
                  ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/30 scale-105"
                  : "bg-white/5 border-white/10 text-gray-300 hover:border-red-500/40 hover:text-white"
              }`}
            >
              {cat.label}
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${active === cat.id ? "bg-white/20" : "bg-white/10"}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Игры */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {games[active].map((game, i) => (
            <a
              key={i}
              href="https://t.me/send?start=IVc2aZhZoklF"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-red-500/50 hover:bg-red-500/5 transition-all duration-300 cursor-pointer"
            >
              <div className="text-3xl w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 group-hover:bg-red-500/20 transition-all duration-300 flex-shrink-0">
                {emojis[active]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-bold truncate">{game.name}</span>
                  {game.hot && (
                    <span className="flex-shrink-0 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded font-bold">🔥 ХИТ</span>
                  )}
                </div>
                <span className="text-gray-400 text-xs">{game.tag}</span>
              </div>
              <span className="flex-shrink-0 text-xs text-green-400 font-mono font-bold">{game.rtp}</span>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a href="https://t.me/send?start=IVc2aZhZoklF" target="_blank" rel="noopener noreferrer">
            <button className="px-10 py-4 bg-red-500 hover:bg-red-600 text-white font-orbitron font-bold rounded-xl transition-all duration-300 shadow-lg shadow-red-500/30 pulse-button">
              Смотреть все игры →
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}
