# 🎨 Khalil Abderrazak - Interactive Portfolio

A modern, interactive, and fully responsive personal portfolio showcasing projects, experience, skills, and creative work. Built with cutting-edge web technologies for maximum performance and user experience.

## 🌟 Features

- **Interactive UI** – Smooth animations and transitions using Framer Motion
- **Dark/Light Theme** – Theme toggling with persistent preferences
- **Responsive Design** – Optimized for all device sizes
- **Modern Stack** – React 18 + TypeScript + Vite
- **Performance** – Fast load times with Vite optimization
- **SEO Friendly** – Structured content and metadata
- **Custom Cursor** – Engaging custom cursor experience

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **Vite** | Build Tool & Dev Server |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **React Router** | Navigation |
| **PostCSS** | CSS Processing |

## 📋 Content Sections

- **🏠 Home** – Introduction and navigation
- **💼 Projects** – Featured work: RoboNavX, AI CV Generator, Smart POS
- **🎓 Academic** – Education timeline and achievements
- **👨‍💼 Experience** – Internships (ENSAM, OCP) and technical timeline
- **🎨 Graphic Design** – Creative and design portfolio
- **🏆 Leadership** – Clubs leadership, initiatives, and contributions
- **📚 Personal Life** – Art, book, and personal interests
- **📞 Contact** – Ways to get in touch

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Abderrazakkhalil/A.KL-Portfolio.git
cd A.KL-Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will start at `http://localhost:5173/`

### Build for Production

```bash
# Build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation/     # Header navigation
│   ├── Layout/         # Page layout wrapper
│   ├── FloatingContact/# Floating contact widget
│   ├── CustomCursor/   # Custom cursor component
│   ├── ScrollProgress/ # Scroll progress indicator
│   └── Astrel/         # Custom component
├── pages/              # Page components
│   ├── LandingPage.tsx
│   ├── Academic.tsx
│   ├── GraphicDesign.tsx
│   ├── PersonalLife.tsx
│   └── ...
├── context/            # React Context (Theme)
├── store/              # State management
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## 🎯 Key Features Explained

### Theme System
Toggle between dark and light themes with context provider and persistent local storage.

### Responsive Images
Organization of images by category:
- `/public/about_me/` – Personal photos and artwork
- `/public/experience/` – Internship and work experience images
- `/public/parasco/` – Student life and club activities
- `/public/projects/` – Project showcases

### Smooth Animations
Framer Motion provides:
- Page transitions
- Scroll-triggered animations
- Interactive scroll progress
- Floating contact widget animations

## 📝 License

This project is personal work and copyright © 2025 Khalil Abderrazak.

## 🤝 Contact

- **GitHub:** [@Abderrazakkhalil](https://github.com/Abderrazakkhalil)
- **Email:** Contact via the floating contact widget
- **Portfolio:** [Live on GitHub Pages](#)

---

**Built with ❤️ by Khalil Abderrazak**
