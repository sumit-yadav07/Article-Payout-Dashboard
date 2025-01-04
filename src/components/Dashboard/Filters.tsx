// filters.tsx
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { RootState } from '../../store/store';
import {
  setAuthorFilters,
  setDateRange,
  setTypeFilters,
  setSearchQuery,
  clearFilters,
} from '../../store/slices/filterSlice';
import { Filter, X, ChevronDown } from 'lucide-react';

const Dropdown = ({ 
  label, 
  options, 
  selectedValues, 
  onChange 
}: { 
  label: string; 
  options: string[]; 
  selectedValues: string[];
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 border rounded flex justify-between items-center bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {selectedValues.length ? `${selectedValues.length} selected` : `Select ${label}`}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border rounded-md shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2">
            {options.map(option => (
              <div key={option} className="flex items-center mb-2 last:mb-0">
                <input
                  type="checkbox"
                  id={`${label}-${option}`}
                  checked={selectedValues.includes(option)}
                  onChange={() => onChange(option)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                />
                <label
                  htmlFor={`${label}-${option}`}
                  className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter);
  const { articles } = useSelector((state: RootState) => state.news);

  // Get unique authors and remove null values
  const uniqueAuthors = [...new Set(articles.filter(article => article.author).map(article => article.author))];

  const handleAuthorChange = (author: string) => {
    const newAuthors = filters.authors.includes(author)
      ? filters.authors.filter(a => a !== author)
      : [...filters.authors, author];
    dispatch(setAuthorFilters(newAuthors));
  };

  const handleTypeChange = (type: string) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    dispatch(setTypeFilters(newTypes));
  };

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
            Authors
          </label>
          <Dropdown
            label="Authors"
            options={uniqueAuthors}
            selectedValues={filters.authors}
            onChange={handleAuthorChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Types
          </label>
          <Dropdown
            label="Types"
            options={['News', 'Blog']}
            selectedValues={filters.types}
            onChange={handleTypeChange}
          />
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