import React, { useState } from 'react';
import { User } from '../types';
import { users } from '../data/mockData';
import Button from '../components/ui/Button';
import { Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    // For demo purposes, we'll just check if the email exists in our mock data
    // and ignore password validation
    const user = users.find(user => user.email === email);
    
    if (user) {
      onLogin(user);
    } else {
      setError('Invalid email or password');
    }
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-24 w-24 relative overflow-hidden rounded-full border-4 border-red-600">
            <img 
              src="https://images.pexels.com/photos/3782788/pexels-photo-3782788.jpeg?auto=compress&cs=tinysrgb&w=200" 
              alt="Poligrodzianie Logo" 
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Poligrodzianie
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Costume Management System
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm pr-10"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div className="text-sm text-center">
            <p>
              For demo, use any of these emails:
            </p>
            <ul className="mt-1 space-y-1">
              <li><code className="bg-gray-100 px-2 py-0.5 rounded">anna@example.com</code> (Dancer)</li>
              <li><code className="bg-gray-100 px-2 py-0.5 rounded">maria@example.com</code> (Coordinator)</li>
              <li><code className="bg-gray-100 px-2 py-0.5 rounded">jan@example.com</code> (Management)</li>
            </ul>
            <p className="mt-1">
              Password field can be anything for this demo.
            </p>
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              className="group relative py-3"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;