import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Как вывести деньги с WinZone?",
      answer:
        "Подайте заявку на вывод в личном кабинете, выберите удобный способ (карта, крипта, кошелёк) и укажите сумму. Обработка занимает от 15 минут до 24 часов в зависимости от метода.",
    },
    {
      question: "Какие способы пополнения доступны?",
      answer:
        "Принимаем Visa, MasterCard, СБП, USDT, BTC, ETH, Qiwi, ЮMoney и другие популярные методы. Минимальный депозит — 100 рублей. Пополнение мгновенное.",
    },
    {
      question: "Безопасно ли играть на WinZone?",
      answer:
        "Да, WinZone работает по официальной лицензии. Все транзакции защищены SSL-шифрованием. Мы не передаём данные третьим лицам и гарантируем честность игр через сертифицированные RNG.",
    },
    {
      question: "Как получить приветственный бонус?",
      answer:
        "Зарегистрируйтесь, пополните счёт на любую сумму — бонус начисляется автоматически. До 200% от суммы первого депозита + 50 фриспинов. Условия отыгрыша x25.",
    },
    {
      question: "Есть ли мобильная версия?",
      answer:
        "Да, сайт полностью адаптирован для смартфонов и планшетов. Также доступно приложение для iOS и Android — играйте где угодно без потери качества.",
    },
    {
      question: "Что делать, если возникла проблема?",
      answer:
        "Служба поддержки работает 24/7. Напишите в онлайн-чат на сайте или на email support@winzone.com. Среднее время ответа — 3 минуты.",
    },
  ]

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Частые вопросы</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-space-mono">
            Ответы на популярные вопросы об игре, платежах и безопасности на WinZone.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-red-500/20 mb-4">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-red-400 font-orbitron px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed px-6 pb-4 font-space-mono">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
