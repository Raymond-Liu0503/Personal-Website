// --- Script for scroll-reveal animations ---
const hiddenElements = document.querySelectorAll(".hidden");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
});

hiddenElements.forEach((element) => observer.observe(element));


// --- Script for 3D rotating cards on hover ---
const constrain = 175; // Adjusts the "sensitivity" of the rotation
const swervoContainers = document.querySelectorAll(".swervo-container");

swervoContainers.forEach(container => {
  const layer = container.querySelector(".swervo");

  container.addEventListener("mousemove", (e) => {
    const box = layer.getBoundingClientRect();
    const calcX = -(e.clientY - box.y - box.height / 2) / constrain;
    const calcY = (e.clientX - box.x - box.width / 2) / constrain;

    const transform = `perspective(100px) rotateX(${calcX}deg) rotateY(${calcY}deg)`;

    // Use requestAnimationFrame for smoother animation
    window.requestAnimationFrame(() => {
      layer.style.transform = transform;
    });
  });

  container.addEventListener("mouseleave", () => {
    // Reset the transform when the mouse leaves the container
    window.requestAnimationFrame(() => {
        layer.style.transform = "perspective(100px) rotateX(0) rotateY(0)";
    });
  });
});