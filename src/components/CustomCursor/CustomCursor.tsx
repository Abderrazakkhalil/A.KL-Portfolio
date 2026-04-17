import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useCursorStore } from '../../store/store'

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const { cursorVariant } = useCursorStore()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
    },
    click: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      scale: 0.8,
    },
  }

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor */}
      <motion.div
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:block"
      >
        <div className="w-full h-full rounded-full border-2 border-[#58a6ff] bg-[#58a6ff]/15 shadow-[0_0_12px_rgba(88,166,255,0.4)]" />
      </motion.div>

      {/* Cursor trail */}
      <motion.div
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9999] hidden md:block"
      >
        <div className="w-full h-full rounded-full bg-[#58a6ff] shadow-[0_0_8px_rgba(88,166,255,0.6)]" />
      </motion.div>
    </>
  )
}

export default CustomCursor
