# Portfolio Light Theme Redesign — Design Spec

**Date:** 2026-05-25
**Branch:** `feature/light-theme-redesign`
**Approach:** Progressive Enhancement (4 phases)
**Goal:** Transform the retro-portfolio from a dark cyberpunk theme to a light brutalist-glitch / high-contrast modern design that showcases Eddie Rosillo as a Design Engineer / Creative Developer and impresses prospective employers.

---

## 1. Design Direction

**Theme:** Light background with bold black typography and controlled glitch effects. The aesthetic is high-contrast modern editorial meets corrupted data — clean 95% of the time, with chromatic aberration and glitch as intentional accent moments.

**Why this direction:** Most retro/gaming portfolios default to dark themes. A light theme with glitch effects is immediately differentiating. The contrast between precise structure (thin lines, section numbers, generous whitespace) and controlled chaos (RGB split, scanlines, glitch bursts) demonstrates both design sensibility and technical mastery — exactly what a design engineer role requires.

---

## 2. Color System

| Token                | Value      | Usage                                      |
|----------------------|------------|---------------------------------------------|
| `--color-bg`         | `#ffffff`  | Page background                             |
| `--color-surface`    | `#f8f8f8`  | Card backgrounds, subtle depth              |
| `--color-text`       | `#0a0a0a`  | Primary text, headings                      |
| `--color-text-muted` | `#666666`  | Secondary/body text                         |
| `--color-label`      | `#999999`  | Section numbers, metadata, monospace labels |
| `--color-accent-1`   | `#00ccff`  | Cyan — glitch layers, interactive highlights, active states |
| `--color-accent-2`   | `#ff3366`  | Hot pink — glitch layers, select accent bars |
| `--color-divider`    | `#e0e0e0`  | Thin 1px section dividers                   |

**Usage rule:** Cyan and hot pink are used sparingly as punctuation — glitch layers on headlines, select skill bars, hover states, active nav indicators. Everything else is black, white, and gray. The restraint makes the color hits land harder.

---

## 3. Typography

| Role         | Font           | Weight  | Style                                  |
|--------------|----------------|---------|----------------------------------------|
| Headings     | Space Grotesk  | 700     | Uppercase, letter-spacing: -0.03em     |
| Body         | Inter          | 400/600 | Normal case, line-height: 1.8          |
| Mono/Labels  | JetBrains Mono | 400/700 | Uppercase, letter-spacing: 0.15-0.3em |

Space Grotesk and Inter are already imported via Google Fonts in `global.css`. JetBrains Mono is **not currently imported** — `--font-mono` is referenced in components but never defined in CSS variables, so it falls back to browser defaults. Phase 1 must add both the Google Fonts import for JetBrains Mono and the `--font-mono` CSS variable definition.

---

## 4. Section System

Each major section of the homepage gets:
- A monospace label in `--color-label`: `001 — INTRO`, `002 — FEATURED WORK`, `003 — CAPABILITIES`, `004 — ABOUT`
- A 1px `--color-divider` line separating sections
- Generous vertical padding: 5-6rem between sections
- Content within a max-width container (carry forward current `--container-width`)

---

## 5. Components

### 5.1 Navigation

- Background: `#ffffff` with 1px bottom border in `--color-divider`
- Logo: current ER_Logo.png or text "ER" in black
- Links: JetBrains Mono, uppercase, bold, black text
- Active link: 3px underline in `--color-accent-1`
- On scroll: add `backdrop-filter: blur(10px)` and subtle `box-shadow`
- Mobile: hamburger icon triggers full-screen overlay with large stacked links; glitch-flash animation on open/close
- Sound toggle icon (speaker) in nav — small, unobtrusive

### 5.2 Hero

**Structure preserved from current site:**
- Main headline: "Hi, I'm Eddie." in large Space Grotesk (6rem desktop, 3.5rem mobile)
- Subtitle with typewriter effect — **change text to**: `Creative Developer` and `Design Engineer` (cycles between both instead of just "Web Developer")
- Location line: "Based in the Greenville-Spartanburg Area, SC."
- Scroll indicator: `SCROLL_DOWN` with vertical line

**Visual changes:**
- Background: white with subtle dot-grid pattern (`radial-gradient` at 30x30px, `rgba(0,0,0,0.04)`)
- Remove synthwave grid animation
- Remove floating geometric shapes (cube/pyramid)
- Add chromatic aberration glitch layers to hero name: cyan and pink offset text positioned with `clip-path` and slight translate. Animate on scroll-trigger or periodically with subtle keyframe.
- Hero fade overlay: gradient from transparent to `#ffffff` (instead of `--color-bg` dark)
- Typewriter cursor: change from cyan glow to solid black `|` with blink animation
- Subtitle static text changes from "Multimedia Designer" to "Creative Developer" — typed text cycles between "Design Engineer" and "Web Developer"
- All text colors adapted: headline in `--color-text`, subtitle in `--color-text-muted`, static role text in bold `--color-text`, typed text in `--color-accent-1`

