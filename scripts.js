let isLightTheme = false;
let mouseX = 0;
let mouseY = 0;

function toggleTheme() {
  const body = document.body;
  const sliderButton = document.querySelector(".slider-button");
  const careerContent = document.getElementById("career-content");
  const personalContent = document.getElementById("personal-content");
  const aboutContent = document.getElementById("about-content");

  isLightTheme = !isLightTheme;

  if (isLightTheme) {
    // Switch to light theme (Personal)
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    sliderButton.innerHTML = "🌸";

    // Switch content
    careerContent.style.display = "none";
    personalContent.style.display = "block";    // Update about text for personal theme
    aboutContent.innerHTML = `
                  Outside of my career, I have a bunch of hobbies I enjoy spending my time on, like photography, sports (Hockey, football, badminton, etc), travelling, and so many other spontaneous activities. I love exploring new places, capturing moments through my camera lens, and enjoying the thrill of outdoor adventures. Here are some snapshots of my personal life that reflect my passions and interests, and make sure to check out my <a href="https://www.instagram.com/raymliu_photography/profilecard/?igsh=MW00MWc4djhjaHFxcA==" class="instagram-link">photography page</a>!
              `;

    // Force update background elements visibility
    updateBackgroundElements('light');
  } else {
    // Switch to dark theme (Career)
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    sliderButton.innerHTML = "🍂";

    // Switch content
    careerContent.style.display = "block";
    personalContent.style.display = "none";

    // Update about text for career theme
    aboutContent.innerHTML = `
                  As a third-year Computer Science student at Carleton University with a minor in Statistics, 
                  I am passionate about developing impactful software on both the frontend and backend. 
                  I have a love for designing interactive and unique user interfaces, and I am always eager to 
                  learn new technologies and take on challenging projects.
              `;

  // Force update background elements visibility
    updateBackgroundElements('dark');
  }

  // Update theme color for mobile browsers
  updateThemeColorMeta();

  // Reset animations after theme change
  setTimeout(() => {
    initializeAnimations();
  }, 300);
}

// Function to update theme color meta tag for mobile
function updateThemeColorMeta() {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const isDark = document.body.classList.contains('dark-theme');
  
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isDark ? '#2c1810' : '#fdf2f8');
  }
}

