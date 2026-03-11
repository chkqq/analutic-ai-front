import { Routes, Route, Navigate } from 'react-router-dom'
import MainPage from './pages/mainPage'
import ChatPage from './pages/chatPage'
import LoginPage from './pages/loginPage'
import { useAuthStore } from './store/auth'

export default function App() {
  const { userId } = useAuthStore()

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={userId ? <MainPage /> : <Navigate to="/login" replace />} />
      <Route path="/chat" element={userId ? <ChatPage /> : <Navigate to="/login" replace />} />
    </Routes>
  )
}
