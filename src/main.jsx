// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-datepicker/dist/react-datepicker.css';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