// Function to update background elements visibility with mobile optimization
function updateBackgroundElements(theme) {
  const leaves = document.querySelectorAll('.leaf');
  const petals = document.querySelectorAll('.petal');
  const isMobile = window.innerWidth <= 768;

  // Reduce background element count on mobile for better performance
  const maxElements = isMobile ? 8 : 12;

  if (theme === 'light') {
    // Show petals, hide leaves
    petals.forEach((petal, index) => {
      if (index < maxElements) {
        petal.style.opacity = isMobile ? '0.5' : '0.7'; // Reduced opacity on mobile
        petal.style.display = 'block';
        // Reduce animation complexity on mobile
        if (isMobile) {
          petal.style.animationDuration = '20s'; // Slower animation
        }
      } else {
        petal.style.display = 'none';
      }
    });
    leaves.forEach(leaf => {
      leaf.style.opacity = '0';
      leaf.style.display = 'none';
    });
  } else {
    // Show leaves, hide petals
    leaves.forEach((leaf, index) => {
      if (index < maxElements) {
        leaf.style.opacity = isMobile ? '0.4' : '0.6'; // Reduced opacity on mobile
        leaf.style.display = 'block';
        // Reduce animation complexity on mobile
        if (isMobile) {
          leaf.style.animationDuration = '18s'; // Slower animation
        }
      } else {
        leaf.style.display = 'none';
      }
    });
    petals.forEach(petal => {
      petal.style.opacity = '0';
      petal.style.display = 'none';
    });
  }
}// Simple Polaroid Interactions - Enhanced Mobile Optimized
function initializePolaroidEffects() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;

  galleryItems.forEach((item, index) => {
    // Faster staggered reveal animation for mobile
    item.style.animationDelay = `${index * 0.08}s`; // Even faster for better mobile experience

    if (isMobile) {
      // Further optimized mobile interactions with less DOM manipulation
      let isPressed = false;
      
      item.addEventListener("touchstart", (e) => {
        if (!isPressed) {
          isPressed = true;
          item.style.transform = "scale(0.97) translateZ(0)"; // Using hardware acceleration
          item.style.transition = "transform 0.1s ease-out";
        }
      }, { passive: true });

      item.addEventListener("touchend", () => {
        if (isPressed) {
          isPressed = false;
          const rotation = item.style.getPropertyValue("--initial-rotation") || "0deg";
          item.style.transform = `rotate(${rotation}) translateZ(0)`;
          
          // Single timeout to reset styles
          setTimeout(() => {
            item.style.transition = "";
          }, 150);
        }
      }, { passive: true });

      // Handle touch cancel for better UX
      item.addEventListener("touchcancel", () => {
        if (isPressed) {
          isPressed = false;
          const rotation = item.style.getPropertyValue("--initial-rotation") || "0deg";
          item.style.transform = `rotate(${rotation}) translateZ(0)`;
          item.style.transition = "";
        }
      }, { passive: true });
    } else {
      // Desktop hover effects
      item.addEventListener("mouseenter", (e) => {
        item.style.transform = "rotate(0deg) scale(1.05) translateY(-10px)";
        item.style.zIndex = "10";
        item.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.2)";
      });

      item.addEventListener("mouseleave", () => {
        const rotation = item.style.getPropertyValue("--initial-rotation") || "0deg";
        item.style.transform = `rotate(${rotation}) translateZ(0)`;
        item.style.zIndex = "";
        item.style.boxShadow = "";
      });
    }

    // Simple click animation for both mobile and desktop
    item.addEventListener("click", () => {
      item.style.animation = "none";
      item.style.transform = "rotate(0deg) scale(1.05) translateY(-5px)";
      setTimeout(() => {
        item.style.animation = "";
        item.style.transform = "";
      }, 200); // Reduced timeout
    });
  });
}// Enhanced Timeline Animations
function initializeTimelineAnimations() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          // Add staggered animation for timeline content
          const content = entry.target.querySelector(".timeline-content");
          content.style.animation = "bounceIn 0.8s ease-out forwards";
        }
      });
    },
    { threshold: 0.3 }
  );

  timelineItems.forEach((item) => {
    timelineObserver.observe(item);
  });
}

// Simple Project Card Animations
function initializeProjectCard3DEffects() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    // Add staggered entrance animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.animation = `fadeInUp 0.6s ease-out forwards ${index * 0.1}s`;
    
    // Simple hover effects - no complex 3D or ripples
    card.addEventListener('mouseenter', (e) => {
      card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
    
    // Simple click animation
    card.addEventListener('click', (e) => {
      card.style.transform = 'translateY(-2px) scale(0.98)';
      
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
    });
  });
}

// Mouse tracking for global effects
function initializeMouseTracking() {
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update CSS custom properties for mouse position
    document.documentElement.style.setProperty("--mouse-x", mouseX + "px");
    document.documentElement.style.setProperty("--mouse-y", mouseY + "px");
  });
}

// Initialize all animations
function initializeAnimations() {
  console.log('🎭 InitializeAnimations called');
  initializePolaroidEffects();
  initializeTimelineAnimations();
  initializeProjectCard3DEffects(); // Call the new function
  initializeMouseTracking();
  console.log('🎯 About to call initializeInteractiveImage()');
  initializeInteractiveImage(); // Add interactive image effects
  console.log('✅ All animations initialized');
}

