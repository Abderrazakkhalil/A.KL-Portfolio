import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Masonry from 'react-masonry-css'
import { Brain, Code, Database, Download, Calendar, FolderKanban, Youtube } from 'lucide-react'

type SkillSection = {
  key: string
  label: string
  title: string
  summary: string
  accent: string
  items: Array<{
    name: string
    level: number
    stack: string[]
  }>
}

const skillSections: SkillSection[] = [
  {
    key: 'ia-ml',
    label: 'IA & ML',
    title: 'Intelligence Artificielle & ML',
    summary: 'Conception de modeles intelligents et experimentation sur des cas reels.',
    accent: '#58a6ff',
    items: [
      {
        name: 'Apprentissage supervise / non supervise',
        level: 88,
        stack: ['Regression', 'Classification', 'Clustering'],
      },
      {
        name: 'Apprentissage par renforcement & XAI',
        level: 82,
        stack: ['RL', 'Interpretabilite', 'Evaluation'],
      },
      {
        name: 'Deep Learning & series temporelles',
        level: 84,
        stack: ['Reseaux de neurones', 'Sequence models', 'Forecasting'],
      },
    ],
  },
  {
    key: 'tools',
    label: 'Outils',
    title: 'Outils & Environnements',
    summary: 'Workflow de production technique et experimentation rapide.',
    accent: '#7ee787',
    items: [
      {
        name: 'Versioning & collaboration',
        level: 86,
        stack: ['Git', 'GitHub'],
      },
      {
        name: 'Notebook & experimentation',
        level: 90,
        stack: ['Jupyter', 'Google Colab'],
      },
      {
        name: 'IDE & environnement dev',
        level: 85,
        stack: ['VS Code', 'IntelliJ', 'Docker (bases)'],
      },
    ],
  },
  {
    key: 'data',
    label: 'Data',
    title: 'Data Science',
    summary: 'Pipeline data complet, de l’exploration a la visualisation exploitable.',
    accent: '#f2cc60',
    items: [
      {
        name: 'Exploration et pretraitement',
        level: 91,
        stack: ['EDA', 'Cleaning', 'Normalisation'],
      },
      {
        name: 'Feature engineering',
        level: 86,
        stack: ['Selection', 'Extraction', 'Transformation'],
      },
      {
        name: 'Visualisation analytique',
        level: 88,
        stack: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
      },
    ],
  },
  {
    key: 'langages',
    label: 'Langages',
    title: 'Langages de Programmation',
    summary: 'Polyvalence technique pour prototypage, back-end et analyse.',
    accent: '#a5d6ff',
    items: [
      {
        name: 'Python',
        level: 92,
        stack: ['Data', 'ML', 'Automation'],
      },
      {
        name: 'JavaScript / TypeScript',
        level: 80,
        stack: ['Frontend', 'React', 'Node ecosystem'],
      },
      {
        name: 'Java / C++ / PHP / Julia / R',
        level: 72,
        stack: ['Algorithmique', 'POO', 'Scripting'],
      },
    ],
  },
  {
    key: 'bdd',
    label: 'BDD',
    title: 'Bases de Donnees & Modelisation',
    summary: 'Conception de schemas robustes et integration applicative des donnees.',
    accent: '#d2a8ff',
    items: [
      {
        name: 'Modelisation conceptuelle',
        level: 84,
        stack: ['MCD', 'MLD', 'UML'],
      },
      {
        name: 'SGBD relationnels',
        level: 82,
        stack: ['MySQL', 'PostgreSQL'],
      },
      {
        name: 'Acces aux donnees',
        level: 78,
        stack: ['JDBC', 'JPA'],
      },
    ],
  },
  {
    key: 'web',
    label: 'Web',
    title: 'Developpement & Interfaces',
    summary: 'Creation d’interfaces claires et de services applicatifs orientés usage.',
    accent: '#ff7b72',
    items: [
      {
        name: 'Front-end',
        level: 79,
        stack: ['HTML/CSS', 'JavaScript', 'React'],
      },
      {
        name: 'Back-end',
        level: 76,
        stack: ['Spring Boot', 'API design'],
      },
      {
        name: 'Prototypage data app',
        level: 83,
        stack: ['Streamlit', 'Rapid UI'],
      },
    ],
  },
]

