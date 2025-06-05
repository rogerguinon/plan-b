//animacion burbujas
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  const scrollY = window.scrollY;

  // Limita el efecto a un cierto punto
  const maxScroll = 300;
  const angle = Math.min(scrollY / maxScroll * 90, 90); // hasta 90 grados

  hero.style.transform = `rotateX(${angle}deg)`;
});

//animacion movil 
document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".mobile-frame-wrapper");

  wrappers.forEach(wrapper => {
    const frame = wrapper.querySelector(".mobile-frame");

    let hasRotated = false;
    let isReversed = false;

    frame.addEventListener("mouseenter", () => {
      if (!hasRotated && !isReversed) {
        frame.classList.add("animate");
        wrapper.classList.add("active"); // activamos blur
        hasRotated = true;
      }
    });

    frame.addEventListener("mouseleave", () => {
      if (!isReversed) {
        frame.style.transform = "scale(1.3) rotateY(360deg)";
      }
    });

    frame.addEventListener("click", () => {
      if (hasRotated && !isReversed) {
        frame.classList.remove("animate");
        frame.classList.add("reverse");
        wrapper.classList.remove("active"); // quitamos blur
        isReversed = true;

        frame.addEventListener("animationend", () => {
          frame.classList.remove("reverse");
          frame.style.transform = "";
          hasRotated = false;
          isReversed = false;
        }, { once: true });

      } else if (!hasRotated) {
        frame.classList.add("animate");
        wrapper.classList.add("active");
        hasRotated = true;
      }
    });
  });
});

