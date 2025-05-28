import { useState } from 'react'
import PasswordInput from "../components/PasswordInput"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: 'user'
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

  const handleSubmit = async (e) => {
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
      const response = await fetch('http://localhost:5000/api/usuarios/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.mensaje || 'Error during registration')
      }

      // Registration successful
      alert('Registration successful! Please log in.')
      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Login */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="max-w-md w-full p-8">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Welcome!</h2>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name" 
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" 
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email" 
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" 
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <PasswordInput onChange={handlePasswordChange} />

              <div className="flex justify-between">
                <div></div>

                <div className="text-right text-sm mt-1">
                  <Link to="/login" className="text-green-600 hover:underline">Already have an account?</Link>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#24AB70] text-white py-2 rounded-md mb-4"
              disabled={isLoading}
            >
              {isLoading ? 'Signing up...' : 'Sign up'}
            </button>

            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-full bg-gray-300" />
              <span className="text-sm text-gray-500">Or</span>
              <div className="h-px w-full bg-gray-300" />
            </div>

            <button 
              type="button" 
              className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
              <span className="text-black">Sign up with Google</span>
            </button>
          </form>
        </div>
      </div>

      {/* Image */}
      <div className="w-1/2 h-full hidden md:block relative">
        <img src="/signup-bg.png" alt="Green Office" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
