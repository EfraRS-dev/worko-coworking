import PasswordInput from "../components/PasswordInput"
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()

    const handleLogin = (e) => {
      e.preventDefault()
      // Aquí podrías validar el login
      navigate('/landing')
    }

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Login */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="max-w-md w-full p-8">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Welcome!</h2>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" placeholder="Enter your name" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" placeholder="Enter your email" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <PasswordInput />

              <div className="flex justify-between">
                <div></div>

                <div className="text-right text-sm mt-1">
                  <a href="#" className="text-green-600 hover:underline">Already have an account?</a>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#24AB70] text-white py-2 rounded-md">
              Sign up
            </button>

            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-full bg-gray-300" />
              <span className="text-sm text-gray-500">Or</span>
              <div className="h-px w-full bg-gray-300" />
            </div>

            <button type="button" className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
              <span className="text-black">Sign up with Google</span>
            </button>

          </form>

          {/* <svg className="absolute -bottom-20 -right-30 w-60 h-60 z-0" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="100" fill="#149B60" />
            <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="2" fill="none" />
            <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="2" fill="none" />
          </svg> */}

        </div>
      </div>

      {/* Image */}
      <div className="w-1/2 h-full hidden md:block relative">
        <img src="/signup-bg.png" alt="Green Office" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