**Spline 3D scene:**
- Keep the canvas but reduce presence: lower opacity to 0.4-0.5, or reduce container width from 60% to 40%
- Ensure the scene works visually on a white/light background — may need to adjust the Spline scene's own background to transparent
- Typography and glitch effect are the hero's star; 3D is ambient depth
- On mobile: further reduce opacity or hide entirely if performance is a concern

### 5.3 Featured Work

**Content improvements:**
- Add a one-line description under each project title showing role or impact (e.g., "Interactive scrollytelling experience built with GSAP & Astro")
- Add project tags showing tech stack (e.g., "Astro", "GSAP", "After Effects") as small pills
- Consider curating the 5 featured projects to best represent range across web/motion/graphic

**Visual design:**
- Section label: `002 — FEATURED WORK`
- Larger card format — let images breathe with more height
- Image container: no border-radius (square/rectangular for brutalist feel), thin 1px `--color-divider` border
- Hover: image zooms slightly (scale 1.03), thin scanline overlay fades in over image, card lifts with subtle shadow
- Category label in monospace uppercase `--color-label`
- Title in Space Grotesk bold black
- Description in Inter `--color-text-muted`
- Tags as small inline pills: light gray background, monospace text
- Staggered scroll-reveal animation (each card 100ms delay)

### 5.4 Skills Inventory (Player Stats)

**Concept:** Keep the RPG game UI metaphor — it's the signature element. Evolve the execution for the light theme.

**Visual adaptation:**
- Card background: `#ffffff` or `--color-surface` with thin 1px `--color-divider` border
- Header bar: light gray background with "PLAYER STATS" in monospace, macOS dots retained
- Scanline overlay: much more subtle on light — `rgba(0,0,0,0.02)` instead of `rgba(0,0,0,0.1)`
- Avatar image: keep with subtle scanline sweep animation
- Player info (CLASS, LEVEL, XP): black text, values in bold

**Skills list update:**
- Expand from 6 to 9 skills, organized in 3 categories displayed as labeled groups within the stats list:
  - Design: Photoshop (100), Illustrator (95), Figma (90)
  - Motion: After Effects (100), Premiere Pro (95), Cinema 4D (80)
  - Code: HTML/CSS (95), JavaScript/TypeScript (85), React/Astro (80)
- The stats list column expands to accommodate 9 skills. Category group labels ("DESIGN", "MOTION", "CODE") in small monospace text above each group of 3 bars.
- Progress bars: black fill for design skills, `--color-accent-1` for code skills, `--color-accent-2` for motion skills
- Bars animate from 0% to value on scroll-reveal
- Eddie should confirm these skill levels and adjust as needed during Phase 4

