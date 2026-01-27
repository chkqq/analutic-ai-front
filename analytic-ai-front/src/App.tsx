import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/mainPage'
import ChatPage from './pages/chatPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  )
}