type ProjectEntry = {
  title: string
  subtitle?: string
  imageLabel: string
  imagePath: string
  deckFile?: string
  videoLink?: string
}

type ProjectCategory = {
  title: string
  items: ProjectEntry[]
}

const projectCategories: ProjectCategory[] = [
  {
    title: 'Projets Academiques',
    items: [
      {
        title: 'Application Java (Spring Boot, JPA, PostgreSQL)',
        subtitle: 'Systeme de gestion des cours et generation de quiz',
        imageLabel: 'projet1',
        imagePath: '/projects/hackathon/WhatsApp Image 2026-04-13 at 18.12.52.jpeg',
      },
      {
        title: 'Application web de gestion des evaluations academiques',
        subtitle: 'Systeme de gestion des notes',
        imageLabel: 'projet2',
        imagePath: '/projects/hackathon/Capture d\'écran 2026-04-14 091251.png',
        deckFile: '/projects/Gestion_de_note_pour_%C3%A9tudiants%5B1%5D%20%5BLecture%20seule%5D.pptx',
      },
    ],
  },
  {
    title: 'Projets Personnels',
    items: [
      {
        title: 'Analyse intelligente des ventes et aide a la decision',
        subtitle: 'Systeme POS (Point of Sale)',
        imageLabel: 'projet3',
        imagePath: '/projects/hackathon/WhatsApp Image 2026-04-13 at 18.12.52.jpeg',
      },
    ],
  },
  {
    title: 'Projets IA & Innovation',
    items: [
      {
        title: 'Gestion multimodale des reclamations',
        subtitle: 'Application IA pour traitement texte, audio et image',
        imageLabel: 'projet4',
        imagePath: '/projects/hackathon/Capture d\'écran 2026-04-14 091251.png',
      },
      {
        title: "Application de l'IA en mecanique",
        subtitle: 'Transformation 2D vers 3D par RL',
        imageLabel: 'projet5',
        imagePath: '/projects/hackathon/WhatsApp Image 2026-04-13 at 18.12.52.jpeg',
        videoLink: 'https://youtu.be/FH8urve8zBA',
      },
    ],
  },
  {
    title: 'Hackathons',
    items: [
      {
        title: 'Amelioration du secteur informel et de la vie etudiante',
        subtitle: 'HackActus 2025 - TAGHRA',
        imageLabel: 'projet6',
        imagePath: '/projects/hackathon/Capture d\'écran 2026-04-14 091251.png',
      },
      {
        title: "Reduire l'empreinte carbone et optimiser l'energie",
        subtitle: 'Techathon 2025 - EcoStock Grid-Aware Optimizer',
        imageLabel: 'projet7',
        imagePath: '/projects/hackathon/WhatsApp Image 2026-04-13 at 18.12.52.jpeg',
      },
      {
        title: 'Detection de la douleur par intelligence artificielle',
        subtitle: 'InnovAI Hackathon 2023 - PainSense',
        imageLabel: 'projet8',
        imagePath: '/projects/hackathon/Capture d\'écran 2026-04-14 091251.png',
      },
    ],
  },
]

const projectGalleryImages: string[] = Array.from(
  new Set(projectCategories.flatMap((category) => category.items.map((item) => item.imagePath)))
).slice(0, 2)

type ExperienceItem = {
  key: string
  period: string
  title: string
  organization: string
  location: string
  details: string
  galleryKey: string
  certificatePdf?: string
}

type ExperienceImage = {
  src: string
  group: string
}

type EducationItem = {
  school: string
  location: string
  diploma: string
  period: string
}

const educationItems: EducationItem[] = [
  {
    school: 'École Nationale Supérieure d’Arts et Métiers (ENSAM)',
    location: 'Meknes, Maroc',
    diploma: 'Diplôme d’Ingénieur en Intelligence Artificielle et Techniques des Données',
    period: '2022 - Present',
  },
  {
    school: 'Lycée Technique Errazi',
    location: 'El Jadida, Maroc',
    diploma: 'Baccalauréat en Sciences Mathématiques B, Option Française',
    period: '2021 - 2022',
  },
]

