const app = document.querySelector('.journal-app');
const openBookButton = document.getElementById('openBook');
const backCoverButton = document.getElementById('backCover');
const bookCover = document.getElementById('bookCover');
const navItems = Array.from(document.querySelectorAll('.book-nav .nav-item'));
const spreadPages = Array.from(document.querySelectorAll('.spread-page'));
const tocButtons = Array.from(document.querySelectorAll('.toc-list button[data-target]'));
const newEntryButton = document.getElementById('newEntry');
const contactForm = document.getElementById('contactForm');
const bookTopWatch = document.querySelector('.book-top-watch');
const pageCursor = document.querySelector('.page-cursor');

const pageOrder = ['index', 'archive', 'marginalia', 'colophon'];
const OPEN_DURATION_MS = getCssDurationMs('--open-ms', 1680);
const CLOSE_DURATION_MS = getCssDurationMs('--close-ms', 1420);
let currentPage = 'index';
let isAnimating = false;
let cursorX = 0;
let cursorY = 0;
let cursorReady = false;
let cursorFrame = 0;

const pencilTargets = 'a, button, input, textarea, select, [role="button"], .nav-item, .toc-list button, .open-book-btn, .back-cover, .new-entry, .social-link, .link-chip';

function setVisiblePages(visiblePages) {
  const visibleSet = new Set(visiblePages.filter(Boolean));
  spreadPages.forEach((page) => {
    page.hidden = !visibleSet.has(page);
  });
}

function initializePageState() {
  const activePage = spreadPages.find((page) => page.classList.contains('is-active'))
    || spreadPages.find((page) => page.dataset.page === 'index');

  spreadPages.forEach((page) => {
    const isActive = page === activePage;
    page.classList.toggle('is-active', isActive);
    page.classList.remove('exit-left', 'enter-right');
  });

  if (activePage) {
    setVisiblePages([activePage]);
    currentPage = activePage.dataset.page;
  } else {
    setVisiblePages([]);
  }

  setActiveNav(currentPage);
}

function getCssDurationMs(cssVarName, fallbackMs) {
  const value = getComputedStyle(app).getPropertyValue(cssVarName).trim();
  if (!value) return fallbackMs;

  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) return fallbackMs;
  if (value.endsWith('ms')) return parsed;
  if (value.endsWith('s')) return parsed * 1000;

  return fallbackMs;
}

function updateDigitalWatch() {
  if (!bookTopWatch) return;
  const now = new Date();
  const time = now.toLocaleTimeString('en-GB', { hour12: false });
  bookTopWatch.textContent = time;
}

function setCursorPosition(x, y) {
  if (!pageCursor) return;
  cursorX = x;
  cursorY = y;

  if (!cursorReady) {
    pageCursor.classList.add('is-visible');
    cursorReady = true;
  }

  if (cursorFrame) return;
  cursorFrame = window.requestAnimationFrame(() => {
    pageCursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    cursorFrame = 0;
  });
}

function setCursorPencilState(isPencil) {
  if (!pageCursor) return;
  pageCursor.classList.add('is-pencil');
}

function waitForCoverAnimation(animationName, fallbackMs, onDone) {
  if (!bookCover) {
    setTimeout(onDone, fallbackMs);
    return;
  }

  let isDone = false;
  const finish = () => {
    if (isDone) return;
    isDone = true;
    bookCover.removeEventListener('animationend', onAnimationEnd);
    onDone();
  };

  const onAnimationEnd = (event) => {
    if (event.target === bookCover && event.animationName === animationName) {
      finish();
    }
  };

  bookCover.addEventListener('animationend', onAnimationEnd);
  setTimeout(finish, fallbackMs + 140);
}

if (pageCursor) {
  pageCursor.classList.add('is-pencil');
  document.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    setCursorPosition(event.clientX, event.clientY);
    setCursorPencilState(true);
  });

  document.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') return;
    setCursorPencilState(true);
  });

  document.addEventListener('pointerup', () => {
    setCursorPencilState(true);
  });
}

function setActiveNav(target) {
  navItems.forEach((item) => {
    item.classList.toggle('is-active', item.dataset.target === target);
  });
}

function setActivePage(target) {
  if (isAnimating) return;
  if (target === currentPage) return;

  const next = spreadPages.find((page) => page.dataset.page === target);
  if (!next) return;

  spreadPages.forEach((page) => {
    page.classList.remove('is-active', 'exit-left', 'enter-right');
  });
  next.classList.add('is-active');
  setVisiblePages([next]);

  currentPage = target;
  setActiveNav(target);
}

function resetToIndexPage() {
  spreadPages.forEach((page) => {
    page.classList.remove('is-active', 'exit-left', 'enter-right');
  });

  const indexPage = spreadPages.find((page) => page.dataset.page === 'index');
  if (indexPage) {
    indexPage.classList.add('is-active');
    setVisiblePages([indexPage]);
  } else {
    setVisiblePages([]);
  }

  currentPage = 'index';
  setActiveNav('index');
}

function openBookWithAnimation() {
  if (app.dataset.state === 'book' || isAnimating) return;
  isAnimating = true;
  app.dataset.opening = 'true';
  app.dataset.closing = 'false';
  openBookButton.disabled = true;
  backCoverButton.disabled = true;

  waitForCoverAnimation('openCover', OPEN_DURATION_MS, () => {
    app.dataset.state = 'book';
    app.dataset.opening = 'false';
    app.dataset.closing = 'false';
    openBookButton.disabled = false;
    backCoverButton.disabled = false;
    isAnimating = false;
  });
}

function closeBookWithAnimation() {
  if (app.dataset.state !== 'book' || isAnimating) return;
  isAnimating = true;
  app.dataset.closing = 'true';
  app.dataset.opening = 'false';
  openBookButton.disabled = true;
  backCoverButton.disabled = true;

  waitForCoverAnimation('closeCover', CLOSE_DURATION_MS, () => {
    app.dataset.state = 'cover';
    app.dataset.closing = 'false';
    openBookButton.disabled = false;
    backCoverButton.disabled = false;
    isAnimating = false;
    resetToIndexPage();
  });
}

openBookButton.addEventListener('click', () => {
  openBookWithAnimation();
});

backCoverButton.addEventListener('click', () => {
  closeBookWithAnimation();
});

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    setActivePage(item.dataset.target);
  });
});

tocButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActivePage(button.dataset.target);
  });
});

newEntryButton.addEventListener('click', () => {
  const currentIndex = pageOrder.indexOf(currentPage);
  const nextIndex = (currentIndex + 1) % pageOrder.length;
  setActivePage(pageOrder[nextIndex]);
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.getElementById('entryText');
  input.value = '';
  input.placeholder = 'Entry archived in the margin. Thank you.';
});

initializePageState();
updateDigitalWatch();
setInterval(updateDigitalWatch, 1000);
