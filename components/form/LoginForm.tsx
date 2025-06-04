"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogIn } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // Handle login logic here
  };

  return (
    <div className=" bg-primary border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wider">
          LOG IN
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6  ">
        <div className="space-y-4  ">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-900/70 border-gray-600 text-white font-michroma placeholder-gray-400 h-12 rounded-lg focus:border-purple-500 focus:ring-purple-500 transition-colors"
            required
          />
          
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-900/70 border-gray-600 text-white font-michroma placeholder-gray-400 h-12 rounded-lg focus:border-purple-500 focus:ring-purple-500 transition-colors"
            required
          />
        </div>
        
       
        
        <div className="text-center  ">
           <Button
          type="submit"
          className="w-full h-12 text-lg  font-michroma bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white   rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
        >
           Log in
        </Button>
          <a
            href="#"
            className="text-sm font-michroma text-blue-300 hover:text-purple-400 transition-colors"
          >
            Forgot your password?
          </a>
        </div>
        
        <div className="text-center  ">
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