import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals'
import './index.css'
import App from './App.jsx'

if (typeof window !== 'undefined') {
  onLCP((metric) => console.log('[WebVitals] LCP:', metric.value.toFixed(0) + 'ms', metric));
  onINP((metric) => console.log('[WebVitals] INP:', metric.value.toFixed(0) + 'ms', metric));
  onCLS((metric) => console.log('[WebVitals] CLS:', metric.value.toFixed(3), metric));
  onFCP((metric) => console.log('[WebVitals] FCP:', metric.value.toFixed(0) + 'ms', metric));
  onTTFB((metric) => console.log('[WebVitals] TTFB:', metric.value.toFixed(0) + 'ms', metric));
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)


