'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginAction } from '@/app/actions/form-actions';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const LoginForm = () => {
const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setAccessToken, setUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await loginAction({ email, password });

    setIsLoading(false);

    if (result.success && result.accessToken && result.user) {
      setAccessToken(result.accessToken)
      setUser(result.user);
      router.push(result.redirect || '/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
  };


  return (
    <div className="bg-primary border border-gray-700/50 rounded-md p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wider">
          LOG IN
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-foreground border-gray-600 text-white font-michroma placeholder-gray-400 h-12 rounded-lg focus:border-purple-500 focus:ring-purple-500 transition-colors"
            required
          />

          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-foreground border-gray-600 text-white font-michroma placeholder-gray-400 h-12 rounded-lg focus:border-purple-500 focus:ring-purple-500 transition-colors"
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm font-michroma text-center">
            {error}
          </div>
        )}

        <div className="text-center">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 text-lg font-michroma bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
          >
            {isLoading ? 'Logging in...' : 'Log in'}
            <LogIn className="ml-2 h-5 w-5" />
          </Button>
          <a
            href="#"
            className="text-sm font-michroma text-blue-300 hover:text-purple-400 transition-colors block mt-2"
          >
            Forgot your password?
          </a>
        </div>

        <div className="text-center">
          <a className="text-gray-400 text-sm font-michroma">
            Don't have an account?{' '}
          </a>
          <a
            href="#"
            className="text-blue-300 font-michroma hover:text-blue-300 text-sm font-medium transition-colors"
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;