import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  type: 'News' | 'Blog';
  section: string;
  url: string;
}

interface NewsState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setArticles, setLoading, setError } = newsSlice.actions;
export default newsSlice.reducer;