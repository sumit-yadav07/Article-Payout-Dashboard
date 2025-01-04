import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Article {
  id: string;
  title: string;
  author: string | null; // Include author
  source: string;
  description: string;
  publishedAt: string;
  url: string;
  urlToImage: string | null;
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

// Fetch articles from NewsAPI
export const fetchArticles = createAsyncThunk(
  'news/fetchArticles',
  async (apiKey: string) => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );
    const data = await response.json();

    if (data.status !== 'ok') {
      throw new Error(data.message || 'Failed to fetch articles');
    }

    return data.articles.map((article: any) => ({
      id: article.url, // Use URL as a unique ID
      title: article.title,
      author: article.author,
      source: article.source.name,
      description: article.description,
      publishedAt: article.publishedAt,
      url: article.url,
      urlToImage: article.urlToImage,
    }));
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch articles';
      });
  },
});

export const { setArticles } = newsSlice.actions;
export default newsSlice.reducer;
