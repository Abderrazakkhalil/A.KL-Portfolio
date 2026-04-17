import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const experienceImages = import.meta.glob('/public/experience/**/*.{png,jpg,jpeg,webp}')
const parascoImages = import.meta.glob('/public/parasco/**/*.{png,jpg,jpeg,webp}')
const ambitionImages = import.meta.glob('/public/about_me/Art/*.{png,jpg,jpeg,webp}')
const ambitionRootImages = import.meta.glob('/public/about_me/*.{png,jpg,jpeg,webp}')

const firstImagePath = (modules: Record<string, unknown>): string | undefined => {
  return Object.keys(modules).sort((a, b) => a.localeCompare(b))[0]?.replace('/public', '')
}

const firstFromMultiple = (...sources: Array<Record<string, unknown>>): string | undefined => {
  const merged = Object.assign({}, ...sources)
  return firstImagePath(merged)
}

const sections = [
  {
    title: 'Experience',
    path: '/experience',
    accent: '#f4b740',
    image: firstImagePath(experienceImages) ?? '/profile.png',
  },
  {
    title: 'Activités parascolaires',
    path: '/parascolaire',
    accent: '#7ed4c6',
    image: firstImagePath(parascoImages) ?? '/profile.png',
  },
  {
    title: 'Mes Ambitions',
    path: '/ambitions',
    accent: '#8cc7ff',
    image: firstFromMultiple(ambitionRootImages, ambitionImages) ?? '/profile.png',
  },
]

const honeyDecor = [
  { left: '1%', top: '24%', size: 54, border: 'rgba(244,183,64,0.28)', fill: 'rgba(244,183,64,0.03)' },
  { left: '7%', top: '13%', size: 86, border: 'rgba(244,183,64,0.62)', fill: 'rgba(244,183,64,0.08)' },
  { left: '13%', top: '30%', size: 66, border: 'rgba(244,183,64,0.32)', fill: 'rgba(244,183,64,0.03)' },
  { left: '20%', top: '18%', size: 58, border: 'rgba(244,183,64,0.35)', fill: 'rgba(244,183,64,0.02)' },
  { left: '27%', top: '10%', size: 72, border: 'rgba(244,183,64,0.45)', fill: 'rgba(244,183,64,0.06)' },
  { left: '35%', top: '24%', size: 122, border: 'rgba(244,183,64,0.85)', fill: 'rgba(244,183,64,0.1)' },
  { left: '46%', top: '14%', size: 62, border: 'rgba(244,183,64,0.34)', fill: 'rgba(244,183,64,0.02)' },
  { left: '53%', top: '8%', size: 90, border: 'rgba(244,183,64,0.58)', fill: 'rgba(244,183,64,0.08)' },
  { left: '60%', top: '24%', size: 84, border: 'rgba(244,183,64,0.62)', fill: 'rgba(244,183,64,0.07)' },
  { left: '69%', top: '12%', size: 68, border: 'rgba(244,183,64,0.37)', fill: 'rgba(244,183,64,0.03)' },
  { left: '76%', top: '22%', size: 74, border: 'rgba(244,183,64,0.52)', fill: 'rgba(244,183,64,0.05)' },
  { left: '84%', top: '15%', size: 58, border: 'rgba(244,183,64,0.36)', fill: 'rgba(244,183,64,0.02)' },
  { left: '89%', top: '27%', size: 70, border: 'rgba(244,183,64,0.48)', fill: 'rgba(244,183,64,0.04)' },
  { left: '95%', top: '22%', size: 48, border: 'rgba(244,183,64,0.28)', fill: 'rgba(244,183,64,0.02)' },
  { left: '4%', top: '46%', size: 48, border: 'rgba(244,183,64,0.25)', fill: 'rgba(244,183,64,0.015)' },
  { left: '12%', top: '55%', size: 62, border: 'rgba(244,183,64,0.3)', fill: 'rgba(244,183,64,0.02)' },
  { left: '22%', top: '49%', size: 56, border: 'rgba(244,183,64,0.28)', fill: 'rgba(244,183,64,0.016)' },
  { left: '31%', top: '58%', size: 74, border: 'rgba(244,183,64,0.35)', fill: 'rgba(244,183,64,0.03)' },
  { left: '44%', top: '52%', size: 52, border: 'rgba(244,183,64,0.25)', fill: 'rgba(244,183,64,0.015)' },
  { left: '52%', top: '60%', size: 64, border: 'rgba(244,183,64,0.33)', fill: 'rgba(244,183,64,0.02)' },
  { left: '63%', top: '50%', size: 50, border: 'rgba(244,183,64,0.24)', fill: 'rgba(244,183,64,0.012)' },
  { left: '72%', top: '57%', size: 70, border: 'rgba(244,183,64,0.35)', fill: 'rgba(244,183,64,0.024)' },
  { left: '83%', top: '49%', size: 54, border: 'rgba(244,183,64,0.27)', fill: 'rgba(244,183,64,0.015)' },
  { left: '92%', top: '56%', size: 46, border: 'rgba(244,183,64,0.24)', fill: 'rgba(244,183,64,0.012)' },
]

