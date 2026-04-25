---
name: Journalist Narrative
colors:
  surface: '#fff9ee'
  surface-dim: '#e0d9cb'
  surface-bright: '#fff9ee'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf3e4'
  surface-container: '#f4edde'
  surface-container-high: '#eee8d9'
  surface-container-highest: '#e9e2d3'
  on-surface: '#1e1b12'
  on-surface-variant: '#5a413d'
  inverse-surface: '#333026'
  inverse-on-surface: '#f7f0e1'
  outline: '#8e706c'
  outline-variant: '#e2beb9'
  surface-tint: '#b4271f'
  primary: '#a51c16'
  on-primary: '#ffffff'
  primary-container: '#c8362b'
  on-primary-container: '#ffebe8'
  inverse-primary: '#ffb4a9'
  secondary: '#6f5d00'
  on-secondary: '#ffffff'
  secondary-container: '#fedb46'
  on-secondary-container: '#726000'
  tertiary: '#555454'
  on-tertiary: '#ffffff'
  tertiary-container: '#6d6c6c'
  on-tertiary-container: '#f1eeee'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4a9'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#910809'
  secondary-fixed: '#ffe16b'
  secondary-fixed-dim: '#e6c42f'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#544600'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#fff9ee'
  on-background: '#1e1b12'
  surface-variant: '#e9e2d3'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  technical-sm:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
  annotation:
    fontFamily: Caveat
    fontSize: 22px
    fontWeight: '400'
    lineHeight: '1.1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  margin-page: max(2rem, 5vw)
  gutter-grid: 2rem
  stack-xl: 4rem
  stack-md: 2rem
  stack-sm: 1rem
---

## Brand & Style

This design system centers on a **Tactile Skeuomorphic** approach blended with **Editorial Minimalism**. It evokes the feeling of a high-end physical notebook—specifically a Moleskine or a bespoke travel journal—translated into a digital medium. The brand personality is human, witty, and intellectually curious, favoring storytelling over raw data consumption.

The UI avoids clinical "app-like" interfaces in favor of a "printed-page" aesthetic. Every interaction should feel intentional, using physics-based transitions like page-turns and ink-spread hover effects. The audience consists of readers who value craftsmanship, long-form thought, and a personal, unpolished touch in a hyper-polished digital world.

## Colors

The palette is rooted in the "Creamy Paper" light theme, utilizing `#F1EADB` as the foundational canvas to reduce eye strain and provide a warm, organic feel. 

- **Primary (`#C8362B`)**: An "Oxblood Ink" red used for critical accents, call-to-actions, and hand-drawn underlines. It provides a striking contrast against the cream paper.
- **Secondary (`#F2D03B`)**: A "Highlighter Yellow" used sparingly for sticky-note backgrounds and text highlights.
- **Tertiary/Text (`#1A1A1A`)**: A "Soft Charcoal" rather than pure black, ensuring that typography feels printed rather than projected.
- **Neutral (`#F1EADB`)**: The base surface color, which should be paired with a subtle SVG noise filter to simulate paper grain.

## Typography

The typographic hierarchy mimics an editorial layout. 

- **Headlines**: Use **Newsreader** for an elegant, literary feel. Its serif terminals provide the "book-like" quality requested.
- **Body**: **Be Vietnam Pro** offers a clean, contemporary sans-serif balance that ensures readability across long-form essays without feeling too corporate.
- **Technical/Mono**: **Space Grotesk** is used for metadata, dates, and technical snippets, providing a modern "typewriter" contrast.
- **Annotations**: **Caveat** is reserved for margin notes, witty asides, and decorative accents. These should often be slightly rotated (1-2 degrees) to mimic natural handwriting.

## Layout & Spacing

The design system utilizes a **Fixed-Width Editorial Grid**. The main content column is centered and constrained (max-width: 720px) to mirror the dimensions of a physical journal page. 

Sidebars are "asymmetric," reserved for handwritten annotations or "Polaroid" images that break the grid. Spacing is generous; vertical rhythm follows a "Stack" model where sections are separated by significant whitespace (`stack-xl`) to allow the narrative to breathe. Margins are fluid at the edge of the viewport but lock into a centered column on larger screens.

## Elevation & Depth

This system avoids traditional material shadows. Instead, it uses **Tonal Layers** and **Physical Stacking**:

1.  **Level 0 (The Desk)**: A slightly darker, textured background (`#E6DFD1`).
2.  **Level 1 (The Notebook)**: The main content surface (`#F1EADB`) with a very fine 1px "page edge" border in a slightly darker tan.
3.  **Level 2 (The Accents)**: Sticky notes and Polaroids use a slightly more pronounced, soft-blur shadow (8% opacity charcoal) to appear "taped" or "placed" onto the page.

Depth is also communicated through "stacking" effects—where the edge of a previous "page" might be visible at the side of the viewport.

## Shapes

The shape language is "Soft" yet structured. 
- **Cards and Containers**: Use a subtle `0.25rem` radius to mimic the natural rounding of paper corners.
- **Sticky Notes**: Use `0px` (Sharp) on three sides with a slight irregular "curl" effect on one corner via CSS clip-path.
- **Polaroids**: Broad white borders (16px - 24px) around images with sharp corners, creating a distinct photographic silhouette.
- **Buttons**: Fully rounded (Pill) only for specific interactive elements like "Contact," otherwise rectangular to maintain the editorial vibe.

## Components

### Buttons & Inputs
Buttons should not look like "plastic." Use a "Stamp" style: a solid border-box with a slight textured fill. On hover, the primary red ink should "bleed" or saturate the button. Inputs are simple underlined fields, mimicking a lined notebook.

### Polaroid Image Frames
All blog imagery is wrapped in a thick white frame with a subtle "drop shadow" and a caption written in the **Caveat** font underneath. Images should be slightly rotated (-1 to +1 degrees) to feel tossed onto the desk.

### Sticky Note Accents
Used for "TL;DR" sections or witty asides. These are `#F2D03B` blocks with a slight grain. Use the **Caveat** font for text within these blocks.

### Hand-Drawn Underlines
Important links or emphasized text should use an SVG mask that looks like a red ink stroke (`#C8362B`). This stroke should animate from left to right on hover.

### Page Transitions
Navigating between articles should utilize a "Horizontal Slide" or "Page Flip" transition rather than a standard fade, reinforcing the notebook metaphor.