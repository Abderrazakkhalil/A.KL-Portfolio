import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react'

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
  const [selectedItem, setSelectedItem] = useState<SelectedModal | null>(null)
  const [bookPaths, setBookPaths] = useState<Record<number, string>>({})
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const items = loadAmbitionImages()
    setImages(items)

    // Extract book paths
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

  // Auto-slide carousel
  useEffect(() => {
    const artImages = images.filter(img => img.category === 'art')
    if (artImages.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % artImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images])

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

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % artImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + artImages.length) % artImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const artImages = images.filter(img => img.category === 'art')
  const bookSections = images.filter(img => img.category === 'book')

  return (
    <div className="min-h-screen bg-[#090d1a] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Art Gallery Carousel Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Mes oeuvres</h2>
            <p className="text-[#9fb0c3] text-sm md:text-base">
              Une collection d'oeuvres creatives et d'expressions visuelles
            </p>
          </motion.div>

          {artImages.length > 0 ? (
            <div className="relative">
              {/* Carousel Container */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#2f3b4a] bg-[#0f1622] shadow-2xl" style={{ aspectRatio: '16/9' }}>
                {/* Slides */}
                <AnimatePresence mode="wait">
                  {artImages.map((img, index) => (
                    index === currentSlide && (
                      <motion.div
                        key={img.id}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 cursor-pointer"
                        onClick={() => handleItemClick(img)}
                      >
                        <img
                          src={img.image}
                          alt="Oeuvre artistique"
                          className="w-full h-full object-contain bg-[#050914]"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        
                        {/* Slide Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <p className="text-[#58a6ff] text-xs md:text-sm font-semibold uppercases tracking-widest mb-2">Oeuvre mise en avant</p>
                          </motion.div>
                        </div>

                        {/* Click to expand indicator */}
                        <div className="absolute top-4 right-4 bg-[#0a0d1a]/70 px-4 py-2 rounded-full border border-[#58a6ff]/30 hover:border-[#58a6ff] transition-colors">
                          <p className="text-xs text-[#58a6ff] font-medium">Cliquer pour agrandir</p>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>

                {/* Navigation Arrows */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    prevSlide()
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-[#0a0d1a]/60 hover:bg-[#0a0d1a]/90 border border-[#58a6ff]/30 hover:border-[#58a6ff] backdrop-blur-sm p-3 rounded-full transition-all"
                >
                  <ChevronLeft size={24} className="text-[#58a6ff]" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    nextSlide()
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-[#0a0d1a]/60 hover:bg-[#0a0d1a]/90 border border-[#58a6ff]/30 hover:border-[#58a6ff] backdrop-blur-sm p-3 rounded-full transition-all"
                >
                  <ChevronRight size={24} className="text-[#58a6ff]" />
                </motion.button>
              </div>

              {/* Slide Indicators and Info */}
              <div className="mt-6 flex items-center justify-between">
                {/* Dots Indicator */}
                <div className="hidden sm:flex items-center gap-2 flex-wrap">
                  {artImages.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => goToSlide(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`transition-all rounded-full border ${
                        index === currentSlide
                            ? 'bg-[#58a6ff] border-[#58a6ff] w-2.5 h-2.5 md:w-3 md:h-3'
                            : 'bg-transparent border-[#2f3b4a] hover:border-[#58a6ff] w-2 h-2 md:w-2.5 md:h-2.5'
                      }`}
                      title={`Aller a la diapositive ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Slide Counter */}
                <div className="text-sm text-[#8ba1b8]">
                  <span className="text-[#58a6ff] font-semibold">{currentSlide + 1}</span>
                  <span> / {artImages.length}</span>
                </div>
              </div>

              {/* Thumbnails Strip */}
              <div className="mt-5 flex gap-2 pb-2 overflow-x-auto scroll-smooth">
                {artImages.map((img, index) => (
                  <motion.button
                    key={img.id}
                    onClick={() => goToSlide(index)}
                    className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentSlide
                        ? 'border-[#58a6ff] ring-2 ring-[#58a6ff]/50'
                        : 'border-[#2f3b4a] hover:border-[#58a6ff]'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={img.image}
                      alt="Miniature oeuvre artistique"
                      className="w-10 h-10 md:w-20 md:h-20 object-contain bg-[#050914]"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[#8ba1b8]">
              Aucune oeuvre a afficher. Ajoute des images dans /public/about_me/Art/
            </div>
          )}
        </div>

        {/* My Book Section */}
        {bookSections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16"
          >
            <div className="mb-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8cc7ff] font-semibold">MON LIVRE</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-2">Premier chapitre</h2>
              <p className="text-[#9fb0c3] text-sm md:text-base">
                Un espace litteraire distinct, clairement separe de la galerie d'art.
              </p>
            </div>

            <motion.div
              whileHover={{ y: -4 }}
              className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5 rounded-2xl border border-[#2f3b4a] bg-gradient-to-br from-[#111a28] to-[#0b1220] overflow-hidden shadow-[0_20px_60px_-35px_rgba(140,199,255,0.35)]"
            >
              <div className="relative bg-[#0f1622] p-5 md:p-6 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[#2f3b4a]">
                <button
                  onClick={() => handleItemClick(bookSections[0])}
                  className="group relative w-full max-w-[270px] aspect-[3/4] rounded-[1.5rem] overflow-hidden border border-[#8cc7ff]/35 shadow-[0_24px_80px_-30px_rgba(140,199,255,0.5)] transition-transform duration-300 hover:scale-[1.02] bg-[#0a0d1a]"
                >
                  <img
                    src={bookCoverPath}
                    alt={bookSections[0].title}
                    className="relative z-10 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#8cc7ff]/10 via-transparent to-[#f4b740]/10" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-[1.5rem]" />
                </button>
              </div>

              <div className="p-5 md:p-7 flex flex-col justify-between gap-5">
                <div>
                  <p className="text-[#c9d1d9] leading-relaxed font-mono text-sm md:text-base whitespace-pre-line">
                    Ce livre n'est pas qu'un récit de fantaisie. C'est un présage,
                    un voile jeté sur la réalité que nous refusons d'affronter.

                    Chaque personnage, chaque détail, chaque souffle d'encre porte en lui un fragment du réel - un écho de nos peurs,
                    de nos désirs, de nos silences.

                    Mais ce livre ne s'adresse pas à tous. Il choisit ses lecteurs, comme une épreuve muette.

                    Peut-être seras-tu l'un de ceux qu'il désignera... ou peut-être resteras-tu dans l'ombre, à jamais.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3 text-xs md:text-sm">
                    <span className="px-3 py-1.5 rounded-full border border-[#8cc7ff]/30 text-[#8cc7ff] bg-[#102036]">
                      En français
                    </span>
                    <span className="px-3 py-1.5 rounded-full border border-[#7ed4c6]/30 text-[#7ed4c6] bg-[#10221f]">
                      4 ans de travail
                    </span>
                    <span className="px-3 py-1.5 rounded-full border border-[#f4b740]/30 text-[#f4b740] bg-[#201a10]">
                      Premier chapitre
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleItemClick(bookSections[0])}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#8cc7ff] text-[#0a0d1a] font-semibold hover:bg-[#a8d5ff] transition-colors"
                  >
                    Open Chapter
                  </button>
                  <button
                    onClick={() => handleDownload({ ...bookSections[0], pdfPath: bookPaths[bookSections[0].id] })}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#2f81f7]/50 text-[#8cc7ff] hover:bg-[#8cc7ff] hover:text-[#0a0d1a] transition-colors"
                  >
                    <Download size={16} />
                    Download PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && selectedItem.category === 'art' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-[#0f1622] border border-[#2f3b4a] rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 bg-[#0a0d1a]/80 hover:bg-[#0a0d1a] rounded-full p-2 transition-colors"
              >
                <X size={24} className="text-white" />
              </button>

              <img
                src={selectedItem.image}
                alt="Oeuvre artistique agrandie"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Book PDF Modal */}
        {selectedItem && selectedItem.category === 'book' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative max-w-lg w-full bg-[#0f1622] border border-[#2f3b4a] rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 bg-[#0a0d1a]/80 hover:bg-[#0a0d1a] rounded-full p-2 transition-colors"
              >
                <X size={24} className="text-white" />
              </button>

              <div className="p-8 text-center">
                <div className="w-20 h-20 rounded-lg bg-[#d2a8ff25] mx-auto mb-6 flex items-center justify-center">
                  <span className="text-5xl">📖</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h2>
                <p className="text-[#9fb0c3] mb-8">PDF Document</p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      if (selectedItem.pdfPath) {
                        window.open(selectedItem.pdfPath, '_blank')
                      }
                      setSelectedItem(null)
                    }}
                    className="w-full px-6 py-3 bg-[#d2a8ff] hover:bg-[#c999ff] text-[#0a0d1a] font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Open PDF</span>
                  </button>
                  <button
                    onClick={() => handleDownload(selectedItem)}
                    className="w-full px-6 py-3 bg-[#2f3b4a] hover:bg-[#3d4a5a] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={18} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GraphicDesign
