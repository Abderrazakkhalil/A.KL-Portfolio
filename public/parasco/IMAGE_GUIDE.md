# Personal Page - Image Organization Guide

This guide explains what images to place in each folder for the Personal Page.

---

## 📁 Folder Structure

```
/public/personal/
├── background/     → Background image for the main section
├── hero/           → Main profile/hero images
├── leadership/     → Leadership roles and responsibilities
├── hobbies/        → Personal interests and hobbies
├── achievements/   → Awards, certificates, recognitions
├── team/           → Team photos and group activities
└── gallery/        → Mixed personal moments and memories
```

---

## 📸 Detailed Guide

### 1. **/background/** - Main Background Image
**Purpose:** Large background image for the personal page hero section

**What to include:**
- Wide, high-quality landscape photo
- Atmospheric or meaningful scene
- Personal place or meaningful location
- Abstract or textured background
- Workspace or creative environment photo
- Can be slightly blurred or with overlay

**Image specs:**
- Format: JPG or WebP (for smaller size)
- Recommended size: 2560x1440 or higher (ultra-wide)
- Orientation: Landscape (wide)
- Aspect ratio: 16:9 or 21:9
- Quality: High resolution but optimized (< 1MB)

**Tips:**
- Choose an image that's not too busy (works well with text overlay)
- Darker images work better (or will be darkened with overlay)
- Should represent your personality or story
- Consider using a gradient overlay for better text readability

**Examples:**
- `background-main.jpg` - Main background image
- `background-workspace.jpg` - Your workspace/study area
- `background-campus.jpg` - Your school campus
- `background-city.jpg` - City skyline or meaningful place

---

### 2. **/hero/** - Hero/Profile Section
**Purpose:** Main personal profile images that represent you

**What to include:**
- Professional portrait photo
- High-quality headshot
- Personal branding photos
- Creative self-portraits
- Action shots that represent your personality

**Image specs:**
- Format: JPG, PNG, or WebP
- Recommended size: 1920x1080 or higher
- Orientation: Portrait or landscape
- Quality: High resolution, well-lit

**Examples:**
- `hero-portrait.jpg` - Main professional photo
- `hero-creative.jpg` - Creative/artistic version
- `hero-action.jpg` - Dynamic action shot

---

### 2. **/leadership/** - Leadership & Roles
**Purpose:** Photos showcasing your leadership positions and responsibilities

**What to include:**
- GENOS club founder/president photos
- VP of External Affairs activities
- Student leadership events
- Public speaking moments
- Meeting with teams or stakeholders
- Event organizing photos
- Mentoring activities

**Examples:**
- `genos-founder.jpg` - As GENOS club founder
- `vp-external-affairs.jpg` - VP role activities
- `leadership-event.jpg` - Leading an event
- `team-meeting.jpg` - Meeting with team
- `public-speaking.jpg` - Presenting or speaking

---

### 3. **/hobbies/** - Personal Interests
**Purpose:** Images showing your hobbies and personal passions

**What to include:**
- Creative activities (design, art, music)
- Sports or fitness activities
- Travel photos
- Reading or learning moments
- Tech projects or coding sessions
- Photography work
- Any personal interests

**Examples:**
- `design-work.jpg` - Working on designs
- `travel-adventure.jpg` - Travel moments
- `coding-session.jpg` - Working on projects
- `photography.jpg` - Taking photos
- `sports-activity.jpg` - Playing sports

---

### 4. **/achievements/** - Awards & Recognition
**Purpose:** Visual proof of awards, certificates, and accomplishments

**What to include:**
- Award ceremonies photos
- Holding certificates or trophies
- Competition wins
- Recognition events
- Hackathon wins
- Competition participation photos
- Achievement announcements
- Certificate close-ups

**Examples:**
- `hackathon-win.jpg` - Winning hackathon
- `certificate-ai.jpg` - AI certification photo
- `award-ceremony.jpg` - Receiving an award
- `competition-team.jpg` - Competition group photo
- `recognition-event.jpg` - Recognition moment

---

### 5. **/team/** - Team Photos
**Purpose:** Group photos with teams, clubs, and organizations

**What to include:**
- GENOS club team photos
- Engineering school group photos
- Project team photos
- Club activities and events
- Workshops with teams
- Team bonding moments
- Collaborative work sessions

**Examples:**
- `genos-team.jpg` - GENOS club members
- `project-team.jpg` - Working with project team
- `club-activity.jpg` - Club event group photo
- `workshop-team.jpg` - Workshop participants
- `team-bonding.jpg` - Social team moments

---

### 6. **/gallery/** - Personal Gallery
**Purpose:** Mixed collection of personal moments and memories

**What to include:**
- Candid moments
- Behind-the-scenes photos
- Fun moments with friends
- Creative shots
- Lifestyle photos
- Memorable events
- Personal milestones
- Any photos that tell your story

**Examples:**
- `candid-moment.jpg` - Natural, candid shot
- `friends-fun.jpg` - Hanging out with friends
- `creative-shot.jpg` - Artistic photo
- `milestone-event.jpg` - Personal milestone
- `behind-scenes.jpg` - BTS moment

---

## 🎨 Image Best Practices

### Format Recommendations:
- **JPG** - For photos with lots of colors
- **PNG** - For images with transparency or text
- **WebP** - For smaller file sizes (modern format)

### Size Guidelines:
- **Hero images:** 1920x1080 or larger (landscape)
- **Profile shots:** 1200x1600 or larger (portrait)
- **Team photos:** 1920x1080 or larger (landscape)
- **Gallery images:** 1200x800 or larger

### Quality Tips:
✅ Use high-resolution images (at least 1080p)
✅ Ensure good lighting
✅ Keep backgrounds clean or relevant
✅ Use consistent color grading for cohesive look
✅ Compress images to reduce load time (use tinypng.com)

### Naming Convention:
- Use lowercase letters
- Separate words with hyphens (-)
- Be descriptive: `genos-team-2024.jpg` not `IMG_1234.jpg`
- Include year if relevant: `hackathon-win-2024.jpg`

---

## 📝 How to Add Images

1. **Save images** to the appropriate folder
2. **Use descriptive names** (e.g., `genos-founder-speech.jpg`)
3. **Optimize file size** before uploading (aim for < 500KB per image)
4. **Reference in code** using: `/personal/[folder]/[image-name].jpg`

**Example in code:**
```tsx
<img src="/personal/leadership/genos-founder.jpg" alt="GENOS Founder" />
```

---

## 🎯 Priority Images to Add First

1. **Background:** 1 main background image (MOST IMPORTANT)
2. **Hero section:** 1-2 main profile photos
3. **Leadership:** 3-5 photos of leadership activities
4. **Achievements:** 2-3 award/certificate photos
5. **Team:** 2-3 team photos with GENOS/groups
6. **Hobbies:** 3-4 personal interest photos
7. **Gallery:** 5-10 mixed personal moments

---

## ✨ Tips for Great Personal Page Photos

- **Tell a story:** Each section should narrate part of your journey
- **Show personality:** Include photos that reflect who you are
- **Balance:** Mix professional and casual photos
- **Diversity:** Show different aspects of your life
- **Quality over quantity:** Better to have fewer high-quality photos
- **Authenticity:** Use real photos, not stock images
- **Update regularly:** Keep adding new milestones and moments

---

**Need help?** Check the examples in each folder or look at the current Personal page design for reference!
