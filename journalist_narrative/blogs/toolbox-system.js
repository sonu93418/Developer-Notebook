/**
 * OPTIMIZED TOOLBOX SYSTEM
 * - Uses event delegation (single listener, not many)
 * - Includes debounce protection against rapid clicks
 * - Configurable animation timing
 * - Proper error handling
 */

const ToolboxConfig = {
  tools: {
    js: { id: 'javascript-guide', title: 'JavaScript' },
    ts: { id: 'typescript-guide', title: 'TypeScript' },
    react: { id: 'react-guide', title: 'React' },
    nodejs: { id: 'nodejs-guide', title: 'Node.js' },
    python: { id: 'python-guide', title: 'Python' },
    postgresql: { id: 'postgresql-guide', title: 'PostgreSQL' },
    tailwind: { id: 'tailwind-guide', title: 'Tailwind CSS' }
  },

  abbreviationMap: {
    'js': 'js', 'ts': 'ts', 're': 'react',
    'nd': 'nodejs', 'py': 'python', 'ps': 'postgresql', 'tw': 'tailwind'
  },

  getBlogUrl: (toolKey) => {
    const tool = ToolboxConfig.tools[toolKey];
    return tool ? `blogs/${tool.id}.html` : null;
  }
};

class ToolboxManager {
  constructor(animationDuration = 500) {
    this.animationDuration = animationDuration;
    this.lastClickTime = 0;
    this.container = null;
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.injectStyles();
    document.addEventListener('click', (e) => this.handleClick(e), false);
    document.addEventListener('keydown', (e) => this.handleKeydown(e), false);
  }

  injectStyles() {
    const styleId = 'toolbox-animation-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes fadeOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.95); } }
      .fade-out { animation: fadeOut 0.5s ease-out forwards; }
      .tool { cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); user-select: none; }
      .tool:not(.muted):hover { transform: scale(1.05); }
      .tool.muted { cursor: not-allowed; opacity: 0.5; }
    `;
    document.head.appendChild(style);
  }

  handleClick(e) {
    const tool = e.target.closest('.tool:not(.muted)');
    if (!tool) return;
    this.navigate(tool);
  }

  handleKeydown(e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const tool = e.target.closest('.tool:not(.muted)');
    if (!tool) return;
    e.preventDefault();
    this.navigate(tool);
  }

  navigate(toolElement) {
    const now = Date.now();
    if (now - this.lastClickTime < 600) return;
    this.lastClickTime = now;

    try {
      const toolText = toolElement.querySelector('strong')?.textContent?.toLowerCase().trim();
      if (!toolText) throw new Error('Tool text not found');

      const toolKey = ToolboxConfig.abbreviationMap[toolText];
      if (!toolKey) throw new Error(`Unknown tool: ${toolText}`);

      const url = ToolboxConfig.getBlogUrl(toolKey);
      if (!url) throw new Error(`No blog URL for: ${toolKey}`);

      this.navigateWithAnimation(url);
    } catch (error) {
      console.error('[Toolbox]', error);
      this.lastClickTime = 0;
    }
  }

  navigateWithAnimation(url) {
    const main = document.querySelector('main, body, .page-content');
    if (main) main.classList.add('fade-out');

    setTimeout(() => {
      window.location.href = url;
    }, this.animationDuration);
  }
}

try {
  window.toolboxManager = new ToolboxManager();
} catch (error) {
  console.error('[Toolbox] Initialization failed:', error);
}
