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

// Function to update background elements visibility
function updateBackgroundElements(theme) {
  const leaves = document.querySelectorAll('.leaf');
  const petals = document.querySelectorAll('.petal');

  if (theme === 'light') {
    // Show petals, hide leaves
    petals.forEach(petal => {
      petal.style.opacity = '0.7';
      petal.style.display = 'block';
    });
    leaves.forEach(leaf => {
      leaf.style.opacity = '0';
      leaf.style.display = 'none';
    });
  } else {
    // Show leaves, hide petals
    leaves.forEach(leaf => {
      leaf.style.opacity = '0.6';
      leaf.style.display = 'block';
    });
    petals.forEach(petal => {
      petal.style.opacity = '0';
      petal.style.display = 'none';
    });
  }
}// Simple Polaroid Interactions
function initializePolaroidEffects() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item, index) => {
    // Add staggered reveal animation
    item.style.animationDelay = `${index * 0.2}s`;

    // Clean hover effect without complex 3D transforms
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

    // Simple click animation
    item.addEventListener("click", () => {
      item.style.animation = "none";
      item.style.transform = "rotate(0deg) scale(1.1) translateY(-15px)";
      setTimeout(() => {
        item.style.animation = "";
        item.style.transform = "";
      }, 300);
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

// Interactive About Image Effects - Working Mouse Tilt Animation
function initializeInteractiveImage() {
  console.log('🎯 Initializing interactive image...');
  
  const imageContainer = document.querySelector('.interactive-image-container');
  
  if (!imageContainer) {
    console.error('❌ Image container not found');
    return;
  }
  
  console.log('✅ Container found, setting up mouse tilt animation...');
  
  let isHovering = false;
  
  // Mouse enter - start tracking
  imageContainer.addEventListener('mouseenter', function() {
    console.log('🎯 Mouse entered - starting tilt animation');
    isHovering = true;
    imageContainer.style.transition = 'none';
  });
  
  // Mouse move - apply tilt based on position
  imageContainer.addEventListener('mousemove', function(e) {
    if (!isHovering) return;
    
    const rect = imageContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate tilt angles
    const rotateX = (mouseY / rect.height) * -15; // Vertical tilt
    const rotateY = (mouseX / rect.width) * 15;   // Horizontal tilt
    
    // Apply 3D transform
    imageContainer.style.transform = `
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale(1.05) 
      rotate(-2deg)
    `;
    imageContainer.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
  });
  
  // Mouse leave - reset to original state
  imageContainer.addEventListener('mouseleave', function() {
    console.log('👋 Mouse left - resetting');
    isHovering = false;
    imageContainer.style.transition = 'all 0.5s ease';
    imageContainer.style.transform = 'rotate(-2deg)';
    imageContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1), 0 16px 32px rgba(0, 0, 0, 0.1)';
  });
  
  console.log('✅ Mouse tilt animation setup complete');
}

// ============================================
// MOBILE OPTIMIZATION FUNCTIONS
// ============================================

function initMobileOptimizations() {
  // Update theme color meta tag
  updateThemeColorMeta();
  
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
}

function initTouchInteractions() {
  // Add touch feedback to interactive elements
  const touchElements = document.querySelectorAll('.card, .project-card, .gallery-item, .contact-link, .theme-toggle');
  
  touchElements.forEach(element => {
    element.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
      this.style.transition = 'transform 0.1s ease';
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
  
  function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector(".bg-elements");
    const header = document.querySelector(".header");

    // Throttled parallax effects for mobile
    if (window.innerWidth > 768) {
      if (parallax) {
        const speed = scrolled * 0.3; // Reduced for mobile performance
        parallax.style.transform = `translateY(${speed}px)`;
      }

      if (header) {
        const headerParallax = scrolled * 0.2; // Reduced for mobile
        header.style.transform = `translateY(${headerParallax}px)`;
      }
    }

    // Update scroll progress
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollPercent = scrolled / (docHeight - winHeight);
    document.documentElement.style.setProperty("--scroll-progress", scrollPercent);
    
    ticking = false;
  }

  function requestScrollUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
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
    
    // Prevent iOS bounce scroll
    document.body.addEventListener('touchmove', function(e) {
      if (e.target === document.body || e.target === document.documentElement) {
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