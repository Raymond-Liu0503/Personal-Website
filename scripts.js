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
  const art = document.querySelector('.hero-art');
  let springReady;
  let currentTheme = 'career';
  let scrollRestoreFrame = 0;

  const main = document.querySelector('.page-body');
  const intro = document.getElementById('about');
  const portfolio = document.getElementById('portfolio');
  const footer = document.getElementById('contact');
  const entrances = new Set();

  function visible(element) {
    const { top, bottom, left, right } = element.getBoundingClientRect();
    return bottom > 0 && top < innerHeight && right > 0 && left < innerWidth;
  }

  function cancelEntrances() {
    entrances.forEach(animation => animation.cancel());
    entrances.clear();
  }
  reducedMotion.addEventListener('change', cancelEntrances);

  function revealVisibleContent(collection) {
    const pieces = collection.querySelectorAll('.section-heading, .timeline-item, .project-card, .gallery-tools, .gallery-item');
    // Measure first. Never promote the entire timeline or scrollable wall to a layer.
    for (const element of [about, ...pieces].filter(visible)) {
      const animation = element.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 240, easing: 'ease-out' });
      entrances.add(animation);
      animation.onfinish = () => entrances.delete(animation);
    }
  }

  async function showSeason(personal, animate) {
    if (personal && !springReady) {
      art.append(document.getElementById('spring-art').content.cloneNode(true));
      const image = art.querySelector('.spring-scene img');
      // Keep autumn visible while the first spring frame is loading.
      springReady = new Promise(resolve => {
        if (image.complete && image.naturalWidth) resolve();
        else {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        }
      });
    }
    if (personal) await springReady;
    if (personal !== (currentTheme === 'personal')) return;
    const bounds = art.getBoundingClientRect();
    root.classList.toggle('turn-season', animate && bounds.bottom > 0 && bounds.top < innerHeight);
    root.classList.toggle('show-spring', personal && art.querySelector('.spring-scene img').naturalWidth > 0);
    document.getElementById('season-label').textContent = personal ? 'Spring' : 'Autumn';
  }

  function setTheme(theme, animate) {
    if (theme === currentTheme) return;
    const scrollY = window.scrollY;
    const bottomGap = root.scrollHeight - innerHeight - scrollY;
    const readingFooter = footer.getBoundingClientRect().top < innerHeight / 2 || bottomGap <= 1;
    const portfolioOffset = -portfolio.getBoundingClientRect().top;
    const blend = animate && !reducedMotion.matches;
    root.classList.toggle('blend-rail', blend);
    cancelEntrances();
    main.classList.toggle('blend-paper', blend && visible(intro));
    intro.classList.toggle('blend-ink', blend && visible(intro));
    footer.classList.toggle('blend-ink', blend && visible(footer));
    const personal = theme === 'personal';
    currentTheme = theme;
    showSeason(personal, animate);

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
    document.getElementById('github-icon').src = personal ? 'media/github-mark.png' : 'media/github-mark-white.png';
    document.querySelector('meta[name="theme-color"]').content = personal ? '#f6f2e9' : '#211e19';

    // Restore the reading position when switching between collections of different heights.
    cancelAnimationFrame(scrollRestoreFrame);
    scrollRestoreFrame = requestAnimationFrame(() => {
      const maximum = Math.max(0, root.scrollHeight - window.innerHeight);
      let target = scrollY;
      if (readingFooter) target = maximum - bottomGap;
      else if (portfolioOffset > 0) {
        // Keep a reader in the collection when a long timeline becomes a single gallery wall.
        target = portfolio.getBoundingClientRect().top + window.scrollY +
          Math.min(portfolioOffset, Math.max(0, portfolio.offsetHeight - innerHeight));
      }
      window.scrollTo({ top: Math.max(0, Math.min(target, maximum)), behavior: 'instant' });
      if (blend && !reducedMotion.matches) revealVisibleContent(personal ? personalContent : careerContent);
    });
  }

  buttons.forEach(button => button.addEventListener('click', event => setTheme(button.dataset.theme, event.detail > 0)));

  const wall = document.getElementById('photo-wall');
  const previous = document.getElementById('gallery-prev');
  const next = document.getElementById('gallery-next');

  function updateGalleryControls() {
    previous.disabled = wall.scrollLeft <= 1;
    next.disabled = wall.scrollLeft >= wall.scrollWidth - wall.clientWidth - 1;
  }

  function moveAlongWall(direction) {
    const stops = Array.from(wall.children, print => print.offsetLeft);
    const target = direction > 0
      ? stops.find(x => x > wall.scrollLeft + 1)
      : stops.reverse().find(x => x < wall.scrollLeft - 1);
    wall.scrollTo({ left: target ?? (direction > 0 ? wall.scrollWidth : 0),
      behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }

  previous.addEventListener('click', () => moveAlongWall(-1));
  next.addEventListener('click', () => moveAlongWall(1));
  wall.addEventListener('scroll', updateGalleryControls, { passive: true });
  new ResizeObserver(updateGalleryControls).observe(wall);
})();