const experienceItems: ExperienceItem[] = [
  {
    key: 'stage-ensam',
    period: 'Juil. 2025',
    title: 'Stage de Recherche',
    organization: 'Laboratoire ENSAM',
    location: 'Meknes, Maroc',
    details: 'Analyse des opportunites d’integration de l’IA dans les systemes industriels lourds.',
    galleryKey: 'stage_ensam',
    certificatePdf: '/doc/attestation-stage-ensam.pdf',
  },
  {
    key: 'stage-ocp',
    period: 'Aout 2025',
    title: 'Stage Technique',
    organization: 'OCP Jorf Lasfar',
    location: 'El Jadida, Maroc',
    details: 'Mission technique orientee performance industrielle, fiabilite et pistes d’integration IA.',
    galleryKey: 'stage_ocp',
    certificatePdf: '/doc/attestation-stage-ocp.pdf',
  },
]

const loadExperienceImages = (): ExperienceImage[] => {
  const imageModules = import.meta.glob('/public/experience/**/*.{png,jpg,jpeg,webp}')

  return Object.keys(imageModules)
    .sort((a, b) => a.localeCompare(b))
    .map((path) => {
      const pathParts = path.split('/')
      const group = (pathParts[pathParts.length - 2] || '').toLowerCase()

      return {
        src: path.replace('/public', ''),
        group,
      }
    })
}

const experienceImages = loadExperienceImages()

