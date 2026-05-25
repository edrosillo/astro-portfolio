# Light Theme Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the retro-portfolio from a dark cyberpunk theme to a light brutalist-glitch / high-contrast modern design across 4 phases.

**Architecture:** Progressive enhancement — Phase 1 establishes the light theme foundation (colors, typography, section system). Phase 2 adds glitch effects and scroll animations. Phase 3 layers interactive features (custom cursor, page transitions, easter eggs, sound). Phase 4 rewrites content and polishes all components.

**Tech Stack:** Astro 5, TypeScript, CSS custom properties, IntersectionObserver, Astro View Transitions API, Web Audio API.

**Spec:** `docs/superpowers/specs/2026-05-25-light-theme-redesign-design.md`

---

## Phase 1: Light Theme + Typography Foundation

### Task 1: Create feature branch and update CSS custom properties

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Create feature branch**

```bash
cd /Users/edrosillo/Documents/retro-portfolio
git checkout -b feature/light-theme-redesign
```

- [ ] **Step 2: Update the Google Fonts import to add JetBrains Mono**

In `src/styles/global.css`, replace line 2:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Space+Grotesk:wght@400;700&display=swap");
```

with:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@400;700&display=swap");
```

- [ ] **Step 3: Replace the `:root` CSS variables block**

Replace lines 4-24 (the entire `:root` block) with:

```css
:root {
	/* Light Theme Palette */
	--color-bg: #ffffff;
	--color-surface: #f8f8f8;
	--color-text: #0a0a0a;
	--color-text-muted: #666666;
	--color-label: #999999;
	--color-divider: #e0e0e0;

	/* Accent Colors — used sparingly as punctuation */
	--color-accent-1: #00ccff;
	--color-accent-2: #ff3366;

	/* Legacy aliases for components not yet updated */
	--color-primary: #00ccff;
	--color-secondary: #7000ff;
	--color-dim: #e0e0e0;
	--color-accent: #0a0a0a;

	/* Fonts */
	--font-heading: "Space Grotesk", sans-serif;
	--font-body: "Inter", sans-serif;
	--font-mono: "JetBrains Mono", monospace;
}
```

Note: The legacy aliases (`--color-primary`, `--color-secondary`, `--color-dim`, `--color-accent`) keep existing component references working during the transition. They will be cleaned up in later tasks.

- [ ] **Step 4: Update the body styles**

Replace the body rule (lines 32-48) with:

```css
body {
	margin: 0;
	padding: 0;
	background-color: var(--color-bg);
	color: var(--color-text);
	font-family: var(--font-body);
	font-size: 1rem;
	line-height: 1.6;
	overflow-x: hidden;

	/* Subtle Dot Grid Background Pattern */
	background-image: radial-gradient(
		rgba(0, 0, 0, 0.04) 1px,
		transparent 1px
	);
	background-size: 30px 30px;
}
```

- [ ] **Step 5: Update heading styles**

Replace the heading rule (lines 50-62) with:

```css
h1,
h2,
h3,
h4,
h5,
h6 {
	font-family: var(--font-heading);
	text-transform: uppercase;
	color: var(--color-text);
	margin-bottom: 1rem;
	line-height: 1.2;
	letter-spacing: -0.03em;
	font-weight: 700;
}
```

- [ ] **Step 6: Update link styles**

Replace the `a` and `a:hover` rules (lines 77-85) with:

```css
a {
	color: var(--color-text);
	text-decoration: none;
	transition: color 0.2s;
}

a:hover {
	color: var(--color-accent-1);
}
```

- [ ] **Step 7: Update the glitch hover effect**

Replace the `.glitch-hover:hover` rule (lines 108-112) with:

```css
/* Glitch Effect (Subtle) */
.glitch-hover:hover {
	color: var(--color-accent-1);
	text-shadow: 2px 0 var(--color-accent-2);
}
```

- [ ] **Step 8: Update skip-link styles for light theme**

Replace the `.skip-link` rule (lines 114-128) with:

```css
/* Accessibility */
.skip-link {
	position: absolute;
	top: -9999px;
	left: 50%;
	transform: translateX(-50%);
	background: var(--color-text);
	color: var(--color-bg);
	padding: 1rem;
	z-index: 9999;
	font-family: var(--font-heading);
	text-decoration: none;
	border-radius: 0 0 4px 4px;
	font-weight: bold;
}
```

- [ ] **Step 9: Add section label utility class**

Add these rules at the end of the file, before the `@media (prefers-reduced-motion)` block:

```css
/* Section System */
.section-label {
	font-family: var(--font-mono);
	font-size: 0.65rem;
	font-weight: 700;
	letter-spacing: 0.3em;
	color: var(--color-label);
	text-transform: uppercase;
	margin-bottom: 1rem;
}

.section-divider {
	height: 1px;
	background: var(--color-divider);
	width: 100%;
	margin: 0;
	border: none;
}
```

- [ ] **Step 10: Run dev server and verify the page loads**

```bash
cd /Users/edrosillo/Documents/retro-portfolio
npm run dev
```

Expected: Page loads with white background, dark text, dot-grid pattern visible. Some components will look broken (expected — they still use dark theme colors internally).

- [ ] **Step 11: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: update global CSS to light theme color system and typography

Add JetBrains Mono font import and --font-mono variable.
Replace dark palette with light theme tokens.
Add section label and divider utility classes.
Keep legacy color aliases for incremental component migration."
```

---

### Task 2: Update NavBar for light theme

**Files:**
- Modify: `src/components/NavBar.astro`

- [ ] **Step 1: Update navbar background and border**

In `src/components/NavBar.astro`, replace the `.navbar` rule (lines 96-105):

```css
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid var(--color-divider);
    }
```

- [ ] **Step 2: Update logo image styles**

Replace the `.logo-img` and `.logo-img:hover` rules (lines 121-131):

```css
    .logo-img {
        height: 100%;
        width: auto;
        filter: brightness(0);
        transition: filter 0.3s ease, transform 0.3s ease;
    }

    .logo-img:hover {
        filter: brightness(0) drop-shadow(0 0 8px var(--color-accent-1));
        transform: scale(1.05);
    }
```

Note: `filter: brightness(0)` makes the logo solid black. If the logo doesn't look good inverted, Eddie can swap the asset in Phase 4.

- [ ] **Step 3: Update nav link styles**

Replace the `.nav-link` rule (lines 138-145):

```css
    .nav-link {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--color-text);
        position: relative;
        padding: 0.5rem 0;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }
```

- [ ] **Step 4: Update nav link hover/active states**

Replace the `.nav-link:hover, .nav-link.active` rule (lines 147-149):

```css
    .nav-link:hover,
    .nav-link.active {
        color: var(--color-text);
    }
```

- [ ] **Step 5: Update nav link underline**

Replace the `.nav-link::after` rule (lines 152-161):

```css
    .nav-link::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: var(--color-accent-1);
        transition: width 0.3s ease;
    }
```

- [ ] **Step 6: Update hamburger bar color**

Replace the `.bar` rule (lines 177-185):

```css
    .bar {
        display: block;
        width: 25px;
        height: 3px;
        margin: 5px auto;
        transition: all 0.3s ease-in-out;
        background-color: var(--color-text);
    }
```

- [ ] **Step 7: Update mobile menu overlay**

Replace the `.mobile-menu` rule (lines 188-202):

```css
    .mobile-menu {
        position: fixed;
        left: -100%;
        top: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        transition: 0.3s;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }
```

- [ ] **Step 8: Update mobile nav link styles**

Replace the `.mobile-nav-link` rule (lines 215-221):

```css
    .mobile-nav-link {
        font-family: var(--font-heading);
        font-size: 2rem;
        color: var(--color-text-muted);
        text-decoration: none;
        transition: 0.2s;
    }
```

Replace the `.mobile-nav-link:hover, .mobile-nav-link.active` rule (lines 223-227):

```css
    .mobile-nav-link:hover,
    .mobile-nav-link.active {
        color: var(--color-accent-1);
        letter-spacing: 2px;
    }
```

- [ ] **Step 9: Verify navbar renders correctly**

Run: `npm run dev`

Expected: White/translucent navbar, black logo, monospace nav links, cyan underline on active link, mobile menu with white overlay.

- [ ] **Step 10: Commit**

```bash
git add src/components/NavBar.astro
git commit -m "feat: update NavBar to light theme

