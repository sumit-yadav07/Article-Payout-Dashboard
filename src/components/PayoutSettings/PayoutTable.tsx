import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import * as XLSX from 'xlsx';

const PayoutTable = () => {
  const { articles } = useSelector((state: RootState) => state.news);
  const filters = useSelector((state: RootState) => state.filter);

  // Local state to manage payout rates for each author, defaulting to 100
  const [payoutRates, setPayoutRates] = useState<{ [author: string]: number }>({});

  // Filter articles based on the active filters
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      // Filter by author(s)
      if (filters.authors.length > 0 && !filters.authors.includes(article.author || '')) return false;

      // Filter by type (News/Blog)
      if (filters.types.length > 0 && !filters.types.includes(article.type)) return false;

      // Filter by date range
      if (filters.dateRange.start && new Date(article.publishedAt) < new Date(filters.dateRange.start)) return false;
      if (filters.dateRange.end && new Date(article.publishedAt) > new Date(filters.dateRange.end)) return false;

      // Filter by search query (article title or description)
      if (
        filters.searchQuery &&
        !article.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !article.description?.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [articles, filters]);

  // Author stats calculation based on filtered articles
  const authorStats = useMemo(() => {
    return filteredArticles.reduce((acc: { [key: string]: number }, article) => {
      acc[article.author || 'Unknown'] = (acc[article.author || 'Unknown'] || 0) + 1;
      return acc;
    }, {});
  }, [filteredArticles]);

  // Calculate total payout
  const totalPayout = useMemo(() => {
    return Object.entries(authorStats).reduce((sum, [author, count]) => {
      const rate = payoutRates[author] || 100; // Default rate is 100
      return sum + rate * count;
    }, 0);
  }, [authorStats, payoutRates]);

  const handleExport = (format: 'pdf' | 'csv' | 'sheets') => {
    const data = Object.entries(authorStats).map(([author, count]) => ({
      author,
      articles: count,
      payoutRate: payoutRates[author] || 100, // Default to 100 if no custom rate is set
      totalPayout: count * (payoutRates[author] || 100),
    }));

    switch (format) {
      case 'csv':
        const csv = [
          ['Author', 'Articles', 'Payout Rate (₹)', 'Total Payout (₹)'],
          ...data.map(row => [row.author, row.articles, row.payoutRate, row.totalPayout]),
        ]
          .map(row => row.join(','))
          .join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'payout-report.csv';
        a.click();
        break;

      case 'pdf':
        const doc = new jsPDF();
        doc.autoTable({
          head: [['Author', 'Articles', 'Payout Rate (₹)', 'Total Payout (₹)']],
          body: data.map(row => [row.author, row.articles, row.payoutRate, row.totalPayout]),
        });
        doc.save('payout-report.pdf');
        break;

      case 'sheets':
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Payouts');
        XLSX.writeFile(wb, 'payout-report.xlsx');
        break;
    }
  };

  const handlePayoutRateChange = (author: string, rate: number) => {
    setPayoutRates(prev => ({ ...prev, [author]: rate }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Payout Table</h2>

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

      {/* Total Payout Section */}
      <div className="p-4 border-b dark:border-gray-700">
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Total Payout: ₹{totalPayout.toLocaleString()}
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
                    Payout Rate (₹)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total Payout (₹)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {Object.entries(authorStats).map(([author, count]) => (
                  <tr key={author}>
                    <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-300">{author}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-300">{count}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-300">
                      <input
                        type="number"
                        value={payoutRates[author] || 100} // Default rate is 100
                        onChange={(e) => handlePayoutRateChange(author, Number(e.target.value))}
                        className="w-20 p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        min="0"
                      />
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-300">
                      ₹{((payoutRates[author] || 100) * count).toLocaleString()}
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
