import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { FileText, Newspaper } from 'lucide-react';

const ArticleList = () => {
  const { articles } = useSelector((state: RootState) => state.news);
  const filters = useSelector((state: RootState) => state.filter);

  const filteredArticles = articles.filter(article => {
    if (filters.author && article.author !== filters.author) return false;
    if (filters.type !== 'All' && article.type !== filters.type) return false;
    if (filters.dateRange.start && new Date(article.date) < new Date(filters.dateRange.start)) return false;
    if (filters.dateRange.end && new Date(article.date) > new Date(filters.dateRange.end)) return false;
    if (filters.searchQuery && !article.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredArticles.map(article => (
        <div key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            {article.type === 'News' ? (
              <Newspaper className="text-blue-500" size={20} />
            ) : (
              <FileText className="text-green-500" size={20} />
            )}
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {article.type}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            {article.title}
          </h3>
          
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <span>{article.author}</span>
            <span>{new Date(article.date).toLocaleDateString()}</span>
          </div>
          
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
          >
            Read More →
          </a>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;