White translucent background, monospace nav links, cyan active underline,
black logo filter, white mobile menu overlay."
```

---

### Task 3: Update HeroHeader for light theme

**Files:**
- Modify: `src/components/HeroHeader.astro`

- [ ] **Step 1: Update the hero subtitle text**

In `src/components/HeroHeader.astro`, replace lines 27-29:

```astro
                <h2 class="hero-subtitle">
                    <span class="multimedia-text">Multimedia Designer</span> & <span class="typing-text"></span><span class="cursor">|</span>
                </h2>
```

with:

```astro
                <h2 class="hero-subtitle">
                    <span class="role-text">Creative Developer</span> & <span class="typing-text"></span><span class="cursor">|</span>
                </h2>
```

- [ ] **Step 2: Update the typewriter script to cycle between two roles**

Replace the entire first `<script>` block (lines 42-58) with:

```html
<script>
    // ─── Typewriter Effect ───────────────────────────────────────────
    const roles = ["Design Engineer", "Web Developer"];
    const typingText = document.querySelector('.typing-text');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        if (!typingText) return;
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentRole.length) {
                setTimeout(() => { isDeleting = true; typeWriter(); }, 2000);
                return;
            }
            setTimeout(typeWriter, 100);
        } else {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeWriter, 500);
                return;
            }
            setTimeout(typeWriter, 50);
        }
    }

    setTimeout(typeWriter, 1000);
</script>
```

- [ ] **Step 3: Update hero header background and remove synthwave grid + floating shapes**

Replace the `.hero-header` rule (lines 83-90) with:

```css
    .hero-header {
        padding: 10rem 0 6rem;
        position: relative;
        overflow: hidden;
        min-height: 90vh;
        display: flex;
        align-items: center;
        background: var(--color-bg);
    }
```

- [ ] **Step 4: Hide the synthwave grid and floating shapes via CSS**

Add `display: none;` to the `.synthwave-grid` rule. Replace lines 93-110:

```css
    .synthwave-grid {
        display: none;
    }
```

Replace the floating shapes rules (lines 122-179) — everything from `.floating-shapes` through the `@keyframes float-rotate` — with:

```css
    .floating-shapes {
        display: none;
    }
```

Note: The HTML elements remain in the template but are hidden. They can be fully removed in a cleanup pass later.

- [ ] **Step 5: Update the hero fade overlay**

Replace the `.hero-fade` rule (lines 182-191):

```css
    .hero-fade {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 150px;
        background: linear-gradient(to bottom, transparent, var(--color-bg));
        z-index: 5;
        pointer-events: none;
    }
```

- [ ] **Step 6: Reduce Spline 3D presence**

Replace the `.spline-container` rule (lines 209-216):

```css
    .spline-container {
        position: absolute;
        top: 0;
        right: 0;
        width: 40%;
        height: 100%;
        z-index: 2;
        pointer-events: none;
        opacity: 0.4;
    }
```

- [ ] **Step 7: Update hero typography colors**

Replace the `.hero-title` rule (lines 261-268):

```css
    .hero-title {
        font-size: 6rem;
        margin-bottom: 1rem;
        color: var(--color-text);
        letter-spacing: -0.05em;
        line-height: 1;
    }
```

Replace the `.hero-subtitle` rule (lines 270-278):

```css
    .hero-subtitle {
        font-family: var(--font-body);
        font-size: 2.5rem;
        color: var(--color-text-muted);
        font-weight: 400;
        line-height: 1.4;
        text-transform: none;
        max-width: 900px;
        margin-bottom: 1rem;
    }
```

Replace the `.multimedia-text` rule (lines 280-284) — rename to `.role-text`:

```css
    .role-text {
        color: var(--color-text);
        font-weight: 700;
    }
```

Replace the `.typing-text` rule (lines 286-290):

```css
    .typing-text {
        color: var(--color-accent-1);
        font-weight: 700;
    }
```

Replace the `.cursor` rule (lines 292-300):

```css
    .cursor {
        display: inline-block;
        width: 3px;
        background-color: var(--color-text);
        animation: blink 1s infinite;
        margin-left: 5px;
    }
```

- [ ] **Step 8: Update location text**

Replace the `.hero-location` rule (lines 307-313):

```css
    .hero-location {
        font-family: var(--font-mono);
        color: var(--color-label);
        font-size: 0.85rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
    }
```

- [ ] **Step 9: Update scroll indicator**

Replace the `.scroll-text` rule (lines 328-334):

```css
    .scroll-text {
        font-family: var(--font-mono);
        font-size: 0.7rem;
        color: var(--color-label);
        writing-mode: vertical-rl;
        letter-spacing: 2px;
        margin-bottom: 0;
    }
```

Replace the `.scroll-line` rule (lines 336-341):

```css
    .scroll-line {
        width: 1px;
        height: 60px;
        background: linear-gradient(to bottom, var(--color-text), transparent);
    }
```

- [ ] **Step 10: Update the spinner for light theme**

Replace the `.spinner` rule (lines 247-254):

```css
    .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(0, 0, 0, 0.1);
        border-top-color: var(--color-accent-1);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }
```

- [ ] **Step 11: Update mobile breakpoint**

Replace the mobile `@media` block (lines 343-358):

```css
    @media (max-width: 768px) {
        .hero-title {
            font-size: 3.5rem;
        }
        .hero-subtitle {
            font-size: 1.8rem;
        }
        .scroll-indicator {
            bottom: 1rem;
        }
        .spline-container {
            width: 100%;
            opacity: 0.2;
        }
    }
```

- [ ] **Step 12: Verify hero renders correctly**

Run: `npm run dev`

Expected: White background hero with "Hi, I'm Eddie." in black, "Creative Developer &" followed by typewriter cycling "Design Engineer" / "Web Developer" in cyan. Spline 3D faintly visible on the right. No synthwave grid or floating shapes.

- [ ] **Step 13: Commit**

```bash
git add src/components/HeroHeader.astro
git commit -m "feat: update HeroHeader to light theme

White background, remove synthwave grid and floating shapes.
Reduce Spline 3D to secondary ambient element (40% width, 0.4 opacity).
Update subtitle to 'Creative Developer' with typewriter cycling
'Design Engineer' and 'Web Developer'.
Remove text-shadow/glow effects for clean high-contrast look."
```

---

### Task 4: Update homepage sections and add section labels

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add section labels to the homepage**

In `src/pages/index.astro`, replace lines 12-68 (the `<main>` content) with:

```astro
	<main id="main-content" class="container">
		<hr class="section-divider" />
		<span class="section-label">002 — FEATURED WORK</span>
		<FeaturedWork />

		<section class="work-section">
			<hr class="section-divider" />
			<span class="section-label">003 — SKILL TREE</span>
			<header class="section-header fade-in-up">
				<GlitchText
					text="SKILL TREE"
					as="h2"
					class="section-title"
				/>
			</header>

			<div class="services-grid">
				<a
					href="/graphic"
					class="service-card fade-in-up"
					style="transition-delay: 0.1s;"
				>
					<div class="card-content">
						<span class="service-number">01</span>
						<h3>Graphic Design</h3>
						<p>Brand Identity, Print, and Visual Design.</p>
						<span class="arrow">→</span>
					</div>
				</a>

				<a
					href="/motion"
					class="service-card fade-in-up"
					style="transition-delay: 0.2s;"
				>
					<div class="card-content">
						<span class="service-number">02</span>
						<h3>Motion Graphics</h3>
						<p>Animation, VFX, and Video Production.</p>
						<span class="arrow">→</span>
					</div>
				</a>

				<a
					href="/web"
					class="service-card fade-in-up"
					style="transition-delay: 0.3s;"
				>
					<div class="card-content">
						<span class="service-number">03</span>
						<h3>Web Development</h3>
						<p>Responsive Sites, UI/UX, and Front-end.</p>
						<span class="arrow">→</span>
					</div>
				</a>
			</div>
		</section>
	</main>
