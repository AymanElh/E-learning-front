import {useState} from "react";
import {authService} from "../../services/authService.js";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(formData) {
        const userData =  {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            password_confirmation: formData.get('confirmPassword'),
        };
        const res = await authService.register(userData);
        console.log(res);
    }


    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">
                        Create Account
                    </h2>
                    <p className="mt-2 text-gray-400">
                        Join our e-learning platform
                    </p>
                </div>

                <form className="mt-8 space-y-6" action={handleSubmit}>
                    <div className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your full name"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Confirm your password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            className="h-4 w-4 bg-gray-800 border-gray-700 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                            I agree to the{' '}
                            <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                                Terms and Conditions
                            </a>
                        </label>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 transition-colors duration-200"
                        >
                            Create Account
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-gray-400">
                            Already have an account?{' '}
                            <a href="#" className="text-blue-400 hover:text-blue-300 underline font-medium">
                                Sign in here
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;
