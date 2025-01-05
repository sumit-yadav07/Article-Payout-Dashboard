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
    // Search query filter
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      const matchesSearch = 
        article.title?.toLowerCase().includes(searchLower) ||
        article.description?.toLowerCase().includes(searchLower) ||
        article.author?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Multiple authors filter
    if (filters.authors.length > 0) {
      if (!article.author || !filters.authors.includes(article.author)) {
        return false;
      }
    }

    // Date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      const articleDate = new Date(article.publishedAt);
      if (filters.dateRange.start && articleDate < new Date(filters.dateRange.start)) {
        return false;
      }
      if (filters.dateRange.end && articleDate > new Date(filters.dateRange.end)) {
        return false;
      }
    }

    // Multiple types filter
    if (filters.types.length > 0) {
      const isNews = article.source?.toLowerCase().includes('news');
      const type = isNews ? 'News' : 'Blog';
      if (!filters.types.includes(type)) {
        return false;
      }
    }

    return true;
  });

  // Type distribution data
  const typeData = {
    labels: ['News', 'Blog'],
    datasets: [
      {
        data: [
          filteredArticles.filter(a => a.source?.toLowerCase().includes('news')).length,
          filteredArticles.filter(a => !a.source?.toLowerCase().includes('news')).length,
        ],
        backgroundColor: ['#3B82F6', '#10B981'],
      },
    ],
  };

  // Author distribution data
  const authorStats = filteredArticles.reduce((acc: { [key: string]: number }, article) => {
    const author = article.author || 'Unknown';
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});

  const authorData = {
    labels: Object.keys(authorStats),
    datasets: [
      {
        label: 'Articles per Author',
        data: Object.values(authorStats),
        backgroundColor: '#3B82F6',
      },
    ],
  };

  // Time trend data
  const timeStats = filteredArticles.reduce((acc: { [key: string]: number }, article) => {
    const date = new Date(article.publishedAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const timeData = {
    labels: Object.keys(timeStats),
    datasets: [
      {
        label: 'Articles over Time',
        data: Object.values(timeStats),
        borderColor: '#3B82F6',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Content Type Distribution
        </h3>
        <div style={{ width: '250px', height: '250px', margin: '0 auto' }}>
          <Pie data={typeData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Articles by Author
        </h3>
        <div style={{ width: '300px', height: '250px', margin: '0 auto' }}>
          <Bar
            data={authorData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md md:col-span-2">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Publication Trend
        </h3>
        <div style={{ width: '600px', height: '250px', margin: '0 auto' }}>
          <Line
            data={timeData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
