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
    personalContent.style.display = "block";

    // Update about text for personal theme
    aboutContent.innerHTML = `
                  Beyond my technical pursuits, I'm someone who finds joy in life's diverse experiences. 
                  From capturing the perfect shot through my camera lens to the adrenaline rush of competitive sports, 
                  I believe in living life to the fullest. My adventures have taken me from the serene landscapes of Switzerland 
                  to the bustling streets of Paris, always seeking new perspectives and memorable moments to cherish.
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

  // Reset animations after theme change
  setTimeout(() => {
    initializeAnimations();
  }, 300);
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
  initializePolaroidEffects();
  initializeTimelineAnimations();
  initializeProjectCard3DEffects(); // Call the new function
  initializeMouseTracking();
  initializeInteractiveImage(); // Add interactive image effects
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

// Interactive About Image Effects
function initializeInteractiveImage() {
  const imageContainer = document.querySelector('.interactive-image-container');
  
  if (imageContainer) {
    // Remove click functionality - image is now unclickable
    // Only keep mouse move tilt effect
    imageContainer.addEventListener('mousemove', (e) => {
      const rect = imageContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -10;
      const rotateY = (x - centerX) / centerX * 10;
      
      imageContainer.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    imageContainer.addEventListener('mouseleave', () => {
      imageContainer.style.transform = '';
    });
  }
}

// Main initialization
document.addEventListener("DOMContentLoaded", function () {
  // Initialize background elements visibility based on initial theme
  updateBackgroundElements('dark'); // Default is dark theme

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
});