import Icon from "@/components/ui/icon"

export function SafetySection() {
  const items = [
    {
      icon: "ShieldCheck",
      title: "Лицензированная деятельность",
      desc: "Работаем по официальной лицензии. Регулярные проверки и аудит независимыми организациями.",
    },
    {
      icon: "Lock",
      title: "SSL-шифрование",
      desc: "Все данные и транзакции защищены 256-битным шифрованием. Ваши деньги и личная информация в безопасности.",
    },
    {
      icon: "UserCheck",
      title: "Верификация игроков",
      desc: "KYC-проверка для защиты от мошенничества. Только реальные люди — никаких ботов и мультиаккаунтов.",
    },
    {
      icon: "Headphones",
      title: "Поддержка 24/7",
      desc: "Служба поддержки работает круглосуточно. Решим любой вопрос в чате, по email или телефону.",
    },
  ]

  return (
    <section id="safety" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Ваша безопасность — наш приоритет</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            WinZone — лицензированное казино с многоуровневой защитой игроков и честными выплатами
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex gap-6 p-6 rounded-2xl border border-red-500/20 bg-white/5 hover:border-red-500/50 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                <Icon name={item.icon as "ShieldCheck"} size={24} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2 font-orbitron">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
