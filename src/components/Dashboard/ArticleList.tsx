import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { RootState, AppDispatch } from '../../store/store';
import { fetchArticles } from '../../store/slices/newsSlice';

const ArticleList = () => {
  const { articles, loading, error } = useSelector((state: RootState) => state.news);
  const filters = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const apiKey = 'ead002b4de73470084cec979e824f9c8';
    dispatch(fetchArticles(apiKey));
  }, [dispatch]);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
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
  }, [articles, filters]);

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredArticles.map((article) => (
        <div key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Author:</strong> {article.author || 'Unknown'}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Source:</strong> {article.source}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{article.description}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Published:</strong> {new Date(article.publishedAt).toLocaleString()}
          </p>
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