// Enhanced scroll effects
function initializeScrollEffects() {
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".bg-elements");
    const header = document.querySelector(".header");

    // Enhanced parallax for background elements
    if (parallax) {
      const speed = scrolled * 0.5;
      parallax.style.transform = `translateY(${speed}px)`;
    }

    // Header parallax effect
    if (header) {
      const headerParallax = scrolled * 0.3;
      header.style.transform = `translateY(${headerParallax}px)`;
    }

    // Update scroll progress
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollPercent = scrolled / (docHeight - winHeight);
    document.documentElement.style.setProperty(
      "--scroll-progress",
      scrollPercent
    );
  });
}

// Interactive About Image Effects - Ultra Mobile Optimized
function initializeInteractiveImage() {
  console.log('🎯 Initializing ultra-optimized interactive image...');
  
  const imageContainer = document.querySelector('.interactive-image-container');
  
  if (!imageContainer) {
    console.error('❌ Image container not found');
    return;
  }
  
  console.log('✅ Container found, setting up ultra-optimized animation...');
  
  const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
  
  if (isMobile) {
    // Ultra-simplified mobile interaction with minimal DOM manipulation
    let touchActive = false;
    
    imageContainer.addEventListener('touchstart', function(e) {
      if (!touchActive) {
        touchActive = true;
        // Use will-change to optimize for the transformation
        this.style.willChange = 'transform';
        this.style.transition = 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
        this.style.transform = 'rotate(-2deg) scale(1.02) translateZ(0)';
      }
    }, { passive: true });
    
    imageContainer.addEventListener('touchend', function() {
      if (touchActive) {
        touchActive = false;
        this.style.transform = 'rotate(-2deg) scale(1) translateZ(0)';
        // Remove will-change after animation
        setTimeout(() => {
          this.style.willChange = 'auto';
          this.style.transition = '';
        }, 200);
      }
    }, { passive: true });
    
    imageContainer.addEventListener('touchcancel', function() {
      if (touchActive) {
        touchActive = false;
        this.style.transform = 'rotate(-2deg) scale(1) translateZ(0)';
        this.style.willChange = 'auto';
        this.style.transition = '';
      }
    }, { passive: true });
  } else {
    // Optimized desktop mouse tilt animation with throttling
    let isHovering = false;
    let animationId = null;
    
    imageContainer.addEventListener('mouseenter', function() {
      console.log('🎯 Mouse entered - starting optimized tilt animation');
      isHovering = true;
      this.style.willChange = 'transform';
      this.style.transition = 'none';
    });
    
    imageContainer.addEventListener('mousemove', function(e) {
      if (!isHovering || animationId) return;
      
      // Throttle mousemove events
      animationId = requestAnimationFrame(() => {
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Calculate tilt angles - further reduced
        const rotateX = (mouseY / rect.height) * -8; // Reduced from -10
        const rotateY = (mouseX / rect.width) * 8;   // Reduced from 10
        
        // Apply optimized 3D transform
        this.style.transform = `
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          scale(1.02) 
          rotate(-2deg)
          translateZ(0)
        `;
        this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
        
        animationId = null;
      });
    });
    
    imageContainer.addEventListener('mouseleave', function() {
      console.log('👋 Mouse left - resetting optimized');
      isHovering = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      this.style.willChange = 'auto';
      this.style.transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'; // Faster, smoother transition
      this.style.transform = 'rotate(-2deg) translateZ(0)';
      this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.1)';
    });
  }
  
  console.log('✅ Ultra-optimized animation setup complete');
}

// ============================================
// MOBILE OPTIMIZATION FUNCTIONS
// ============================================

function initMobileOptimizations() {
  // Update theme color meta tag
  updateThemeColorMeta();
  
  // PRIORITY: Fix mobile scroll issues first
  fixMobileScrollIssues();
  
  // Initialize touch interactions
  initTouchInteractions();
  
  // Optimize scroll performance
  optimizeScrollPerformance();
  
  // Handle orientation changes
  handleOrientationChange();
  
  // iOS specific optimizations
  handleIOSOptimizations();
  
  // Handle mobile keyboard
  handleMobileKeyboard();
  
  // Initialize performance monitoring for mobile
  initMobilePerformanceMonitoring();
  
  // Initialize battery optimizations
  initBatteryOptimizations();
}

