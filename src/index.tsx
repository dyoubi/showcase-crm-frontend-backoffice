import React from 'react';
import ReactDOM from 'react-dom/client';

import { Providers } from '@/components/Providers';
import { App } from './App';

export const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
);
