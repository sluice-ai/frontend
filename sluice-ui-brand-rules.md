# Sluice UI / Brand Design Rules

Version: 1.0  
Purpose: Website and UI design guidance for building the Sluice brand system.  
Scope: Visual design, typography, colors, layout, components, and implementation rules only.

---

## 1. Brand Design Summary

Sluice should feel like a premium technical pitch deck translated into a website.

The visual direction is:

- Editorial
- Minimal
- Paper-textured
- Infrastructure-focused
- Calm and confident
- Slightly academic
- Slightly retro-futurist
- Investor-ready
- Builder-friendly

The website should not look like a generic dark AI SaaS landing page. It should look like a refined infrastructure brand with strong typography, restrained color, simple diagrams, and premium spacing.

Core design idea:

> Controlled flow. Intelligent routing. Infrastructure clarity.

---

## 2. Brand Keywords

Use these words to guide visual decisions:

- Flow
- Routing
- Policy
- Control
- Infrastructure
- Benchmark
- Neutrality
- Signal
- Direction
- Precision
- Intelligence
- Coordination

Avoid visual decisions that feel:

- Too playful
- Too crypto-native
- Too neon
- Too crowded
- Too generic AI
- Too corporate-template
- Too dark-dashboard-heavy

---

## 3. Typography System

The brand uses two main fonts:

1. **Roca Two** for display typography
2. **TT Chocolates** for body and UI typography

Do not replace these fonts unless absolutely necessary. If the fonts are not available in development, use the fallback stacks defined below until the licensed font files are installed.

---

## 4. Font Usage Rules

### 4.1 Display Font: Roca Two

Use **Roca Two** for:

- Hero headlines
- Section titles
- Big editorial questions
- Large numbers
- Large quotes
- Short punchy brand statements
- Major page headers

Do not use Roca Two for:

- Paragraphs
- Long descriptions
- Navigation
- Buttons
- Captions
- Form labels
- Tables

Recommended CSS:

```css
font-family: "Roca Two", Georgia, serif;
```

Roca Two should feel bold, editorial, and distinctive. Use it at large sizes with tight line-height.

---

### 4.2 Body Font: TT Chocolates

Use **TT Chocolates** for:

- Paragraphs
- Navigation
- Buttons
- Captions
- Labels
- Chart labels
- Card descriptions
- Form fields
- Small UI text
- Source notes

Recommended CSS:

```css
font-family: "TT Chocolates", Inter, system-ui, sans-serif;
```

TT Chocolates should feel clean, modern, and readable. Use it with generous line-height and restrained font weights.

---

## 5. Font Hierarchy

### 5.1 Hero H1

Use for the main landing page statement.

```css
.hero-title {
  font-family: "Roca Two", Georgia, serif;
  font-size: clamp(72px, 10vw, 150px);
  line-height: 0.84;
  letter-spacing: -0.06em;
  font-weight: 700;
  color: #1D3487;
}
```

Recommended hero headline examples:

- Where AI work should flow.
- The routing layer for decentralized AI.
- One route is not enough.
- Route intelligence for the multi-model stack.

---

### 5.2 Section H2

Use for major sections.

```css
.section-title {
  font-family: "Roca Two", Georgia, serif;
  font-size: clamp(56px, 7vw, 104px);
  line-height: 0.88;
  letter-spacing: -0.055em;
  font-weight: 700;
  color: #1D3487;
}
```

Good section titles:

- Why now?
- AI supply is fragmented.
- Routing is infrastructure.
- The best route should win.
- Built for policy-aware AI.

---

### 5.3 Card H3

Use for feature cards, benchmark cards, and smaller editorial blocks.

```css
.card-title {
  font-family: "Roca Two", Georgia, serif;
  font-size: clamp(32px, 4vw, 56px);
  line-height: 0.95;
  letter-spacing: -0.04em;
  font-weight: 700;
  color: #1D3487;
}
```

---

### 5.4 Body Text

Use for normal website paragraphs.

```css
.body-text {
  font-family: "TT Chocolates", Inter, system-ui, sans-serif;
  font-size: 18px;
  line-height: 1.55;
  letter-spacing: -0.015em;
  font-weight: 400;
  color: #1B1B1D;
}
```

Paragraph rules:

- Keep paragraphs short.
- Use a maximum of 2 to 4 lines where possible.
- Avoid dense blocks of text.
- Use spacing instead of long explanations.

---

### 5.5 Small Text and Captions

Use for chart captions, sources, labels, and helper text.

```css
.caption {
  font-family: "TT Chocolates", Inter, system-ui, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  letter-spacing: -0.01em;
  font-weight: 400;
  color: #707380;
}
```

---

### 5.6 UI Labels

Use for small interface labels.

```css
.label {
  font-family: "TT Chocolates", Inter, system-ui, sans-serif;
  font-size: 13px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 500;
  color: #1D3487;
}
```

---

## 6. Font Loading Setup

Use this structure when the licensed font files are available in the project.

```css
@font-face {
  font-family: "Roca Two";
  src: url("/fonts/roca-two.woff2") format("woff2");
  font-weight: 400 800;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "TT Chocolates";
  src: url("/fonts/tt-chocolates.woff2") format("woff2");
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}
```

Do not commit unlicensed font files. Only use properly licensed font assets.

---

## 7. Color Palette

The Sluice palette is paper-first with strong navy typography.

### 7.1 Primary Colors

```css
:root {
  --color-navy: #1D3487;
  --color-deep-navy: #101422;
  --color-ink: #1B1B1D;
  --color-paper: #F2F3F5;
  --color-paper-warm: #EDEEEE;
  --color-paper-muted: #E7E7E8;
}
```

Usage:

- Navy: large headings, borders, buttons, chart lines
- Deep navy: starburst marker, strong contrast areas
- Ink: body text
- Paper: main background
- Paper warm: alternate sections
- Paper muted: subtle panels and cards

---

### 7.2 Accent Colors

```css
:root {
  --color-route-blue: #4A77DC;
  --color-soft-blue: #8990A9;
  --color-muted-gray: #707380;
  --color-border-blue: #1D3487;
}
```

Usage:

- Route blue: selected route lines, active states, small highlights
- Soft blue: secondary diagram elements
- Muted gray: captions and inactive text
- Border blue: frames and section outlines

---

### 7.3 Optional Gradient Accent

Use this only as a small detail, such as a thin top bar, divider, or tiny accent line.

```css
--gradient-topline: linear-gradient(
  90deg,
  #3682D8 0%,
  #4B68DD 35%,
  #6550E1 65%,
  #8B3FE4 100%
);
```

Rules:

- Do not use this as a full hero background.
- Do not use gradient cards everywhere.
- Keep gradients subtle and rare.

---

## 8. Color Usage Rules

### 8.1 Backgrounds

Main background:

```css
background-color: #F2F3F5;
```

Alternate background:

```css
background-color: #EDEEEE;
```

Muted panel background:

```css
background-color: #E7E7E8;
```

---

### 8.2 Text Colors

Headlines:

```css
color: #1D3487;
```

Body:

```css
color: #1B1B1D;
```

Captions:

```css
color: #707380;
```

Inverse text:

```css
color: #F2F3F5;
```

---

### 8.3 Border Colors

Primary border:

```css
border-color: #1D3487;
```

Muted border:

```css
border-color: rgba(29, 52, 135, 0.22);
```

Very subtle divider:

```css
border-color: rgba(29, 52, 135, 0.12);
```

---

## 9. Texture Rules

The Sluice website should use a subtle paper texture.

The texture should feel:

- Printed
- Editorial
- Premium
- Archival
- Tactile

It should not feel:

- Dirty
- Grunge
- Newspaper-heavy
- Vintage poster-heavy
- Distracting

Recommended texture opacity:

```css
.texture-layer {
  opacity: 0.08;
}
```

Maximum texture opacity:

```css
.texture-layer-heavy {
  opacity: 0.18;
}
```

CSS-only texture option:

```css
.paper-bg {
  background:
    radial-gradient(rgba(16, 20, 34, 0.045) 1px, transparent 1px),
    #F2F3F5;
  background-size: 4px 4px;
}
```

Image texture option:

```css
.paper-bg {
  background-color: #F2F3F5;
  background-image: url("/textures/paper-grain.png");
  background-size: 600px 600px;
  background-repeat: repeat;
}
```

---

## 10. Border and Frame System

Sluice should use thin navy borders and large rounded rectangles.

