// JavaScript para la invitación de Superman de Emilio

document.addEventListener("DOMContentLoaded", function () {
  // Inicializar todas las funcionalidades
  initCountdown();
  initScrollReveal();
  initGallerySlider();
  initSmoothScrolling();
  initParallaxEffects();
  initTouchSupport();

  // Mostrar mensaje de bienvenida en consola
  console.log("🦸‍♂️ ¡Bienvenido a la fiesta de Superman de Emilio! 🦸‍♂️");
});

// Countdown Timer
function initCountdown() {
  // Fecha del evento - EDITABLE: Sábado 2 de agosto de 2025
  const eventDate = new Date("2025-08-02T16:00:00").getTime();

  const countdownTimer = setInterval(function () {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      clearInterval(countdownTimer);
      document.getElementById("countdownTimer").innerHTML =
        '<div class="time-group"><span class="time-number">¡YA!</span><span class="time-label">ES HORA</span></div>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualizar los elementos con animación
    updateTimeUnit("days", days);
    updateTimeUnit("hours", hours);
    updateTimeUnit("minutes", minutes);
    updateTimeUnit("seconds", seconds);
  }, 1000);
}

function updateTimeUnit(id, value) {
  const element = document.getElementById(id);
  const formattedValue = value.toString().padStart(2, "0");

  if (element && element.textContent !== formattedValue) {
    element.style.transform = "scale(1.1)";
    element.textContent = formattedValue;

    setTimeout(() => {
      element.style.transform = "scale(1)";
    }, 200);
  }
}

// Scroll Reveal Animation
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".countdown-section, .event-details, .gallery-section, .inspiration-section, .rsvp-section, .music-section, .map-section, .new-rsvp-section, .contact-supermom, .gift-section"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal", "active");

          // Animación especial para las tarjetas de detalles
          if (entry.target.classList.contains("event-details")) {
            const cards = entry.target.querySelectorAll(".card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.style.animation = `cardSlideIn 0.6s ease forwards`;
              }, index * 150);
            });
          }
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
}

// Gallery Slider - SIN AUTOPLAY
function initGallerySlider() {
  const track = document.getElementById("galleryTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const slides = document.querySelectorAll(".gallery-slide");

  if (!track || !prevBtn || !nextBtn || slides.length === 0) return;

  let currentSlide = 0;
  const totalSlides = slides.length;

  function updateSlider() {
    const translateX = -currentSlide * 100;
    track.style.transform = `translateX(${translateX}%)`;

    // Añadir efecto de zoom a la imagen actual
    slides.forEach((slide, index) => {
      const img = slide.querySelector("img");
      if (index === currentSlide) {
        img.style.transform = "scale(1.05)";
      } else {
        img.style.transform = "scale(1)";
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  // Event listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Touch support for mobile
  let startX = 0;
  let endX = 0;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  });

  // Initialize
  updateSlider();
}

// Función para enviar confirmación por WhatsApp
function sendConfirmation() {
  const userName = document.getElementById("userName").value.trim();
  const guestCount = document.getElementById("guestCount").value;

  if (!userName) {
    alert("Por favor, escribe tu nombre");
    return;
  }

  const message = `Hola! Soy ${userName} y confirmo mi asistencia al cumpleaños de Emilio 🦸‍♂️. ${
    guestCount > 0
      ? `Voy con ${guestCount} persona${guestCount > 1 ? "s" : ""} más.`
      : "Voy solo/a."
  }`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/5218443423850?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
}

// Smooth Scrolling
function initSmoothScrolling() {
  // Scroll indicator click
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      document.getElementById("countdown").scrollIntoView({
        behavior: "smooth",
      });
    });
  }

  // Smooth scroll for all internal links
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
}

// Parallax Effects
function initParallaxEffects() {
  const hero = document.querySelector(".hero-section");
  const video = hero?.querySelector("video");

  if (!hero || !video) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Parallax effect on video
    video.style.transform = `translateY(${rate}px)`;

    // Fade out hero content
    const heroContent = hero.querySelector(".hero-content");
    const opacity = Math.max(0, 1 - scrolled / window.innerHeight);
    heroContent.style.opacity = opacity;
  });
}

// Touch Support and Mobile Optimizations
function initTouchSupport() {
  // Add touch class to body for CSS targeting
  if ("ontouchstart" in window) {
    document.body.classList.add("touch-device");
  }

  // Prevent zoom on double tap for buttons
  const buttons = document.querySelectorAll(
    ".whatsapp-button, .gallery-btn, .confirm-button"
  );
  buttons.forEach((button) => {
    button.addEventListener("touchend", function (e) {
      e.preventDefault();
      this.click();
    });
  });

  // Optimize scroll performance
  let ticking = false;

  function updateScrollEffects() {
    // Update any scroll-based animations here
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  });
}

