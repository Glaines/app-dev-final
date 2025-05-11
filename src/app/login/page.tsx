'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (cleanEmail === 'admin@admin.com' && cleanPassword === 'admin123') {
      const adminUser = {
        id: 0,
        name: 'Admin',
        email: 'admin@admin.com',
        isAdmin: true,
      };
      localStorage.setItem('user', JSON.stringify(adminUser));
      setTimeout(() => {
        router.push('/posts');
      }, 100);
      return;
    }

    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    const user = users.find((u: any) => u.email.toLowerCase() === cleanEmail);

    if (user && cleanPassword === user.username) {
      localStorage.setItem('user', JSON.stringify({ ...user, isAdmin: false }));
      router.push('/myposts');
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-6 py-10 border border-gray-200 rounded-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-black py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border-b border-gray-400 focus:outline-none focus:border-black py-2 text-sm"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-4">
          <a
            href="/register"
            className="text-sm text-gray-500 hover:underline"
          >
            Don’t have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
}