```

Note: Removed the `.card-bg` divs and decorative-line. The section labels and dividers from `global.css` provide structure.

- [ ] **Step 2: Update the service card styles for light theme**

Replace the entire `<style>` block (lines 74-190) with:

```css
<style>
	.work-section {
		padding: 4rem 0 8rem;
	}

	.section-header {
		margin-bottom: 4rem;
	}

	.section-title {
		font-size: 2rem;
		color: var(--color-text);
		white-space: nowrap;
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.service-card {
		display: block;
		background: var(--color-surface);
		padding: 2.5rem;
		border: 1px solid var(--color-divider);
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		position: relative;
		overflow: hidden;
	}

	.service-card:hover {
		transform: translateY(-10px);
		border-color: var(--color-accent-1);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
	}

	.card-content {
		position: relative;
		z-index: 1;
	}

	.service-number {
		font-family: var(--font-mono);
		font-size: 4rem;
		color: rgba(0, 0, 0, 0.05);
		display: block;
		margin-bottom: 1rem;
		transition: color 0.3s;
		line-height: 1;
		font-weight: 700;
	}

	.service-card:hover .service-number {
		color: var(--color-accent-1);
	}

	.service-card h3 {
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 1.8rem;
		margin-bottom: 0.5rem;
		text-transform: none;
		color: var(--color-text);
	}

	.service-card p {
		color: var(--color-text-muted);
		margin-bottom: 2rem;
		font-size: 1.1rem;
	}

	.arrow {
		position: absolute;
		bottom: 0;
		right: 0;
		font-size: 2rem;
		opacity: 0;
		transform: translate(-20px, 0);
		transition: all 0.3s;
		color: var(--color-accent-1);
	}

	.service-card:hover .arrow {
		opacity: 1;
		transform: translate(0, 0);
	}
</style>
```

- [ ] **Step 3: Verify the homepage renders correctly**

Run: `npm run dev`

Expected: Section labels ("002 — FEATURED WORK", "003 — SKILL TREE") visible in monospace gray text. Service cards have light gray backgrounds with thin borders. Hover shows cyan accent. Thin divider lines between sections.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: update homepage to light theme with section labels

Add section numbering system (002, 003). Light gray service cards
with thin borders. Remove decorative gradient lines.
Remove card-bg overlay elements."
```

---

### Task 5: Update FeaturedWork component for light theme

**Files:**
- Modify: `src/components/FeaturedWork.astro`

- [ ] **Step 1: Update the section header markup**

In `src/components/FeaturedWork.astro`, replace lines 22-25:

```astro
    <header class="section-header fade-in-up">
        <GlitchText text="FEATURED WORK" as="h2" class="section-title" />
        <div class="decorative-line"></div>
    </header>
```

with:

```astro
    <header class="section-header fade-in-up">
        <GlitchText text="FEATURED WORK" as="h2" class="section-title" />
    </header>
```

- [ ] **Step 2: Update FeaturedWork styles for light theme**

Replace the entire `<style>` block (lines 62-169) with:

```css
<style>
    .featured-work {
        padding: 4rem 0;
    }

    .section-header {
        margin-bottom: 3rem;
    }

    .section-title {
        font-size: 2rem;
        color: var(--color-text);
        white-space: nowrap;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .project-card {
        display: block;
        text-decoration: none;
    }

    .image-container {
        position: relative;
        aspect-ratio: 16/9;
        overflow: hidden;
        margin-bottom: 1rem;
        border: 1px solid var(--color-divider);
        transition: all 0.3s ease;
    }

    .project-card:hover .image-container {
        border-color: var(--color-accent-1);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transform: translateY(-5px);
    }

    .featured-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }

    .project-card:hover .featured-img {
        transform: scale(1.03);
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .project-card:hover .overlay {
        opacity: 1;
    }

    .view-project {
        color: #ffffff;
        font-family: var(--font-mono);
        letter-spacing: 0.15em;
        border: 1px solid #ffffff;
        padding: 0.5rem 1rem;
        font-size: 0.75rem;
        font-weight: 700;
    }

    .card-content h3 {
        font-family: var(--font-heading);
        font-size: 1.2rem;
        color: var(--color-text);
        margin: 0;
    }

    .category {
        font-family: var(--font-mono);
        font-size: 0.65rem;
        color: var(--color-label);
        text-transform: uppercase;
        display: block;
        margin-bottom: 0.3rem;
        letter-spacing: 0.15em;
        font-weight: 700;
    }
</style>
```

- [ ] **Step 3: Verify and commit**

Run: `npm run dev`

Expected: Featured work cards have thin borders, no rounded corners, clean typography. Hover shows overlay with white "VIEW PROJECT" text, subtle lift, and cyan border.

```bash
git add src/components/FeaturedWork.astro
git commit -m "feat: update FeaturedWork to light theme

Remove decorative gradient line. Thin border cards with no border-radius.
Monospace category labels. Clean hover with subtle shadow and cyan border."
```

---

### Task 6: Update SkillsInventory for light theme

**Files:**
- Modify: `src/components/SkillsInventory.astro`

- [ ] **Step 1: Update the skills data array**

In `src/components/SkillsInventory.astro`, replace lines 5-12 (the skills array) with:

```javascript
const skills = [
    { name: "Photoshop", level: 100, type: "design" },
    { name: "Illustrator", level: 95, type: "design" },
    { name: "Figma", level: 90, type: "design" },
    { name: "After Effects", level: 100, type: "motion" },
    { name: "Premiere Pro", level: 95, type: "motion" },
    { name: "Cinema 4D", level: 80, type: "motion" },
    { name: "HTML/CSS", level: 95, type: "dev" },
    { name: "JS/TypeScript", level: 85, type: "dev" },
    { name: "React/Astro", level: 80, type: "dev" },
];
```

- [ ] **Step 2: Update the footer text**

Replace line 68:

```astro
            <span class="status">STATUS: ONLINE</span>
```

with:

```astro
            <span class="status">STATUS: AVAILABLE</span>
```

- [ ] **Step 3: Replace the entire style block for light theme**

Replace the entire `<style>` block (lines 73-265) with:

```css
<style>
    .skills-inventory {
        padding: 4rem 0;
    }

    .inventory-frame {
        background: var(--color-bg);
        border: 1px solid var(--color-divider);
        padding: 2px;
        max-width: 800px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
    }

    /* Subtle Scanline Overlay */
    .inventory-frame::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 0, 0, 0.02) 50%
        );
        background-size: 100% 4px;
        pointer-events: none;
        z-index: 20;
    }

    .inventory-frame::before {
        display: none;
    }

    .inventory-header {
        background: var(--color-surface);
        padding: 0.5rem 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--color-divider);
        position: relative;
        z-index: 21;
    }

    .header-text {
        font-family: var(--font-mono);
        color: var(--color-text);
        letter-spacing: 0.15em;
        font-size: 0.8rem;
        font-weight: 700;
    }

    .header-decoration {
        display: flex;
        gap: 4px;
    }

    .dot {
        width: 8px;
        height: 8px;
        background: var(--color-divider);
        border-radius: 50%;
    }

    .dot:nth-child(1) { background: #ff5f56; }
    .dot:nth-child(2) { background: #ffbd2e; }
    .dot:nth-child(3) { background: #27c93f; }

    .skills-grid {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 2rem;
        padding: 2rem;
        position: relative;
        z-index: 21;
    }

    @media (max-width: 600px) {
        .skills-grid {
            grid-template-columns: 1fr;
        }
    }

    .avatar-placeholder {
        aspect-ratio: 1;
        background: var(--color-surface);
        border: 1px solid var(--color-divider);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        position: relative;
        overflow: hidden;
    }

    .avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: relative;
        z-index: 1;
    }

    .scanline {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: rgba(0, 204, 255, 0.3);
        animation: scan 2s linear infinite;
        z-index: 2;
    }

    @keyframes scan {
        0% { top: 0%; }
        100% { top: 100%; }
    }

    .info-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-family: var(--font-mono);
        font-size: 0.75rem;
    }

    .label { color: var(--color-label); }
    .value {
        color: var(--color-text);
        font-weight: 700;
    }

    .skill-row {
        margin-bottom: 1rem;
    }

    .skill-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.3rem;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--color-text);
    }

    .skill-val {
        color: var(--color-label);
    }

    .progress-bar-container {
        height: 8px;
        background: var(--color-surface);
        border: 1px solid var(--color-divider);
        padding: 1px;
    }

    .progress-bar {
        height: 100%;
        background: var(--color-text);
        position: relative;
    }

    .progress-bar.dev {
        background: var(--color-accent-1);
    }

    .progress-bar.motion {
        background: var(--color-accent-2);
    }

    .inventory-footer {
        padding: 0.5rem 1rem;
        border-top: 1px solid var(--color-divider);
        display: flex;
        justify-content: space-between;
        font-family: var(--font-mono);
        font-size: 0.65rem;
        color: var(--color-label);
        letter-spacing: 0.1em;
    }
</style>
```

- [ ] **Step 4: Verify and commit**

Run: `npm run dev`

Expected: Skills inventory has white background, thin borders, subtle scanline overlay. 9 skills in 3 categories. Design bars black, motion bars pink, code bars cyan. "STATUS: AVAILABLE" in footer.

```bash
git add src/components/SkillsInventory.astro
git commit -m "feat: update SkillsInventory to light theme with expanded skills

9 skills across design/motion/code categories. Color-coded progress bars.
Light background with subtle scanline overlay. STATUS: AVAILABLE."
```

---

### Task 7: Update AboutMe for light theme

**Files:**
- Modify: `src/components/AboutMe.astro`

- [ ] **Step 1: Add section label to AboutMe**

In `src/components/AboutMe.astro`, insert after line 7 (opening `<section>` tag), before the `<div class="container">`:

Replace lines 7-10:

```astro
<section class="about-me">
    <div class="container">
        <header class="section-header fade-in-up">
            <GlitchText text="ABOUT ME" as="h2" class="section-title" />
```

with:

```astro
<section class="about-me">
    <div class="container">
        <hr class="section-divider" />
        <span class="section-label">004 — ABOUT</span>
        <header class="section-header fade-in-up">
            <GlitchText text="ABOUT ME" as="h2" class="section-title" />
```

- [ ] **Step 2: Remove the decorative line from the header**

Remove this line from inside the `<header>`:

```astro
            <div class="decorative-line"></div>
```

- [ ] **Step 3: Update AboutMe styles for light theme**

Replace the entire `<style>` block (lines 72-151) with:

```css
<style>
    .about-me {
        padding: 6rem 0 8rem;
    }

    .section-header {
        margin-bottom: 3rem;
    }

    .section-title {
        font-size: 2rem;
        color: var(--color-text);
        white-space: nowrap;
    }

    .content-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: start;
    }

    .bio-content {
        margin-bottom: 4rem;
    }

    .bio-content p {
        margin-bottom: 1.5rem;
        font-size: 1.1rem;
        color: var(--color-text-muted);
        line-height: 1.8;
    }

    .social-links {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
    }

    .social-link {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--color-text);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-weight: 700;
        text-decoration: none;
        border-bottom: 2px solid transparent;
        padding-bottom: 2px;
        transition: border-color 0.2s;
    }

    .social-link:hover {
        border-color: var(--color-accent-1);
        color: var(--color-text);
    }

    .skills-sidebar {
        position: sticky;
        top: 6rem;
    }

    @media (max-width: 900px) {
        .content-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
        }

        .skills-sidebar {
            position: static;
            order: 1;
        }
    }
</style>
```

- [ ] **Step 4: Verify and commit**

Run: `npm run dev`

Expected: About section with section label "004 — ABOUT", clean typography, monospace social links with cyan underline on hover. No gradient backgrounds.

```bash
git add src/components/AboutMe.astro
git commit -m "feat: update AboutMe to light theme with section label

Add 004 — ABOUT section label. Remove decorative gradient line and
purple radial background. Monospace social links with cyan underline hover."
```

---

### Task 8: Update GlitchText component for light theme

**Files:**
- Modify: `src/components/GlitchText.astro`

- [ ] **Step 1: Add light-theme glitch styles to the component**

In `src/components/GlitchText.astro`, replace the `<style>` block (lines 15-18) with:

```css
<style>
    .glitch {
        position: relative;
    }

    .glitch:hover {
        text-shadow:
            2px 0 var(--color-accent-1),
            -2px 0 var(--color-accent-2);
    }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/GlitchText.astro
git commit -m "feat: update GlitchText hover effect for light theme

Cyan + pink text-shadow offset on hover instead of secondary purple."
```

---

### Task 9: Update category pages, project detail, and contact pages for light theme

**Files:**
- Modify: `src/pages/[category]/index.astro`
- Modify: `src/pages/projects/[...slug].astro`
- Modify: `src/pages/contact.astro`

- [ ] **Step 1: Update category page styles**

In `src/pages/[category]/index.astro`, replace the entire `<style>` block (lines 80-189) with:

```css
<style>
    .back-link {
        margin-bottom: 2rem;
    }

    .category-header {
        text-align: center;
        margin-bottom: 4rem;
    }

    .page-title {
        font-size: 3rem;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 3rem;
    }

    .project-card {
        display: block;
        border: 1px solid var(--color-divider);
        background: var(--color-bg);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .project-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .project-card.graphic:hover,
    .project-card.motion:hover,
    .project-card.web:hover {
        border-color: var(--color-accent-1);
    }

    .card-image {
        height: 200px;
        background: var(--color-surface);
        overflow: hidden;
        border-bottom: 1px solid var(--color-divider);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s;
    }

    .project-card:hover .card-image img {
        transform: scale(1.05);
    }

    .placeholder-img {
        color: var(--color-divider);
        font-family: var(--font-mono);
        font-size: 0.75rem;
        letter-spacing: 0.15em;
        font-weight: 700;
    }

    .card-content {
        padding: 1.5rem;
        text-align: center;
    }

    .card-content h3 {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        color: var(--color-text);
    }

    .tags {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
        font-family: var(--font-mono);
        font-size: 0.7rem;
        color: var(--color-label);
        letter-spacing: 0.1em;
    }

    .press-start {
        display: inline-block;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        font-weight: 700;
        color: var(--color-text);
        animation: blink 1s infinite;
        opacity: 0;
        letter-spacing: 0.1em;
    }

    .project-card:hover .press-start {
        opacity: 1;
    }

    .empty-state {
        text-align: center;
        padding: 4rem;
        border: 1px dashed var(--color-divider);
        color: var(--color-label);
        font-family: var(--font-mono);
    }
</style>
```

- [ ] **Step 2: Update project detail page styles**

In `src/pages/projects/[...slug].astro`, replace the entire `<style>` block (lines 95-257) with:

```css
<style>
    .project-detail {
        padding-top: 6rem;
    }

    .project-nav {
        margin-bottom: 4rem;
    }

    .back-link {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--color-label);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        letter-spacing: 0.1em;
        font-weight: 700;
    }

    .back-link:hover {
        color: var(--color-accent-1);
    }

    .project-header {
        margin-bottom: 3rem;
        border-bottom: 1px solid var(--color-divider);
        padding-bottom: 2rem;
    }

    .project-title {
        font-size: 3rem;
        margin-bottom: 1rem;
        line-height: 1.1;
    }

    .meta {
        display: flex;
        gap: 2rem;
        align-items: center;
        font-family: var(--font-mono);
        color: var(--color-label);
        font-size: 0.75rem;
        letter-spacing: 0.1em;
    }

    .tag {
        color: var(--color-text);
        margin-right: 1rem;
        font-size: 0.8rem;
        font-weight: 700;
    }

    .media-container {
        margin-bottom: 4rem;
    }

    .hero-image {
        overflow: hidden;
        display: flex;
        justify-content: center;
        background-color: var(--color-surface);
        border: 1px solid var(--color-divider);
    }

    .hero-image img {
        max-width: 100%;
        height: auto;
        display: block;
        transition: transform 0.5s ease;
    }

    .hero-image-link {
        display: block;
        text-decoration: none;
    }

    .hover-effect {
        position: relative;
    }

    .hover-effect:hover img {
        transform: scale(1.03);
    }

    .link-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .hover-effect:hover .link-overlay {
        opacity: 1;
    }

    .link-overlay span {
        color: #ffffff;
        font-family: var(--font-mono);
        border: 1px solid #ffffff;
        padding: 0.8rem 1.5rem;
        background: rgba(0, 0, 0, 0.8);
        letter-spacing: 0.15em;
        font-size: 0.75rem;
        font-weight: 700;
    }

    .content-wrapper {
        max-width: 800px;
        margin: 0 auto;
    }

    .content {
        font-family: var(--font-body);
        font-size: 1.1rem;
        line-height: 1.8;
        color: var(--color-text-muted);
    }

    .content :global(h1),
    .content :global(h2),
    .content :global(h3) {
        color: var(--color-text);
        margin-top: 3rem;
        margin-bottom: 1.5rem;
        font-family: var(--font-heading);
        letter-spacing: -0.02em;
    }

    .content :global(p) {
        margin-bottom: 1.5rem;
    }

    .content :global(ul) {
        padding-left: 1.5rem;
        margin-bottom: 2rem;
    }

    .content :global(li) {
        margin-bottom: 0.5rem;
    }

    .footer-nav {
        margin-top: 6rem;
        text-align: center;
        padding-top: 3rem;
        border-top: 1px solid var(--color-divider);
    }

    .home-link {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--color-text);
        border-bottom: 2px solid transparent;
        padding-bottom: 0.2rem;
        letter-spacing: 0.1em;
        font-weight: 700;
    }

    .home-link:hover {
        border-color: var(--color-accent-1);
    }
</style>
```

- [ ] **Step 3: Update contact page styles**

In `src/pages/contact.astro`, replace the entire `<style>` block (lines 54-118) with:

```css
<style>
    .contact-page {
        padding-top: 8rem;
        padding-bottom: 4rem;
    }

    .page-header {
        text-align: center;
        margin-bottom: 4rem;
    }

    .page-title {
        font-size: 3.5rem;
        margin-bottom: 1rem;
    }

    .subtitle {
        font-family: var(--font-body);
        font-size: 1.2rem;
        color: var(--color-text-muted);
    }

    .content-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 4rem;
    }

    @media (max-width: 768px) {
        .content-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
        }
    }

    .info-section {
        padding-top: 1rem;
    }

    .info-block {
        margin-bottom: 3rem;
    }

    .info-block h3 {
        font-family: var(--font-mono);
        font-size: 0.8rem;
        color: var(--color-text);
        margin-bottom: 1rem;
        letter-spacing: 0.15em;
        font-weight: 700;
    }

    .contact-link,
    .social-link,
    .info-block p {
        font-family: var(--font-body);
        font-size: 1.1rem;
        color: var(--color-text-muted);
        display: block;
        margin-bottom: 0.5rem;
    }

    .contact-link:hover,
    .social-link:hover {
        color: var(--color-accent-1);
    }
</style>
```

- [ ] **Step 4: Verify all pages**

Run: `npm run dev`

Check: `/graphic`, `/motion`, `/web`, `/projects/web/brew-and-bloom`, `/contact`

Expected: All pages have white backgrounds, clean typography, thin borders, monospace labels. No dark backgrounds visible on any page.

- [ ] **Step 5: Commit**

```bash
git add src/pages/[category]/index.astro src/pages/projects/[...slug].astro src/pages/contact.astro
git commit -m "feat: update category, project detail, and contact pages to light theme

White backgrounds, thin borders, monospace labels, clean hover effects.
Consistent design language across all page types."
```

---

### Task 10: Update ContactForm and ConsolePlayer components

**Files:**
- Modify: `src/components/ContactForm.astro`
- Modify: `src/components/ConsolePlayer.astro`
- Modify: `src/components/BlogPostCard.astro`

- [ ] **Step 1: Update ContactForm styles**

In `src/components/ContactForm.astro`, find all style rules that reference dark theme colors and update them. The key changes:

Find and replace these CSS values throughout the `<style>` block:

- `background: var(--color-surface)` or `background: rgba(10, 10, 10, ...)` → `background: var(--color-bg)`
- `border: ... rgba(255, 255, 255, 0.1)` or `border: ... #333` → `border: 1px solid var(--color-divider)`
- `color: var(--color-primary)` → `color: var(--color-accent-1)` (for accent elements)
- `background: #222` or `background: rgba(10, 10, 10, ...)` in modal header → `background: var(--color-surface)`
- Input focus: `border-color: var(--color-primary)` → `border-color: var(--color-accent-1)`
- Submit button: keep border style but use `border-color: var(--color-text)`, `color: var(--color-text)`. Hover: `background: var(--color-text)`, `color: var(--color-bg)`
- Modal overlay: `background: rgba(0, 0, 0, 0.8)` → `background: rgba(0, 0, 0, 0.5)`

The implementer should read the full ContactForm.astro file, identify every dark-theme color, and replace with the light theme equivalents following the color system in the spec.

- [ ] **Step 2: Update ConsolePlayer styles**

In `src/components/ConsolePlayer.astro`, update the monitor frame styling:

- `.monitor-frame` background: `#1a1a1a` → `var(--color-surface)`
- `.monitor-frame` border/shadow: update to use `var(--color-divider)` border, lighter shadow
- `.screen` border: update to `var(--color-divider)`
- `.control-bar` background: `#111` → `var(--color-surface)`, border: `var(--color-divider)`
- Status light and button colors: keep cyan accent (`var(--color-accent-1)`)
- Text labels: use `var(--color-text)` or `var(--color-label)`

The implementer should read the full ConsolePlayer.astro file and update all dark-theme colors.

- [ ] **Step 3: Update BlogPostCard styles**

In `src/components/BlogPostCard.astro`, update card styling:

- Card border: use `var(--color-divider)`
- Card hover: `border-color: var(--color-accent-1)`, `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1)`
- Tag colors: `var(--color-label)`
- Title: `var(--color-text)`
- Description: `var(--color-text-muted)`
- Read more link: `var(--color-accent-1)`

The implementer should read the full BlogPostCard.astro file and update all dark-theme colors.

- [ ] **Step 4: Verify and commit**

Run: `npm run dev`

Check: Contact form, any project with video (ConsolePlayer), and verify the blog listing page if accessible.

```bash
git add src/components/ContactForm.astro src/components/ConsolePlayer.astro src/components/BlogPostCard.astro
git commit -m "feat: update ContactForm, ConsolePlayer, and BlogPostCard to light theme

White backgrounds, thin borders, consistent color token usage across
all remaining components."
```

---

### Task 11: Update MainLayout meta description

**Files:**
- Modify: `src/layouts/MainLayout.astro`

- [ ] **Step 1: Update the meta description**

In `src/layouts/MainLayout.astro`, replace line 18-20:

```html
		<meta
			name="description"
			content="Eddie's Portfolio - Multimedia Designer & Web Developer"
		/>
```

with:

```html
		<meta
			name="description"
			content="Eddie Rosillo - Creative Developer & Design Engineer"
		/>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/MainLayout.astro
git commit -m "feat: update meta description to Creative Developer & Design Engineer"
```

---

### Task 12: Phase 1 verification

- [ ] **Step 1: Build the project**

```bash
cd /Users/edrosillo/Documents/retro-portfolio
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Visual check all pages**

Run: `npm run dev`

Visit every page and confirm:
- `/` — white background, section labels, light cards, hero with dot-grid
- `/graphic` — light cards, thin borders
- `/motion` — same
- `/web` — same
- `/contact` — light form, clean styling
- Any individual project page — light detail layout

- [ ] **Step 3: Commit Phase 1 completion marker**

```bash
git commit --allow-empty -m "milestone: Phase 1 complete — light theme foundation"
```

---

## Phase 2: Glitch Effects + Animations

### Task 13: Build chromatic aberration system for headlines

**Files:**
- Modify: `src/components/GlitchText.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Update GlitchText component to render aberration layers**

Replace the entire content of `src/components/GlitchText.astro` with:

```astro
---
interface Props {
    text: string;
    as?: "h1" | "h2" | "h3" | "span";
    class?: string;
    aberration?: boolean;
}

const { text, as: Tag = "h1", class: className, aberration = false } = Astro.props;
---

<Tag class:list={["glitch", { "glitch--aberration": aberration }, className]} data-text={text}>
    {text}
    {aberration && (
        <span class="glitch-layer glitch-cyan" aria-hidden="true">{text}</span>
    )}
    {aberration && (
        <span class="glitch-layer glitch-pink" aria-hidden="true">{text}</span>
    )}
</Tag>

<style>
    .glitch {
        position: relative;
    }

    .glitch:hover {
        text-shadow:
            2px 0 var(--color-accent-1),
            -2px 0 var(--color-accent-2);
    }

    .glitch--aberration {
        display: inline-block;
    }

    .glitch--aberration:hover {
        text-shadow: none;
    }

    .glitch-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .glitch-cyan {
        color: var(--color-accent-1);
        clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
        transform: translate(3px, -2px);
        opacity: 0;
        transition: opacity 0.15s;
    }

    .glitch-pink {
        color: var(--color-accent-2);
        clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
        transform: translate(-3px, 2px);
        opacity: 0;
        transition: opacity 0.15s;
    }

    .glitch--aberration:hover .glitch-cyan,
    .glitch--aberration:hover .glitch-pink {
        opacity: 0.7;
    }
</style>
```

- [ ] **Step 2: Enable aberration on the hero title**

In `src/components/HeroHeader.astro`, update the GlitchText usage (line 25):

Replace:
```astro
                <GlitchText text="Hi, I'm Eddie." as="h1" class="hero-title" />
```

with:
```astro
                <GlitchText text="Hi, I'm Eddie." as="h1" class="hero-title" aberration />
```

- [ ] **Step 3: Verify the glitch effect**

Run: `npm run dev`

Expected: "Hi, I'm Eddie." shows cyan and pink offset layers on hover. Other headings show text-shadow glitch on hover.

- [ ] **Step 4: Commit**

```bash
git add src/components/GlitchText.astro src/components/HeroHeader.astro
git commit -m "feat: add chromatic aberration system to GlitchText

New aberration prop renders cyan + pink offset layers with clip-path.
Visible on hover. Applied to hero title."
```

---

### Task 14: Add scanline overlay system for images

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add scanline overlay utility class**

In `src/styles/global.css`, add before the `@media (prefers-reduced-motion)` block:

```css
/* Scanline Overlay — apply to image containers */
.scanline-overlay {
	position: relative;
	overflow: hidden;
}

.scanline-overlay::after {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: repeating-linear-gradient(
		0deg,
		transparent,
		transparent 2px,
		rgba(0, 0, 0, 0.03) 2px,
		rgba(0, 0, 0, 0.03) 4px
	);
	pointer-events: none;
	opacity: 0;
	transition: opacity 0.3s;
	z-index: 1;
}

.scanline-overlay:hover::after {
	opacity: 1;
}
```

- [ ] **Step 2: Apply scanline to FeaturedWork image containers**

In `src/components/FeaturedWork.astro`, add `scanline-overlay` class to the image container. Replace:

```astro
                    <div class="image-container">
```

with:

```astro
                    <div class="image-container scanline-overlay">
```

- [ ] **Step 3: Verify and commit**

Run: `npm run dev`

Expected: Hovering over featured work images shows a subtle horizontal line pattern.

```bash
git add src/styles/global.css src/components/FeaturedWork.astro
git commit -m "feat: add scanline overlay system for images

Reusable .scanline-overlay CSS class. Subtle horizontal lines appear
on hover. Applied to FeaturedWork image containers."
```

---

### Task 15: Create scroll-triggered animation system

**Files:**
- Create: `src/scripts/scroll-animations.ts`
- Modify: `src/layouts/MainLayout.astro`

- [ ] **Step 1: Create the scroll animation script**

Create `src/scripts/scroll-animations.ts`:

```typescript
// Scroll-triggered animations using IntersectionObserver
// Respects prefers-reduced-motion

function initScrollAnimations() {
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        // Show everything immediately
        document.querySelectorAll(".fade-in-up").forEach((el) => {
            el.classList.add("visible");
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in-up").forEach((el) => {
        observer.observe(el);
    });

    // Skill bar fill animation
    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll(".progress-bar");
                    bars.forEach((bar, index) => {
                        const el = bar as HTMLElement;
                        const targetWidth = el.style.width;
                        el.style.width = "0%";
                        el.style.transition = `width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                el.style.width = targetWidth;
                            });
                        });
                    });
                    skillObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    const skillsContainer = document.querySelector(".stats-list");
    if (skillsContainer) {
        skillObserver.observe(skillsContainer);
    }

    // Section number count-up animation
    document.querySelectorAll(".section-label").forEach((label) => {
        const text = label.textContent || "";
        const match = text.match(/^(\d+)/);
        if (!match) return;

        const targetNum = parseInt(match[1], 10);
        const suffix = text.substring(match[0].length);
        const el = label as HTMLElement;

        const countObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        let current = 0;
                        const padLength = match[1].length;
                        const interval = setInterval(() => {
                            current++;
                            el.textContent =
                                String(current).padStart(padLength, "0") +
                                suffix;
                            if (current >= targetNum) clearInterval(interval);
                        }, 80);
                        countObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        countObserver.observe(el);
    });
}

