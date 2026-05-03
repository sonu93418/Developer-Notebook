# Blog System Documentation

## Overview
This blog system provides a structured way to create individual blog pages with proper routing, animations, and styling consistent with the main Scribbler's Journal design.

## Folder Structure

```
journalist_narrative/
├── blogs/
│   ├── index.html                    # Blog listing/archive page
│   ├── blog-styles.css              # Blog-specific CSS
│   ├── blog-animation.js            # Blog animation handling
│   ├── blog-template.html           # Template file (reference)
│   ├── getting-started-web-dev.html # Individual blog post
│   ├── javascript-async-await.html  # Individual blog post
│   ├── css-animations-guide.html    # Individual blog post
│   └── assets/                      # Blog-specific images/assets
└── index.html                        # Main journal page
```

## How to Create a New Blog Post

### Step 1: Create HTML File
Create a new `.html` file in the `blogs/` folder following this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Blog Title - The Scribbler's Journal</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&family=Caveat:wght@400;600&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600;6..72,700&family=Orbitron:wght@500;700&family=Permanent+Marker&family=Press+Start+2P&family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles.css">
  <link rel="stylesheet" href="blog-styles.css">
</head>
<body>
  <div class="blog-post-container">
    <!-- Your blog content here -->
  </div>
  <script src="blog-animation.js"></script>
</body>
</html>
```

### Step 2: Update Blog Index
Add your blog post to the `blogs/index.html` file:

1. Add entry to the `blogs` array:
```javascript
{
  id: 'your-blog-slug',
  title: 'Your Blog Title',
  date: 'Month DD, YYYY',
  excerpt: 'A brief description of your blog post',
  tags: ['Tag1', 'Tag2', 'Tag3'],
  author: 'The Developer'
}
```

2. The blog card link will automatically generate from the ID: `your-blog-slug.html`

## Features

### Page Animations
- **Entrance Animation**: Pages fade in and slide from the right
- **Exit Animation**: Pages slide left and fade out
- **Staggered Content**: Elements animate in sequence for visual impact
- **Smooth Transitions**: All animations use GPU-accelerated transforms

### Navigation
- **Back to Blog**: Returns to the blog listing page
- **Back to Journal**: Returns to the main journal
- **Previous/Next Navigation**: Easily browse between posts
- **Keyboard Support**: Alt+Left/Right arrow for navigation

### Styling
- Consistent with the Scribbler's Journal design
- Responsive layout for mobile devices
- Code highlighting with syntax colors
- Beautiful typography using Google Fonts

### Accessibility
- Semantic HTML structure
- ARIA labels for navigation
- Keyboard navigation support
- High contrast text

## Customization

### Adding Custom Animations
Edit `blog-animation.js` to modify:
- Animation duration: `this.animationDuration = 600;`
- Animation styles: Edit the `injectAnimationStyles()` function
- Stagger delay: Modify `staggerAnimateElements()` method

### Styling
Update `blog-styles.css` to change:
- Colors: Modify CSS custom properties
- Fonts: Change `font-family` values
- Spacing: Adjust `margin` and `padding` values
- Border styles: Modify `border` and `border-radius`

## Blog Content Structure

Each blog post should follow this structure:

```html
<div class="blog-post-container">
  <div class="blog-post-header">
    <h1 class="blog-post-title">Your Title</h1>
    <div class="blog-post-meta">
      <!-- Date, author, read time -->
    </div>
    <div class="blog-post-tags">
      <!-- Tags -->
    </div>
  </div>

  <div class="blog-post-content">
    <h2>Section 1</h2>
    <p>Your content here...</p>
    <h3>Subsection</h3>
    <pre><code>// Code examples</code></pre>
  </div>

  <div class="blog-navigation">
    <a href="index.html" class="nav-button prev">Back to Blog</a>
    <a href="../index.html" class="nav-button next">Back to Journal</a>
  </div>
</div>
```

## Supported Content Elements

- **Headers**: h1, h2, h3 with automatic styling
- **Text**: Paragraphs with proper line height
- **Lists**: Ordered (ol) and unordered (ul) lists
- **Code**: Inline code with syntax highlighting
- **Code Blocks**: Pre-formatted code blocks with styling
- **Blockquotes**: Styled quote blocks
- **Images**: Responsive images with shadow effects
- **Meta Information**: Date, author, read time

## Performance Tips

1. **Images**: Optimize and compress images before adding
2. **Code Blocks**: Keep code examples concise
3. **Animations**: Animations are GPU-accelerated and performant
4. **Mobile**: Test on mobile devices for responsive behavior

## Accessibility Features

- Semantic HTML (`<article>`, `<main>`, `<section>`)
- ARIA labels on interactive elements
- Keyboard navigation support
- Respects `prefers-reduced-motion` preference
- High contrast text for readability

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Adding Blog Link to Main Journal

To add a blog link to the main journal navigation:

1. Edit `journalist_narrative/index.html`
2. Add a blog navigation item:

```html
<a href="blogs/index.html" class="blog-link" target="_blank">Blogs</a>
```

Or update the table of contents to include:

```html
<li>
  <span class="seq">S05</span>
  <a href="blogs/index.html" type="button">Blogs</a>
  <span class="toc-note">• articles</span>
</li>
```

## Common Issues

### Animations not working
- Ensure `blog-animation.js` is included: `<script src="blog-animation.js"></script>`
- Check CSS is imported: `<link rel="stylesheet" href="blog-styles.css">`

### Styling not applied
- Verify CSS file paths are correct
- Ensure `blog-styles.css` and parent `styles.css` are linked
- Check browser developer console for 404 errors

### Navigation not working
- Verify file names match blog ID in index.html
- Check that all HTML files are in the `blogs/` folder
- Ensure back links use correct paths

## Creating a Blog Post Template

Copy one of the existing blog posts (e.g., `getting-started-web-dev.html`) and modify:
1. Title and meta information
2. Blog content (h2, h3, paragraphs, code blocks)
3. Add entry to `blogs/index.html` index

## Advanced: Dynamic Blog Loading

For future enhancement, you can create a JSON-based blog system:

1. Create a `blogs-data.json` file with all blog metadata
2. Load posts dynamically using JavaScript
3. Generate blog cards and content from JSON data

This would enable:
- Centralized blog management
- Easier multi-language support
- Dynamic search functionality
- Tag-based filtering
