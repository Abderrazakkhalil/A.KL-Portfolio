import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-2 z-50 bg-vintage-rust border-b-2 border-vintage-tan shadow-vintage"
      style={{ scaleX: scrollProgress / 100, transformOrigin: '0%' }}
      initial={{ scaleX: 0 }}
    />
  )
}

export default ScrollProgress
