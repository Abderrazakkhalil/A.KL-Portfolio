import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Masonry from 'react-masonry-css'
import { Mail, Linkedin, Github, Layers, Eye } from 'lucide-react'

type GalleryImage = {
  src: string
  group: string
}

type ClubGroup = {
  key: string
  name: string
  accent: string
  logo: string | null
  images: GalleryImage[]
}

const loadClubImages = (): GalleryImage[] => {
  const imageModules = import.meta.glob('/public/parasco/clubs/**/*.{png,jpg,jpeg,webp}')

  return Object.keys(imageModules)
    .sort((a, b) => a.localeCompare(b))
    .map((path) => {
      const pathParts = path.split('/')
      const group = (pathParts[pathParts.length - 2] || 'club').toLowerCase()

      return {
        src: path.replace('/public', ''),
        group,
      }
    })
}

const clubImages = loadClubImages()
const clubOrder = ['genos', 'weart', 'caravane']

const clubMeta: Record<string, { name: string; accent: string; logo: string | null }> = {
  genos: { name: 'GENOS', accent: 'from-[#6ee7ff] to-[#3b82f6]', logo: '/parasco/clubs/genos/logo.jpg' },
  weart: { name: 'WEART', accent: 'from-[#fca5a5] to-[#f97316]', logo: '/parasco/clubs/weart/logo.png' },
  caravane: { name: 'CARAVANE', accent: 'from-[#86efac] to-[#22c55e]', logo: '/parasco/clubs/caravane/logo.webp' },
}

const groupedClubs: ClubGroup[] = clubOrder
  .map((key) => ({
    key,
    name: clubMeta[key]?.name ?? key.toUpperCase(),
    accent: clubMeta[key]?.accent ?? 'from-[#a5b4fc] to-[#818cf8]',
    logo: clubMeta[key]?.logo ?? null,
    images: clubImages.filter((image) => image.group === key),
  }))
  .filter((club) => club.images.length > 0)

const loadFootballImages = (): GalleryImage[] => {
  const imageModules = import.meta.glob('/public/parasco/foot/*.{png,jpg,jpeg,webp}')

  return Object.keys(imageModules)
    .sort((a, b) => a.localeCompare(b))
    .map((path) => ({
      src: path.replace('/public', ''),
      group: 'football',
    }))
}

const footballImages = loadFootballImages()
const footballGroup: ClubGroup = {
  key: 'football',
  name: 'FOOTBALL',
  accent: 'from-[#93c5fd] to-[#3b82f6]',
  logo: null,
  images: footballImages,
}

const CLUBS_COVER_IMAGE = '/parasco/background/clubs-cover.png'
const FOOTBALL_COVER_IMAGE = '/parasco/foot/football-cover.png'

