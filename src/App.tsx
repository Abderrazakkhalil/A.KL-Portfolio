import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout/Layout'
import WelcomeSplash from './components/WelcomeSplash/WelcomeSplash'
import './App.css'

const GraphicDesign = lazy(() => import('./pages/GraphicDesign'))
const Academic = lazy(() => import('./pages/Academic'))
const PersonalLife = lazy(() => import('./pages/PersonalLife'))

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <WelcomeSplash />
      <Router>
        <Layout>
          <Suspense fallback={<div className="min-h-screen bg-[#090d1a]" />}>
            <Routes>
              {/* Redirect root to experience since LandingPage was deleted */}
              <Route path="/" element={<Navigate to="/experience" replace />} />
              <Route path="/ambitions" element={<GraphicDesign />} />
              <Route path="/experience" element={<Academic />} />
              <Route path="/parascolaire" element={<PersonalLife />} />

              <Route path="/design" element={<Navigate to="/ambitions" replace />} />
              <Route path="/academic" element={<Navigate to="/experience" replace />} />
              <Route path="/personal" element={<Navigate to="/parascolaire" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
