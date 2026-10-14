import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PortalProvider } from './context/PortalContext';
import { AppRoutes } from './routes/AppRoutes';
import { ErrorBoundary } from './components/common/ErrorBoundary';

function App() {
  return (
    <BrowserRouter>
      <PortalProvider>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </PortalProvider>
    </BrowserRouter>
  );
}

export default App;
