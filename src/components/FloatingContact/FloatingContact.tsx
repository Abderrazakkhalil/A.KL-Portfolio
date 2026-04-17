import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Github, Linkedin, Mail } from 'lucide-react'

const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const socialLinks = [
    { icon: Mail, href: 'mailto:khalilabderrazak1@gmail.com', label: 'Email' },
    { icon: Github, href: 'https://github.com/Abderrazakkhalil', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/khalil-abderrazak1', label: 'LinkedIn' },
  ]

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 xs:bottom-5 xs:right-5 sm:bottom-8 sm:right-8 z-50 p-3 min-h-touch-lg min-w-touch-lg flex items-center justify-center bg-[#6d5cff] hover:bg-[#5b4de3] border border-white/20 shadow-lg text-white rounded-full transition-colors active:scale-90"
        aria-label="Contact"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-16 right-4 md:bottom-24 md:right-8 z-50 w-fit bg-[#0f1426] border border-white/15 shadow-2xl overflow-hidden rounded-xl p-4"
          >
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.08 }}
                    className="p-2 bg-[#161d35] border border-white/10 text-[#9fb0ff] hover:text-white hover:bg-[#6d5cff] rounded-lg transition-colors"
                    title={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default FloatingContact
