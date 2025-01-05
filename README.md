# NewsDunia Dashboard

A feature-rich news and payout dashboard built using React, Redux Toolkit, Appwrite, and various APIs. Manage news/blog articles, calculate author payouts, and analyze statistics with ease.

## Features

- **User Authentication**
  - Email/password login
  - Third-party authentication (GitHub) via Appwrite
  - Secure session management

- **News/Blog Management**
  - Dynamic article fetching and filtering
  - Filter by author, date range, and content type
  - Real-time updates and pagination

- **Payout System**
  - Automated payout calculations
  - Configurable payout rates by content type
  - Batch processing capabilities

- **Analytics Dashboard**
  - Interactive charts (pie, bar, line)
  - Article performance metrics
  - Payout trend analysis

- **Export Capabilities**
  - PDF report generation
  - CSV data export
  - Google Sheets integration

- **Additional Features**
  - Dark/Light theme toggle
  - Fully responsive design

## Tech Stack

- **Frontend Framework:** React
- **State Management:** Redux Toolkit
- **Styling:** TailwindCSS
- **Backend Services:** Appwrite
- **APIs Integration:**
  - NewsAPI
  - PDFMake
- **Data Visualization:** Chart.js

## Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- Appwrite instance
- API keys for integrated services

## Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/newsdunia-dashboard.git
cd newsdunia-dashboard
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Configure API Keys

Navigate to src/components/Dashboard/ArticleList.tsx

Replace the placeholder API key with your NewsAPI key:

const API_KEY = 'your-news-api-key-here';

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
src/
├── App.tsx
├── index.css
├── main.tsx
├── components/
│   ├── Dashboard/
│   │   ├── ArticleList.tsx
│   │   └── Filters.tsx
│   ├── Layout/
│   │   ├── Navbar.tsx
│   │   └── ThemeToggle.tsx
│   └── PayoutSettings/
│       ├── PayoutTable.tsx
│       └── Statistics.tsx
├── config/
│   └── appwrite.ts
├── pages/
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── PayoutSettings.tsx
│   └── Signup.tsx
├── store/
│   ├── store.ts
│   └── slices/
│       ├── authSlice.ts
│       ├── filterSlice.ts
│       ├── newsSlice.ts
│       └── payoutSlice.ts
└── utils/
    └── theme.ts
```

## Configuration

### Appwrite Setup

1. Create a new project in Appwrite Console
2. Enable authentication methods (Email/Password, OAuth providers)
3. Create necessary collections with appropriate permissions
4. Update `src/config/appwrite.ts` with your credentials

### API Configuration

1. Obtain API keys from:
   - NewsAPI
2. Update corresponding environment variables

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
