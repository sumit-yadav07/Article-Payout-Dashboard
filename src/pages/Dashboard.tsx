import React from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Layout/Navbar';
import Filters from '../components/Dashboard/Filters';
import ArticleList from '../components/Dashboard/ArticleList';


const Dashboard = () => {
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

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