// Run on initial load
document.addEventListener("DOMContentLoaded", initScrollAnimations);

// Re-run after Astro View Transitions (if added later)
document.addEventListener("astro:page-load", initScrollAnimations);
```

- [ ] **Step 2: Update MainLayout to use the new scroll animation script**

In `src/layouts/MainLayout.astro`, replace the inline `<script>` block (lines 30-53) with:

```html
		<script src="../scripts/scroll-animations.ts"></script>
```

Note: Astro automatically bundles TypeScript scripts referenced this way.

- [ ] **Step 3: Verify scroll animations work**

Run: `npm run dev`

Expected: Elements fade in as you scroll. Section labels count up (000 → 002, 000 → 003, etc.). Skill bars fill from 0% with staggered delays.

- [ ] **Step 4: Commit**

```bash
git add src/scripts/scroll-animations.ts src/layouts/MainLayout.astro
git commit -m "feat: add scroll-triggered animation system

IntersectionObserver-based scroll animations. Fade-in-up elements,
section label count-up, and skill bar fill with stagger.
Respects prefers-reduced-motion. Supports Astro View Transitions."
```

---

### Task 16: Phase 2 verification

- [ ] **Step 1: Build and verify**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 2: Run dev and test all animations**

Run: `npm run dev`

Verify:
- Scroll down homepage — elements fade in, section numbers count up
- Hover on "Hi, I'm Eddie." — chromatic aberration layers appear
- Hover on section headings — text-shadow glitch
- Hover on featured work images — scanline overlay appears
- Skill bars animate on scroll reveal

- [ ] **Step 3: Commit milestone**

```bash
git commit --allow-empty -m "milestone: Phase 2 complete — glitch effects and scroll animations"
```

---

## Phase 3: Interactive Features

### Task 17: Add custom 8-bit cursor

**Files:**
- Create: `public/cursors/cursor-default.svg`
- Create: `public/cursors/cursor-pointer.svg`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Create the default 8-bit arrow cursor SVG**

Create `public/cursors/cursor-default.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M2 2h2v2H2zm2 2h2v2H4zm2 2h2v2H6zm2 2h2v2H8zm2 2h2v2h-2zm2 2h2v2h-2zm2 2h2v2h-2zm2 2h2v2h-2zM4 4h2v2H4zm2 2h2v2H6zm2 2h2v2H8zm2 2h2v2h-2zm2 2h2v2h-2zM6 6h2v2H6zm2 2h2v2H8zm2 2h2v2h-2zM4 8h2v2H4zm0 2h2v2H4zm2 2h2v2H6zm2 0h2v2H8zm2 0h2v2h-2z" fill="#0a0a0a"/>
  <path d="M4 4h2v2H4zm2 2h2v2H6zm2 2h2v2H8zm2 2h2v2h-2z" fill="#ffffff"/>
