import { Button } from "@/components/ui/button"

const bonuses = [
  {
    emoji: "🎁",
    tag: "ГЛАВНЫЙ БОНУС",
    title: "5 000 ₽ за пополнение",
    description: "Пополни счёт от 1 200 ₽ и получи 5 000 ₽ бонусных средств мгновенно на свой счёт.",
    highlight: true,
    conditions: "Пополнение от 1 200 ₽ · Отыгрыш x25 · Срок 7 дней",
    cta: "Получить бонус",
  },
  {
    emoji: "🔄",
    tag: "КЭШБЭК",
    title: "10% кэшбэк каждую неделю",
    description: "Каждый понедельник возвращаем 10% от проигрышей за прошлую неделю. Без условий отыгрыша.",
    highlight: false,
    conditions: "Начисляется автоматически · Без отыгрыша",
    cta: "Узнать подробнее",
  },
  {
    emoji: "🎰",
    tag: "ФРИСПИНЫ",
    title: "50 фриспинов при регистрации",
    description: "Создай аккаунт и получи 50 бесплатных вращений на популярных слотах без депозита.",
    highlight: false,
    conditions: "Без депозита · Выигрыш можно вывести после x20",
    cta: "Зарегистрироваться",
  },
]

export function BonusesSection() {
  return (
    <section id="bonuses" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono mb-4">
            БОНУСНАЯ ПРОГРАММА
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Бонусы для игроков</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Щедрые акции для новых и постоянных игроков — начни с бонуса уже сегодня
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bonuses.map((bonus, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 flex flex-col border transition-all duration-300 hover:scale-[1.02] ${
                bonus.highlight
                  ? "bg-gradient-to-b from-red-500/20 to-red-900/10 border-red-500/60 shadow-lg shadow-red-500/20"
                  : "bg-white/5 border-white/10 hover:border-red-500/30"
              }`}
            >
              {bonus.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-red-500 text-white text-xs font-bold rounded-full font-orbitron tracking-wider">
                    ХИТ
                  </span>
                </div>
              )}

              <div className="text-4xl mb-4">{bonus.emoji}</div>
              <span className="text-xs text-red-400 font-mono font-bold tracking-widest mb-2">{bonus.tag}</span>
              <h3 className="text-2xl font-bold text-white mb-3 font-orbitron">{bonus.title}</h3>
              <p className="text-gray-300 leading-relaxed mb-6 flex-1">{bonus.description}</p>
              <p className="text-xs text-gray-500 font-mono mb-6">{bonus.conditions}</p>
              <a href="https://t.me/send?start=IVc2aZhZoklF" target="_blank" rel="noopener noreferrer">
                <Button
                  className={`w-full font-bold ${
                    bonus.highlight
                      ? "bg-red-500 hover:bg-red-600 text-white pulse-button"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                >
                  {bonus.cta}
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
