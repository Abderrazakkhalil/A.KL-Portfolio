import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'


// ─── Card configs ─────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: 'experience',
    num: '01',
    title: 'Expérience',
    subtitle: 'Stages & Projets académiques',
    path: '/experience',
    image: '/experience.png',
    // Multiply blends the white/light background of the cap into the white card
    blendMode: 'multiply',
  },
  {
    id: 'activities',
    num: '02',
    title: 'Activités Parascolaires',
    subtitle: 'Clubs · Football · Communauté',
    path: '/parascolaire',
    image: '/parasco.png',
    // Multiply blends the red background of the emblem into the crimson card
    blendMode: 'multiply',
  },
  {
    id: 'ambitions',
    num: '03',
    title: 'Mes Ambitions',
    subtitle: 'Art · Écriture · Vision',
    path: '/ambitions',
    image: '/ambitions.png',
    // Screen or lighten blends the black background of the book into the charcoal card
    blendMode: 'screen',
  },
]

// ─── Single art card ──────────────────────────────────────────────────────────
const ArtCard: React.FC<{
  card: typeof CARDS[number]
  index: number
  delay: number
}> = ({ card, index, delay }) => {
  const [hovered, setHovered] = useState(false)
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`art-card-wrapper ${index === 1 ? 'art-card-center' : 'art-card-side'}`}
    >
      <Link
        to={card.path}
        aria-label={`Accéder à ${card.title}`}
        style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="focus-visible:ring-2 focus-visible:ring-[#B3262E] focus-visible:outline-none rounded-md"
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
          {/* ── Illustration area ────────────────────────── */}
          {/* The artwork is positioned absolutely within the relative card container using the CSS variables from :root */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <motion.img
              src={card.image}
              alt={card.title}
              loading="eager"
              decoding="async"
              animate={{
                scale: hovered ? 1.03 : 1,
                y: hovered && !prefersReduced ? -4 : 0
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                left: `var(--${card.id}-x)`,
                top: `var(--${card.id}-y)`,
                width: `var(--${card.id}-width)`,
                height: `var(--${card.id}-height)`,
                transform: 'translate(-50%, -50%)',
                objectFit: 'contain',
                objectPosition: 'center',
                mixBlendMode: card.blendMode as any,
                transformOrigin: 'center center',
              }}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const LandingPage: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* ── Welcome splash ────────────────────────────────── */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            key="welcome"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: prefersReduced ? 1 : 1.04 }}
            transition={{ duration: 0.65 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 60,
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

      {/* ── Main canvas ───────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          minHeight: '100dvh',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Layer 1: Background Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            backgroundImage: 'url(/home_bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            pointerEvents: 'none'
          }}
        />

        {/* Content column */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            maxWidth: 1340,
            margin: '0 auto',
            padding: 'calc(68px + 2vh) clamp(20px, 5vw, 68px) 0',
            pointerEvents: 'none', // Allow clicks to pass through empty space
          }}
        >
          {/* ── Hero ────────────────────────────────────── */}
          <motion.header
            initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            style={{ flexShrink: 0, pointerEvents: 'auto' }}
          >
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 22, height: 2, backgroundColor: '#B3262E', flexShrink: 0 }} />
              <span style={{
                fontSize: '10px', fontWeight: 600, textTransform: 'uppercase',
                letterSpacing: '0.3em', color: '#B3262E',
                fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
              }}>
                Khalil Abderrazak
              </span>
            </div>

            {/* Main heading */}
            <h1 style={{
              fontSize: 'clamp(2.2rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              margin: 0,
              fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
            }}>
              <span style={{ color: '#111111' }}>Portfolio</span>
              {' '}
              <span style={{ color: '#B3262E' }}>d'ingénierie</span>
              {' '}
              <span style={{ color: '#111111' }}>IA</span>
            </h1>

            {/* Subtitle */}
            <p style={{
              marginTop: '0.55rem',
              fontSize: 'clamp(0.68rem, 1.1vw, 0.83rem)',
              color: '#444444',
              fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
              letterSpacing: '0.01em',
            }}>
              AI · Computer Vision · Reinforcement Learning · Industrial Innovation
            </p>

            {/* Divider */}
            <div style={{
              marginTop: '1.3rem', height: '1px',
              background: 'linear-gradient(90deg, rgba(179,38,46,0.4) 0%, rgba(220,220,220,0.8) 55%, transparent 100%)',
            }} />

            {/* Editorial label row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.45 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                marginTop: '0.85rem', marginBottom: '1.4rem',
              }}
            >
              <span style={{
                fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.22em',
                color: '#AAAAAA', fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
                whiteSpace: 'nowrap', fontWeight: 500,
              }}>Portfolio — 3 Chapitres</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(0,0,0,0.12)' }} />
              <span style={{
                fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.22em',
                color: '#AAAAAA', fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif',
                whiteSpace: 'nowrap', fontWeight: 500,
              }}>2025 — 2027</span>
            </motion.div>
          </motion.header>

          {/* ── Cards grid ────────────────────────────────── */}
          <div className="lp-cards-grid" style={{ pointerEvents: 'auto' }}>
            {CARDS.map((card, i) => (
              <ArtCard key={card.path} card={card} index={i} delay={0.28 + i * 0.1} />
            ))}
          </div>

          {/* ── Footer ───────────────────────────────────── */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.2rem 0 1.4rem',
              marginTop: 'auto',
              pointerEvents: 'auto'
            }}
          >
            <span style={{ fontSize: '10px', color: '#999999', fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif', letterSpacing: '0.04em' }}>
              Lyon, France · Meknès, Maroc
            </span>
            <span style={{ fontSize: '10px', color: '#999999', fontFamily: 'Inter, Helvetica Neue, Arial, sans-serif', letterSpacing: '0.04em' }}>
              ENSAM · Centrale Lyon · M2 ID3D
            </span>
          </motion.footer>
        </div>
      </div>

      {/* ── Scoped styles ─────────────────────────────────── */}
      <style>{`
        /* ==========================================
           PORTFOLIO ILLUSTRATION POSITION SETTINGS

           Edit these values to reposition the artwork.
           X = horizontal position (from left)
           Y = vertical position (from top)
           W = illustration width
           H = illustration height

           Positions are percentages relative to the
           corresponding card, NOT the browser viewport.
           ========================================== */
        :root {
          /* ===== EXPERIENCE ILLUSTRATION ===== */
          --experience-x: -10%;       /* Move left or right */
          --experience-y: -25%;       /* Move up or down */
          --experience-width: 120%;   /* Change artwork width */
          --experience-height: 120%;  /* Change artwork height */

          /* ===== ACTIVITIES ILLUSTRATION ===== */
          --activities-x: 5%;
          --activities-y: -27%;
          --activities-width: 100%;
          --activities-height: 100%;

          /* ===== AMBITIONS ILLUSTRATION ===== */
          --ambitions-x: 20%;
          --ambitions-y: -15%;
          --ambitions-width: 100%;
          --ambitions-height: 100%;
        }

        /* Mobile-only adjustments if needed */
        @media (max-width: 768px) {
          :root {
            --experience-width: 90%;
            --experience-height: 90%;
            --activities-width: 90%;
            --activities-height: 90%;
            --ambitions-width: 90%;
            --ambitions-height: 90%;
          }
        }

        /* Cards grid — desktop: 3-col asymmetric */
        .lp-cards-grid {
          display: grid;
          grid-template-columns: 29% 36% 29%;
          gap: clamp(14px, 1.8vw, 32px);
          flex: 1 1 0;
          min-height: 0;
          align-items: end;
        }

        .art-card-wrapper { 
          height: 55vh; 
          min-height: 380px;
          max-height: 600px;
        }

        /* Center card pushed up slightly */
        @media (min-width: 900px) {
          .art-card-center { align-self: start; margin-top: 4vh; }
          .art-card-side   { align-self: end; margin-bottom: 2vh; }
        }

        /* Tablet: 2-column */
        @media (max-width: 899px) and (min-width: 560px) {
          .lp-cards-grid {
            grid-template-columns: 1fr 1fr;
            align-items: start;
          }
          .lp-cards-grid > div:nth-child(3) { grid-column: 1 / -1; }
          .art-card-wrapper { height: 380px; }
        }

        /* Mobile: single column */
        @media (max-width: 559px) {
          .lp-cards-grid {
            grid-template-columns: 1fr;
            align-items: start;
            gap: 32px;
            padding-bottom: 40px;
          }
          .art-card-wrapper { height: 420px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .art-card-wrapper { transform: none !important; }
        }
      `}</style>
    </>
  )
}

export default LandingPage