**Footer:** "STATUS: AVAILABLE" (signals you're open to work), "CREDITS: ∞"

### 5.5 About Me

**Content rewrite direction:**
- Lead with what makes Eddie unique: 15+ years spanning both design and engineering — a rare combination
- Remove self-deprecating language ("working knowledge of JavaScript") — the site itself proves deep technical skill
- Keep bilingual mention — it's a real differentiator
- Sharper, more confident tone — first person, active voice
- Add a "currently" line: what Eddie is excited about right now (e.g., "Currently exploring creative coding, 3D web experiences, and the intersection of design and development")
- Fix typo: "CSS3,fluently" → proper spacing

**Visual design:**
- Section label: `004 — ABOUT`
- Two-column layout preserved: bio left, skills inventory right
- Bio text: Inter 400, `--color-text-muted`, generous line-height (1.8)
- Social links: monospace uppercase, black text, underline on hover in `--color-accent-1`

### 5.6 Category Pages (Graphic / Motion / Web)

- Section label at top: e.g., `003.1 — WEB PROJECTS`
- Grid of project cards matching Featured Work card design
- Each card shows: image, title, category tag, one-line description, tech tags
- Hover effects: image zoom + scanline overlay
- Cards stagger in on scroll

### 5.7 Project Detail Pages

- Full-width hero image/video at top with subtle scanline overlay on hover
- Project title: large bold Space Grotesk with chromatic aberration effect
- Metadata bar below title: category, date, tags, live URL (if applicable) — all monospace
- Content area: clean Inter typography, generous line-height, max-width for readability
- ConsolePlayer (for motion projects): adapted to light theme — white/light bezel, thin borders
- Bottom navigation: "← Previous Project" / "Next Project →" with glitch transition on click

### 5.8 Contact Page

- Keep current form structure: name, email, message, Cloudflare Turnstile CAPTCHA
- Adapt to light theme: white background, thin borders on inputs, black text
- Input focus state: border changes to `--color-accent-1`
- Submit button: black background, white text, glitch effect on hover (brief RGB split)
- Success modal: white card, thin border, monospace "MESSAGE SENT" header, macOS dots

### 5.9 Blog (Future)

- Blog listing: cards matching the BlogPostCard design, adapted to light theme
- Individual posts: clean readable layout matching project detail page structure
- No immediate changes needed since blog content collection is empty — design system will apply when content is added

---

## 6. Interactive Features

### 6.1 Custom 8-Bit Cursor

- Default state: 8-bit pixel arrow cursor (custom PNG/SVG, ~24x24px)
- Hover state on clickable elements: 8-bit pixel hand pointer
- Implementation: CSS `cursor: url(...)` with fallback to default
- Desktop only — mobile retains native touch behavior
- Cursor assets: create or source simple pixel-art sprites matching the gaming identity

### 6.2 Smooth Page Transitions

- Use Astro View Transitions API (`<ViewTransitions />` in layout)
- Transition effect: brief glitch-flash — 2-3 frames of full-screen chromatic aberration noise, then new page fades in
- Implementation: CSS animation triggered by `astro:before-swap` and `astro:after-swap` events
- Loading indicator: thin `--color-accent-1` progress bar at top of viewport during navigation
- Keep transitions fast (<500ms total) — impressive but never slow

### 6.3 Scroll-Triggered Animations

- Use IntersectionObserver (no external library) for scroll detection
- Elements start with `opacity: 0; transform: translateY(20px)` and animate to visible
- Section number labels: count up from `000` to their value (e.g., `001`, `002`)
- Skill bars: fill from 0% to target width with 300ms stagger between bars
- Project cards: stagger in left-to-right with 100ms delay between cards
- Animation duration: 300-400ms, easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Each element animates only once (no re-trigger on scroll back up)
- Respect `prefers-reduced-motion`: disable animations if user prefers reduced motion

### 6.4 Easter Eggs

**Konami Code:**
- Sequence: ↑ ↑ ↓ ↓ ← → ← → B A
- Trigger: full-screen glitch meltdown — CRT distortion effect, RGB channel split, screen shake, noise overlay
- Duration: 2-3 seconds, then resolves with a hidden message (e.g., "ACHIEVEMENT UNLOCKED: You found the secret!" in retro pixel font)
- Implementation: keydown event listener tracking sequence, CSS animation for the effect
- Not advertised anywhere — rewards curious visitors

### 6.5 Sound Design

- **Default state: OFF** — small speaker icon toggle in navbar
- When enabled:
  - Nav link click: soft 8-bit click sound (~200ms)
  - Featured work hover: subtle glitch buzz (~300ms)
  - Page load (first visit): retro boot-up chime (~500ms)
  - Konami code trigger: glitch/static burst
- All sounds: 8-bit/chiptune style, short duration, low volume
- Audio files: small WAV or MP3, lazy-loaded only when sound is enabled
- Persist preference in localStorage

---

## 7. Glitch Effects System

Central to the design identity. All glitch effects are CSS-based (no canvas/WebGL) for performance.

### 7.1 Chromatic Aberration (Headlines)

- Two additional text layers (cyan + pink) positioned with slight translate offset (2-3px)
- Each layer uses `clip-path: polygon(...)` to show only a portion of the text
- Static on load, with subtle animation on hover or periodic keyframe trigger
- Applied to: hero name, section titles (on hover), project detail titles

### 7.2 Scanline Overlay (Images)

- Horizontal lines via `linear-gradient` — `rgba(0,0,0,0.03)` on 2px repeat
- Applied to project images on hover (fades in with 0.3s transition)
- Applied subtly to Skills Inventory panel (always visible, very light)
- Applied to avatar image (with animated scan sweep)

### 7.3 Glitch Hover (Text)

- On hover: text briefly shifts with `text-shadow` offset in cyan and pink
- Duration: 150ms, 2-3 "flicker" keyframes
- Applied to: nav links, social links, CTA buttons

### 7.4 Page Transition Glitch

- Full-screen overlay that briefly flashes on page navigation
- Combines: noise texture, RGB channel separation, horizontal displacement bands
- Total duration: 300-400ms
- Triggered via Astro View Transitions lifecycle events

---

## 8. Responsive Behavior

**Breakpoints:**
- Desktop: >768px (full layout)
- Mobile: ≤768px (single column, stacked layout)

**Key adaptations at mobile:**
- Hero title: 6rem → 3.5rem
- Hero subtitle: 2.5rem → 1.8rem
- Nav: hamburger menu → full-screen overlay
- Content grid (About Me): 2 columns → 1 column
- Project grid: multi-column → single column
- Spline 3D: reduce opacity further or hide
- Custom cursor: disabled (native touch)
- Skill inventory: single column layout for stats

---

## 9. Performance Considerations

- **No external animation libraries** — all animations via CSS keyframes + IntersectionObserver
- **Spline 3D lazy-loading** — already implemented, keep loading spinner
- **Sound files lazy-loaded** — only fetch when user enables sound
- **View Transitions** — native Astro API, no JavaScript animation framework
- **Custom cursor** — lightweight PNG/SVG, loaded via CSS
- **prefers-reduced-motion** — all animations respect this media query

---

## 10. Accessibility

- Maintain existing skip link and ARIA labels
- All glitch effects are decorative — content remains readable without them
- Sufficient color contrast: black text on white background exceeds WCAG AAA
- Cyan accent (#00ccff) on white does NOT meet contrast requirements — never use as text color on white; use only for decorative elements (borders, bars, glitch layers)
- Sound is off by default with explicit opt-in toggle
- Animations respect `prefers-reduced-motion`
- Custom cursor has CSS fallback to system default

---

## 11. Implementation Phases

### Phase 1: Light Theme + Typography Foundation
- Update CSS custom properties (color system)
- Adapt global styles (background, text colors, dividers)
- Implement section numbering system
- Update NavBar for light theme
- Update Hero for light theme (colors, remove synthwave grid/shapes, adapt Spline)
- Update all components' background and text colors
- Verify readability and contrast across all pages

### Phase 2: Glitch Effects + Animations
- Build chromatic aberration system for headlines
- Implement glitch hover effects on text elements
- Add scanline overlay system for images
- Implement scroll-triggered animations (IntersectionObserver)
- Add section number count-up animation
- Skill bar fill animation on scroll
- Project card stagger animation

### Phase 3: Interactive Features
- Create and implement 8-bit custom cursor (default + pointer states)
- Implement Astro View Transitions with glitch-flash effect
- Add loading progress bar
- Implement Konami code easter egg
- Build sound design system (toggle, lazy-load, audio playback)

### Phase 4: Content & Polish
- Rewrite About Me bio copy
- Update hero subtitle (typewriter cycles "Creative Developer" / "Design Engineer")
- Expand Skills Inventory skill list
- Add descriptions and tech tags to Featured Work cards
- Update category pages and project detail pages
- Adapt ConsolePlayer and ContactForm to light theme
- Cross-browser testing and responsive QA
- Performance audit (Lighthouse)

---

## 12. Files Affected

**Modified:**
- `src/styles/global.css` — color system, base styles, dot-grid background
- `src/layouts/MainLayout.astro` — View Transitions, sound toggle, cursor
- `src/components/NavBar.astro` — light theme, sound toggle icon
- `src/components/HeroHeader.astro` — light theme, remove grid/shapes, glitch layers, typewriter text
- `src/components/FeaturedWork.astro` — light theme, add descriptions/tags, card redesign
- `src/components/SkillsInventory.astro` — light theme, expanded skills, scroll animation
- `src/components/AboutMe.astro` — light theme, rewritten bio
- `src/components/GlitchText.astro` — update glitch effect for light theme (dark text + colored shadows)
- `src/components/ContactForm.astro` — light theme adaptation
- `src/components/ConsolePlayer.astro` — light theme adaptation
- `src/components/BlogPostCard.astro` — light theme adaptation
- `src/pages/index.astro` — section number labels
- `src/pages/graphic.astro` — light theme, card updates
- `src/pages/motion.astro` — light theme, card updates
- `src/pages/web.astro` — light theme, card updates
- `src/pages/contact.astro` — light theme

**New files:**
- `src/scripts/scroll-animations.ts` — IntersectionObserver scroll-trigger system
- `src/scripts/konami.ts` — Konami code easter egg listener
- `src/scripts/sound-manager.ts` — Sound toggle and playback system
- `src/scripts/page-transitions.ts` — View Transition glitch effect hooks
- `public/cursors/cursor-default.png` — 8-bit arrow cursor sprite
- `public/cursors/cursor-pointer.png` — 8-bit hand cursor sprite
- `public/sounds/click.mp3` — Nav click sound
- `public/sounds/hover.mp3` — Hover buzz sound
- `public/sounds/boot.mp3` — Boot-up chime
- `public/sounds/glitch.mp3` — Konami code glitch burst
