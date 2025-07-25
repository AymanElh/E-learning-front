import {useState} from "react";
import {authService} from "../../services/authService.js";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(formData) {
        const credentials = {
            email: formData.get("email") ?? "",
            password: formData.get("password") ?? ""
        }

        const result = await authService.login(credentials);
        console.log(result);

    }

    return (
        <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center">
            <div className="max-w-md w-full border border-white rounded-xl flex flex-col p-4">
                <div className="flex flex-col justify-center items-center gap-2">
                    <h2 className="font-bold text-3xl text-center text-white">Login form</h2>
                    <p className="text-gray-400">Login to you account</p>
                </div>
                <form className="flex flex-col gap-3 text-white space-y-6" action={handleLogin}>
                    {/*Email field*/}
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input
                            required
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email@example.com"
                            className="border-gray-400 p-3  border rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    {/*Password field*/}
                    <div className="flex flex-col">
                        <label className="text-gray-400" htmlFor="password">Password</label>
                        <input
                            required
                            type="password"
                            id="password"
                            name="password"
                            placeholder="******"
                            className="border-gray-400 p-3  border rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/*Terms and conditions*/}
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

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white cursor-pointer bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 transition-colors duration-200">Login
                    </button>
                    {/* Register Link */}
                    <div className="text-center">
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <a href="/register" className="text-blue-400 hover:text-blue-300 underline font-medium">
                                Register in here
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default LoginPage;