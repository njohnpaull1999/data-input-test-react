import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { InputProvider } from './contexts/InputContext';
import { CalculationProvider } from './contexts/CalculationContext';
import { OutputProvider } from './contexts/OutputContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <InputProvider>
      <CalculationProvider>
        <OutputProvider>
          <App />
        </OutputProvider>
      </CalculationProvider>
    </InputProvider>
  </React.StrictMode>
)
