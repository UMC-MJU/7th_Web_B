import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TodoContextProvider } from './context/TodoContext.jsx'

createRoot(document.getElementById('root')).render(
  // App 컴포넌트에서 TodoContext를 사용할 수 있다.
  <StrictMode>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </StrictMode>
)
