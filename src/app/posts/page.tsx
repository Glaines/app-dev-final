'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    const isAdmin = user.isAdmin === true;
    const userId = user.id;

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => {
        if (isAdmin) {
          setPosts(data);
        } else {
          setPosts(data.filter((post: Post) => post.userId === userId));
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6 text-center text-gray-600">Loading posts...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-3xl bg-white/30 backdrop-blur-lg rounded-xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-10">News Feed</h1>

        <div className="space-y-6">
          {posts.map(post => (
            <div
              key={post.id}
              className="bg-white/60 backdrop-blur rounded-xl shadow-md p-6 transition hover:shadow-lg"
            >
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-gray-700 font-medium">User #{post.userId}</p>
                <p className="text-xs text-gray-500">Just now</p>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.body}</p>
              <Link
                href={`/posts/${post.id}`}
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                View Full Post
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
