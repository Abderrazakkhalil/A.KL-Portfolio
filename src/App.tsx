import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout/Layout'
import LandingPage from './pages/LandingPage'
import GraphicDesign from './pages/GraphicDesign'
import Academic from './pages/Academic'
import PersonalLife from './pages/PersonalLife'
import './App.css'

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/ambitions" element={<GraphicDesign />} />
            <Route path="/experience" element={<Academic />} />
            <Route path="/parascolaire" element={<PersonalLife />} />

            <Route path="/design" element={<Navigate to="/ambitions" replace />} />
            <Route path="/academic" element={<Navigate to="/experience" replace />} />
            <Route path="/personal" element={<Navigate to="/parascolaire" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