</svg>
```

Note: This is a simplified pixel cursor. The implementer should refine this or source a proper 8-bit cursor sprite. A pixel-art cursor generator or existing open-source pixel cursor asset would produce better results. The SVG above is a starting placeholder.

- [ ] **Step 2: Create the 8-bit pointer cursor SVG**

Create `public/cursors/cursor-pointer.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M8 0h2v2H8zm0 2h2v2H8zm0 2h2v2H8zm0 4h2v2H8zm0 2h2v2H8zm0 2h2v2H8zm2 2h2v2h-2zm2 0h2v2h-2zm4-4h2v2h-2zm0 2h2v2h-2zm2-2h2v2h-2zm-2 4h2v2h-2zm-4 2h2v2h-2zm-2 0h2v2h-2zM8 8h8v2H8z" fill="#0a0a0a"/>
  <path d="M10 2h2v8h6v2h-2v2h-2v2h-2v-4h-2z" fill="#ffffff"/>
</svg>
```

Note: Same caveat as above — this is a starting placeholder. Refine or replace with a proper pixel-art hand cursor.

- [ ] **Step 3: Add cursor styles to global CSS**

In `src/styles/global.css`, add after the `body` rule:

```css
/* Custom 8-bit Cursor — desktop only */
@media (pointer: fine) {
	body {
		cursor: url("/cursors/cursor-default.svg") 0 0, auto;
	}

	a,
	button,
	[role="button"],
	input[type="submit"],
	.project-card,
	.service-card,
	.social-link,
	.nav-link,
	.mobile-nav-link {
		cursor: url("/cursors/cursor-pointer.svg") 6 0, pointer;
	}
}
```

- [ ] **Step 4: Verify cursor works**

Run: `npm run dev`

Expected: On desktop, the cursor appears as an 8-bit pixel arrow. On hover over links/buttons, it changes to a pixel hand. On mobile/touch devices, the native cursor is used.

- [ ] **Step 5: Commit**

```bash
git add public/cursors/ src/styles/global.css
git commit -m "feat: add custom 8-bit pixel cursor

