import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // Import the provider
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!); // Create a root.

// Wrap your App component with the HelmetProvider
root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);