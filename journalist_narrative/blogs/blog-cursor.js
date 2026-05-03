/**
 * Blog Cursor Module
 * Adds the custom cursor to blog pages and the blog archive.
 */

(function initializeBlogCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (document.querySelector('.page-cursor')) return;

  const cursor = document.createElement('div');
  cursor.className = 'page-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = `
    <span class="page-cursor-dot"></span>
    <span class="page-cursor-pencil" aria-hidden="true">
      <svg viewBox="0 0 64 64" focusable="false" aria-hidden="true">
        <path d="M11 45l-2 9 9-2 28-28-7-7L11 45z" fill="currentColor"></path>
        <path d="M43 17l7 7 4-4-7-7-4 4z" fill="currentColor"></path>
      </svg>
    </span>
  `;

  document.body.appendChild(cursor);

  let cursorX = -100;
  let cursorY = -100;
  let frameId = 0;
  let isVisible = false;

  const render = () => {
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    frameId = 0;
  };

  const showCursor = () => {
    if (!isVisible) {
      cursor.classList.add('is-visible');
      cursor.classList.add('is-pencil');
      isVisible = true;
    }
  };

  const moveCursor = (x, y) => {
    cursorX = x;
    cursorY = y;
    showCursor();

    if (!frameId) {
      frameId = window.requestAnimationFrame(render);
    }
  };

  document.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return;
    moveCursor(event.clientX, event.clientY);
  });

  document.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') return;
    cursor.classList.add('is-pencil');
  });

  document.addEventListener('pointerup', () => {
    cursor.classList.add('is-pencil');
  });

  document.addEventListener('pointerleave', () => {
    cursor.classList.remove('is-visible');
    isVisible = false;
  });

  window.addEventListener('blur', () => {
    cursor.classList.remove('is-visible');
    isVisible = false;
  });
})();
