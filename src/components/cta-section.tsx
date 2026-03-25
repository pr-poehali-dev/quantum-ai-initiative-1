import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="slide-up">
          <div className="text-5xl mb-6">🎰</div>
          <h2 className="text-5xl font-bold text-foreground mb-6 font-sans text-balance">Готов сорвать джекпот?</h2>
          <p className="text-xl text-muted-foreground mb-4 leading-relaxed max-w-2xl mx-auto">
            Зарегистрируйся прямо сейчас и получи бонус до <span className="text-red-500 font-bold">200%</span> на первый депозит
          </p>
          <p className="text-gray-400 mb-10 text-sm">
            Более 50 000 игроков уже выбрали WinZone
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 pulse-button text-lg px-8 py-4"
            >
              Играть сейчас
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-4 bg-transparent"
            >
              Узнать о бонусах
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
