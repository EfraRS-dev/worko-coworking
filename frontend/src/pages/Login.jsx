import { useState } from 'react'
import PasswordInput from "../components/PasswordInput"
import { useNavigate, Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handlePasswordChange = (value) => {
    setFormData(prevState => ({
      ...prevState,
      password: value
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validate password is present
    if (!formData.password) {
      setError('Password is required')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.mensaje || 'Invalid email or password')
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token)

      // If remember me is checked, store the email
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email)
      } else {
        localStorage.removeItem('rememberedEmail')
      }

      navigate('/landing')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Load remembered email if available
  useState(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }))
      setRememberMe(true)
    }
  }, [])

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Image */}
      <div className="w-1/2 h-full hidden md:block relative">
        <img src="/login-bg.png" alt="Green Office" className="w-full h-full object-cover" />
      </div>

      {/* Login */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="max-w-md w-full p-8">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Bienvenido de vuelta!</h2>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>

              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu correo electrónico"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <PasswordInput onChange={handlePasswordChange} />

              <div className="flex justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600">Recuérdame</label>
                </div>

                <div className="text-right text-sm mt-1">
                  <Link to="/login" className="text-green-600 hover:underline">¿Olvidaste tu contraseña?</Link>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#24AB70] text-white py-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>

            <div className="mt-4 text-center">
              <span className="text-gray-600">No tienes una cuenta? </span>
              <Link to="/" className="text-green-600 hover:underline">Regístrate</Link>
            </div>

            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-full bg-gray-300" />
              <span className="text-sm text-gray-500">O</span>
              <div className="h-px w-full bg-gray-300" />
            </div>

            <button
              type="button"
              className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
              <span className="text-black">Iniciar sesión con Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