function initTouchInteractions() {
  // Add touch feedback to interactive elements
  const touchElements = document.querySelectorAll('.card, .project-card, .gallery-item, .contact-link, .theme-toggle');
  
  touchElements.forEach(element => {
    let touchStartTime = 0;
    let touchStartY = 0;
    let isScrolling = false;
    
    element.addEventListener('touchstart', function(e) {
      touchStartTime = Date.now();
      touchStartY = e.touches[0].clientY;
      isScrolling = false;
      
      // Don't apply transform immediately - wait to see if user is scrolling
      setTimeout(() => {
        if (!isScrolling && Date.now() - touchStartTime < 100) {
          this.style.transform = 'scale(0.98)';
          this.style.transition = 'transform 0.1s ease';
        }
      }, 50);
    }, { passive: true });
    
    element.addEventListener('touchmove', function(e) {
      // If user moves more than 10px vertically, they're probably scrolling
      const currentY = e.touches[0].clientY;
      if (Math.abs(currentY - touchStartY) > 10) {
        isScrolling = true;
        // Reset any transforms if scrolling detected
        this.style.transform = '';
        this.style.transition = '';
      }
    }, { passive: true });
    
    element.addEventListener('touchend', function() {
      setTimeout(() => {
        this.style.transform = '';
        this.style.transition = '';
      }, 100);
    }, { passive: true });
    
    element.addEventListener('touchcancel', function() {
      this.style.transform = '';
      this.style.transition = '';
    }, { passive: true });
  });
  
  // Prevent double-tap zoom on theme toggle
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    let lastTouchEnd = 0;
    themeToggle.addEventListener('touchend', function(e) {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }
}

function optimizeScrollPerformance() {
  let ticking = false;
  let scrollCount = 0;
  const isMobile = window.innerWidth <= 768;
  
  function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".bg-elements");
    const header = document.querySelector(".header");

    // Ultra-optimized parallax effects for mobile
    if (!isMobile) {
      // Only apply parallax on desktop for better mobile performance
      if (parallax) {
        const speed = scrolled * 0.15; // Even more reduced
        parallax.style.transform = `translate3d(0, ${speed}px, 0)`;
      }

      if (header) {
        const headerParallax = scrolled * 0.1; // Even more reduced
        header.style.transform = `translate3d(0, ${headerParallax}px, 0)`;
      }
    }

    // Super throttled scroll progress update for mobile
    scrollCount++;
    if (scrollCount % (isMobile ? 10 : 5) === 0) { // Update even less frequently on mobile
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollPercent = scrolled / (docHeight - winHeight);
      document.documentElement.style.setProperty("--scroll-progress", scrollPercent);
    }
    
    ticking = false;
  }

  function requestScrollUpdate() {
    if (!ticking) {
      if (isMobile) {
        // Use setTimeout instead of rAF on mobile for better battery life
        setTimeout(updateScrollEffects, 16);
      } else {
        requestAnimationFrame(updateScrollEffects);
      }
      ticking = true;
    }
  }

  // Use passive listeners for better performance
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
}

function handleOrientationChange() {
  const handleOrientation = () => {
    // Update viewport height for mobile browsers
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Update theme color on orientation change
    setTimeout(updateThemeColorMeta, 100);
    
    // Trigger a reflow to fix layout issues
    document.body.style.height = window.innerHeight + 'px';
    setTimeout(() => {
      document.body.style.height = '';
    }, 100);
  };

  // Handle both orientationchange and resize
  window.addEventListener('orientationchange', handleOrientation);
  window.addEventListener('resize', handleOrientation);
  
  // Initial call
  handleOrientation();
}

