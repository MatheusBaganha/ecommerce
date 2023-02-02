import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/styles.scss';
import { ContextCommerce } from './context/ContextCommerce';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextCommerce>
      <App />
    </ContextCommerce>
  </React.StrictMode>,
);