### 10.1 Border Tokens

```css
:root {
  --border-primary: 1.25px solid #1D3487;
  --border-muted: 1px solid rgba(29, 52, 135, 0.22);
  --border-subtle: 1px solid rgba(29, 52, 135, 0.12);
}
```

---

### 10.2 Main Section Frame

Most major sections should sit inside a large bordered frame.

```css
.framed-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px;
  border: 1.25px solid #1D3487;
  border-radius: 32px;
  background: rgba(242, 243, 245, 0.78);
}
```

Mobile version:

```css
@media (max-width: 768px) {
  .framed-section {
    padding: 32px 24px;
    border-radius: 24px;
  }
}
```

---

## 11. Radius System

```css
:root {
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-card: 18px;
  --radius-lg: 24px;
  --radius-frame: 32px;
  --radius-pill: 999px;
}
```

Usage:

- Large sections: 28px to 32px
- Cards: 16px to 18px
- Pills and buttons: 999px
- Small UI elements: 8px to 14px

---

## 12. Layout System

Use wide editorial layouts with generous spacing.

### 12.1 Container

```css
:root {
  --container-max: 1200px;
  --section-padding-x: 64px;
  --section-padding-y: 96px;
}
```

Mobile:

```css
:root {
  --section-padding-x-mobile: 24px;
  --section-padding-y-mobile: 64px;
}
```

---

### 12.2 Common Layout Pattern

Use a 2-column editorial structure often.

```text
Left column:  large headline and short explanation
Right column: chart, routing diagram, metric, or proof visual
```

Recommended desktop ratio:

```css
.grid-hero {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 72px;
  align-items: center;
}
```

Mobile:

```css
@media (max-width: 768px) {
  .grid-hero {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
```

---

## 13. Starburst Marker

The starburst marker is a recurring brand detail.

Use it like the side asterisk in the pitch deck.

### 13.1 Usage

Use starburst markers:

- On section borders
- Beside key headlines
- As slide-like separators
- As small brand moments
- In hero visuals
- Near route diagrams

Do not use more than 1 or 2 per section.

---

### 13.2 Starburst CSS

```css
.starburst {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  background: #101422;
  color: #F2F3F5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "TT Chocolates", Inter, system-ui, sans-serif;
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
}
```

Preferred symbol:

```text
✱
```

Fallback symbol:

```text
*
```

---

## 14. Navigation Design

Navigation should be minimal, quiet, and editorial.

```css
.nav {
  font-family: "TT Chocolates", Inter, system-ui, sans-serif;
  font-size: 15px;
  color: #1D3487;
}
```

Navbar background:

```css
.navbar {
  background: rgba(242, 243, 245, 0.82);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(29, 52, 135, 0.12);
}
```

Recommended nav items:

- Product
- How it works
- Benchmark
- Docs
- Testnet

Rules:

- Keep nav text short.
- Do not use heavy dropdowns in the first version.
- Use navy text.
- Use pill CTA on the right.

---

## 15. Buttons

### 15.1 Primary Button

```css
.button-primary {
  font-family: "TT Chocolates", Inter, system-ui, sans-serif;
  background: #1D3487;
  color: #F2F3F5;
  border: 1px solid #1D3487;
  border-radius: 999px;
  padding: 14px 22px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: transform 160ms ease, background 160ms ease;
}

.button-primary:hover {
  transform: translateY(-1px);
  background: #101422;
}
```

---

### 15.2 Secondary Button

```css
.button-secondary {
  font-family: "TT Chocolates", Inter, system-ui, sans-serif;
  background: transparent;
  color: #1D3487;
  border: 1px solid #1D3487;
  border-radius: 999px;
  padding: 14px 22px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: transform 160ms ease, background 160ms ease;
}

.button-secondary:hover {
  transform: translateY(-1px);
  background: rgba(29, 52, 135, 0.06);
}
```

---

### 15.3 Button Copy

Good button copy:

- Read docs
- View routing
- Join testnet
- See benchmark
- Start building
- Explore policy

Avoid:

- Click here
- Learn more about our platform
- Get started today!!!
- Revolutionize your AI now

---

## 16. Cards

Cards should feel like paper modules, not SaaS glass cards.

