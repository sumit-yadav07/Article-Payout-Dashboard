import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setArticles } from '../store/slices/newsSlice';
import Navbar from '../components/Layout/Navbar';
import Filters from '../components/Dashboard/Filters';
import ArticleList from '../components/Dashboard/ArticleList';

// Mock data
const mockArticles = [
  {
    id: "1",
    title: "Sports News Update",
    author: "John Doe",
    date: "2025-01-01",
    type: "News",
    section: "sports",
    url: "https://www.example.com/sports-news"
  },
  {
    id: "2",
    title: "Breaking Football News",
    author: "Jane Smith",
    date: "2025-01-02",
    type: "Blog",
    section: "football",
    url: "https://www.example.com/football-blog"
  },
  {
    id: "3",
    title: "Cricket World Cup Highlights",
    author: "Unknown",
    date: "2025-01-03",
    type: "News",
    section: "cricket",
    url: "https://www.example.com/cricket-highlights"
  }
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  useEffect(() => {
    // Load mock data
    dispatch(setArticles(mockArticles));
  }, [dispatch]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Filters />
        <ArticleList />
      </main>
    </div>
  );
};

export default Dashboard;