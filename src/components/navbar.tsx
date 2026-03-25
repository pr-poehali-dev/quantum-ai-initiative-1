import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { AuthModal } from "@/components/auth-modal"
import { PlayerDashboard } from "@/components/player-dashboard"

interface User {
  id: number
  username: string
  email: string
  balance: number
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register" | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("wz_user")
    if (saved) setUser(JSON.parse(saved))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("wz_token")
    localStorage.removeItem("wz_user")
    setUser(null)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[9999] bg-black/95 backdrop-blur-md border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="font-orbitron text-xl font-bold text-white">
                WIN<span className="text-red-500">ZONE</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#technology" className="font-geist text-white hover:text-red-500 transition-colors duration-200">
                  Игры
                </a>
                <a href="#bonuses" className="font-geist text-yellow-400 hover:text-yellow-300 transition-colors duration-200 font-bold">
                  🎁 Бонусы
                </a>
                <a href="#safety" className="font-geist text-white hover:text-red-500 transition-colors duration-200">
                  Безопасность
                </a>
                <a href="#faq" className="font-geist text-white hover:text-red-500 transition-colors duration-200">
                  Вопросы
                </a>
              </div>
            </div>

            {/* Auth buttons */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <PlayerDashboard user={user} onLogout={handleLogout} />
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setAuthMode("login")}
                    className="border-white/20 text-white hover:bg-white/10 bg-transparent font-geist"
                  >
                    Войти
                  </Button>
                  <Button
                    onClick={() => setAuthMode("register")}
                    className="bg-red-500 hover:bg-red-600 text-white font-geist border-0"
                  >
                    Регистрация
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              {user && <PlayerDashboard user={user} onLogout={handleLogout} />}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-red-500 transition-colors duration-200"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/98 border-t border-red-500/20">
                <a href="#technology" className="block px-3 py-2 font-geist text-white hover:text-red-500 transition-colors" onClick={() => setIsOpen(false)}>
                  Игры
                </a>
                <a href="#bonuses" className="block px-3 py-2 font-geist text-yellow-400 font-bold" onClick={() => setIsOpen(false)}>
                  🎁 Бонусы
                </a>
                <a href="#safety" className="block px-3 py-2 font-geist text-white hover:text-red-500 transition-colors" onClick={() => setIsOpen(false)}>
                  Безопасность
                </a>
                <a href="#faq" className="block px-3 py-2 font-geist text-white hover:text-red-500 transition-colors" onClick={() => setIsOpen(false)}>
                  Вопросы
                </a>
                {!user && (
                  <div className="px-3 py-2 flex flex-col gap-2">
                    <Button
                      variant="outline"
                      onClick={() => { setAuthMode("login"); setIsOpen(false) }}
                      className="w-full border-white/20 text-white bg-transparent"
                    >
                      Войти
                    </Button>
                    <Button
                      onClick={() => { setAuthMode("register"); setIsOpen(false) }}
                      className="w-full bg-red-500 hover:bg-red-600 text-white border-0"
                    >
                      Регистрация
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSuccess={(u) => setUser(u)}
          onSwitchMode={setAuthMode}
        />
      )}
    </>
  )
}