```css
.card {
  background: rgba(242, 243, 245, 0.72);
  border: 1px solid rgba(29, 52, 135, 0.22);
  border-radius: 18px;
  padding: 28px;
}
```

Optional soft shadow:

```css
.card-soft-shadow {
  box-shadow: 0 8px 30px rgba(16, 20, 34, 0.06);
}
```

Rules:

- Avoid heavy shadows.
- Avoid glassmorphism.
- Avoid neon outlines.
- Keep card content sparse.
- Use navy titles and ink body text.

---

## 17. Chart Design

Charts should be minimal, technical, and editorial.

Use:

- Thin navy lines
- Small dots
- Light gray gridlines
- Minimal labels
- Clear captions
- No loud multicolor palettes

Chart tokens:

```css
:root {
  --chart-line: #1D3487;
  --chart-grid: rgba(16, 20, 34, 0.12);
  --chart-text: #1B1B1D;
  --chart-muted: #707380;
}
```

Chart title:

```css
.chart-title {
  font-family: "TT Chocolates", Inter, system-ui, sans-serif;
  font-size: 15px;
  color: #1B1B1D;
}
```

Chart source:

```css
.chart-source {
  font-family: "TT Chocolates", Inter, system-ui, sans-serif;
  font-size: 13px;
  color: #707380;
}
```

Rules:

- Use navy for primary data.
- Use muted gray for secondary gridlines.
- Do not use bright dashboard colors.
- Keep charts simple enough to understand in 3 seconds.

---

## 18. Diagram Design

Routing diagrams are a core Sluice visual asset.

Use diagrams to show:

- Incoming requests
- Routing policy layer
- Miner route proposals
- Validator scoring
- Providers
- Chutes
- Targon
- External APIs
- Selected route

### 18.1 Diagram Style

Use:

- Thin navy lines
- Small circular nodes
- Off-white background
- One highlighted route
- Restrained labels
- Rounded containers

Normal route:

```css
.route-normal {
  stroke: #1D3487;
  stroke-width: 1.5px;
}
```

Selected route:

```css
.route-selected {
  stroke: #4A77DC;
  stroke-width: 2px;
}
```

Inactive route:

```css
.route-inactive {
  stroke: rgba(29, 52, 135, 0.25);
  stroke-width: 1px;
}
```

Node:

```css
.route-node {
  fill: #F2F3F5;
  stroke: #1D3487;
  stroke-width: 1.25px;
}
```

Selected node:

```css
.route-node-selected {
  fill: #1D3487;
  stroke: #1D3487;
}
```

---

## 19. Icon Style

Use thin-line icons only.

Icon rules:

- 1.5px to 2px stroke
- Rounded caps
- No filled cartoon icons
- No 3D icons
- No generic robot heads
- No crypto coin icons

Good icon themes:

- Routing node
- Split path
- Gate
- Gauge
- Latency clock
- Validator check
- Provider grid
- Privacy lock
- Benchmark graph
- Policy sliders

Icon color:

```css
.icon {
  color: #1D3487;
  stroke-width: 1.75px;
}
```

---

## 20. Hero Section Rules

The hero section should be simple, bold, and editorial.

### 20.1 Hero Layout

Recommended structure:

```text
Left side:
- Huge Roca Two headline
- Short TT Chocolates subheadline
- Primary CTA
- Secondary CTA

Right side:
- Bordered routing diagram
- Small metric chart
- Provider flow visual
```

### 20.2 Hero Copy Examples

Best option:

```text
Where AI work should flow.
```

Other options:

```text
The routing layer for decentralized AI.
```

```text
One route is not enough.
```

```text
Route intelligence for the multi-model stack.
```

### 20.3 Hero Subtext Example

```text
Sluice routes every AI request to the best-fit provider across cost, latency, quality, reliability, and privacy.
```

### 20.4 Hero Visual Rules

Use:

- One large framed visual
- Thin navy border
- Light paper background
- Route lines
- Provider nodes
- One selected route

Avoid:

- 3D AI objects
- Animated robot faces
- Generic neural network blob
- Heavy gradients
- Dark glass cards

---

## 21. Section Patterns

### 21.1 Problem Section

Title:

```text
AI supply is fragmented.
```

Visual:

- Multiple provider nodes
- Messy thin lines
- Small captions
- No single best route highlighted

Design feeling:

