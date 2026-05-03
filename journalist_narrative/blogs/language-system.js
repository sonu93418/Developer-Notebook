/**
 * English Only Language System
 * Simplified for English language support
 */

const LanguageConfig = {
  language: 'en',
  
  getCurrentLanguage() {
    return 'en';
  },

  setLanguage(lang) {
    return 'en';
  },

  getBlogUrl(lang = null) {
    return 'blogs/index.html';
  },

  getBlogPostUrl(postId, lang = null) {
    return `blogs/${postId}.html`;
  }
};

/**
 * Language Selector - Disabled (English only)
 */
class LanguageSelectorManager {
  constructor() {
    this.currentLanguage = 'en';
    // Language selector disabled for English only mode
  }
}

/**
 * Language Navigator - Disabled (English only)
 */
class BlogLanguageNavigator {
  constructor() {
    this.currentLanguage = 'en';
    // Language navigator disabled for English only mode
  }
}

/**
 * Initialize language system when DOM is ready
 */
function initializeLanguageSystem() {
  // Language system initialized but disabled (English only)
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeLanguageSystem);
} else {
  initializeLanguageSystem();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LanguageConfig, LanguageSelectorManager, BlogLanguageNavigator };
}
