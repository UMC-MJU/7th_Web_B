import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import TodoDetail from './components/TodoDetail';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/todo/:id" element={<TodoDetail />} />
      </Routes>
    </Router>
  );
}

export default Main;
