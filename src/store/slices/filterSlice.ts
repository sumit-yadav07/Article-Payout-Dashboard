import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  authors: string[];  // Changed from single author to array
  dateRange: {
    start: string | null;
    end: string | null;
  };
  types: string[];  // Changed from single type to array
  searchQuery: string;
}

const initialState: FilterState = {
  authors: [],
  dateRange: {
    start: null,
    end: null,
  },
  types: [],
  searchQuery: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAuthorFilters: (state, action: PayloadAction<string[]>) => {
      state.authors = action.payload;
    },
    setDateRange: (state, action: PayloadAction<{ start: string | null; end: string | null }>) => {
      state.dateRange = action.payload;
    },
    setTypeFilters: (state, action: PayloadAction<string[]>) => {
      state.types = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearFilters: (state) => {
      state.authors = [];
      state.dateRange = { start: null, end: null };
      state.types = [];
      state.searchQuery = '';
    },
  },
});

export const {
  setAuthorFilters,
  setDateRange,
  setTypeFilters,
  setSearchQuery,
  clearFilters,
} = filterSlice.actions;
export default filterSlice.reducer;