# Prime Artworks - Art Institute of Chicago Collection Browser

A modern, production-ready React application for browsing and managing artwork collections from the Art Institute of Chicago API. Built with TypeScript, Vite, and PrimeReact for optimal performance and user experience.

## 🚀 Features

### Core Functionality
- **Server-side Pagination**: Efficient data loading with proper API integration
- **Cross-page Selection**: Select and maintain selections across different pages
- **Bulk Selection**: Select multiple rows with custom count input
- **Persistent State**: Selections persist in localStorage across browser sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Technical Highlights
- **Production Ready**: Error boundaries, loading states, and proper error handling
- **Modular Architecture**: Separated concerns with custom hooks, services, and utilities
- **TypeScript**: Fully typed for better development experience and reliability
- **Environment Configuration**: Configurable API endpoints for different environments
- **Performance Optimized**: Code splitting, lazy loading, and build optimizations

## 🛠 Technology Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **UI Library**: PrimeReact 10 (DataTable, Pagination, etc.)
- **Styling**: Tailwind CSS 4
- **State Management**: Custom React hooks
- **HTTP Client**: Native fetch API with error handling
- **Development**: ESLint, Hot Module Replacement

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Table.tsx       # Main DataTable component
│   └── ErrorBoundary.tsx # Error handling boundary
├── hooks/              # Custom React hooks
│   ├── useArtworks.ts  # Data fetching and pagination
│   └── useSelection.ts # Selection state management  
├── services/           # API services
│   └── artworkApi.ts   # API client and error handling
├── types/              # TypeScript type definitions
│   └── index.ts        # Interface definitions
├── utils/              # Utility functions
│   └── index.ts        # Helper functions
├── config/             # Configuration
│   └── index.ts        # Environment and app config
├── constants/          # Application constants
│   └── index.ts        # UI constants and messages
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm 9+ or yarn 1.22+

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd prime-artworks
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   
   Create `.env` file (optional - defaults are provided):
   ```env
   VITE_API_BASE_URL=https://api.artic.edu/api/v1
   VITE_ARTWORKS_ENDPOINT=/artworks
   VITE_APP_NAME=Prime Artworks
   VITE_DEFAULT_PAGE_SIZE=12
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or  
yarn preview
```

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables in Netlify dashboard

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

## 🔧 Development Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run type-check` | Run TypeScript type checking |

## 📊 API Integration

### Data Source
- **API**: Art Institute of Chicago API
- **Endpoint**: `https://api.artic.edu/api/v1/artworks`
- **Documentation**: [Art Institute of Chicago API Docs](https://api.artic.edu/docs/)

### Implementation Details
- Server-side pagination for performance
- No client-side caching to prevent memory bloat
- Fresh API calls on every page change
- Error handling for network issues
- Configurable via environment variables

### Data Fields Used
- `title` - Artwork title
- `place_of_origin` - Origin location
- `artist_display` - Artist information
- `inscriptions` - Artwork inscriptions
- `date_start` - Start date
- `date_end` - End date

*Note: ID field is hidden from display but used internally for selection management*

## ✨ Key Features Explained

### Cross-Page Selection
- Selections persist when navigating between pages
- Uses localStorage for session persistence
- Efficient selection state management
- Visual indicators for selected count

### Bulk Selection
- Select custom number of rows across multiple pages
- Smart pagination - continues to next pages if needed
- Loading indicators during bulk operations
- Prevents selection of already selected rows

### Error Handling
- React Error Boundary for component-level errors
- API error handling with user-friendly messages
- Development vs production error display
- Automatic retry mechanisms

### Performance Optimizations
- Code splitting for smaller bundle sizes
- Lazy loading of non-critical components
- Debounced user interactions
- Optimized re-renders with proper dependency arrays

## 🔍 Code Quality

- **TypeScript**: Full type safety and IntelliSense
- **ESLint**: Code quality and consistency
- **Modern React**: Hooks, functional components, and best practices
- **Separation of Concerns**: Clear separation between UI, logic, and data
- **Error Boundaries**: Graceful error handling
- **Performance**: Optimized builds and runtime performance

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Art Institute of Chicago for providing the public API
- PrimeReact team for the excellent component library
- React and Vite teams for the amazing development experience

---

**Note**: This application was built following senior-level React development practices with emphasis on maintainability, scalability, and production readiness.# Prime-Artwork
