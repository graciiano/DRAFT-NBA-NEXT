'use client';

import React, { useEffect } from 'react';

import { store } from '@/store';
import { getMeRequest, restoreSession } from '@/store/auth/duck';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';
import { tokenStorage } from '@/utils/token';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import ToastProvider from '@/components/Toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Rajdhani:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <ToastProvider>
              <GlobalStyle />
              <AppInitializer>{children}</AppInitializer>
            </ToastProvider>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}

// Component to initialize app state
function AppInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Restore session from localStorage
    const token = tokenStorage.get();
    if (token) {
      store.dispatch(restoreSession(token));
      store.dispatch(getMeRequest());
    }
  }, []);

  return <>{children}</>;
}
