import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  author: string | null;
  dateRange: {
    start: string | null;
    end: string | null;
  };
  type: 'All' | 'News' | 'Blog';
  searchQuery: string;
}

const initialState: FilterState = {
  author: null,
  dateRange: {
    start: null,
    end: null,
  },
  type: 'All',
  searchQuery: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAuthorFilter: (state, action: PayloadAction<string | null>) => {
      state.author = action.payload;
    },
    setDateRange: (state, action: PayloadAction<{ start: string | null; end: string | null }>) => {
      state.dateRange = action.payload;
    },
    setTypeFilter: (state, action: PayloadAction<'All' | 'News' | 'Blog'>) => {
      state.type = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearFilters: (state) => {
      state.author = null;
      state.dateRange = { start: null, end: null };
      state.type = 'All';
      state.searchQuery = '';
    },
  },
});

export const {
  setAuthorFilter,
  setDateRange,
  setTypeFilter,
  setSearchQuery,
  clearFilters,
} = filterSlice.actions;
export default filterSlice.reducer;