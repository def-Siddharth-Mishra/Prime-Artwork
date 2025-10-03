import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { PrimeReactProvider } from 'primereact/api';

// Prime React configuration
const primeConfig = {
  ripple: true,
  inputStyle: 'outlined' as const,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <PrimeReactProvider value={primeConfig}>
        <App />
      </PrimeReactProvider>
    </ErrorBoundary>
  </StrictMode>,
)
