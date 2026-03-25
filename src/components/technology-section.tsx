export function TechnologySection() {
  const paymentMethods = [
    { name: "Visa", icon: "💳" },
    { name: "MasterCard", icon: "💳" },
    { name: "СБП", icon: "🏦" },
    { name: "Bitcoin", icon: "₿" },
    { name: "USDT", icon: "💵" },
    { name: "Ethereum", icon: "⬡" },
    { name: "ЮMoney", icon: "🟡" },
    { name: "Qiwi", icon: "🥝" },
  ]

  const gameProviders = [
    "Pragmatic Play",
    "Evolution Gaming",
    "NetEnt",
    "Microgaming",
    "Play'n GO",
    "Hacksaw Gaming",
  ]

  return (
    <section id="technology" className="py-24 bg-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">
            Платежи и провайдеры
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Работаем с ведущими платёжными системами и игровыми провайдерами мирового уровня
          </p>
        </div>

        {/* Платёжные методы */}
        <div className="mb-16">
          <h3 className="text-center text-white font-orbitron text-xl mb-8 text-red-400">Способы оплаты</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {paymentMethods.map((method, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-red-500/20 bg-white/5 hover:border-red-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <span className="text-3xl">{method.icon}</span>
                <span className="text-white font-semibold text-sm">{method.name}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-4">
            Здесь будет ваша платёжная ссылка — просто вставьте её в кнопку «Играть сейчас»
          </p>
        </div>

        {/* Игровые провайдеры */}
        <div>
          <h3 className="text-center text-white font-orbitron text-xl mb-8 text-red-400">Игровые провайдеры</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {gameProviders.map((provider, i) => (
              <div
                key={i}
                className="px-6 py-3 rounded-full border border-red-500/30 bg-red-500/5 text-white font-space-mono text-sm hover:border-red-500 hover:bg-red-500/10 transition-all duration-300"
              >
                {provider}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
