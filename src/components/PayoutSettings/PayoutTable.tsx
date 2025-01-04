import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { Download } from 'lucide-react';
import { setGlobalPayoutRate } from '../../store/slices/payoutSlice';

const PayoutTable = () => {
  const { articles } = useSelector((state: RootState) => state.news);
  const filters = useSelector((state: RootState) => state.filter);
  const { globalPayoutRate } = useSelector((state: RootState) => state.payout);
  const dispatch = useDispatch();

  const filteredArticles = articles.filter(article => {
    if (filters.author && article.author !== filters.author) return false;
    if (filters.type !== 'All' && article.type !== filters.type) return false;
    if (filters.dateRange.start && new Date(article.date) < new Date(filters.dateRange.start)) return false;
    if (filters.dateRange.end && new Date(article.date) > new Date(filters.dateRange.end)) return false;
    return true;
  });

  const authorStats = filteredArticles.reduce((acc: { [key: string]: number }, article) => {
    acc[article.author] = (acc[article.author] || 0) + 1;
    return acc;
  }, {});

  const handleExport = (format: 'pdf' | 'csv' | 'sheets') => {
    const data = Object.entries(authorStats).map(([author, count]) => ({
      author,
      articles: count,
      payoutRate: globalPayoutRate,
      totalPayout: count * globalPayoutRate
    }));

    switch (format) {
      case 'csv':
        const csv = [
          ['Author', 'Articles', 'Payout Rate (₹)', 'Total Payout (₹)'],
          ...data.map(row => [row.author, row.articles, row.payoutRate, row.totalPayout])
        ].map(row => row.join(',')).join('\n');
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'payout-report.csv';
        a.click();
        break;
      // Implement other export formats similarly
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Payout Table</h2>
          
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">Global Rate (₹):</label>
              <input
                type="number"
                value={globalPayoutRate}
                onChange={(e) => dispatch(setGlobalPayoutRate(Number(e.target.value)))}
                className="w-24 p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                min="0"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => handleExport('pdf')}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
              >
                <Download size={16} />
                PDF
              </button>
              <button
                onClick={() => handleExport('csv')}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
              >
                <Download size={16} />
                CSV
              </button>
              <button
                onClick={() => handleExport('sheets')}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
              >
                <Download size={16} />
                Sheets
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Articles Count
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total Payout (₹)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {Object.entries(authorStats).map(([author, count]) => (
                  <tr key={author}>
                    <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-300">
                      {author}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-300">
                      {count}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-300">
                      ₹{(globalPayoutRate * count).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayoutTable;