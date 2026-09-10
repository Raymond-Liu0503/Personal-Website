(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const about = document.getElementById('about-content');
  const careerAbout = about.innerHTML;
  const personalAbout = document.getElementById('personal-about');
  const careerContent = document.getElementById('career-content');
  const personalContent = document.getElementById('personal-content');
  const buttons = document.querySelectorAll('[data-theme]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktopPointer = window.matchMedia('(min-width: 761px) and (hover: hover) and (pointer: fine)');
  const hero = document.querySelector('.header');
  const springPicture = document.querySelector('.spring-landscape');
  let currentTheme = 'career';
  let frame = 0;
  let scrollRestoreFrame = 0;

  // Prepare the alternate scene after the primary artwork, or immediately on selection.
  function prepareSpring() {
    const source = springPicture.querySelector('source');
    const image = springPicture.querySelector('img');
    if (source.dataset.srcset) {
      source.srcset = source.dataset.srcset;
      delete source.dataset.srcset;
    }
    if (image.dataset.src) {
      image.src = image.dataset.src;
      delete image.dataset.src;
    }
  }

  function setTheme(theme) {
    if (theme === currentTheme) return;
    const scrollY = window.scrollY;
    const personal = theme === 'personal';
    if (personal) prepareSpring();
    currentTheme = theme;

    for (const element of [root, body]) {
      element.classList.toggle('light-theme', personal);
      element.classList.toggle('dark-theme', !personal);
    }
    careerContent.hidden = personal;
    personalContent.hidden = !personal;
    if (personal) {
      about.replaceChildren(personalAbout.content.cloneNode(true));
    } else {
      about.innerHTML = careerAbout;
    }
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.theme === theme)));
    document.getElementById('work-link').textContent = personal ? 'My life' : 'My work';
    document.getElementById('season-label').textContent = personal
      ? 'Spring'
      : 'Autumn';
    document.getElementById('github-icon').src = personal ? 'media/github-mark.png' : 'media/github-mark-white.png';
    document.querySelector('meta[name="theme-color"]').content = personal ? '#f6f2e9' : '#211e19';

    // The collections have different heights. Restore without smooth scrolling or body locks.
    cancelAnimationFrame(scrollRestoreFrame);
    scrollRestoreFrame = requestAnimationFrame(() => {
      const maximum = Math.max(0, root.scrollHeight - window.innerHeight);
      window.scrollTo({ top: Math.min(scrollY, maximum), behavior: 'instant' });
      updateParallax();
    });
  }

  buttons.forEach(button => button.addEventListener('click', () => setTheme(button.dataset.theme)));

  function updateParallax() {
    frame = 0;
    const enabled = !reducedMotion.matches && desktopPointer.matches;
    const offset = enabled ? Math.min(window.scrollY, hero.offsetHeight) * .035 : 0;
    root.style.setProperty('--scene-offset', `${Math.min(offset, 28)}px`);
  }

  function scheduleParallax() {
    if (!frame) frame = requestAnimationFrame(updateParallax);
  }

  // One passive scroll listener; artwork moves independently of layout and content.
  window.addEventListener('scroll', scheduleParallax, { passive: true });
  window.addEventListener('resize', scheduleParallax, { passive: true });
  reducedMotion.addEventListener('change', scheduleParallax);
  desktopPointer.addEventListener('change', scheduleParallax);

  const foliage = document.querySelector('.falling-foliage');
  const leaf = '<svg class="leaf-art" viewBox="0 0 30 36"><path d="m15 2 4 8 6-3-2 9 6 3-9 7-4-1-2 9-2-1 2-9-9-4 5-5-5-7 8 3Z" fill="#c79550"/><path d="m14 27 2-19m-2 14-5-6m6 1 6-4" fill="none" stroke="#82502f" stroke-width=".9"/></svg>';
  const petal = '<svg class="petal-art" viewBox="0 0 24 32"><path d="M11 30C-3 17 1 4 8 2l4 3 4-3c12 6 5 23-5 28Z" fill="#e4afaf"/><path d="M11 27Q8 12 12 6" fill="none" stroke="#f6d6d0" stroke-width="1.2"/></svg>';
  for (let i = 0; i < 9; i++) {
    const particle = document.createElement('span');
    particle.className = 'foliage';
    particle.style.cssText = `--x:${8 + (i * 29) % 86}%;--size:${11 + (i % 4) * 3}px;--duration:${20 + i * 2}s;--delay:-${i * 5 + 3}s`;
    particle.innerHTML = leaf + petal;
    foliage.append(particle);
  }

  // No ongoing scene work when the tab is in the background.
  document.addEventListener('visibilitychange', () => {
    foliage.querySelectorAll('.foliage').forEach(particle => {
      particle.style.animationPlayState = document.hidden ? 'paused' : 'running';
    });
  });

  if (document.readyState === 'complete') prepareSpring();
  else window.addEventListener('load', prepareSpring, { once: true });
  updateParallax();
})();
