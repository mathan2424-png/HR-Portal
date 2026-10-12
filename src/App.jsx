import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PortalProvider } from './context/PortalContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <PortalProvider>
        <AppRoutes />
      </PortalProvider>
    </BrowserRouter>
  );
}

export default App;
