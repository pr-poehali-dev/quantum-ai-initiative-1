import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-red-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-orbitron text-2xl font-bold text-white mb-4">
              WIN<span className="text-red-500">ZONE</span>
            </h2>
            <p className="font-space-mono text-gray-300 mb-6 max-w-md">
              Лицензированное онлайн-казино с тысячами игр, мгновенными выплатами и щедрыми бонусами. 18+
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Игры */}
          <div>
            <h3 className="font-orbitron text-white font-semibold mb-4">Игры</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#technology"
                  className="font-space-mono text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  Слоты
                </a>
              </li>
              <li>
                <a
                  href="#technology"
                  className="font-space-mono text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  Live-казино
                </a>
              </li>
              <li>
                <a
                  href="#technology"
                  className="font-space-mono text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  Рулетка
                </a>
              </li>
              <li>
                <a
                  href="#technology"
                  className="font-space-mono text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  Покер
                </a>
              </li>
            </ul>
          </div>

          {/* Поддержка */}
          <div>
            <h3 className="font-orbitron text-white font-semibold mb-4">Поддержка</h3>
            <ul className="space-y-2">
              <li>
                <a href="#faq" className="font-space-mono text-gray-400 hover:text-red-500 transition-colors duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="font-space-mono text-gray-400 hover:text-red-500 transition-colors duration-200">
                  Онлайн-чат
                </a>
              </li>
              <li>
                <a href="#safety" className="font-space-mono text-gray-400 hover:text-red-500 transition-colors duration-200">
                  Безопасность
                </a>
              </li>
              <li>
                <a href="#" className="font-space-mono text-gray-400 hover:text-red-500 transition-colors duration-200">
                  Контакты
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-red-500/20">
          <p className="font-space-mono text-gray-500 text-xs text-center mb-4">
            ⚠️ Игра на деньги доступна только лицам старше 18 лет. Азартные игры могут вызывать зависимость. Играйте ответственно.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-space-mono text-gray-400 text-sm">© 2025 WinZone. Все права защищены.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="font-space-mono text-gray-400 hover:text-red-500 text-sm transition-colors duration-200"
              >
                Конфиденциальность
              </a>
              <a
                href="#"
                className="font-space-mono text-gray-400 hover:text-red-500 text-sm transition-colors duration-200"
              >
                Условия использования
              </a>
              <a
                href="#"
                className="font-space-mono text-gray-400 hover:text-red-500 text-sm transition-colors duration-200"
              >
                Ответственная игра
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