const PersonalLife: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'clubs' | 'football'>('clubs')
  const [activeClub, setActiveClub] = useState(groupedClubs[0]?.key ?? 'genos')
  const [showGrid, setShowGrid] = useState(true)

  const currentClub = groupedClubs.find((club) => club.key === activeClub) ?? groupedClubs[0]
  const currentGallery = activeSection === 'clubs' ? currentClub : footballGroup
  const clubsCoverFallback = groupedClubs[0]?.images[0]?.src ?? null
  const footballCoverFallback = footballGroup.images[0]?.src ?? null

  return (
    <div className="min-h-screen pt-16 transition-colors duration-300 bg-[#090d1a]">
      <div className="border-b border-[#2f3b4a] bg-[#0f1622]">
        <div className="px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <img src="/profile.png" alt="Profile" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-[#2f3b4a] object-cover" />
            <div className="min-w-0">
              <h1 className="text-sm md:text-xl font-semibold text-white truncate">Activites parascolaires</h1>
              <div className="hidden sm:flex items-center gap-2 text-xs text-[#8ba1b8]">
                <span>•</span>
                <span>{activeSection === 'clubs' ? 'Clubs' : 'Football'}</span>
                <span>•</span>
                <span className="text-[#58a6ff]">Theme artistique uniforme</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#8ba1b8]">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className="px-3 py-1.5 rounded border border-[#2f3b4a] transition-colors flex items-center gap-2"
              style={{ backgroundColor: showGrid ? '#15243a' : 'transparent', color: showGrid ? '#ffffff' : '#8ba1b8' }}
            >
              <Eye size={12} />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-6 py-4 md:py-6 border-b border-[#2f3b4a] bg-[#0f1622]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <button
            onClick={() => setActiveSection('clubs')}
            className="relative h-56 md:h-72 rounded-2xl overflow-hidden border-2 transition-all duration-300 text-left"
            style={{ borderColor: activeSection === 'clubs' ? '#58a6ff' : '#2f3b4a' }}
          >
            {CLUBS_COVER_IMAGE || clubsCoverFallback ? (
              <img
                src={CLUBS_COVER_IMAGE}
                alt="Clubs"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(event) => {
                  const fallbackSrc = clubsCoverFallback
                  if (!fallbackSrc || event.currentTarget.src.endsWith(fallbackSrc)) {
                    return
                  }
                  event.currentTarget.src = fallbackSrc
                }}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1b2239] to-[#0f172a]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
            <span className="absolute top-3 left-3 px-3 py-1 rounded bg-black/55 text-white text-sm font-semibold">Clubs</span>
          </button>

          <button
            onClick={() => setActiveSection('football')}
            className="relative h-56 md:h-72 rounded-2xl overflow-hidden border-2 transition-all duration-300 text-left"
            style={{ borderColor: activeSection === 'football' ? '#58a6ff' : '#2f3b4a' }}
          >
            {FOOTBALL_COVER_IMAGE || footballCoverFallback ? (
              <img
                src={FOOTBALL_COVER_IMAGE}
                alt="Football"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(event) => {
                  const fallbackSrc = footballCoverFallback
                  if (!fallbackSrc || event.currentTarget.src.endsWith(fallbackSrc)) {
                    return
                  }
                  event.currentTarget.src = fallbackSrc
                }}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#102535] to-[#0c1b2e]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
            <span className="absolute top-3 left-3 px-3 py-1 rounded bg-black/55 text-white text-sm font-semibold">Football</span>
          </button>
        </div>
      </div>

      <div className="px-4 md:px-6 py-4 md:py-8 relative">
        {showGrid && (
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
        )}

        {currentGallery && (
          <div className="relative z-10">
            {activeSection === 'clubs' && (
              <div className="mb-4 md:mb-6 overflow-x-auto">
                <div className="flex items-center gap-2 min-w-max">
                  <span className="text-[10px] md:text-xs text-[#8ba1b8] mr-1 md:mr-2 whitespace-nowrap">CLUBS:</span>
                  {groupedClubs.map((club) => {
                    const isActive = club.key === activeClub

                    return (
                      <button
                        key={club.key}
                        onClick={() => setActiveClub(club.key)}
                        className="px-2.5 md:px-3 py-1.5 rounded text-[10px] md:text-xs font-bold transition-all duration-300 flex items-center gap-2 whitespace-nowrap border"
                        style={{
                          backgroundColor: isActive ? '#58a6ff' : 'transparent',
                          color: isActive ? '#0b1220' : '#8ba1b8',
                          borderColor: isActive ? '#58a6ff' : '#2f3b4a',
                        }}
                      >
                        <span className="w-6 h-6 rounded overflow-hidden border border-[#2f3b4a] bg-black/30 flex items-center justify-center shrink-0">
                          {club.logo ? (
                            <img src={club.logo} alt={`${club.name} logo`} className="w-full h-full object-cover" loading="lazy" />
                          ) : (
                            <span className="text-[10px] text-white font-bold tracking-[0.18em]">WA</span>
                          )}
                        </span>
                        <span>{club.name}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-3 mb-4 md:mb-6">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden border border-[#2f3b4a] bg-black/30 flex items-center justify-center shrink-0">
                  {currentGallery.logo ? (
                    <img src={currentGallery.logo} alt={`${currentGallery.name} logo`} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <span className="text-sm md:text-base font-bold tracking-[0.2em] text-white">WA</span>
                  )}
                </span>
                <div className="min-w-0">
                  <h2 className="text-lg md:text-2xl font-semibold text-white truncate">{currentGallery.name}</h2>
                  <p className="text-xs md:text-sm text-[#8ba1b8] truncate">{currentGallery.images.length} images</p>
                </div>
              </div>
              <div className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8ba1b8]">
                <Layers size={12} />
                Masonry Canvas
              </div>
            </div>

            <Masonry
              breakpointCols={{ default: 4, 1280: 4, 1024: 3, 768: 2, 640: 1 }}
              className="flex -ml-4 w-auto"
              columnClassName="pl-4 bg-clip-padding"
            >
              {currentGallery.images.map((image, index) => (
                <motion.div
                  key={image.src}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: index * 0.02 }}
                  className="mb-6"
                >
                  <div
                    className="group relative overflow-hidden select-none"
                    style={{
                      backgroundColor: '#0f1622',
                      border: '2px solid #2f3b4a',
                      boxShadow: 'none',
                    }}
                  >
                    {index === 0 && (
                      <div
                        className="absolute top-2 left-2 z-10 px-2 py-1 rounded text-[10px] font-semibold text-white"
                        style={{ background: 'rgba(0,0,0,0.55)' }}
                      >
                        {currentGallery.name}
                      </div>
                    )}

                    <div className="absolute top-2 right-2 z-10 w-9 h-9 rounded-lg overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                      {currentGallery.logo ? (
                        <img src={currentGallery.logo} alt={`${currentGallery.name} logo`} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <span className="text-[11px] font-bold tracking-[0.2em] text-white">WA</span>
                      )}
                    </div>

                    <img
                      src={image.src}
                      alt={currentGallery.name}
                      className="w-full h-auto object-cover block transition-transform duration-300 group-hover:scale-[1.02]"
                    />

                    <div
                      className="absolute bottom-0 left-0 right-0 backdrop-blur-sm p-2 translate-y-full group-hover:translate-y-0 transition-all duration-300"
                      style={{ backgroundColor: 'rgba(15,22,34,0.94)' }}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white">{currentGallery.name}</span>
                        <div className="flex items-center gap-2 text-[#8ba1b8]">
                          <span className="hidden sm:inline">Image {index + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </div>
        )}
      </div>

      <div className="px-4 md:px-6 pb-10">
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-[#2f3b4a] bg-[#0f1622] p-6">
          <h3 className="text-white text-xl font-semibold mb-3">Contact</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="mailto:khalilabderrazak1@gmail.com" className="text-[#58a6ff] hover:text-white inline-flex items-center gap-2"><Mail size={14} /> khalilabderrazak1@gmail.com</a>
            <a href="https://www.linkedin.com/in/khalil-abderrazak1" target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:text-white inline-flex items-center gap-2"><Linkedin size={14} /> LinkedIn</a>
            <a href="https://github.com/Abderrazakkhalil" target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:text-white inline-flex items-center gap-2"><Github size={14} /> GitHub</a>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default PersonalLife
