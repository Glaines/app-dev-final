'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DashboardPage() {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUserCount(data.length));

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPostCount(data.length));

    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(res => res.json())
      .then(data => setCommentCount(data.length));
  }, []);

  const chartOptions = {
    chart: {
      id: 'dashboard-bar',
      toolbar: { show: false },
    },
    xaxis: {
      categories: ['Users', 'Posts', 'Comments'],
      labels: {
        style: {
          fontSize: '14px',
          colors: ['#4B5563'],
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '45%',
      },
    },
    colors: ['#3B82F6'],
  };

  const chartSeries = [
    {
      name: 'Total',
      data: [userCount, postCount, commentCount],
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10 bg-white/50 backdrop-blur-xl rounded-2xl shadow-2xl">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">📊 Dashboard Overview</h1>

      <p className="text-gray-600 text-center text-lg mb-8">
        Summary of Users, Posts, and Comments retrieved from API.
      </p>

      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
}
