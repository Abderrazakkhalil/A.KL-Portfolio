import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Masonry from 'react-masonry-css'
import { Brain, Code, Database, Download, Calendar, FolderKanban, Youtube, Wrench, MapPin } from 'lucide-react'

type SkillSection = {
  key: string
  label: string
  title: string
  summary: string
  icon: React.ReactNode
  items: Array<{
    name: string
    stack: string[]
    relatedProject?: string
  }>
}

const skillSections: SkillSection[] = [
  {
    key: 'ia-paradigms',
    label: 'IA',
    title: 'Architectures & Paradigmes IA',
    summary: 'Conception de modèles intelligents et architectures avancées.',
    icon: <Brain size={18} />,
    items: [
      {
        name: 'Fondamentaux & Mécanismes',
        stack: ['Apprentissage Statistique', 'Topologies Neuronales', "Mécanismes d'Attention (Transformers, ViT)"],
      },
      {
        name: 'Modèles Avancés',
        stack: ['RL Multi-Agents (MARL)', 'Espaces Latents (VAE, Diffusion)', 'Architectures Agentiques'],
      },
      {
        name: 'Optimisation & Apprentissage',
        stack: ['PEFT (LoRA)', 'Apprentissage Fédéré'],
      },
    ],
  },
  {
    key: 'dev-frameworks',
    label: 'Dev & Frameworks',
    title: 'Développement & Frameworks',
    summary: 'Polyvalence technique en développement logiciel et applicatif.',
    icon: <Code size={18} />,
    items: [
      {
        name: 'Langages de Programmation',
        stack: ['Python', 'C++', 'Java', 'PHP'],
      },
      {
        name: 'Frameworks Web & Applicatifs',
        stack: ['Spring Boot', 'React', 'PyQt'],
      },
    ],
  },
  {
    key: 'data-devops',
    label: 'Data & DevOps',
    title: 'Architecture Data & DevOps',
    summary: 'Modélisation, gestion des données et workflow de production.',
    icon: <Database size={18} />,
    items: [
      {
        name: 'Bases de Données & Modélisation',
        stack: ['SQL', 'PostgreSQL', 'Modélisation de données (UML/MERISE)'],
      },
      {
        name: 'Versioning & Infrastructure',
        stack: ['Git', 'Docker'],
      },
    ],
  },
  {
    key: 'mixed-industry',
    label: 'AR & Industrie',
    title: 'Réalité Mixte & Industrie',
    summary: 'Prototypage 3D, réalité augmentée et méthodes industrielles.',
    icon: <Wrench size={18} />,
    items: [
      {
        name: 'Moteurs 3D & AR',
        stack: ['Unity', 'Vuforia', 'ARCore'],
      },
      {
        name: 'Méthodologie & Ingénierie',
        stack: ['Méthodes Agiles (Scrum)', 'Lean Six Sigma', 'Éco-conception'],
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
  githubUrl?: string
  readmeDesc?: string
  gallery?: string[]
}

type ProjectCategory = {
  title: string
  items: ProjectEntry[]
}



type ExperienceItem = {
  key: string
  period: string
  title: string
  organization: string
  location: string
  details: string
  galleryKey: string
  certificatePdf?: string
  logo?: string
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
  logo?: string
}

const educationItems: EducationItem[] = [
  {
    school: 'École Centrale de Lyon',
    location: 'Lyon, France',
    diploma: 'Master 2 Informatique — Image, Développement & Technologie 3D (ID3D)',
    period: '2026 - 2027',
    logo: '/company-logos/centrale_lyon_logo.jpg'
  },
  {
    school: 'École Centrale de Lyon',
    location: 'Lyon, France',
    diploma: 'Mobilité 5e année — Ingénieur Généraliste, Éco-Conception & Innovation — Option Informatique',
    period: '2026 - 2027',
    logo: '/company-logos/centrale_lyon_logo.jpg'
  },
  {
    school: 'École Nationale Supérieure d’Arts et Métiers (ENSAM)',
    location: 'Meknès, Maroc',
    diploma: 'Diplôme d’Ingénieur — Intelligence Artificielle, Techniques des Données & Systèmes Industriels',
    period: '2022 - 2027',
    logo: '/company-logos/cole_nationale_suprieure_d_arts_et_mtiers_ensam_mknes_______logo.jpg'
  },
  {
    school: 'Lycée Technique Errazi',
    location: 'El Jadida, Maroc',
    diploma: 'Baccalauréat en Sciences Mathématiques B, Option Française',
    period: '2021 - 2022',
    logo: '/company-logos/lycee_logo.jpg'
  },
]



const experienceItems: ExperienceItem[] = [
  {
    key: 'stage-capgemini',
    period: 'Juil. – Août 2026',
    title: 'Stage Ingénieur',
    organization: 'Capgemini Engineering',
    location: 'Casablanca, Maroc',
    details: 'Conception et développement d\'une application de centralisation des solutions de consulting et de gestion des équipes.',
    galleryKey: 'stage_capegemini',
    certificatePdf: '/experience/stage_capegemini/attest_cap.pdf',
    logo: '/company-logos/capgemini_engineering_logo.jpg'
  },
  {
    key: 'stage-ocp',
    period: 'Août 2025',
    title: 'Stage Technique — Étude Stratégique IA',
    organization: 'OCP Jorf Lasfar',
    location: 'El Jadida, Maroc',
    details: 'Analyse des processus de l\'industrie lourde pour identifier des opportunités d\'intégration de l\'IA.',
    galleryKey: 'stage_ocp',
    certificatePdf: '/experience/stage_ocp/stage_ocp.pdf',
    logo: '/company-logos/ocp_logo.jpg'
  },
  {
    key: 'stage-ensam',
    period: 'Juil. 2025',
    title: 'Stage de Recherche — IA & Traitement du Langage',
    organization: 'Laboratoire Math-Info — ENSAM Meknès',
    location: 'Meknès, Maroc',
    details: 'Développement d\'une application intelligente d\'extraction de données et de génération automatique de CV.',
    galleryKey: 'stage_ensam',
    certificatePdf: '/experience/stage_ensam/attestation_stage_Khalil.pdf',
    logo: '/company-logos/cole_nationale_suprieure_d_arts_et_mtiers_ensam_mknes_______logo.jpg'
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
  const [projectCategories, setProjectCategories] = useState<ProjectCategory[]>([])

  useEffect(() => {
    fetch('/projects.json')
      .then((res) => res.json())
      .then((data: ProjectCategory[]) => setProjectCategories(data))
      .catch(() => { })
  }, [])

  const [activeTab, setActiveTab] = useState<'about' | 'projects' | 'skills' | 'experience' | 'resume'>('about')
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [terminalText, setTerminalText] = useState('')
  const [activeExperience, setActiveExperience] = useState<ExperienceItem>(experienceItems[0])
  const [activeSkillKey, setActiveSkillKey] = useState<string>(skillSections[0]?.key ?? 'ia-paradigms')
  const [activeProjectCategoryIndex, setActiveProjectCategoryIndex] = useState<number>(0)

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
    <div className="min-h-screen bg-white pt-20 relative">
      {/* Full-page background — always visible */}
      <style>{`
        @media (min-width: 900px) {
          .about-page-bg { background-image: url('/wied_bg_for_experience.png') !important; }
        }
        @media (max-width: 899px) {
          .about-page-bg { background-image: url('/phone_bg_for_experience.png') !important; }
        }
      `}</style>
      <div
        aria-hidden="true"
        className="about-page-bg fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
          opacity: 0.72,
        }}
      />
      <div className="bg-white border-b border-[#E5E5E5] py-2 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between text-xs">
          <span className="text-[#2A2A2A]">Atelier Khalil</span>
          <span className="text-[#CC0000]">Lyon, France / Meknès, Maroc</span>
        </div>
      </div>

      <div className="bg-white border-b border-[#E5E5E5] relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="text-sm md:text-base text-[#333333]">
            <span className="font-semibold text-[#CC0000]">Carnet d'atelier</span>
            <span className="mx-2 text-[#444444]">•</span>
            <span className="text-[#1A1A1A]">{terminalText}</span>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-[#E5E5E5] relative z-10">
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
                className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'text-[#CC0000] border-[#CC0000]' : 'text-[#2A2A2A] border-transparent hover:text-[#CC0000]'
                  }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 relative z-10">
        {activeTab === 'about' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative rounded-md border border-[#E5E5E5] bg-white p-6 shadow-sm z-10"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            {/* Content */}
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#888888]">APERCU DU PROFIL</p>

            {/* Two-column layout: photo + text */}
            <div className="mt-4 flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">

              {/* LEFT — Circular profile photo */}
              <div className="shrink-0 flex flex-col items-center">
                <div
                  className="rounded-full overflow-hidden bg-[#F5F5F5]"
                  style={{
                    width: 'clamp(100px, 14vw, 170px)',
                    height: 'clamp(100px, 14vw, 170px)',
                    border: '2px solid #C8102E',
                    padding: '3px',
                  }}
                >
                  <img
                    src="/profile.jpg"
                    alt="Khalil Abderrazak"
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                </div>
              </div>

              {/* RIGHT — Existing content */}
              <div className="flex-1 min-w-0">
                <h2 className="text-[#CC0000] text-lg md:text-xl font-semibold">Khalil Abderrazak — Élève-Ingénieur IATD-SI | ENSAM | Centrale Lyon | M2 ID3D</h2>

                <p className="text-[#333333] leading-relaxed mt-4">
                  Élève-ingénieur en double cursus (Centrale Lyon / ENSAM) et diplômé d'un Master 2 en Informatique (ID3D),
                  spécialisé en Vision par Ordinateur et Apprentissage par Renforcement. Capable de concevoir des architectures
                  Deep Learning de la recherche au déploiement, pour catalyser l'innovation en R&D et dans l'industrie.
                </p>

                <p className="text-[#333333] leading-relaxed mt-4">
                  Experience: stages Capgemini Engineering, OCP et Laboratoire Math-Info ENSAM, section Formation, catalogue de projets
                  académiques/personnels, participations hackathon, et panorama de compétences (IA/ML, Data Science, Web, langages,
                  outils, bases de données). Dimension humaine: activités parascolaires (GENOS, WEART, CARAVANE) et football.
                  Dimension personnelle: art visuel et écriture de roman dans Mes Ambitions.
                </p>

                <p className="text-[#888888] mt-4">
                  Workflow: Analyse → Modelisation → Prototype → Test → Optimisation → Deploiement
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}

        {activeTab === 'projects' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <div className="grid grid-cols-1 gap-4">
              {/* CATEGORY NAVIGATION */}
              <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2">
                {projectCategories.map((category, idx) => {
                  const isActive = activeProjectCategoryIndex === idx
                  return (
                    <button
                      key={category.title}
                      onClick={() => setActiveProjectCategoryIndex(idx)}
                      className="shrink-0 px-4 py-2 rounded-md text-xs md:text-sm transition-all border flex items-center gap-2"
                      style={{
                        borderColor: isActive ? '#CC0000' : '#E5E5E5',
                        backgroundColor: isActive ? '#CC0000' : '#FFFFFF',
                        color: isActive ? '#FFFFFF' : '#1A1A1A',
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {category.title}
                    </button>
                  )
                })}
              </div>

              {/* PROJECT DISPLAY */}
              <div>
                {projectCategories[activeProjectCategoryIndex] && (
                  <motion.div
                    key={activeProjectCategoryIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projectCategories[activeProjectCategoryIndex].items.map((project) => {
                        const isExpanded = expandedProject === project.title

                        return (
                          <div
                            key={project.title}
                            className="w-full text-left rounded-lg border transition-all flex flex-col cursor-pointer overflow-hidden shadow-sm"
                            onClick={() => setExpandedProject(isExpanded ? null : project.title)}
                            style={{
                              borderColor: isExpanded ? '#CC0000' : '#E5E5E5',
                              backgroundColor: '#FFFFFF',
                            }}
                          >
                            <div className="px-4 py-4 hover:bg-[#FAFAFA] transition-colors flex flex-col h-full">
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="min-w-0">
                                  <p className="text-[14px] md:text-[15px] text-[#0A0A0A] leading-relaxed font-semibold">{project.title}</p>
                                  {project.subtitle ? <p className="text-[12px] md:text-[13px] text-[#2A2A2A] mt-1">{project.subtitle}</p> : null}
                                </div>
                              </div>

                              {/* Affichage direct des images */}
                              {project.gallery && project.gallery.length > 0 && (
                                <div className="grid grid-cols-2 gap-2 mb-3" onClick={(e) => e.stopPropagation()}>
                                  {project.gallery.map((img, idx) => (
                                    <a key={idx} href={img} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded border border-[#E5E5E5] aspect-video">
                                      <img src={img} alt={`${project.title} aperçu ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                                    </a>
                                  ))}
                                </div>
                              )}

                              <div className="mt-auto pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#E5E5E5]">
                                <span className="text-[10px] px-2 py-1 rounded border border-[#D0D0D0] text-[#1A1A1A] bg-[#F5F5F5]">
                                  {project.imageLabel}
                                </span>
                                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                  {project.githubUrl ? (
                                    <a
                                      href={project.githubUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded border border-[#CC0000]/40 text-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-colors"
                                    >
                                      GitHub
                                    </a>
                                  ) : null}
                                  {project.deckFile ? (
                                    <a
                                      href={project.deckFile}
                                      target={project.deckFile.endsWith('.pdf') ? "_blank" : undefined}
                                      download={!project.deckFile.endsWith('.pdf') ? project.deckFile.split('/').pop() : undefined}
                                      className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded border border-[#CC0000]/40 text-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-colors"
                                    >
                                      <Download size={11} />
                                      {project.deckFile.endsWith('.exe') ? 'App' : 'Doc'}
                                    </a>
                                  ) : null}
                                  {project.videoLink ? (
                                    <a
                                      href={project.videoLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded border border-[#CC0000]/40 text-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-colors"
                                    >
                                      <Youtube size={11} />
                                      {project.videoLink.endsWith('.html') ? 'Demo' : 'Vidéo'}
                                    </a>
                                  ) : null}
                                  {!project.deckFile && !project.videoLink && !project.githubUrl ? (
                                    <span className="text-[11px] text-[#555555]">Aucun fichier</span>
                                  ) : null}
                                </div>
                              </div>
                            </div>

                            {/* EXPANDED CONTENT */}
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                className="border-t border-[#E5E5E5] bg-[#FAFAFA] p-4 text-[#1A1A1A] cursor-default"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {project.readmeDesc && (
                                  <div className="text-xs md:text-sm leading-relaxed border-l-2 border-[#CC0000] pl-3">
                                    {project.readmeDesc}
                                  </div>
                                )}

                                {!project.readmeDesc && (!project.gallery || project.gallery.length === 0) && (
                                  <p className="text-xs text-[#444444] italic">Plus de détails prochainement.</p>
                                )}
                              </motion.div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ) : null}

        {activeTab === 'skills' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <div className="rounded-lg border border-[#E5E5E5] bg-white p-5 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#2A2A2A]">Engineering Matrix</p>
              <h2 className="text-[#CC0000] text-lg md:text-xl font-semibold mt-1">Compétences Techniques</h2>
              <p className="text-[#1A1A1A] text-xs mt-1">Explorez mes domaines d'expertise, mes stacks technologiques et leurs applications pratiques.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Left Column: Categories */}
              <div className="flex-shrink-0 w-full lg:w-[280px] xl:w-[320px] rounded-lg border border-[#E5E5E5] bg-white p-2 md:p-3 space-y-1 shadow-sm overflow-x-auto lg:overflow-visible flex lg:flex-col gap-2 md:gap-1">
                {skillSections.map((section) => {
                  const isActive = section.key === activeSkillKey

                  return (
                    <button
                      key={section.key}
                      onClick={() => setActiveSkillKey(section.key)}
                      className="text-left rounded-md border px-3 py-3 transition-all flex items-center gap-3 whitespace-nowrap lg:whitespace-normal"
                      style={{
                        borderColor: isActive ? '#CC0000' : 'transparent',
                        backgroundColor: isActive ? '#FAFAFA' : 'transparent',
                      }}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded bg-[#F5F5F5] flex items-center justify-center transition-colors" style={{ color: isActive ? '#CC0000' : '#555555' }}>
                        {section.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate transition-colors" style={{ color: isActive ? '#CC0000' : '#222222' }}>{section.label}</p>
                        <p className="text-[10px] text-[#444444] hidden lg:block truncate">{section.title}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Right Column: Competency Details */}
              <div className="flex-grow rounded-lg border border-[#E5E5E5] bg-white overflow-hidden shadow-sm">
                <div className="px-5 py-5 border-b border-[#EEEEEE] bg-[#FAFAFA]">
                  <div className="flex items-center gap-2 text-[#CC0000] mb-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      {activeSkillSection.icon}
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em]">{activeSkillSection.label}</p>
                  </div>
                  <h3 className="text-[#0A0A0A] font-semibold text-lg md:text-xl">{activeSkillSection.title}</h3>
                  <p className="text-[#1A1A1A] text-sm mt-1.5 leading-relaxed">{activeSkillSection.summary}</p>
                </div>

                <div className="p-5 space-y-4">
                  {activeSkillSection.items.map((item, index) => (
                    <div key={`${activeSkillSection.key}-${index}`} className="rounded-md border border-[#EEEEEE] bg-[#FAFAFA] p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <p className="text-[14px] text-[#0A0A0A] font-semibold">{item.name}</p>
                        {item.relatedProject && (
                          <span className="text-[11px] text-[#CC0000] border border-[#CC0000]/30 bg-[#CC0000]/5 px-2 py-1 rounded inline-flex items-center gap-1.5 whitespace-nowrap">
                            <FolderKanban size={10} />
                            Appliqué dans : {item.relatedProject}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {item.stack.map((tech) => (
                          <span key={tech} className="text-[11px] px-2.5 py-1 rounded border border-[#E5E5E5] text-[#1A1A1A] bg-white">
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8" style={{ fontFamily: 'JetBrains Mono, monospace' }}>

            <div className="rounded-lg border border-[#E5E5E5] bg-white p-5 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#2A2A2A]">Parcours</p>
              <h2 className="text-[#CC0000] text-lg md:text-xl font-semibold mt-1">Formation & Expériences</h2>
              <p className="text-[#1A1A1A] text-xs mt-1">Un aperçu chronologique de mes études et stages professionnels.</p>
            </div>

            {/* FORMATION SECTION */}
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-5 md:p-8 shadow-sm">
              <h3 className="text-[#CC0000] font-semibold mb-8 text-lg border-b border-[#EEEEEE] pb-2">Formation Académique</h3>

              <div className="relative border-l border-[#E5E5E5] ml-4 md:ml-6 space-y-10 pb-4">
                {educationItems.map((item) => (
                  <div key={`${item.school}-${item.period}`} className="relative pl-6 md:pl-10">
                    {/* Timeline dot */}
                    <div className="absolute w-3 h-3 bg-white border-2 border-[#CC0000] rounded-full -left-[6.5px] top-1.5" />

                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      {/* Logo Container */}
                      <div className="flex-shrink-0 w-16 h-16 rounded border border-[#E5E5E5] bg-white p-2 flex items-center justify-center shadow-sm">
                        {item.logo ? (
                          <img src={item.logo} alt={item.school} className="max-w-full max-h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[10px] text-[#A0A0A0]">Logo</span>'; }} />
                        ) : (
                          <span className="text-[10px] text-[#A0A0A0]">Logo</span>
                        )}
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                          <h4 className="text-[#0A0A0A] font-semibold text-base">{item.school}</h4>
                          <span className="text-xs text-[#2A2A2A] bg-[#F5F5F5] px-2 py-0.5 rounded border border-[#EEEEEE] w-fit">{item.period}</span>
                        </div>
                        <p className="text-sm text-[#1A1A1A] mt-2 font-medium">{item.diploma}</p>
                        <p className="text-xs text-[#2A2A2A] mt-2 flex items-center gap-1">
                          <MapPin size={12} /> {item.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EXPERIENCE SECTION */}
            <div className="bg-white border border-[#E5E5E5] rounded-lg p-5 md:p-8 shadow-sm">
              <h3 className="text-[#CC0000] font-semibold mb-8 text-lg border-b border-[#EEEEEE] pb-2">Expériences Professionnelles</h3>
              <p className="text-xs text-[#2A2A2A] mb-6">Cliquez sur une expérience pour afficher sa galerie photo ci-dessous.</p>

              <div className="relative border-l border-[#E5E5E5] ml-4 md:ml-6 space-y-8 pb-4">
                {experienceItems.map((item) => {
                  const isActive = item.key === activeExperience.key;

                  return (
                    <div key={item.key} className="relative pl-6 md:pl-10 group">
                      {/* Timeline dot */}
                      <div className={`absolute w-3 h-3 rounded-full -left-[6.5px] top-4 transition-colors ${isActive ? 'bg-[#CC0000] border-2 border-[#CC0000]' : 'bg-white border-2 border-[#D0D0D0] group-hover:border-[#CC0000]'}`} />

                      <div
                        className={`flex flex-col md:flex-row gap-4 md:gap-6 p-4 -ml-4 -mt-2.5 rounded-lg transition-all cursor-pointer border ${isActive ? 'border-[#CC0000]/20 bg-[#CC0000]/5' : 'border-transparent hover:bg-[#FAFAFA]'}`}
                        onClick={() => setActiveExperience(item)}
                      >
                        {/* Logo Container */}
                        <div className="flex-shrink-0 w-16 h-16 rounded border border-[#E5E5E5] bg-white p-2 flex items-center justify-center shadow-sm">
                          {item.logo ? (
                            <img src={item.logo} alt={item.organization} className="max-w-full max-h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-[10px] text-[#A0A0A0]">Logo</span>'; }} />
                          ) : (
                            <span className="text-[10px] text-[#A0A0A0]">Logo</span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-3">
                            <h4 className="text-[#0A0A0A] font-semibold text-base">{item.title}</h4>
                            <span className="text-xs text-[#CC0000] bg-white px-2 py-0.5 rounded border border-[#E5E5E5] w-fit">{item.period}</span>
                          </div>
                          <p className="text-sm font-medium text-[#1A1A1A] mt-1.5">{item.organization}</p>
                          <p className="text-xs text-[#2A2A2A] mt-1.5 flex items-center gap-1">
                            <MapPin size={12} /> {item.location}
                          </p>
                          <p className="text-sm text-[#1A1A1A] mt-3 leading-relaxed border-l-2 border-[#EEEEEE] pl-3">
                            {item.details}
                          </p>
                          {item.certificatePdf && (
                            <div className="mt-3">
                              <a href={item.certificatePdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded border border-[#CC0000]/40 text-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                                <Download size={11} />
                                Voir l'attestation
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Gallery for active experience */}
              <div className="mt-8 pt-6 border-t border-[#EEEEEE]">
                <h4 className="text-[#0A0A0A] font-semibold text-sm mb-4">Galerie : {activeExperience.organization}</h4>
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
                          className="mb-4 rounded-md overflow-hidden border border-[#E5E5E5] shadow-sm"
                        >
                          <img src={image.src} alt={activeExperience.title} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                        </motion.div>
                      ))}
                  </Masonry>
                ) : (
                  <div className="rounded-md border border-dashed border-[#E5E5E5] bg-[#FAFAFA] p-4 text-sm text-[#444444] text-center">
                    Aucune image détectée pour cette expérience. Ajoutez vos fichiers dans
                    <span className="text-[#CC0000] block mt-1">public/experience/{activeExperience.galleryKey}/</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : null}

        {activeTab === 'resume' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-md border border-[#222222] bg-[#111111] p-6 text-center">
            <Code size={28} className="mx-auto text-[#CC0000] mb-3" />
            <h3 className="text-white font-semibold">Download CV</h3>
            <p className="text-[#CCCCCC] text-sm mt-2">A_KL_CV.pdf</p>
            <a
              href="/doc/A_KL_CV.pdf"
              download="A_KL_CV.pdf"
              type="application/pdf"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded border border-[#222222] text-[#CC0000] hover:bg-[#CC0000] hover:text-[#050505] transition-colors"
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
