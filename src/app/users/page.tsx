'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type User = {
  id: number;
  name: string;
  username: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Users</h1>

      <div className="space-y-6">
        {users.map(user => (
          <Link key={user.id} href={`/users/${user.id}`}>
            <div className="flex items-center gap-4 rounded-xl shadow hover:shadow-lg transition-shadow px-6 py-4 cursor-pointer border border-gray-200">
              <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