//animacion confeti
document.addEventListener("DOMContentLoaded", () => {
  const confettiContainer = document.getElementById("confetti-container");
  const messages = [
    "¿Cuando quedamos al final?",
    "¿Dónde quedamos?",
    "Resumen",
    "¿Quién viene?",
    "¿Hora exacta?",
    "Confirmad, porfa",
    "Pasad ubi",
    "Era hoy!?",
    "Llego tarde",
  ];

  // Número limitado de confetis al inicio
  const confettiCount = 12;

  // Zona donde nacen los confetis: [minX, maxX], [minY, maxY] en px respecto a viewport
  // Puedes modificar esta zona para probar posiciones (por ejemplo, más arriba)
  const spawnZone = {
    left: {
      x: [-30, 10],  // justo fuera o en borde izquierdo (negativo)
      y: [window.innerHeight * 0.3, window.innerHeight * 0.6],
    },
    right: {
      x: [window.innerWidth - 10, window.innerWidth + 30], // borde derecho fuera pantalla
      y: [window.innerHeight * 0.25, window.innerHeight * 0.75], // entre 30% y 60% de la pantalla
    },
  };

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function createConfettiMessage(side) {
    const msg = document.createElement("div");
    msg.className = "confetti-message";
    msg.textContent = messages[Math.floor(Math.random() * messages.length)];

    msg.style.position = "fixed"; // para posición relativa a viewport
    msg.style.opacity = 0;

    // Posición inicial aleatoria dentro de spawnZone del lado correspondiente
    const x = randomBetween(spawnZone[side].x[0], spawnZone[side].x[1]);
    const y = randomBetween(spawnZone[side].y[0], spawnZone[side].y[1]);

    msg.style.left = side === "left" ? `${x}px` : "auto";
    msg.style.right = side === "right" ? `${window.innerWidth - x}px` : "auto";
    msg.style.top = `${y}px`;

    confettiContainer.appendChild(msg);

    // Distancia de movimiento horizontal (hacia centro pantalla)
    // Hacia dentro: desde izquierda positivo, desde derecha negativo
    const horizontalDistance = side === "left"
      ? randomBetween(100, 200)  // más corto, no llegan al centro
      : -randomBetween(100, 200);

    const verticalDistance = Math.random() < 0.5 
      ? randomBetween(-120, -60)  // hacia arriba
      : randomBetween(60, 120);   // o hacia abajo



    const duration = 3000; // duración animación inicial

    let start = null;

    function animate(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      // Movimiento horizontal lineal (de lado hacia centro)
      // Movimiento vertical leve oscilante con sinusoide para efecto flotante
      const translateX = horizontalDistance * progress;
      const translateY = verticalDistance * progress; 

      msg.style.transform = `translate(${translateX}px, ${translateY}px)`;
      msg.dataset.baseX = translateX;
      msg.dataset.baseY = translateY;


      msg.style.opacity = progress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        floatMessage(msg);
      }
    }

    requestAnimationFrame(animate);
  }

  function floatMessage(msg) {
  const baseX = parseFloat(msg.dataset.baseX) || 0;
  const baseY = parseFloat(msg.dataset.baseY) || 0;

  let floatDirection = 1;
  let floatDistance = 0;

  let horizontalDirection = 1;
  let horizontalDistance = 0;

  function floatAnim() {
    floatDistance += 0.05 * floatDirection;
    if (floatDistance > 8 || floatDistance < -8) floatDirection *= -1;

    horizontalDistance += 0.025 * horizontalDirection;
    if (horizontalDistance > 5 || horizontalDistance < -5) horizontalDirection *= -1;

    msg.style.transform = `translate(${baseX + horizontalDistance}px, ${baseY + floatDistance}px)`;

    requestAnimationFrame(floatAnim);
  }

  requestAnimationFrame(floatAnim);
}


  // Crear solo al inicio, sin repetir
  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      createConfettiMessage(i % 2 === 0 ? "left" : "right");
    }, i * 300);
  }

  // Tu código para el scroll y título NO tocado ni modificado aquí
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;

    confettiContainer.style.transform = `translateY(${-scrollY}px)`;

    if (scrollY > 500) {
      confettiContainer.style.opacity = "0";
    } else {
      confettiContainer.style.opacity = "1";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const lastSection = document.getElementById("last-section");
  const leftPanel = lastSection.querySelector(".left-panel");
  const rightPanel = lastSection.querySelector(".right-panel");
  const content = lastSection.querySelector(".final-content");

  // Lista de imágenes (coloca los nombres de tus imágenes en esta lista)
  const appIcons = [
    "img/figam2.webp",
    "img/git.png",
    "img/react.png",
    "img/git.png",
    // Añade más si quieres
  ];

  // Cargar iconos al contenido
  appIcons.forEach((iconName) => {
    const iconBox = document.createElement("div");
    iconBox.classList.add("icon-box");

    const img = document.createElement("img");
    img.src = `img/${iconName}`;
    img.alt = "";
    iconBox.appendChild(img);

    content.appendChild(iconBox);
  });

  function updatePanelsOnScroll() {
    const rect = lastSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const progress = Math.min(Math.max(1 - rect.top / windowHeight, 0), 1);
      const leftTranslate = -100 + (100 * progress);
      const rightTranslate = 100 - (100 * progress);

      leftPanel.style.transform = `translateX(${leftTranslate}%)`;
      rightPanel.style.transform = `translateX(${rightTranslate}%)`;

      if (progress > 0.92) {
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
      } else {
        content.style.opacity = "0";
        content.style.transform = "translateY(50px)";
      }
    }
  }

  window.addEventListener("scroll", updatePanelsOnScroll);
});


//animacion burbujas
document.addEventListener("DOMContentLoaded", () => {
  const bubbles = document.querySelectorAll(".blob-section");

  function checkBubblesInView() {
    const windowHeight = window.innerHeight;

    bubbles.forEach((bubble) => {
      const rect = bubble.getBoundingClientRect();

      if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
        // Si la burbuja está casi visible, la hacemos visible y escalada
        bubble.classList.add("bubble-visible");
        bubble.classList.remove("bubble-hidden");
      } else {
        // Si no está visible, la ocultamos y reducimos escala
        bubble.classList.remove("bubble-visible");
        bubble.classList.add("bubble-hidden");
      }
    });
  }

  // Inicialmente ocultas todas
  bubbles.forEach(bubble => bubble.classList.add("bubble-hidden"));

  window.addEventListener("scroll", checkBubblesInView);
  window.addEventListener("resize", checkBubblesInView);

  // Comprobar al cargar por si ya están visibles
  checkBubblesInView();
});



