import { create } from 'zustand'

interface CursorState {
  cursorVariant: 'default' | 'hover' | 'click'
  setCursorVariant: (variant: 'default' | 'hover' | 'click') => void
}

export const useCursorStore = create<CursorState>((set) => ({
  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}))

interface NavigationState {
  isMenuOpen: boolean
  currentSection: string
  setMenuOpen: (isOpen: boolean) => void
  setCurrentSection: (section: string) => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isMenuOpen: false,
  currentSection: 'home',
  setMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  setCurrentSection: (section) => set({ currentSection: section }),
}))
