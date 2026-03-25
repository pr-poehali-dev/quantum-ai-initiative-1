import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Icon from "@/components/ui/icon"

const AUTH_URL = "https://functions.poehali.dev/6d743b84-0ff3-4d59-a80a-c69ed4c81a9f"

interface User {
  id: number
  username: string
  email: string
  balance: number
}

interface AuthModalProps {
  mode: "login" | "register"
  onClose: () => void
  onSuccess: (user: User, token: string) => void
  onSwitchMode: (mode: "login" | "register") => void
}

export function AuthModal({ mode, onClose, onSuccess, onSwitchMode }: AuthModalProps) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const body: Record<string, string> = { action: mode, email, password }
    if (mode === "register") body.username = username

    const res = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    const raw = await res.json()
    const data = typeof raw === "string" ? JSON.parse(raw) : raw
    setLoading(false)

    if (!res.ok || data.error) {
      setError(data.error || "Ошибка сервера")
      return
    }

    localStorage.setItem("wz_token", data.token)
    localStorage.setItem("wz_user", JSON.stringify(data.user))
    onSuccess(data.user, data.token)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-zinc-900 border border-red-500/30 rounded-2xl p-8 w-full max-w-md shadow-2xl shadow-red-500/10">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <Icon name="X" size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="font-orbitron text-2xl font-bold text-white mb-1">
            {mode === "login" ? "Вход" : "Регистрация"}
          </h2>
          <p className="text-gray-400 text-sm">
            {mode === "login" ? "Войдите в свой аккаунт WinZone" : "Создайте аккаунт и получите бонус"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Никнейм</label>
              <Input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Ваш игровой ник"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-red-500"
                required
              />
            </div>
          )}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Email</label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Пароль</label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Минимум 6 символов"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-red-500"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 text-base pulse-button"
          >
            {loading ? "Загрузка..." : mode === "login" ? "Войти" : "Зарегистрироваться"}
          </Button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          {mode === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
          <button
            onClick={() => onSwitchMode(mode === "login" ? "register" : "login")}
            className="text-red-400 hover:text-red-300 font-semibold transition-colors"
          >
            {mode === "login" ? "Зарегистрироваться" : "Войти"}
          </button>
        </p>

        {mode === "register" && (
          <p className="text-center text-gray-600 text-xs mt-3">
            🎁 После регистрации получите бонус 5 000 ₽
          </p>
        )}
      </div>
    </div>
  )
}