- Fragmented but still clean
- Slightly busy, but controlled

---

### 21.2 Solution Section

Title:

```text
Sluice makes routing visible.
```

Visual:

- Same provider nodes
- Sluice layer in the middle
- One clean selected route

Design feeling:

- Order from complexity
- Calm and confident

---

### 21.3 How It Works Section

Use 4 cards:

1. Request enters
2. Miners propose routes
3. Validators benchmark
4. Best route wins

Card format:

```text
01
Request enters
Prompt metadata, budget, latency target, quality threshold, and privacy needs are submitted to the network.
```

Use large Roca Two numbers.

---

### 21.4 Benchmark Section

Title:

```text
The best route should win.
```

Use scoring cards:

- Quality
- Cost
- Latency
- Reliability
- Privacy fit

Keep the formula visual and simple.

---

### 21.5 Comparison Section

Title:

```text
Not another gateway.
```

Use a clean comparison table:

```text
OpenRouter     Access layer
Chutes         Compute layer
Targon         Privacy layer
Sluice         Decision layer
```

Design rules:

- Use navy borders
- No heavy table styling
- Keep rows spacious
- Use Roca Two only for the main title, not every cell

---

## 22. Tables

Tables should look editorial, not spreadsheet-heavy.

```css
.table {
  width: 100%;
  border-collapse: collapse;
  font-family: "TT Chocolates", Inter, system-ui, sans-serif;
}

.table th {
  color: #1D3487;
  font-weight: 500;
  text-align: left;
  border-bottom: 1px solid rgba(29, 52, 135, 0.3);
  padding: 14px 0;
}

.table td {
  color: #1B1B1D;
  border-bottom: 1px solid rgba(29, 52, 135, 0.12);
  padding: 16px 0;
}
```

Rules:

- No zebra stripes unless very subtle.
- No dense borders around every cell.
- Use row spacing.
- Keep tables readable.

---

## 23. Form Elements

Input fields should be minimal and outlined.

```css
.input {
  font-family: "TT Chocolates", Inter, system-ui, sans-serif;
  background: rgba(242, 243, 245, 0.72);
  border: 1px solid rgba(29, 52, 135, 0.28);
  border-radius: 14px;
  padding: 14px 16px;
  color: #1B1B1D;
  font-size: 16px;
}

.input:focus {
  outline: none;
  border-color: #1D3487;
  box-shadow: 0 0 0 3px rgba(29, 52, 135, 0.08);
}
```

---

## 24. Motion Rules

Motion should feel like controlled routing.

Use:

- Route lines drawing slowly
- Nodes activating softly
- Cards fading upward
- Subtle chart line reveal
- Small hover lift on buttons

Avoid:

- Bouncy animations
- Spinning icons
- Excessive parallax
- Loud particle effects
- Constant moving backgrounds

Motion tokens:

