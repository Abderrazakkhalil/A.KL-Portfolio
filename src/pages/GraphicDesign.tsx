import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ChevronLeft, ChevronRight, FileText } from 'lucide-react'

type GalleryItem = {
  id: number
  title: string
  image: string
  category: 'art' | 'book'
}

const bookCoverPath = '/about_me/my_book/couvercle.webp'

const loadAmbitionImages = (): GalleryItem[] => {
  const items: GalleryItem[] = []
  
  // Load Art images
  const artModules = import.meta.glob('/public/about_me/Art/*.{png,jpg,jpeg,webp}')
  Object.keys(artModules)
    .sort((a, b) => a.localeCompare(b))
    .forEach((path, index) => {
      const fileName = path.split('/').pop()?.split('.')[0] || `art-${index + 1}`
      items.push({
        id: index + 1,
        title: fileName.replace(/-|_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
        image: path.replace('/public', ''),
        category: 'art'
      })
    })

  // Load Book PDFs
  const bookModules = import.meta.glob('/public/about_me/my_book/*.pdf')
  Object.keys(bookModules)
    .sort((a, b) => a.localeCompare(b))
    .forEach((path, index) => {
      const fileName = path.split('/').pop()?.split('.')[0] || `book-${index + 1}`
      items.push({
        id: items.length + 1,
        title: fileName.replace(/-|_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
        image: bookCoverPath,
        category: 'book'
      })
    })

  return items
}

interface SelectedModal extends GalleryItem {
  pdfPath?: string
}

const GraphicDesign: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([])
  const [bookPaths, setBookPaths] = useState<Record<number, string>>({})
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedItem, setSelectedItem] = useState<SelectedModal | null>(null)

  useEffect(() => {
    const items = loadAmbitionImages()
    setImages(items)

    const bookModules = import.meta.glob('/public/about_me/my_book/*.pdf')
    const paths: Record<number, string> = {}
    Object.keys(bookModules)
      .sort((a, b) => a.localeCompare(b))
      .forEach((path, index) => {
        const itemId = items.length - Object.keys(bookModules).length + index + 1
        paths[itemId] = path.replace('/public', '')
      })
    setBookPaths(paths)
  }, [])

  const artImages = images.filter(img => img.category === 'art')
  const bookSections = images.filter(img => img.category === 'book')

  const nextSlide = () => {
    if (artImages.length === 0) return
    setActiveIndex((prev) => (prev + 1) % artImages.length)
  }

  const prevSlide = () => {
    if (artImages.length === 0) return
    setActiveIndex((prev) => (prev - 1 + artImages.length) % artImages.length)
  }

  const handleItemClick = (item: GalleryItem) => {
    if (item.category === 'book') {
      const pdfPath = bookPaths[item.id]
      setSelectedItem({ ...item, pdfPath })
    } else {
      setSelectedItem(item)
    }
  }

  const handleDownload = (item: SelectedModal) => {
    if (item.pdfPath) {
      const link = document.createElement('a')
      link.href = item.pdfPath
      link.download = item.title
      link.click()
    }
  }

  const activeItem = artImages[activeIndex]

  return (
    <div className="min-h-screen bg-white relative">
      {/* Full-page background */}
      <style>{`
        @media (min-width: 900px) {
          .ambitions-bg { background-image: url('/wide_bg_for_ambitions.png') !important; }
        }
        @media (max-width: 899px) {
          .ambitions-bg { background-image: url('/phone_bg_for_ambitions.png') !important; }
        }
        /* Custom scrollbar for horizontal thumbnails */
        .thumbnails-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .thumbnails-scroll::-webkit-scrollbar-track {
          background: #F5F5F5; 
        }
        .thumbnails-scroll::-webkit-scrollbar-thumb {
          background: #CCCCCC; 
        }
        .thumbnails-scroll::-webkit-scrollbar-thumb:hover {
          background: #CC0000; 
        }
      `}</style>
      <div
        aria-hidden="true"
        className="ambitions-bg fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
          opacity: 0.85,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-20 max-w-[1400px] mx-auto px-6 md:px-12 font-sans">
        
        {/* Page Identity Header */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#CC0000] mb-3 font-medium">Archive Créative</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-[#1A1A1A] tracking-tight mb-5">Mes Ambitions</h1>
          <div className="w-16 h-[1px] bg-[#CC0000] mb-5" />
          <p className="text-[#444444] text-sm md:text-base leading-relaxed">
            Un espace littéraire et visuel. Une archive personnelle où s'entremêlent esquisses, 
            compositions et fragments d'écriture, témoins d'une recherche artistique continue.
          </p>
        </div>

        {artImages.length > 0 && activeItem && (
          <div className="flex flex-col gap-16">
            
            {/* Featured Artwork Section */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              
              {/* Image Frame */}
              <div className="w-full lg:w-8/12 xl:w-9/12">
                <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-white border border-[#E5E5E5] p-3 shadow-[0_4px_30px_rgba(0,0,0,0.03)] group flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => handleItemClick(activeItem)}>
                  {/* Subtle Architectural Frame Details */}
                  <div className="absolute inset-2 border border-[#F0F0F0] pointer-events-none" />
                  <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-[#CC0000] pointer-events-none opacity-60" />
                  <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-[#CC0000] pointer-events-none opacity-60" />
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem.id}
                      initial={{ opacity: 0, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, filter: 'blur(8px)' }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="relative z-10 w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={activeItem.image}
                        alt={activeItem.title}
                        className="max-w-full max-h-full object-contain drop-shadow-sm"
                      />
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Expand Hint */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="bg-white/90 backdrop-blur-sm border border-[#E5E5E5] px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#CC0000] font-medium shadow-sm">
                      Agrandir
                    </div>
                  </div>
                </div>

                {/* Subtitle / Meta Bar */}
                <div className="mt-5 flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5E5] pb-4 gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="w-1.5 h-1.5 bg-[#CC0000] rounded-full" />
                      <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#555555] font-medium">
                        Art Visuel
                      </p>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.h2 
                        key={activeItem.title}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-xl md:text-2xl text-[#1A1A1A] font-medium tracking-tight"
                      >
                        {activeItem.title}
                      </motion.h2>
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="font-mono text-sm tracking-widest text-[#2A2A2A]">
                      <span className="text-[#CC0000] font-medium">{String(activeIndex + 1).padStart(2, '0')}</span> 
                      <span className="text-[#888888] mx-1">/</span> 
                      {String(artImages.length).padStart(2, '0')}
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={prevSlide} className="text-[#444444] hover:text-[#CC0000] hover:bg-[#F5F5F5] transition-colors p-2 rounded-sm border border-transparent hover:border-[#E5E5E5]">
                        <ChevronLeft size={20} strokeWidth={1.5} />
                      </button>
                      <button onClick={nextSlide} className="text-[#444444] hover:text-[#CC0000] hover:bg-[#F5F5F5] transition-colors p-2 rounded-sm border border-transparent hover:border-[#E5E5E5]">
                        <ChevronRight size={20} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editorial / Context Panel */}
              <div className="w-full lg:w-4/12 xl:w-3/12 pt-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.4 }}
                    className="border border-[#E5E5E5] bg-white/90 backdrop-blur-sm p-6 md:p-8 relative"
                  >
                    {/* Subtle design element */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#FAFAFA] to-transparent border-b border-l border-[#E5E5E5]" />
                    
                    <h3 className="text-[#1A1A1A] text-sm font-semibold uppercase tracking-wider mb-4 border-b border-[#F0F0F0] pb-3">
                      Notes d'atelier
                    </h3>
                    
                    <div className="space-y-4">
                      <p className="text-[#444444] text-sm leading-relaxed">
                        Expérimentation visuelle faisant partie intégrante de mon processus créatif. 
                        Une réflexion sur les formes, la composition et l'expression graphique.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-4">
                        <span className="text-[10px] px-2 py-1 border border-[#E5E5E5] text-[#555555] bg-[#F5F5F5]">Art numérique</span>
                        <span className="text-[10px] px-2 py-1 border border-[#E5E5E5] text-[#555555] bg-[#F5F5F5]">Recherche visuelle</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Refined Horizontal Thumbnail Gallery */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] flex-grow bg-[#E5E5E5]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#888888]">Index de la collection</span>
                <div className="h-[1px] flex-grow bg-[#E5E5E5]" />
              </div>
              
              <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 pt-2 thumbnails-scroll snap-x">
                {artImages.map((item, idx) => {
                  const isActive = idx === activeIndex
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`snap-start shrink-0 group relative overflow-hidden bg-white border transition-all duration-300 ${
                        isActive 
                          ? 'w-24 md:w-32 aspect-square md:aspect-[4/3] border-[#CC0000] shadow-[0_0_15px_rgba(204,0,0,0.1)] scale-100' 
                          : 'w-20 md:w-28 aspect-square md:aspect-[4/3] border-[#E5E5E5] hover:border-[#CC0000]/40 opacity-50 hover:opacity-100 scale-95 hover:scale-100'
                      }`}
                    >
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {isActive && (
                         <div className="absolute inset-0 bg-[#CC0000]/5 pointer-events-none" />
                      )}
                      <div className={`absolute bottom-1 right-1 p-1 bg-white/80 backdrop-blur-sm border transition-colors ${isActive ? 'border-[#CC0000]/30 text-[#CC0000]' : 'border-[#E5E5E5] text-[#888888]'}`}>
                        <span className="text-[8px] font-bold">ART</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Separated Book Section */}
        {bookSections.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#E5E5E5]">
            <div className="mb-8 max-w-2xl">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#CC0000] mb-3 font-medium">LITTÉRATURE</p>
              <h2 className="text-2xl md:text-3xl font-light text-[#1A1A1A] tracking-tight mb-4">Mes Écrits & Romans</h2>
              <p className="text-[#444444] text-sm leading-relaxed">
                Un espace dédié à la création littéraire, séparé de la galerie d'art,
                explorant des univers narratifs approfondis.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 lg:gap-10 border border-[#E5E5E5] bg-white/90 backdrop-blur-sm p-6 md:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#FAFAFA] to-transparent border-b border-l border-[#E5E5E5]" />
              
              <div className="relative group flex justify-center">
                <button
                  onClick={() => handleItemClick(bookSections[0])}
                  className="w-full max-w-[240px] aspect-[3/4] relative overflow-hidden border border-[#CC0000]/30 shadow-[0_10px_40px_-15px_rgba(204,0,0,0.2)] transition-transform duration-500 hover:scale-[1.03]"
                >
                  <img
                    src={bookCoverPath}
                    alt={bookSections[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
                  <div className="absolute inset-0 bg-[#CC0000]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </button>
              </div>

              <div className="flex flex-col justify-between py-2">
                <div>
                  <h3 className="text-xl font-medium text-[#1A1A1A] mb-4">{bookSections[0].title}</h3>
                  <div className="text-[#444444] text-sm leading-relaxed space-y-4 max-w-xl">
                    <p>
                      Ce livre n'est pas qu'un récit de fantaisie. C'est un présage,
                      un voile jeté sur la réalité que nous refusons d'affronter.
                    </p>
                    <p>
                      Chaque personnage, chaque détail, chaque souffle d'encre porte en lui un fragment du réel - un écho de nos peurs,
                      de nos désirs, de nos silences.
                    </p>
                    <p className="italic text-[#888888]">
                      Peut-être seras-tu l'un de ceux qu'il désignera... ou peut-être resteras-tu dans l'ombre, à jamais.
                    </p>
                  </div>
                  
                  <div className="mt-6 flex gap-3 text-xs">
                    <span className="px-2 py-1 border border-[#E5E5E5] text-[#555555] bg-[#F5F5F5]">En français</span>
                    <span className="px-2 py-1 border border-[#E5E5E5] text-[#555555] bg-[#F5F5F5]">4 ans de travail</span>
                    <span className="px-2 py-1 border border-[#E5E5E5] text-[#555555] bg-[#F5F5F5]">Premier chapitre</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => handleItemClick(bookSections[0])}
                    className="px-6 py-3 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#CC0000] transition-colors flex items-center justify-center gap-2"
                  >
                    Ouvrir le chapitre
                  </button>
                  <button
                    onClick={() => handleDownload({ ...bookSections[0], pdfPath: bookPaths[bookSections[0].id] })}
                    className="px-6 py-3 bg-white border border-[#D0D0D0] text-[#333333] text-xs font-semibold uppercase tracking-widest hover:border-[#CC0000] hover:text-[#CC0000] transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Télécharger PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {/* Art Modal */}
        {selectedItem && selectedItem.category === 'art' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              className="relative max-w-6xl w-full max-h-[90vh] bg-transparent flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 z-10 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-widest"
              >
                <span>Fermer</span>
                <X size={20} />
              </button>
              
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full max-h-[85vh] object-contain shadow-2xl"
              />
              
              <div className="absolute -bottom-12 left-0 text-white/70 text-sm tracking-widest uppercase">
                {selectedItem.title}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Book Modal */}
        {selectedItem && selectedItem.category === 'book' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative max-w-lg w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-none overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-[#CC0000] hover:text-white text-[#333333] transition-colors border border-[#E5E5E5] p-2"
              >
                <X size={20} />
              </button>

              <div className="p-10 text-center border-b border-[#E5E5E5] bg-white">
                <div className="w-16 h-16 bg-[#F5F5F5] border border-[#E5E5E5] mx-auto mb-6 flex items-center justify-center text-[#CC0000]">
                  <FileText size={28} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-light text-[#1A1A1A] mb-2">{selectedItem.title}</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#888888]">Document Littéraire (PDF)</p>
              </div>
              
              <div className="p-8 flex flex-col gap-4 bg-[#FAFAFA]">
                <button
                  onClick={() => {
                    if (selectedItem.pdfPath) window.open(selectedItem.pdfPath, '_blank')
                    setSelectedItem(null)
                  }}
                  className="w-full py-4 bg-[#1A1A1A] hover:bg-[#CC0000] text-white text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  Ouvrir le chapitre
                </button>
                <button
                  onClick={() => handleDownload(selectedItem)}
                  className="w-full py-4 bg-white hover:bg-[#F5F5F5] border border-[#D0D0D0] text-[#333333] text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Télécharger (PDF)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GraphicDesign