function handleIOSOptimizations() {
  // Detect iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    // Fix iOS viewport units
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    window.addEventListener('resize', setViewportHeight);
    setViewportHeight();
    
    // FIXED: More selective iOS bounce scroll prevention
    // Only prevent bounce on the body itself, not on scrollable content
    let startY = 0;
    
    document.body.addEventListener('touchstart', function(e) {
      startY = e.touches[0].clientY;
    }, { passive: true });
    
    document.body.addEventListener('touchmove', function(e) {
      // Only prevent scrolling if we're trying to scroll past the boundaries
      const currentY = e.touches[0].clientY;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // Allow normal scrolling
      if (scrollTop > 0 && scrollTop < maxScroll) {
        return;
      }
      
      // Only prevent bounce at the very top or bottom
      if ((scrollTop <= 0 && currentY > startY) || 
          (scrollTop >= maxScroll && currentY < startY)) {
        e.preventDefault();
      }
    }, { passive: false });
  }
}

function handleMobileKeyboard() {
  // Handle virtual keyboard appearance
  const initialViewportHeight = window.innerHeight;
  
  const handleViewportChange = () => {
    const currentViewportHeight = window.innerHeight;
    const heightDifference = initialViewportHeight - currentViewportHeight;
    
    // If viewport height decreased significantly, keyboard is likely open
    if (heightDifference > 150) {
      document.body.classList.add('keyboard-open');
    } else {
      document.body.classList.remove('keyboard-open');
    }
  };

  window.addEventListener('resize', handleViewportChange);
}

// ============================================
// MOBILE PERFORMANCE MONITORING & ADAPTIVE OPTIMIZATION
// ============================================

function initMobilePerformanceMonitoring() {
  const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
  
  if (!isMobile) return;
  
  let performanceMode = 'normal'; // normal, reduced, minimal
  let frameDropCount = 0;
  let lastFrameTime = performance.now();
  
  // Monitor frame rate and adapt performance
  function monitorFrameRate() {
    const currentTime = performance.now();
    const frameDuration = currentTime - lastFrameTime;
    
    // If frame takes longer than 20ms (below 50fps), it's a dropped frame
    if (frameDuration > 20) {
      frameDropCount++;
    }
    
    // Every 60 frames, check performance and adapt
    if (frameDropCount > 0 && frameDropCount % 60 === 0) {
      adaptPerformanceMode();
    }
    
    lastFrameTime = currentTime;
    requestAnimationFrame(monitorFrameRate);
  }
  
  function adaptPerformanceMode() {
    if (frameDropCount > 20 && performanceMode === 'normal') {
      // Switch to reduced performance mode
      performanceMode = 'reduced';
      applyReducedPerformanceMode();
      console.log('📱 Switched to reduced performance mode for better mobile experience');
    } else if (frameDropCount > 40 && performanceMode === 'reduced') {
      // Switch to minimal performance mode
      performanceMode = 'minimal';
      applyMinimalPerformanceMode();
      console.log('📱 Switched to minimal performance mode for optimal mobile experience');
    }
  }
  
  function applyReducedPerformanceMode() {
    // Reduce background animations
    const bgElements = document.querySelectorAll('.leaf, .petal');
    bgElements.forEach((el, index) => {
      if (index > 6) { // Hide extra elements
        el.style.display = 'none';
      } else {
        el.style.animationDuration = '25s'; // Slower animations
      }
    });
    
    // Disable parallax completely
    const parallaxElements = document.querySelectorAll('.bg-elements, .header');
    parallaxElements.forEach(el => {
      el.style.transform = 'none';
    });
  }
  
  function applyMinimalPerformanceMode() {
    // Further reduce animations
    const bgElements = document.querySelectorAll('.leaf, .petal');
    bgElements.forEach((el, index) => {
      if (index > 4) { // Show even fewer elements
        el.style.display = 'none';
      } else {
        el.style.animationDuration = '30s'; // Even slower animations
        el.style.opacity = '0.3'; // More transparent
      }
    });
    
    // Disable all transform effects on polaroids
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      item.style.transform = 'none !important';
    });
  }
  
  // Start monitoring after a delay to let initial animations settle
  setTimeout(() => {
    requestAnimationFrame(monitorFrameRate);
  }, 2000);
}

