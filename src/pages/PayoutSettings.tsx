import React from 'react';
import Navbar from '../components/Layout/Navbar';
import Statistics from '../components/PayoutSettings/Statistics';
import PayoutTable from '../components/PayoutSettings/PayoutTable';

const PayoutSettings = () => {
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
        <Statistics />
        <PayoutTable />
      </main>
    </div>
  );
};

export default PayoutSettings;