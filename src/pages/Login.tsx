import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '../store/slices/authSlice';
import { LogIn, Github } from 'lucide-react';
import { account } from '../config/appwrite';
import ThemeToggle from '../components/Layout/ThemeToggle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check auth status on component mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const session = await account.getSession('current');
      if (session) {
        const user = await account.get();
        dispatch(setUser(user));
        navigate('/dashboard');
      }
    } catch (error) {
      // No active session, continue with login page
      console.log('No active session');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    
    try {
      const session = await account.createEmailSession(email, password);
      const user = await account.get();
      dispatch(setUser(user));
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please check your email and password.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGithubLogin = async () => {
    try {
      await account.createOAuth2Session(
        'github',
        'http://localhost:5173/dashboard',  // Success URL
        'http://localhost:5173/login',      // Failure URL
        ['user', 'user:email']             // Scopes
      );
    } catch (err) {
      setError('GitHub login failed');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <div className="p-4 flex justify-end">
        <ThemeToggle />
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">NewsDunia Login</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              Login
            </button>
          </form>

          <div className="mt-4">
            <button
              onClick={handleGithubLogin}
              className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 flex items-center justify-center gap-2"
            >
              <Github size={20} />
              Continue with GitHub
            </button>
          </div>

          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:text-blue-600">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;