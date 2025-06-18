"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, User, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    await new Promise(resolve => setTimeout(resolve, 1000));

    const dummyUsers = [
      { username: "student1", password: "1234", role: "student" },
      { username: "faculty1", password: "abcd", role: "faculty" },
      { username: "admin", password: "admin123", role: "admin" },
    ];

    const user = dummyUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      setError("Invalid username or password");
      setIsLoading(false);
      return;
    }

    router.push (
    user.role === "student" ? "/student" :
    user.role === "faculty" ? "/faculty" :
    user.role === "admin" ? "/admin" :
    "/default");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg.png"
          alt="Background"
          fill
          className="object-cover blur-xs"
          priority
        />
      </div>

      {/* Optional Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none -z-10" />

      <div className="w-full max-w-md mx-auto lg:mx-0 z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 lg:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="flex-shrink-0">
                <Image
                  src="/images/edu.png"
                  alt="College Logo"
                  width={80}
                  height={80}
                  className="rounded-full shadow-md border-2 border-orange-200"
                  priority
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-900 bg-clip-text text-transparent">
                  Minimalistic Education
                </h1>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm text-center font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 bg-white/50 backdrop-blur-sm focus:ring-1 focus:ring-orange-300 focus:border-orange-500 focus:outline-none transition-all duration-200 placeholder-gray-500"
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl text-gray-900 bg-white/50 backdrop-blur-sm focus:ring-1 focus:ring-orange-300 focus:border-orange-500 focus:outline-none transition-all duration-200 placeholder-gray-500"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-400 to-orange-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-700 hover:to-orange-400 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-orange-600 hover:text-orange-900 font-medium transition-colors">
                Forgot Password?
              </a>
              <a href="#" className="text-orange-600 hover:text-orange-900 font-medium transition-colors">
                Need Help?
              </a>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                © 2025 Minimalistic Education. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Grid Pattern Style */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #10b981 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}