// Add battery-aware optimizations
function initBatteryOptimizations() {
  if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
      // If battery is low, apply power-saving optimizations
      if (battery.level < 0.2) {
        console.log('🔋 Low battery detected - applying power-saving optimizations');
        applyPowerSavingMode();
      }
      
      // Monitor battery level changes
      battery.addEventListener('levelchange', () => {
        if (battery.level < 0.2) {
          applyPowerSavingMode();
        }
      });
    });
  }
}

function applyPowerSavingMode() {
  // Reduce all animations to minimal
  const style = document.createElement('style');
  style.textContent = `
    .leaf, .petal {
      animation-duration: 40s !important;
      opacity: 0.2 !important;
    }
    * {
      transition-duration: 0.1s !important;
      animation-duration: 0.1s !important;
    }
  `;
  document.head.appendChild(style);
}

// Main initialization
document.addEventListener("DOMContentLoaded", function () {
  console.log('🚀 DOM Content Loaded - Starting initialization');
  
  // Initialize background elements visibility based on initial theme
  updateBackgroundElements('dark'); // Default is dark theme

  // Initialize mobile optimizations
  initMobileOptimizations();

  // Initialize all animations
  console.log('🎬 Calling initializeAnimations()');
  initializeAnimations();

  // Add theme toggle event listener
  const themeSlider = document.getElementById("theme-slider");
  if (themeSlider) {
    themeSlider.addEventListener("click", toggleTheme);
  }

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Initialize enhanced scroll effects
  initializeScrollEffects();

  // Enhanced intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        
        // Add specific animations based on element type
        if (entry.target.classList.contains("card")) {
          entry.target.style.animation = "fadeInUp 0.8s ease-out forwards";
        }
        if (entry.target.classList.contains("project-card")) {
          entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
        }
      }
    });
  }, observerOptions);

  // Observe all major sections with staggered delays
  document
    .querySelectorAll(".card, .timeline-item, .gallery-item, .project-card")
    .forEach((el, index) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = `all 0.6s ease ${index * 0.1}s`;
      observer.observe(el);
    });

  // Initialize all enhanced animations
  setTimeout(() => {
    initializeAnimations();
  }, 500);

  // Add loading animation completion
  document.body.classList.add("loaded");

  // Initialize mobile optimizations
  initMobileOptimizations();
});

// ============================================
// MOBILE SCROLL FIX FUNCTIONS
// ============================================

function fixMobileScrollIssues() {
  // Ensure body and html allow scrolling
  document.documentElement.style.touchAction = 'pan-y';
  document.body.style.touchAction = 'pan-y';
  
  // Fix any elements that might be blocking scroll
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    const computedStyle = window.getComputedStyle(element);
    
    // If an element prevents all touch actions, allow at least pan-y for scrolling
    if (computedStyle.touchAction === 'none') {
      // Only override if it's not specifically needed (like for interactive elements)
      if (!element.classList.contains('interactive-image-container') &&
          !element.classList.contains('theme-toggle')) {
        element.style.touchAction = 'pan-y';
      }
    }
  });
  
  // Ensure scroll events work properly
  let isScrolling = false;
  let scrollTimeout;
  
  window.addEventListener('scroll', function() {
    if (!isScrolling) {
      isScrolling = true;
      document.body.classList.add('is-scrolling');
    }
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      isScrolling = false;
      document.body.classList.remove('is-scrolling');
    }, 150);
  }, { passive: true });
  
  // Debug scroll issues
  console.log('📱 Mobile scroll fixes applied');
}