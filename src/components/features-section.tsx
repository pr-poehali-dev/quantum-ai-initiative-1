import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "Мгновенные выплаты",
    description: "Вывод средств за считанные минуты на любой удобный способ: карты, криптовалюта, электронные кошельки.",
    icon: "zap",
    badge: "Быстро",
  },
  {
    title: "Лицензия и безопасность",
    description: "Работаем по официальной лицензии. Все транзакции шифруются по SSL. Ваши деньги под защитой.",
    icon: "lock",
    badge: "Лицензия",
  },
  {
    title: "Тысячи игр",
    description: "Слоты, рулетка, покер, блэкджек, live-казино с живыми дилерами — всё в одном месте 24/7.",
    icon: "globe",
    badge: "1000+",
  },
  {
    title: "Щедрые бонусы",
    description: "Бонус на первый депозит до 200%, кэшбэк каждую неделю, фриспины и турниры с призовым фондом.",
    icon: "brain",
    badge: "Бонусы",
  },
  {
    title: "Удобная касса",
    description: "Встроенная платёжная система: принимаем карты Visa/MC, USDT, BTC, SBP и популярные кошельки.",
    icon: "link",
    badge: "Платежи",
  },
  {
    title: "VIP-программа",
    description: "Эксклюзивные привилегии для постоянных игроков: персональный менеджер, увеличенные лимиты, особые бонусы.",
    icon: "target",
    badge: "VIP",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Почему выбирают WinZone</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Лучшее онлайн-казино с честными выплатами, большим выбором игр и максимальной безопасностью
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glow-border hover:shadow-lg transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">
                    {feature.icon === "brain" && "🎁"}
                    {feature.icon === "lock" && "🛡️"}
                    {feature.icon === "globe" && "🎰"}
                    {feature.icon === "zap" && "⚡"}
                    {feature.icon === "link" && "💳"}
                    {feature.icon === "target" && "👑"}
                  </span>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
