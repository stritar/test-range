import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import { Isolation } from './Isolation';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Isolation />
  </StrictMode>
);
