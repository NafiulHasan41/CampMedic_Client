import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import './index.css'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from './providers/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';
import { router } from './Routes/Routes';
import ScrollToTop from './Components/ScrollingHandle/ScrollToTop';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
            <RouterProvider router={router} >
              <ScrollToTop/>
            </RouterProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>

  </React.StrictMode>,
)
