const app = document.querySelector('.journal-app');
const openBookButton = document.getElementById('openBook');
const backCoverButton = document.getElementById('backCover');
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const spreadPages = Array.from(document.querySelectorAll('.spread-page'));
const tocButtons = Array.from(document.querySelectorAll('.toc-list button[data-target]'));
const newEntryButton = document.getElementById('newEntry');
const contactForm = document.getElementById('contactForm');

const pageOrder = ['index', 'archive', 'marginalia', 'colophon'];
const OPEN_DURATION_MS = 1700;
const CLOSE_DURATION_MS = 1450;
let currentPage = 'index';
let isAnimating = false;

function setActiveNav(target) {
  navItems.forEach((item) => {
    item.classList.toggle('is-active', item.dataset.target === target);
  });
}

function setActivePage(target) {
  if (isAnimating) return;
  if (target === currentPage) return;

  const current = spreadPages.find((page) => page.dataset.page === currentPage);
  const next = spreadPages.find((page) => page.dataset.page === target);
  if (!current || !next) return;

  current.classList.add('exit-left');
  next.classList.add('enter-right');

  requestAnimationFrame(() => {
    current.classList.remove('is-active');
    next.classList.add('is-active');
    next.classList.remove('enter-right');
  });

  setTimeout(() => {
    current.classList.remove('exit-left');
  }, 360);

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

  setTimeout(() => {
    app.dataset.state = 'book';
    app.dataset.opening = 'false';
    openBookButton.disabled = false;
    backCoverButton.disabled = false;
    isAnimating = false;
  }, OPEN_DURATION_MS);
}

function closeBookWithAnimation() {
  if (app.dataset.state !== 'book' || isAnimating) return;
  isAnimating = true;
  app.dataset.closing = 'true';
  app.dataset.opening = 'false';
  backCoverButton.disabled = true;

  setTimeout(() => {
    app.dataset.state = 'cover';
    app.dataset.closing = 'false';
    backCoverButton.disabled = false;
    isAnimating = false;
    resetToIndexPage();
  }, CLOSE_DURATION_MS);
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