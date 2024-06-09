import './App.css';
import { Routes ,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Events from './components/Events';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/events" element={<Events/>} />
    </Routes>
  );
}

export default App;