const Academic: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'projects' | 'skills' | 'experience' | 'resume'>('about')
  const [terminalText, setTerminalText] = useState('')
  const [activeExperience, setActiveExperience] = useState<ExperienceItem>(experienceItems[0])
  const [activeSkillKey, setActiveSkillKey] = useState<string>(skillSections[0]?.key ?? 'ia-ml')

  const activeSkillSection = skillSections.find((section) => section.key === activeSkillKey) ?? skillSections[0]

  useEffect(() => {
    const text = 'Parcours artistique et professionnel'
    let idx = 0
    const timer = setInterval(() => {
      if (idx <= text.length) {
        setTerminalText(text.slice(0, idx))
        idx += 1
      } else {
        clearInterval(timer)
      }
    }, 55)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#090d1a] pt-20">
      <div className="bg-[#0f1622] border-b border-[#2f3b4a] py-2">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between text-xs">
          <span className="text-[#8ba1b8]">Atelier Khalil</span>
          <span className="text-[#58a6ff]">Meknes / El Jadida, Maroc</span>
        </div>
      </div>

      <div className="bg-[#111a28] border-b border-[#2f3b4a]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="text-sm md:text-base text-[#c9d1d9]">
            <span className="font-semibold text-[#58a6ff]">Carnet d'atelier</span>
            <span className="mx-2 text-[#3d5a7a]">•</span>
            <span className="text-[#9fb0c3]">{terminalText}</span>
          </div>
        </div>
      </div>

      <div className="bg-[#111a28] border-b border-[#2f3b4a]">
        <div className="max-w-7xl mx-auto px-2 md:px-6 py-2 flex overflow-x-auto scrollbar-hide">
          {[
            { id: 'about', label: 'A propos', icon: Brain },
            { id: 'projects', label: 'Projets', icon: FolderKanban },
            { id: 'skills', label: 'Competences', icon: Database },
            { id: 'experience', label: 'Parcours', icon: Calendar },
            { id: 'resume', label: 'CV', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm border-b-2 whitespace-nowrap ${
                  activeTab === tab.id ? 'text-[#58a6ff] border-[#58a6ff]' : 'text-[#8ba1b8] border-transparent'
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {activeTab === 'about' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-md border border-[#2f3b4a] bg-[#111a28] p-6"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#8ba1b8]">APERCU DU PROFIL</p>
            <h2 className="text-[#58a6ff] text-lg md:text-xl font-semibold mt-2">Khalil Abderrazak - Portfolio IA et Creation</h2>

            <p className="text-[#c9d1d9] leading-relaxed mt-4">
              Eleve ingenieur en IA a l'ENSAM Meknes, je construis des solutions intelligentes reliees au terrain: modeles IA,
              systemes data et applications decisionnelles. Mon portfolio rassemble une vision complete entre rigueur technique,
              execution projet et sensibilite creative.
            </p>

            <p className="text-[#c9d1d9] leading-relaxed mt-4">
              Experience: stages ENSAM et OCP, section Formation, catalogue de projets academiques/personnels, participations
              hackathon, et panorama de competences (IA/ML, Data Science, Web, langages, outils, bases de donnees).
              Dimension humaine: activites parascolaires (GENOS, WEART, CARAVANE) et football.
              Dimension personnelle: art visuel et ecriture de roman dans Mes Ambitions.
            </p>

            <p className="text-[#8b949e] mt-4">
              Workflow: Analyse → Modelisation → Prototype → Test → Optimisation → Deploiement
            </p>
          </motion.div>
        ) : null}

        {activeTab === 'projects' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-xl border border-[#2f3b4a] bg-[#0f1622] overflow-hidden shadow-[0_20px_60px_-40px_#58a6ff]">
                <div className="border-b border-[#2f3b4a] px-4 py-3 bg-gradient-to-r from-[#0f1f35] to-[#0d1117]">
                  <h3 className="text-[#7fc0ff] text-base md:text-lg font-semibold tracking-wide">Project Catalogue</h3>
                </div>

                <div className="p-3 md:p-4 space-y-4">
                  {projectCategories.map((category) => (
                    <div key={category.title} className="rounded-lg border border-[#2d3f55] bg-gradient-to-b from-[#101b2c] to-[#0b1220] overflow-hidden">
                      <div className="px-3 py-2.5 border-b border-[#2d3f55] flex items-center justify-between gap-3">
                        <p className="text-[#8ab4f8] text-xs uppercase tracking-[0.17em]">{category.title}</p>
                        <span className="text-[10px] px-2 py-1 rounded-full border border-[#3a5678] text-[#aacfff] bg-[#112136]">
                          {category.items.length} items
                        </span>
                      </div>

                      <div className="p-3 space-y-2.5">
                        {category.items.map((project) => {
                          return (
                            <div
                              key={project.imageLabel}
                              className="w-full text-left rounded-lg border px-3 py-3 transition-colors"
                              style={{
                                borderColor: '#2a3a4f',
                                backgroundColor: '#0e1623',
                              }}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="text-[14px] md:text-[15px] text-[#dce6f2] leading-relaxed">{project.title}</p>
                                  {project.subtitle ? <p className="text-[12px] md:text-[13px] text-[#90a1b5] mt-1">{project.subtitle}</p> : null}
                                </div>
                                <span className="text-[10px] px-2 py-1 rounded border border-[#30425b] text-[#93c5fd] bg-[#101a2a] shrink-0">
                                  {project.imageLabel}
                                </span>
                              </div>

                              <div className="mt-3 h-px w-full bg-gradient-to-r from-[#2e3e53] via-[#3e5879] to-transparent" />

                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                {project.deckFile ? (
                                  <a
                                    href={project.deckFile}
                                    download="Gestion_de_note_pour_etudiants.pptx"
                                    className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded border border-[#2f81f7]/50 text-[#58a6ff] hover:bg-[#58a6ff] hover:text-[#0d1117] transition-colors"
                                  >
                                    <Download size={11} />
                                    Download PowerPoint
                                  </a>
                                ) : null}
                                {project.videoLink ? (
                                  <a
                                    href={project.videoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded border border-[#f4b740]/50 text-[#f4b740] hover:bg-[#f4b740] hover:text-[#0d1117] transition-colors"
                                  >
                                    <Youtube size={11} />
                                    Watch Video
                                  </a>
                                ) : null}
                                {!project.deckFile && !project.videoLink ? (
                                  <span className="text-[11px] text-[#6f8198]">No attachment</span>
                                ) : null}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#2f3b4a] bg-[#111824] p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#58a6ff] text-base md:text-lg font-semibold">Gallery Wall</h3>
                <p className="text-[11px] text-[#8b949e]">Section visuelle independante</p>
              </div>

              <Masonry breakpointCols={{ default: 2, 900: 2, 640: 1 }} className="flex -ml-3 w-auto" columnClassName="pl-3 bg-clip-padding">
                {projectGalleryImages.map((imagePath, index) => (
                  <motion.div
                    key={`${imagePath}-${index}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="mb-3 w-full rounded-md border border-[#2d3748] overflow-hidden bg-[#0d1117]"
                  >
                    <img src={imagePath} alt="Project gallery visual" className="w-full h-auto object-cover" loading="lazy" />
                  </motion.div>
                ))}
              </Masonry>
            </div>
          </motion.div>
        ) : null}

        {activeTab === 'skills' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <div className="rounded-lg border border-[#30363d] bg-gradient-to-r from-[#0f1728] via-[#121b2f] to-[#0f1728] p-5">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#7d8590]">Skills Command Center</p>
              <h2 className="text-[#58a6ff] text-lg md:text-xl font-semibold mt-1">Competences Techniques</h2>
              <p className="text-[#8b949e] text-xs mt-1">Selectionnez un domaine pour explorer le niveau de maitrise et les stacks associees.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-4">
              <div className="rounded-lg border border-[#30363d] bg-[#101722] p-3 space-y-2">
                {skillSections.map((section) => {
                  const isActive = section.key === activeSkillKey
                  const avgLevel = Math.round(section.items.reduce((acc, item) => acc + item.level, 0) / section.items.length)

                  return (
                    <button
                      key={section.key}
                      onClick={() => setActiveSkillKey(section.key)}
                      className="w-full text-left rounded-md border px-3 py-3 transition-all"
                      style={{
                        borderColor: isActive ? section.accent : '#30363d',
                        backgroundColor: isActive ? '#152238' : '#0d1117',
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold" style={{ color: isActive ? section.accent : '#d0d7de' }}>{section.title}</p>
                        <span className="text-[10px] px-2 py-0.5 rounded border" style={{ borderColor: `${section.accent}66`, color: section.accent }}>
                          {section.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8b949e] mt-2">Score moyen: {avgLevel}%</p>
                      <div className="mt-2 h-1.5 rounded-full bg-[#212b36] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${avgLevel}%`, backgroundColor: section.accent }} />
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="rounded-lg border border-[#30363d] bg-[#121923] overflow-hidden">
                <div className="px-4 py-4 border-b border-[#30363d] bg-[#0d1117]">
                  <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: activeSkillSection.accent }}>{activeSkillSection.label}</p>
                  <h3 className="text-[#d0d7de] font-semibold text-base md:text-lg mt-1">{activeSkillSection.title}</h3>
                  <p className="text-[#8b949e] text-xs mt-1">{activeSkillSection.summary}</p>
                </div>

                <div className="p-4 space-y-3">
                  {activeSkillSection.items.map((item, index) => (
                    <div key={`${activeSkillSection.key}-${index}`} className="rounded-md border border-[#2b3442] bg-[#0d1117] p-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[13px] text-[#d0d7de] font-semibold">{item.name}</p>
                        <span className="text-[11px]" style={{ color: activeSkillSection.accent }}>{item.level}%</span>
                      </div>

                      <div className="mt-2 h-2 rounded-full bg-[#1d2733] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${item.level}%`, backgroundColor: activeSkillSection.accent }}
                        />
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.stack.map((tech) => (
                          <span key={tech} className="text-[10px] px-2 py-1 rounded border border-[#2f3948] text-[#9fb0c3] bg-[#111927]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}

        {activeTab === 'experience' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            <div className="rounded-md border border-[#30363d] bg-[#0f141b] p-4">
              <h2 className="text-[#58a6ff] text-lg font-semibold mb-1">Formation & Experiences Professionnelles</h2>
              <p className="text-xs text-[#8b949e]">Cliquez sur une experience pour afficher sa galerie dans cette meme section.</p>
            </div>

            <div className="rounded-md border border-[#30363d] bg-[#161b22] p-5">
              <h3 className="text-[#58a6ff] font-semibold mb-4">Formation</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {educationItems.map((item) => (
                  <div key={`${item.school}-${item.period}`} className="rounded-md border border-[#30363d] bg-[#0d1117] p-4">
                    <p className="text-[#58a6ff] font-semibold">{item.school}</p>
                    <p className="text-[#8b949e] text-xs mt-1">{item.location}</p>
                    <p className="text-[#c9d1d9] text-sm mt-3">{item.diploma}</p>
                    <p className="text-[#7d8590] text-xs mt-2">{item.period}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {experienceItems.map((item) => {
                const isActive = item.key === activeExperience.key

                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveExperience(item)}
                    className="text-left rounded-md border p-5 transition-all duration-300"
                    style={{
                      borderColor: isActive ? '#58a6ff' : '#30363d',
                      backgroundColor: isActive ? '#152238' : '#161b22',
                    }}
                  >
                    <p className="text-xs text-[#7d8590] mb-1">{item.period}</p>
                    <h3 className="text-[#58a6ff] font-semibold">{item.title}</h3>
                    <p className="text-[#8b949e] text-sm">{item.organization}</p>
                    <p className="text-[#7d8590] text-xs mb-2">{item.location}</p>
                    <p className="text-[#c9d1d9] text-sm">{item.details}</p>
                    {item.certificatePdf ? (
                      <span className="inline-flex items-center gap-2 mt-3 text-xs text-[#7ee787]">
                        <Download size={12} />
                        Attestation disponible
                      </span>
                    ) : null}
                  </button>
                )
              })}
            </div>

            <div className="rounded-md border border-[#30363d] bg-[#161b22] p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs text-[#7d8590]">{activeExperience.period}</p>
                  <h3 className="text-[#58a6ff] font-semibold">{activeExperience.title}</h3>
                  <p className="text-[#8b949e] text-sm">{activeExperience.organization} • {activeExperience.location}</p>
                </div>

                {activeExperience.certificatePdf ? (
                  <a
                    href={activeExperience.certificatePdf}
                    download={activeExperience.certificatePdf.split('/').pop()}
                    type="application/pdf"
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded border border-[#30363d] text-[#58a6ff] hover:bg-[#58a6ff] hover:text-[#0d1117] transition-colors text-sm"
                  >
                    <Download size={14} />
                    Telecharger l'attestation
                  </a>
                ) : null}
              </div>

              {experienceImages.filter((image) => image.group === activeExperience.galleryKey).length > 0 ? (
                <Masonry
                  breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
                  className="flex -ml-4 w-auto"
                  columnClassName="pl-4 bg-clip-padding"
                >
                  {experienceImages
                    .filter((image) => image.group === activeExperience.galleryKey)
                    .map((image, index) => (
                      <motion.div
                        key={image.src}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        className="mb-4 rounded-md overflow-hidden border border-[#30363d]"
                      >
                        <img src={image.src} alt={activeExperience.title} className="w-full h-auto object-cover" loading="lazy" />
                      </motion.div>
                    ))}
                </Masonry>
              ) : (
                <div className="rounded-md border border-dashed border-[#30363d] bg-[#0d1117] p-4 text-sm text-[#8b949e]">
                  Aucune image detectee pour cette experience. Ajoutez vos fichiers dans
                  <span className="text-[#58a6ff]"> public/experience/{activeExperience.galleryKey}/</span>
                </div>
              )}
            </div>
          </motion.div>
        ) : null}

        {activeTab === 'resume' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-md border border-[#30363d] bg-[#161b22] p-6 text-center">
            <Code size={28} className="mx-auto text-[#58a6ff] mb-3" />
            <h3 className="text-white font-semibold">Download CV</h3>
            <p className="text-[#8b949e] text-sm mt-2">khalil_ABDERRAZAK_CV.pdf</p>
            <a
              href="/doc/khalil_ABDERRAZAK_CV.pdf"
              download="khalil_ABDERRAZAK_CV.pdf"
              type="application/pdf"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded border border-[#30363d] text-[#58a6ff] hover:bg-[#58a6ff] hover:text-[#0d1117] transition-colors"
            >
              <Download size={14} />
              Download
            </a>
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}

export default Academic