SVG pixel-art cursor sprites for default and pointer states.
Desktop only via @media (pointer: fine). Falls back to system cursor."
```

---

### Task 18: Implement Astro View Transitions with glitch effect

**Files:**
- Modify: `src/layouts/MainLayout.astro`
- Create: `src/scripts/page-transitions.ts`

- [ ] **Step 1: Add ViewTransitions to the layout**

In `src/layouts/MainLayout.astro`, add the import in the frontmatter (after line 2):

```astro
import { ViewTransitions } from "astro:transitions";
```

Then add `<ViewTransitions />` inside `<head>`, after the `<title>` tag (after line 24):

```astro
		<ViewTransitions />
```

- [ ] **Step 2: Create the page transition glitch effect script**

Create `src/scripts/page-transitions.ts`:

```typescript
// Glitch-flash effect for Astro View Transitions

function createGlitchOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "page-transition-glitch";
    overlay.innerHTML = `
        <style>
            .page-transition-glitch {
                position: fixed;
                inset: 0;
                z-index: 99999;
                pointer-events: none;
                opacity: 0;
            }
            .page-transition-glitch.active {
                animation: glitch-flash 0.3s ease-out forwards;
            }
            @keyframes glitch-flash {
                0% { opacity: 1; background: rgba(0, 204, 255, 0.1); }
                15% { opacity: 1; background: rgba(255, 51, 102, 0.08); transform: translateX(3px); }
                30% { opacity: 1; background: rgba(0, 204, 255, 0.06); transform: translateX(-2px); }
                50% { opacity: 0.5; background: transparent; transform: translateX(1px); }
                100% { opacity: 0; background: transparent; transform: translateX(0); }
            }
            @media (prefers-reduced-motion: reduce) {
                .page-transition-glitch.active {
                    animation: none;
                }
            }
        </style>
    `;
    document.body.appendChild(overlay);
    return overlay;
}