const LandingPage: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {showWelcome ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-14 md:pb-20"
            style={{
              backgroundImage:
                'linear-gradient(180deg, rgba(10,13,21,0.2) 0%, rgba(10,13,21,0.55) 60%, rgba(10,13,21,0.92) 100%), url(/welcome-bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="text-center">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold text-white"
              >
                Khalil Abderrazak
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-3 text-[#b4b9d4]"
              >
                Ingenieur IA & Concepteur de systemes intelligents
              </motion.p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div
        className="min-h-screen pt-24 pb-12"
        style={{
          backgroundColor: '#0a0d15',
          backgroundImage:
            'radial-gradient(circle at 12% 14%, rgba(244,183,64,0.14), transparent 28%), radial-gradient(circle at 86% 18%, rgba(126,212,198,0.12), transparent 30%), radial-gradient(circle at 48% 82%, rgba(140,199,255,0.1), transparent 34%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 sm:mb-8 px-2"
          >
            <p className="text-xs sm:text-xs md:text-xs uppercase tracking-[0.2em] sm:tracking-[0.28em] text-[#f4b740]">Khalil Abderrazak</p>
            <h1 className="mt-2 sm:mt-3 text-2xl xs:text-2xl sm:text-3xl md:text-5xl font-semibold text-[#f3f6fc] leading-tight">Portfolio d'ingenierie IA</h1>
            <p className="mt-2 sm:mt-3 text-xs xs:text-sm sm:text-base md:text-base text-[#a9b5cb]">Le visuel d'abord. Elegant et leger.</p>
          </motion.div>

          <div className="relative max-w-7xl mx-auto pb-2">
            <div className="hidden md:block absolute inset-0 pointer-events-none">
              {honeyDecor.map((hex, index) => (
                <motion.div
                  key={`${hex.left}-${hex.top}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: [0.8, 1, 0.8], scale: [0.98, 1, 0.98] }}
                  transition={{ delay: 0.03 * index, duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute"
                  style={{
                    left: hex.left,
                    top: hex.top,
                    width: `${hex.size}px`,
                    height: `${hex.size}px`,
                    clipPath: 'polygon(25% 6%, 75% 6%, 97% 50%, 75% 94%, 25% 94%, 3% 50%)',
                    border: `2px solid ${hex.border}`,
                    background: hex.fill,
                    boxShadow: '0 0 20px rgba(244,183,64,0.14)',
                  }}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-0 place-items-center relative z-10 px-2 sm:px-0">
            {sections.map((section, index) => {
              const sizeClass = index === 1 ? 'md:w-[320px] lg:w-[360px]' : 'md:w-[280px] lg:w-[320px]'
              const shiftClass = index === 0 ? 'lg:translate-y-8 lg:translate-x-7' : index === 1 ? 'lg:-translate-y-1' : 'lg:translate-y-8 lg:-translate-x-7'

              return (
                <Link to={section.path} key={section.path} aria-label={section.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 * index, duration: 0.5 }}
                    whileHover={{ y: -10, scale: 1.03 }}
                    className={`relative w-[200px] xs:w-[220px] sm:w-[240px] ${sizeClass} aspect-square ${shiftClass}`}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        clipPath: 'polygon(25% 6%, 75% 6%, 97% 50%, 75% 94%, 25% 94%, 3% 50%)',
                        background: 'linear-gradient(145deg, #131d2f 0%, #111827 48%, #16243a 100%)',
                        border: `2px solid ${section.accent}95`,
                        boxShadow: `0 18px 40px -22px ${section.accent}`,
                      }}
                    />
                    <div
                      className="absolute inset-[7.5%]"
                      style={{
                        clipPath: 'polygon(25% 6%, 75% 6%, 97% 50%, 75% 94%, 25% 94%, 3% 50%)',
                        backgroundImage: `linear-gradient(180deg, rgba(9,13,21,0.05), rgba(9,13,21,0.66)), url(${section.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />

                    <div className="relative h-full">
                    </div>
                  </motion.div>

                  <p
                    className="mt-3 text-center text-base md:text-xl tracking-[0.08em] font-semibold"
                    style={{
                      color: section.accent,
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {section.title}
                  </p>
                </Link>
              )
            })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage
