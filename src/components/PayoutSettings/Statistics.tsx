import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const { articles } = useSelector((state: RootState) => state.news);
  const filters = useSelector((state: RootState) => state.filter);

  const filteredArticles = articles.filter(article => {
    if (filters.author && article.author !== filters.author) return false;
    if (filters.type !== 'All' && article.type !== filters.type) return false;
    if (filters.dateRange.start && new Date(article.date) < new Date(filters.dateRange.start)) return false;
    if (filters.dateRange.end && new Date(article.date) > new Date(filters.dateRange.end)) return false;
    return true;
  });

  // Type distribution data
  const typeData = {
    labels: ['News', 'Blog'],
    datasets: [{
      data: [
        filteredArticles.filter(a => a.type === 'News').length,
        filteredArticles.filter(a => a.type === 'Blog').length,
      ],
      backgroundColor: ['#3B82F6', '#10B981'],
    }],
  };

  // Author distribution data
  const authorStats = filteredArticles.reduce((acc: { [key: string]: number }, article) => {
    acc[article.author] = (acc[article.author] || 0) + 1;
    return acc;
  }, {});

  const authorData = {
    labels: Object.keys(authorStats),
    datasets: [{
      label: 'Articles per Author',
      data: Object.values(authorStats),
      backgroundColor: '#3B82F6',
    }],
  };

  // Time trend data
  const timeStats = filteredArticles.reduce((acc: { [key: string]: number }, article) => {
    const date = new Date(article.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const timeData = {
    labels: Object.keys(timeStats),
    datasets: [{
      label: 'Articles over Time',
      data: Object.values(timeStats),
      borderColor: '#3B82F6',
      tension: 0.1,
    }],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Content Type Distribution</h3>
        <Pie data={typeData} options={{ responsive: true }} />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Articles by Author</h3>
        <Bar
          data={authorData}
          options={{
            responsive: true,
            scales: {
              y: { beginAtZero: true }
            }
          }}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md md:col-span-2">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Publication Trend</h3>
        <Line
          data={timeData}
          options={{
            responsive: true,
            scales: {
              y: { beginAtZero: true }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Statistics;