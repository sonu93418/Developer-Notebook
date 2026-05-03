/**
 * OPTIMIZED BLOG ANIMATION MODULE
 * - Configurable DOM selectors (not hardcoded)
 * - Caches DOM queries
 * - Consistent animation timing
 * - Better performance (no unnecessary reflows)
 */

class BlogAnimationManager {
  // Configurable selectors
  static selectors = {
    container: '.blog-post-container, .blog-archive',
    staggerElements: '.blog-post-header, .blog-post-content h2, .blog-tag'
  };

  // Configurable timing
  static timing = {
    entrance: { duration: 800, easing: 'ease-out' },
    exit: { duration: 500, easing: 'ease-in' },
    staggerDelay: 100,
    staggerDuration: 600
  };

  constructor() {
    this.isAnimating = false;
    this.containerCache = null;
    this.init();
  }

  init() {
    // Cache container for performance
    this.containerCache = document.querySelector(BlogAnimationManager.selectors.container);
    if (!this.containerCache) return;

    // Inject styles once
    this.injectAnimationStyles();

    // Setup handlers
    this.setupPageVisibility();
    this.setupNavigationLinks();
    this.triggerEntranceAnimation();
    this.setupKeyboardNavigation();
  }

  static injectAnimationStyles() {
    const styleId = 'blog-animation-styles';
    if (document.getElementById(styleId)) return; // Already injected

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes pageEnter { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
      @keyframes pageExit { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(-30px); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    `;
    document.head.appendChild(style);
  }

  injectAnimationStyles() {
    BlogAnimationManager.injectAnimationStyles();
  }

  setupPageVisibility() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.triggerEntranceAnimation();
      }
    });
  }

  setupNavigationLinks() {
    // Use event delegation for better performance
    document.addEventListener('click', (e) => {
      const link = e.target.closest('.nav-button, a[href$=".html"]');
      if (!link || link.target === '_blank' || link.href?.includes('#')) return;
      
      if (!this.isAnimating) {
        this.triggerExitAnimation();
      }
    }, false);
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (!e.altKey) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); window.history.back(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); window.history.forward(); }
    });
  }

  triggerEntranceAnimation() {
    const container = this.containerCache || document.querySelector(BlogAnimationManager.selectors.container);
    if (!container) return;

    const { duration, easing } = BlogAnimationManager.timing.entrance;
    container.style.animation = `pageEnter ${duration}ms ${easing} forwards`;
    
    // Stagger child elements
    this.staggerAnimateElements();
  }

  triggerExitAnimation() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const container = this.containerCache;
    if (!container) {
      this.isAnimating = false;
      return;
    }

    const { duration, easing } = BlogAnimationManager.timing.exit;
    container.style.animation = `pageExit ${duration}ms ${easing} forwards`;

    setTimeout(() => {
      this.isAnimating = false;
    }, duration);
  }

  staggerAnimateElements() {
    const elements = document.querySelectorAll(BlogAnimationManager.selectors.staggerElements);
    const { staggerDelay, staggerDuration } = BlogAnimationManager.timing;

    elements.forEach((element, index) => {
      const delay = index * staggerDelay;
      element.style.animation = `fadeIn ${staggerDuration}ms ease-out ${delay}ms forwards`;
    });
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

function initializeBlogAnimations() {
  try {
    BlogAnimationManager.injectAnimationStyles();
    window.blogAnimationManager = new BlogAnimationManager();
    
    // Smooth scroll to top after load
    window.addEventListener('load', () => {
      if (window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // Handle browser back button
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        window.blogAnimationManager?.triggerEntranceAnimation();
      }
    });
  } catch (error) {
    console.error('[Blog Animation] Initialization failed:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeBlogAnimations);
} else {
  initializeBlogAnimations();
}
