'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (pathname === '/login' || pathname === '/register' || pathname === '/') return null;

  const commonLinks = (
    <>
      <Link href="/" className="text-gray-900 hover:text-blue-500 font-medium transition">
        Home
      </Link>
      <Link href="/users" className="text-gray-900 hover:text-blue-500 font-medium transition">
        Users
      </Link>
      <Link href="/posts" className="text-gray-900 hover:text-blue-500 font-medium transition">
        Posts
      </Link>
      <Link href="/chart" className="text-gray-900 hover:text-blue-500 font-medium transition">
        Dashboard
      </Link>
    </>
  );

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-3xl font-semibold text-blue-600 hover:text-blue-700">
          MyApp
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {pathname !== '/myposts' && commonLinks}
          {user && (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 hover:text-gray-900">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md px-4 py-6 space-y-4 z-20">
          {pathname !== '/myposts' && commonLinks}
          {user && (
            <button
              onClick={handleLogout}
              className="w-full text-left text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