```css
:root {
  --motion-fast: 160ms;
  --motion-base: 240ms;
  --motion-slow: 600ms;
  --ease-standard: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 25. Responsive Rules

Mobile must stay editorial and readable.

Rules:

- Stack 2-column layouts into 1 column.
- Reduce section frame padding.
- Keep border radius slightly smaller.
- Keep hero headline large but not overflowing.
- Avoid tiny charts on mobile; simplify them.
- Hide decorative starbursts if they cause layout issues.

Mobile hero title:

```css
@media (max-width: 768px) {
  .hero-title {
    font-size: clamp(56px, 18vw, 86px);
    line-height: 0.9;
  }
}
```

Mobile framed section:

```css
@media (max-width: 768px) {
  .framed-section {
    padding: 32px 24px;
    border-radius: 24px;
  }
}
```

---

## 26. Visual Motifs

Use these repeatedly:

- Framed paper sections
- Thin blue borders
- Large Roca Two headlines
- Small TT Chocolates explanations
- Simple line charts
- Route maps
- Side starburst markers
- Paper grain
- Source captions
- Two-column grids
- Editorial whitespace

Do not use:

- 3D renders
- Crypto coin visuals
- Robot illustrations
- Generic AI sparkle icons
- Overdone neon cyberpunk visuals
- Bright gradient backgrounds
- Heavy SaaS shadows
- Glassmorphism cards

---

## 27. Logo Direction

Recommended logo/icon concept:

- Three input lines flowing into one controlled output line
- A central gate or routing bar
- Rounded geometry
- Minimal navy linework
- Works inside a circle or square

Logo should work in:

- Navy on paper
- Paper on navy
- Deep navy on paper
- Icon-only favicon

Avoid:

- Water drop icon
- Generic AI brain
- Crypto coin symbol
- Literal dam illustration
- Overly complex node graph

---

## 28. Website Page Structure

Recommended homepage structure:

1. Hero
2. Why now
3. Fragmentation problem
4. Sluice routing layer
5. How it works
6. Why different
7. Validator scoring
8. Initial users
9. Roadmap
10. CTA

Each section should use the same design language:

- Paper background
- Navy typography
- Rounded frame
- Editorial spacing
- Thin charts or route diagrams

---

## 29. Copy Styling From UI Perspective

Headlines should be short and visually strong.

Good headline examples:

```text
Why now?
```

```text
One route is not enough.
```

```text
AI supply is fragmented.
```

```text
Routing is infrastructure.
```

```text
The best route should win.
```

Body copy should be short and airy.

Good body example:

```text
AI teams now use many models, providers, and privacy tiers. Sluice turns that fragmentation into a routing layer that selects the best path for every request.
```

Rules:

- Keep headline lines short.
- Avoid long paragraph blocks.
- Use spacing as a design element.
- Use captions for sources and chart notes.
- Do not over-explain inside the UI.

---

## 30. Tailwind Theme Suggestion

```js
theme: {
  extend: {
    colors: {
      sluice: {
        navy: "#1D3487",
        deepNavy: "#101422",
        ink: "#1B1B1D",
        paper: "#F2F3F5",
        paperWarm: "#EDEEEE",
        paperMuted: "#E7E7E8",
        routeBlue: "#4A77DC",
        softBlue: "#8990A9",
        muted: "#707380"
      }
    },
    fontFamily: {
      display: ["Roca Two", "Georgia", "serif"],
      sans: ["TT Chocolates", "Inter", "system-ui", "sans-serif"]
    },
    borderRadius: {
      frame: "32px",
      card: "18px",
      pill: "999px"
    },
    boxShadow: {
      soft: "0 8px 30px rgba(16, 20, 34, 0.06)"
    }
  }
}
```

---

## 31. CSS Variables

```css
:root {
  --font-display: "Roca Two", Georgia, serif;
  --font-body: "TT Chocolates", Inter, system-ui, sans-serif;

  --color-navy: #1D3487;
  --color-deep-navy: #101422;
  --color-ink: #1B1B1D;
  --color-paper: #F2F3F5;
  --color-paper-warm: #EDEEEE;
  --color-paper-muted: #E7E7E8;
  --color-route-blue: #4A77DC;
  --color-soft-blue: #8990A9;
  --color-muted: #707380;

  --border-primary: 1.25px solid #1D3487;
  --border-muted: 1px solid rgba(29, 52, 135, 0.22);
  --border-subtle: 1px solid rgba(29, 52, 135, 0.12);

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-card: 18px;
  --radius-lg: 24px;
  --radius-frame: 32px;
  --radius-pill: 999px;

  --container-max: 1200px;
  --section-padding-y: 96px;
  --section-padding-x: 64px;

  --motion-fast: 160ms;
  --motion-base: 240ms;
  --motion-slow: 600ms;
  --ease-standard: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 32. Complete Base CSS Starter

```css
@font-face {
  font-family: "Roca Two";
  src: url("/fonts/roca-two.woff2") format("woff2");
  font-weight: 400 800;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "TT Chocolates";
  src: url("/fonts/tt-chocolates.woff2") format("woff2");
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}

:root {
  --font-display: "Roca Two", Georgia, serif;
  --font-body: "TT Chocolates", Inter, system-ui, sans-serif;

  --color-navy: #1D3487;
  --color-deep-navy: #101422;
  --color-ink: #1B1B1D;
  --color-paper: #F2F3F5;
  --color-paper-warm: #EDEEEE;
  --color-paper-muted: #E7E7E8;
  --color-route-blue: #4A77DC;
  --color-soft-blue: #8990A9;
  --color-muted: #707380;

  --border-primary: 1.25px solid #1D3487;
  --border-muted: 1px solid rgba(29, 52, 135, 0.22);
  --border-subtle: 1px solid rgba(29, 52, 135, 0.12);

  --radius-card: 18px;
  --radius-frame: 32px;
  --radius-pill: 999px;

  --container-max: 1200px;
  --section-padding-y: 96px;
  --section-padding-x: 64px;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: var(--font-body);
  background:
    radial-gradient(rgba(16, 20, 34, 0.045) 1px, transparent 1px),
    var(--color-paper);
  background-size: 4px 4px;
  color: var(--color-ink);
}

h1,
h2,
h3 {
  font-family: var(--font-display);
  color: var(--color-navy);
  margin: 0;
}

p {
  font-family: var(--font-body);
  color: var(--color-ink);
  line-height: 1.55;
  letter-spacing: -0.015em;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding-left: var(--section-padding-x);
  padding-right: var(--section-padding-x);
}

.framed-section {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 72px;
  border: var(--border-primary);
  border-radius: var(--radius-frame);
  background: rgba(242, 243, 245, 0.78);
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(72px, 10vw, 150px);
  line-height: 0.84;
  letter-spacing: -0.06em;
  font-weight: 700;
  color: var(--color-navy);
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(56px, 7vw, 104px);
  line-height: 0.88;
  letter-spacing: -0.055em;
  font-weight: 700;
  color: var(--color-navy);
}

.body-text {
  font-family: var(--font-body);
  font-size: 18px;
  line-height: 1.55;
  letter-spacing: -0.015em;
  font-weight: 400;
  color: var(--color-ink);
}

.caption {
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.4;
  letter-spacing: -0.01em;
  font-weight: 400;
  color: var(--color-muted);
}

.button-primary {
  font-family: var(--font-body);
  background: var(--color-navy);
  color: var(--color-paper);
  border: 1px solid var(--color-navy);
  border-radius: var(--radius-pill);
  padding: 14px 22px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.01em;
  text-decoration: none;
}

.button-secondary {
  font-family: var(--font-body);
  background: transparent;
  color: var(--color-navy);
  border: 1px solid var(--color-navy);
  border-radius: var(--radius-pill);
  padding: 14px 22px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.01em;
  text-decoration: none;
}

.card {
  background: rgba(242, 243, 245, 0.72);
  border: var(--border-muted);
  border-radius: var(--radius-card);
  padding: 28px;
}

.starburst {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  background: var(--color-deep-navy);
  color: var(--color-paper);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
}

@media (max-width: 768px) {
  .container {
    padding-left: 24px;
    padding-right: 24px;
  }

  .framed-section {
    padding: 32px 24px;
    border-radius: 24px;
  }

  .hero-title {
    font-size: clamp(56px, 18vw, 86px);
    line-height: 0.9;
  }
}
```

---

## 33. Agent Implementation Rules

When building the Sluice website, follow these rules strictly:

1. Use **Roca Two** only for display headings and large numbers.
2. Use **TT Chocolates** for body, UI, nav, labels, captions, and buttons.
3. Use `#1D3487` as the main brand color.
4. Use `#F2F3F5` as the main background color.
5. Add subtle paper grain across the website.
6. Use thin navy rounded borders around major sections.
7. Use large editorial spacing.
8. Use minimal charts and routing diagrams.
9. Use the starburst marker as a recurring brand detail.
10. Avoid dark SaaS styling unless building the actual app dashboard.
11. Avoid neon AI visuals, robot icons, and generic gradient cards.
12. Keep the interface refined, calm, and investor-ready.
13. Use charts, diagrams, and metric cards instead of decorative illustrations.
14. Keep copy short and visually balanced.
15. Make every section feel like a polished pitch-deck slide adapted for the web.

---

## 34. Final Design Checklist

Before shipping any Sluice page, check:

- Does it use Roca Two for main headings?
- Does it use TT Chocolates for body/UI text?
- Is the main background paper/off-white?
- Is navy the dominant brand color?
- Are borders thin, rounded, and navy?
- Is there enough whitespace?
- Are diagrams minimal and route-focused?
- Are charts simple and editorial?
- Are gradients used only as tiny accents?
- Are starburst markers used sparingly?
- Does it avoid generic AI/SaaS visuals?
- Does it feel premium, technical, and calm?

If yes, it matches the Sluice UI brand direction.
