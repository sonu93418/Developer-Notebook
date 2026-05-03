/**
 * Toolbox Routing System
 * Handles clicking on toolbox items and navigating to blog pages
 */

const ToolboxConfig = {
  tools: {
    js: {
      id: 'javascript-guide',
      title: 'JavaScript',
      full: 'JAVASCRIPT',
      icon: 'JS',
      color: '#F7DF1E',
      description: 'A versatile programming language for web, server, and application development'
    },
    ts: {
      id: 'typescript-guide',
      title: 'TypeScript',
      full: 'TYPESCRIPT',
      icon: 'TS',
      color: '#3178C6',
      description: 'JavaScript with syntax for types - brings type safety and better tooling'
    },
    react: {
      id: 'react-guide',
      title: 'React',
      full: 'REACT',
      icon: 'RE',
      color: '#61DAFB',
      description: 'A JavaScript library for building interactive user interfaces with components'
    },
    nodejs: {
      id: 'nodejs-guide',
      title: 'Node.js',
      full: 'NODE.JS',
      icon: 'ND',
      color: '#339933',
      description: 'Runtime environment for executing JavaScript outside the browser'
    },
    python: {
      id: 'python-guide',
      title: 'Python',
      full: 'PYTHON',
      icon: 'PY',
      color: '#3776AB',
      description: 'A powerful, readable programming language for backend and data science'
    },
    postgresql: {
      id: 'postgresql-guide',
      title: 'PostgreSQL',
      full: 'POSTGRESQL',
      icon: 'PS',
      color: '#336791',
      description: 'Advanced open-source relational database with powerful features'
    },
    tailwind: {
      id: 'tailwind-guide',
      title: 'Tailwind CSS',
      full: 'TAILWIND',
      icon: 'TW',
      color: '#06B6D4',
      description: 'Utility-first CSS framework for rapidly building custom designs'
    }
  },

  getBlogUrl(toolKey) {
    const tool = this.tools[toolKey];
    if (tool) {
      return `blogs/${tool.id}.html`;
    }
    return 'blogs/index.html';
  },

  getTool(toolKey) {
    return this.tools[toolKey] || null;
  }
};

/**
 * Toolbox Manager
 * Handles toolbox interactions and navigation
 */
class ToolboxManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupToolboxListeners();
    this.enhanceToolboxUI();
  }

  /**
   * Setup click listeners on toolbox items
   */
  setupToolboxListeners() {
    const tools = document.querySelectorAll('.tool:not(.muted)');
    
    tools.forEach(tool => {
      // Add cursor pointer
      tool.style.cursor = 'pointer';
      tool.setAttribute('role', 'button');
      tool.setAttribute('tabindex', '0');

      // Click handler
      tool.addEventListener('click', (e) => {
        this.handleToolClick(e, tool);
      });

      // Keyboard handler
      tool.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleToolClick(e, tool);
        }
      });

      // Hover effects
      tool.addEventListener('mouseenter', () => {
        tool.style.transform = 'scale(1.05) translateY(-5px)';
        tool.style.boxShadow = '0 8px 16px rgba(200, 54, 43, 0.2)';
      });

      tool.addEventListener('mouseleave', () => {
        tool.style.transform = 'scale(1) translateY(0)';
        tool.style.boxShadow = '0 2px 4px rgba(31, 25, 20, 0.1)';
      });
    });
  }

  /**
   * Handle tool click event
   */
  handleToolClick(e, tool) {
    e.preventDefault();
    
    const toolText = tool.querySelector('strong')?.textContent?.toLowerCase();
    if (!toolText) return;

    // Map tool text to config key
    const toolKey = this.getToolKey(toolText);
    if (!toolKey) return;

    // Get blog URL
    const blogUrl = ToolboxConfig.getBlogUrl(toolKey);

    // Trigger exit animation and navigate
    this.navigateWithAnimation(blogUrl);
  }

  /**
   * Map tool text to config key
   */
  getToolKey(text) {
    const mapping = {
      'js': 'js',
      'ts': 'ts',
      're': 'react',
      'nd': 'nodejs',
      'py': 'python',
      'ps': 'postgresql',
      'tw': 'tailwind'
    };
    return mapping[text] || null;
  }

  /**
   * Navigate with smooth animation
   */
  navigateWithAnimation(url) {
    // Add fade-out animation
    const app = document.querySelector('.journal-app');
    if (app) {
      app.style.animation = 'fadeOut 0.5s ease-out forwards';
      setTimeout(() => {
        window.location.href = url;
      }, 500);
    } else {
      window.location.href = url;
    }
  }

  /**
   * Enhance toolbox UI with visual feedback
   */
  enhanceToolboxUI() {
    const toolGrid = document.querySelector('.tool-grid');
    if (!toolGrid) return;

    // Add smooth transitions to all tools
    const tools = toolGrid.querySelectorAll('.tool');
    tools.forEach(tool => {
      tool.style.transition = 'all 0.3s ease';
      tool.style.position = 'relative';
    });
  }
}

/**
 * Initialize toolbox system when DOM is ready
 */
function initializeToolboxSystem() {
  if (document.querySelector('.tool-grid')) {
    window.toolboxManager = new ToolboxManager();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeToolboxSystem);
} else {
  initializeToolboxSystem();
}

// Add animation styles
function injectToolboxStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.95);
      }
    }

    .tool {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }

    .tool:not(.muted):hover {
      border-color: var(--oxblood) !important;
    }
  `;

  if (!document.querySelector('style[data-toolbox]')) {
    style.setAttribute('data-toolbox', 'true');
    document.head.appendChild(style);
  }
}

// Inject styles immediately
injectToolboxStyles();
