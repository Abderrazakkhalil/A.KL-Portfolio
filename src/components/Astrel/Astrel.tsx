import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Astrel: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: 80 })
  const [direction, setDirection] = useState<'right' | 'left'>('right')
  const [isWalking, setIsWalking] = useState(true)

  useEffect(() => {
    const moveKitten = () => {
      setPosition(prev => {
        let newX = prev.x
        const newY = prev.y

        // Move horizontally
        if (direction === 'right') {
          newX += 2
          if (newX > window.innerWidth) {
            setDirection('left')
            setIsWalking(false)
            setTimeout(() => setIsWalking(true), 1000) // Pause before turning
          }
        } else {
          newX -= 2
          if (newX < -100) {
            setDirection('right')
            setIsWalking(false)
            setTimeout(() => setIsWalking(true), 1000)
          }
        }

        return { x: newX, y: newY }
      })
    }

    const interval = setInterval(moveKitten, 50)
    return () => clearInterval(interval)
  }, [direction])

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: `${position.x}px`,
        bottom: `${position.y}px`,
        transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
      }}
      animate={{
        y: isWalking ? [0, -5, 0] : 0,
      }}
      transition={{
        y: {
          repeat: Infinity,
          duration: 0.4,
          ease: 'easeInOut',
        },
      }}
    >
      {/* Astrel - White kitten with gray ears */}
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        {/* Tail */}
        <motion.path
          d="M 48 40 Q 55 35, 58 42"
          stroke="#d0d0d0"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={{
            d: isWalking 
              ? ['M 48 40 Q 55 35, 58 42', 'M 48 40 Q 55 38, 58 45', 'M 48 40 Q 55 35, 58 42']
              : 'M 48 40 Q 55 35, 58 42'
          }}
          transition={{
            repeat: Infinity,
            duration: 0.6,
          }}
        />
        
        {/* Body */}
        <ellipse cx="30" cy="38" rx="16" ry="12" fill="#f5f5f5" />
        
        {/* Head */}
        <circle cx="18" cy="28" r="10" fill="#f5f5f5" />
        
        {/* Left Ear (gray) */}
        <motion.path
          d="M 12 20 L 8 12 L 16 18 Z"
          fill="#a0a0a0"
          animate={{
            d: isWalking 
              ? ['M 12 20 L 8 12 L 16 18 Z', 'M 12 20 L 7 11 L 16 17 Z', 'M 12 20 L 8 12 L 16 18 Z']
              : 'M 12 20 L 8 12 L 16 18 Z'
          }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
          }}
        />
        
        {/* Right Ear (gray) */}
        <motion.path
          d="M 24 20 L 28 12 L 20 18 Z"
          fill="#a0a0a0"
          animate={{
            d: isWalking 
              ? ['M 24 20 L 28 12 L 20 18 Z', 'M 24 20 L 29 11 L 20 17 Z', 'M 24 20 L 28 12 L 20 18 Z']
              : 'M 24 20 L 28 12 L 20 18 Z'
          }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
          }}
        />
        
        {/* Inner ears */}
        <path d="M 12 19 L 10 14 L 14 17 Z" fill="#ffc0cb" opacity="0.5" />
        <path d="M 24 19 L 26 14 L 22 17 Z" fill="#ffc0cb" opacity="0.5" />
        
        {/* Green eyes */}
        <circle cx="15" cy="27" r="2.5" fill="#4ade80" />
        <circle cx="21" cy="27" r="2.5" fill="#4ade80" />
        <circle cx="15" cy="27" r="1.2" fill="#1a1a1a" />
        <circle cx="21" cy="27" r="1.2" fill="#1a1a1a" />
        <circle cx="15.5" cy="26.5" r="0.6" fill="#ffffff" />
        <circle cx="21.5" cy="26.5" r="0.6" fill="#ffffff" />
        
        {/* Nose */}
        <path d="M 18 30 L 17 32 L 19 32 Z" fill="#ffb6c1" />
        
        {/* Mouth */}
        <path d="M 18 32 Q 16 34, 15 33" stroke="#d0d0d0" strokeWidth="0.8" fill="none" />
        <path d="M 18 32 Q 20 34, 21 33" stroke="#d0d0d0" strokeWidth="0.8" fill="none" />
        
        {/* Whiskers */}
        <line x1="10" y1="28" x2="4" y2="27" stroke="#d0d0d0" strokeWidth="0.5" />
        <line x1="10" y1="30" x2="4" y2="31" stroke="#d0d0d0" strokeWidth="0.5" />
        <line x1="26" y1="28" x2="32" y2="27" stroke="#d0d0d0" strokeWidth="0.5" />
        <line x1="26" y1="30" x2="32" y2="31" stroke="#d0d0d0" strokeWidth="0.5" />
        
        {/* Legs - animated walking */}
        <motion.ellipse
          cx="24" cy="48" rx="2.5" ry="4"
          fill="#f5f5f5"
          animate={{
            cy: isWalking ? [48, 46, 48] : 48,
          }}
          transition={{
            repeat: Infinity,
            duration: 0.4,
            delay: 0,
          }}
        />
        <motion.ellipse
          cx="30" cy="48" rx="2.5" ry="4"
          fill="#f5f5f5"
          animate={{
            cy: isWalking ? [48, 46, 48] : 48,
          }}
          transition={{
            repeat: Infinity,
            duration: 0.4,
            delay: 0.2,
          }}
        />
        <motion.ellipse
          cx="36" cy="48" rx="2.5" ry="4"
          fill="#f5f5f5"
          animate={{
            cy: isWalking ? [48, 46, 48] : 48,
          }}
          transition={{
            repeat: Infinity,
            duration: 0.4,
            delay: 0.1,
          }}
        />
        <motion.ellipse
          cx="42" cy="48" rx="2.5" ry="4"
          fill="#f5f5f5"
          animate={{
            cy: isWalking ? [48, 46, 48] : 48,
          }}
          transition={{
            repeat: Infinity,
            duration: 0.4,
            delay: 0.3,
          }}
        />
        
        {/* Paw pads */}
        <ellipse cx="24" cy="50" rx="1.5" ry="1" fill="#ffb6c1" opacity="0.6" />
        <ellipse cx="30" cy="50" rx="1.5" ry="1" fill="#ffb6c1" opacity="0.6" />
        <ellipse cx="36" cy="50" rx="1.5" ry="1" fill="#ffb6c1" opacity="0.6" />
        <ellipse cx="42" cy="50" rx="1.5" ry="1" fill="#ffb6c1" opacity="0.6" />
      </svg>
      
      {/* Name tag when hovered */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-700 opacity-0 hover:opacity-100 transition-opacity pointer-events-auto shadow-lg">
        Astrel 🐱
      </div>
    </motion.div>
  )
}

export default Astrel
