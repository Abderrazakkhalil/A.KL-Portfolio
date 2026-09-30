import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const WelcomeSplash: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    // Decreased duration to 2500ms
    const timer = setTimeout(() => setShowWelcome(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {showWelcome && (
        <motion.div
          key="welcome"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: prefersReduced ? 1 : 1.04 }}
          transition={{ duration: 0.65 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999, // Ensure it's on top
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            padding: '0 24px 80px',
            backgroundImage:
              'linear-gradient(180deg, rgba(6,6,6,0.08) 0%, rgba(6,6,6,0.45) 45%, rgba(6,6,6,0.93) 100%), url(/welcome-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <motion.p
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.22, duration: 0.52 }}
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
                margin: 0,
                lineHeight: 1,
              }}
            >
              Khalil Abderrazak
            </motion.p>
            <motion.p
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.38, duration: 0.48 }}
              style={{
                marginTop: '0.6rem',
                color: 'rgba(255,255,255,0.72)',
                fontSize: '0.8rem',
                letterSpacing: '0.22em',
                fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
                textTransform: 'uppercase',
              }}
            >
              Élève-Ingénieur IA · Centrale Lyon · ENSAM · M2 ID3D
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WelcomeSplash