// Utility Functions
function addCardSlideInAnimation() {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes cardSlideIn {
            from {
                opacity: 0;
                transform: translateY(30px) rotateX(-10deg);
            }
            to {
                opacity: 1;
                transform: translateY(0) rotateX(0);
            }
        }
    `;
  document.head.appendChild(style);
}

// Initialize card animation
addCardSlideInAnimation();

// Easter Eggs y efectos especiales
function initEasterEggs() {
  // Konami Code para efectos especiales
  let konamiCode = [];
  const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

  document.addEventListener("keydown", (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }

    if (konamiCode.join(",") === konamiSequence.join(",")) {
      activateSupermanMode();
    }
  });
}

function activateSupermanMode() {
  // Efecto especial cuando se activa el código Konami
  document.body.style.animation = "superFly 2s ease-in-out";

  // Crear estrellas volando
  for (let i = 0; i < 20; i++) {
    createFlyingStar();
  }

  // Mostrar mensaje especial
  showSpecialMessage("¡Modo Superman Activado! 🦸‍♂️");
}

function createFlyingStar() {
  const star = document.createElement("div");
  star.innerHTML = "⭐";
  star.style.position = "fixed";
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.top = window.innerHeight + "px";
  star.style.fontSize = "2rem";
  star.style.zIndex = "9999";
  star.style.pointerEvents = "none";
  star.style.animation = "flyUp 3s linear forwards";

  document.body.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 3000);
}

function showSpecialMessage(message) {
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, var(--superman-blue), var(--superman-red));
        color: white;
        padding: 2rem;
        border-radius: 20px;
        font-family: var(--font-secondary);
        font-size: 1.5rem;
        z-index: 10000;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        animation: messagePopIn 0.5s ease-out;
    `;

  document.body.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.style.animation = "messagePopOut 0.5s ease-in forwards";
    setTimeout(() => messageDiv.remove(), 500);
  }, 2000);
}

// Añadir animaciones para easter eggs
function addEasterEggAnimations() {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes superFly {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
        }
        
        @keyframes flyUp {
            from {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes messagePopIn {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        
        @keyframes messagePopOut {
            from {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
        }
    `;
  document.head.appendChild(style);
}

// Inicializar easter eggs
addEasterEggAnimations();
initEasterEggs();

// Performance optimizations
function optimizePerformance() {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Preload critical resources
  const criticalResources = [
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Fredoka:wght@300;400;500;600;700&display=swap",
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = resource;
    link.as = "style";
    document.head.appendChild(link);
  });
}

// Inicializar optimizaciones
optimizePerformance();

// Accessibility improvements
function improveAccessibility() {
  // Add ARIA labels
  const buttons = document.querySelectorAll(".gallery-btn");
  buttons.forEach((btn, index) => {
    btn.setAttribute(
      "aria-label",
      index === 0 ? "Imagen anterior" : "Siguiente imagen"
    );
  });

  // Add focus management
  const focusableElements = document.querySelectorAll(
    'a, button, input, [tabindex]:not([tabindex="-1"])'
  );
  focusableElements.forEach((element) => {
    element.addEventListener("focus", function () {
      this.style.outline = "3px solid var(--superman-yellow)";
    });

    element.addEventListener("blur", function () {
      this.style.outline = "none";
    });
  });

  // Reduce motion for users who prefer it
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.style.setProperty(
      "--animation-duration",
      "0.01ms"
    );
  }
}

// Inicializar mejoras de accesibilidad
improveAccessibility();

// Error handling
window.addEventListener("error", function (e) {
  console.error("Error en la invitación de Superman:", e.error);
  // Aquí podrías enviar el error a un servicio de logging
});

// Service Worker registration (opcional para PWA)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("SW registrado con éxito:", registration.scope);
      })
      .catch(function (registrationError) {
        console.log("SW falló al registrarse:", registrationError);
      });
  });
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
  // Aquí se podría integrar con Google Analytics, Facebook Pixel, etc.
  console.log("Evento rastreado:", eventName, eventData);
}

// Track important interactions
document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("whatsapp-button") ||
    e.target.classList.contains("confirm-button")
  ) {
    trackEvent("whatsapp_click", { button: e.target.textContent.trim() });
  }

  if (e.target.classList.contains("gallery-btn")) {
    trackEvent("gallery_navigation", {
      direction: e.target.classList.contains("next") ? "next" : "prev",
    });
  }
});

// Final initialization message
console.log(
  "🎉 Invitación de Superman cargada completamente. ¡Que comience la diversión! 🎉"
);
