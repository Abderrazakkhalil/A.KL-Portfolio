import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, GraduationCap, Trophy, Sparkles } from 'lucide-react'
import { useNavigationStore } from '../../store/store'

const Navigation: React.FC = () => {
  const location = useLocation()
  const { isMenuOpen, setMenuOpen } = useNavigationStore()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/experience', label: 'Expérience', icon: GraduationCap },
    { path: '/parascolaire', label: 'Activités parascolaires', icon: Trophy },
    { path: '/ambitions', label: 'Mes Ambitions', icon: Sparkles },
  ]

  const navBg = scrolled
    ? 'bg-white/97 backdrop-blur-md border-b border-[#E5E5E5]'
    : 'bg-white/80 backdrop-blur-sm border-b border-[#EEEEEE]'

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-center md:justify-center gap-4">
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div whileHover={{ y: -2 }} className="relative group">
                      <div
                        className={`flex items-center space-x-2 transition-colors ${
                          isActive ? 'text-[#B3262E]' : 'text-[#555555] hover:text-[#0A0A0A]'
                        }`}
                      >
                        <Icon size={18} />
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                      {isActive ? (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#B3262E]"
                        />
                      ) : null}
                    </motion.div>
                  </Link>
                )
              })}
            </div>

            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="md:hidden text-[#333333] p-2.5 min-h-touch min-w-touch hover:opacity-70 transition-all rounded-lg hover:bg-[#F5F5F5] active:scale-95"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-40 md:hidden pt-20"
          >
            <div className="absolute inset-0 backdrop-blur-lg bg-white/97 top-20 border-t border-[#EEEEEE]">
              <div className="flex flex-col items-center justify-start h-full space-y-3 px-4 xs:px-6 py-6 pb-safe-bottom overflow-y-auto">
                {navItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.path
                  return (
                    <motion.div key={item.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="w-full">
                      <Link to={item.path} onClick={() => setMenuOpen(false)} className="block">
                        <motion.div
                          whileHover={{ scale: 1.02, x: 8 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center space-x-3 xs:space-x-4 px-4 xs:px-6 py-4 min-h-touch rounded-lg xs:rounded-xl transition-all ${
                            isActive
                              ? 'bg-[#B3262E] text-white shadow-sm'
                              : 'bg-[#F5F5F5] text-[#333333] hover:bg-[#EEEEEE] border border-[#E5E5E5]'
                          }`}
                        >
                          <Icon size={20} className={isActive ? 'text-white' : 'text-[#666666]'} />
                          <span className="text-base xs:text-lg font-medium">{item.label}</span>
                        </motion.div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default Navigation
