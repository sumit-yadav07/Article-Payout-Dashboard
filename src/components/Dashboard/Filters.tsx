import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  setAuthorFilter,
  setDateRange,
  setTypeFilter,
  setSearchQuery,
  clearFilters,
} from '../../store/slices/filterSlice';
import { Filter, X } from 'lucide-react';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter);
  const { articles } = useSelector((state: RootState) => state.news);

  const uniqueAuthors = [...new Set(articles.map(article => article.author))];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-white">
          <Filter size={20} />
          Filters
        </h2>
        <button
          onClick={() => dispatch(clearFilters())}
          className="text-red-500 hover:text-red-600 flex items-center gap-1"
        >
          <X size={16} />
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Search
          </label>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search articles..."
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Author
          </label>
          <select
            value={filters.author || ''}
            onChange={(e) => dispatch(setAuthorFilter(e.target.value || null))}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Authors</option>
            {uniqueAuthors.map(author => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => dispatch(setTypeFilter(e.target.value as 'All' | 'News' | 'Blog'))}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Types</option>
            <option value="News">News</option>
            <option value="Blog">Blog</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date Range
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={filters.dateRange.start || ''}
              onChange={(e) => dispatch(setDateRange({
                ...filters.dateRange,
                start: e.target.value || null
              }))}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={filters.dateRange.end || ''}
              onChange={(e) => dispatch(setDateRange({
                ...filters.dateRange,
                end: e.target.value || null
              }))}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;