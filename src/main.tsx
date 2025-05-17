import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Dashboard from './Dashboard.tsx'
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";



createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <PrimeReactProvider>
          <Dashboard />
      </PrimeReactProvider>
  </StrictMode>,
)