let overlay: HTMLDivElement | null = null;

document.addEventListener("astro:before-preparation", () => {
    if (!overlay) overlay = createGlitchOverlay() as HTMLDivElement;
    overlay.classList.remove("active");
    // Force reflow
    void overlay.offsetWidth;
    overlay.classList.add("active");
});

document.addEventListener("astro:after-swap", () => {
    // Re-create overlay in new DOM
    overlay = null;
});
```

- [ ] **Step 3: Add the transition script to the layout**

In `src/layouts/MainLayout.astro`, add after the scroll-animations script tag:

```html
		<script src="../scripts/page-transitions.ts"></script>
```

- [ ] **Step 4: Verify transitions**

Run: `npm run dev`

Click between pages. Expected: Brief cyan/pink flash overlay during navigation. Pages transition smoothly. Content re-animates via scroll observer.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/MainLayout.astro src/scripts/page-transitions.ts
git commit -m "feat: add Astro View Transitions with glitch-flash effect

ViewTransitions API for smooth page navigation. Brief chromatic
flash overlay on page change. Respects prefers-reduced-motion."
```

---

### Task 19: Implement Konami code easter egg

**Files:**
- Create: `src/scripts/konami.ts`
- Modify: `src/layouts/MainLayout.astro`

- [ ] **Step 1: Create the Konami code script**

Create `src/scripts/konami.ts`:

```typescript
// Konami Code Easter Egg: ↑ ↑ ↓ ↓ ← → ← → B A

const KONAMI_SEQUENCE = [
    "ArrowUp", "ArrowUp",
    "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight",
    "ArrowLeft", "ArrowRight",
    "KeyB", "KeyA",
];

let position = 0;

function triggerGlitchMeltdown() {
    const overlay = document.createElement("div");
    overlay.innerHTML = `
        <style>
            .konami-overlay {
                position: fixed;
                inset: 0;
                z-index: 100000;
                background: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: konami-glitch 2.5s ease-out forwards;
            }
            .konami-message {
                font-family: "JetBrains Mono", monospace;
                font-size: 1.2rem;
                font-weight: 700;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                color: #0a0a0a;
                opacity: 0;
                animation: konami-reveal 0.5s ease-out 2s forwards;
                text-align: center;
                line-height: 2;
            }
            .konami-message .accent {
                color: #00ccff;
            }
            @keyframes konami-glitch {
                0% { background: #ffffff; }
                5% { background: #00ccff; transform: translateX(5px); }
                10% { background: #ff3366; transform: translateX(-5px) skewX(2deg); }
                15% { background: #ffffff; transform: translateX(3px); }
                20% { background: #0a0a0a; transform: skewX(-1deg); }
                25% { background: #00ccff; transform: translateX(-3px); }
                30% { background: #ffffff; transform: none; }
                35% { background: #ff3366; transform: translateX(2px) skewX(1deg); }
                40% { background: #ffffff; transform: none; }
                60% { background: #ffffff; }
                100% { background: rgba(255, 255, 255, 0.95); }
            }
            @keyframes konami-reveal {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>
        <div class="konami-overlay">
            <div class="konami-message">
                <span class="accent">★</span> ACHIEVEMENT UNLOCKED <span class="accent">★</span><br>
                You found the secret.<br>
                <span class="accent">— PLAYER 1 DETECTED —</span>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Remove after animation
    setTimeout(() => overlay.remove(), 5000);
}

document.addEventListener("keydown", (e) => {
    if (e.code === KONAMI_SEQUENCE[position]) {
        position++;
        if (position === KONAMI_SEQUENCE.length) {
            triggerGlitchMeltdown();
            position = 0;
        }
    } else {
        position = 0;
    }
});
```

- [ ] **Step 2: Add the script to the layout**

In `src/layouts/MainLayout.astro`, add after the page-transitions script:

```html
		<script src="../scripts/konami.ts"></script>
```

- [ ] **Step 3: Verify the easter egg**

Run: `npm run dev`

Press: ↑ ↑ ↓ ↓ ← → ← → B A

Expected: Full-screen glitch meltdown with color flashes, then "ACHIEVEMENT UNLOCKED" message appears.

- [ ] **Step 4: Commit**

```bash
git add src/scripts/konami.ts src/layouts/MainLayout.astro
git commit -m "feat: add Konami code easter egg

Full-screen glitch meltdown triggered by ↑↑↓↓←→←→BA.
Color flash animation resolving to achievement message.
Hidden — rewards curious visitors."
```

---

### Task 20: Build sound design system

**Files:**
- Create: `src/scripts/sound-manager.ts`
- Modify: `src/components/NavBar.astro`

- [ ] **Step 1: Create the sound manager**

Create `src/scripts/sound-manager.ts`:

```typescript
// Sound Design System — off by default, toggle via nav icon
// All sounds are 8-bit/chiptune style, short duration

class SoundManager {
    private enabled = false;
    private audioContext: AudioContext | null = null;

    constructor() {
        this.enabled = localStorage.getItem("sound-enabled") === "true";
        this.updateToggleIcon();
    }

    private getContext(): AudioContext {
        if (!this.audioContext) {
            this.audioContext = new AudioContext();
        }
        return this.audioContext;
    }

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem("sound-enabled", String(this.enabled));
        this.updateToggleIcon();
        if (this.enabled) this.playClick();
    }

    private updateToggleIcon() {
        const icon = document.querySelector(".sound-toggle-icon");
        if (icon) {
            icon.textContent = this.enabled ? "♪" : "♪";
            icon.closest(".sound-toggle")?.classList.toggle(
                "sound-on",
                this.enabled
            );
        }
    }

    // Generate 8-bit sounds using Web Audio API — no external files needed
    playClick() {
        if (!this.enabled) return;
        const ctx = this.getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "square";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.setValueAtTime(600, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
    }

    playHover() {
        if (!this.enabled) return;
        const ctx = this.getContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "square";
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.08);
    }

    playBoot() {
        if (!this.enabled) return;
        const ctx = this.getContext();
        const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = "square";
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
            gain.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(
                0.001,
                ctx.currentTime + i * 0.1 + 0.15
            );
            osc.start(ctx.currentTime + i * 0.1);
            osc.stop(ctx.currentTime + i * 0.1 + 0.15);
        });
    }
}

// Initialize globally
const soundManager = new SoundManager();

// Expose for toggle button
(window as any).__soundManager = soundManager;

// Wire up nav link clicks
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".nav-link, .mobile-nav-link").forEach((link) => {
        link.addEventListener("click", () => soundManager.playClick());
    });

    document
        .querySelectorAll(".project-card, .service-card")
        .forEach((card) => {
            card.addEventListener("mouseenter", () =>
                soundManager.playHover()
            );
        });
});

// Re-wire after view transitions
document.addEventListener("astro:page-load", () => {
    document.querySelectorAll(".nav-link, .mobile-nav-link").forEach((link) => {
        link.addEventListener("click", () => soundManager.playClick());
    });

    document
        .querySelectorAll(".project-card, .service-card")
        .forEach((card) => {
            card.addEventListener("mouseenter", () =>
                soundManager.playHover()
            );
        });

    soundManager.playBoot();
});

// Toggle button handler
document.addEventListener("click", (e) => {
    const toggle = (e.target as HTMLElement).closest(".sound-toggle");
    if (toggle) {
        e.preventDefault();
        soundManager.toggle();
    }
});
```

- [ ] **Step 2: Add sound toggle button to NavBar**

In `src/components/NavBar.astro`, add the sound toggle inside the `.nav-container` div, after the `.nav-links` div and before the hamburger button. Insert after line 39:

```astro
        <button class="sound-toggle" aria-label="Toggle sound effects" title="Toggle sound effects">
            <span class="sound-toggle-icon">♪</span>
        </button>
```

- [ ] **Step 3: Add sound toggle styles to NavBar**

Add these styles inside the existing `<style>` block in NavBar.astro, before the `@media` breakpoint:

```css
    .sound-toggle {
        background: none;
        border: 1px solid var(--color-divider);
        color: var(--color-label);
        font-size: 0.85rem;
        padding: 0.25rem 0.5rem;
        font-family: var(--font-mono);
        transition: all 0.2s;
        line-height: 1;
    }

    .sound-toggle:hover {
        border-color: var(--color-accent-1);
        color: var(--color-text);
    }

    .sound-toggle.sound-on {
        border-color: var(--color-accent-1);
        color: var(--color-accent-1);
    }
```

- [ ] **Step 4: Add sound script to layout**

In `src/layouts/MainLayout.astro`, add after the konami script:

```html
		<script src="../scripts/sound-manager.ts"></script>
```

- [ ] **Step 5: Verify sound system**

Run: `npm run dev`

Click the ♪ toggle in the nav. Expected: Toggle turns cyan when enabled. Nav clicks produce a short 8-bit click. Hovering project cards produces a soft buzz. Preference persists across page loads.

- [ ] **Step 6: Commit**

```bash
git add src/scripts/sound-manager.ts src/components/NavBar.astro src/layouts/MainLayout.astro
git commit -m "feat: add sound design system with Web Audio API

8-bit chiptune sounds generated via Web Audio API — no external files.
Click, hover, and boot sounds. Off by default with nav toggle.
Preference persisted in localStorage."
```

---

### Task 21: Phase 3 verification

- [ ] **Step 1: Build**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 2: Full interactive test**

Run: `npm run dev`

Verify:
- Custom 8-bit cursor on desktop (arrow default, hand on links)
- Page transitions: glitch flash between pages
- Konami code: ↑↑↓↓←→←→BA triggers meltdown
- Sound toggle: enables/disables, persists, sounds play on nav/hover

- [ ] **Step 3: Commit milestone**

```bash
git commit --allow-empty -m "milestone: Phase 3 complete — interactive features"
```

---

## Phase 4: Content & Polish

### Task 22: Rewrite About Me bio content

**Files:**
- Modify: `src/components/AboutMe.astro`

- [ ] **Step 1: Replace the bio paragraphs**

In `src/components/AboutMe.astro`, replace the three `<p>` tags inside `.bio-content` (the paragraph text) with:

```html
                    <p>
                        I'm a creative developer with over 15 years of experience
                        at the intersection of design and engineering. I don't just
                        design interfaces — I build them. From pixel-perfect brand
                        systems to interactive web experiences with custom animations,
                        I bring ideas to life across the full stack of visual media.
                    </p>
                    <p>
                        My toolkit spans both worlds: Adobe Creative Suite, After Effects,
                        Cinema 4D, and Figma on the design side; HTML, CSS, JavaScript,
                        TypeScript, React, and Astro on the engineering side. This portfolio
                        itself is built with Astro and deployed on Cloudflare Workers.
                    </p>
                    <p>
                        Bilingual in Spanish and English, I thrive in collaborative
                        environments where design and development converge. Currently
                        exploring creative coding, 3D web experiences, and pushing the
                        boundaries of what's possible in the browser.
                    </p>
```

- [ ] **Step 2: Verify the content reads well**

Run: `npm run dev`, navigate to the About section.

Expected: Confident, professional bio that reflects both design and engineering skills. No self-deprecating language.

- [ ] **Step 3: Commit**

```bash
git add src/components/AboutMe.astro
git commit -m "feat: rewrite About Me bio for design engineer positioning

Confident tone reflecting 15+ years spanning design and engineering.
Highlights full technical stack. Removes self-deprecating language."
```

---

### Task 23: Add .superpowers to .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add .superpowers to gitignore**

Append to the end of `/Users/edrosillo/Documents/retro-portfolio/.gitignore`:

```
# Superpowers brainstorm files
.superpowers/
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: add .superpowers/ to gitignore"
```

---

### Task 24: Final build and verification

- [ ] **Step 1: Full build**

```bash
cd /Users/edrosillo/Documents/retro-portfolio
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Run preview**

```bash
npm run preview
```

Visit all pages and verify:
- Light theme consistent across every page
- Glitch effects work (hero aberration, hover effects, scanlines)
- Scroll animations trigger correctly
- Custom cursor visible on desktop
- Page transitions smooth with glitch flash
- Konami code works
- Sound toggle works
- Mobile responsive (test with browser dev tools)
- No dark theme remnants visible anywhere

- [ ] **Step 3: Lighthouse audit**

Run Lighthouse in Chrome DevTools on the homepage. Check:
- Performance: Target >90
- Accessibility: Target >95
- Best Practices: Target >90

Note any issues for follow-up.

- [ ] **Step 4: Final commit**

```bash
git commit --allow-empty -m "milestone: Phase 4 complete — light theme redesign finished"
```

---

## Summary

| Phase | Tasks | Focus |
|-------|-------|-------|
| 1 | Tasks 1-12 | Light theme foundation: colors, typography, section system, all components |
| 2 | Tasks 13-16 | Glitch effects: chromatic aberration, scanlines, scroll animations |
| 3 | Tasks 17-21 | Interactive: custom cursor, page transitions, easter egg, sound |
| 4 | Tasks 22-24 | Content rewrite, cleanup, verification |

**Total tasks:** 24
**Estimated commits:** ~20
**Branch:** `feature/light-theme-redesign`
