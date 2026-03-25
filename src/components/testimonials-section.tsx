import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Алексей М.",
    role: "Игрок с 2 лет на платформе",
    avatar: "/cybersecurity-expert-man.jpg",
    content:
      "Вывожу выигрыши каждую неделю — деньги приходят за 20 минут. Ни разу не было задержек. Лучшее казино, где я играл.",
  },
  {
    name: "Анна К.",
    role: "VIP-игрок",
    avatar: "/asian-woman-tech-developer.jpg",
    content:
      "Бонусная программа реально щедрая. Получила 150% на первый депозит и уже отыграла. Поддержка отвечает мгновенно.",
  },
  {
    name: "Дмитрий В.",
    role: "Фанат live-казино",
    avatar: "/professional-woman-scientist.png",
    content:
      "Live-рулетка с настоящими дилерами — это огонь! Атмосфера как в реальном казино. Выплаты честные, без подвохов.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-card-foreground mb-4 font-sans">Нам доверяют тысячи игроков</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Реальные отзывы наших игроков — без прикрас
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glow-border slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-card-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
