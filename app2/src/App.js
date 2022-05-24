import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './RegisterPage/RegisterPage'
import LoginPage from './LoginPage/LoginPage'
import './App.css'
import ChatPage from './ChatPage/ChatPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/RegisterPage' element={<RegisterPage />}></Route>
        <Route path='/' element={<LoginPage />}></Route>
        <Route path='/ChatPage' element={<ChatPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;