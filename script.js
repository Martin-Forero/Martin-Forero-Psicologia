// Espera a que todo el contenido HTML esté cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function() {

    // --- 1. ACTUALIZAR AÑO DEL COPYRIGHT ---
    // Busca el elemento con id "current-year"
    const yearSpan = document.getElementById("current-year");
    
    // Si lo encuentra, le pone el año actual
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. MANEJO DE MODALES (POP-UPS) ---

    // Botones que abren los modales
    const btnHistoria = document.getElementById("btn-historia");
    const btnFormacion = document.getElementById("btn-formacion");

    // Los modales (las ventanas)
    const modalHistoria = document.getElementById("modal-historia");
    const modalFormacion = document.getElementById("modal-formacion");

    // TODOS los botones de cerrar (los que tienen la 'x')
    const closeButtons = document.querySelectorAll(".modal-close");

    // Función para ABRIR un modal
    function abrirModal(modal) {
        if (modal) {
            modal.classList.add("modal-open"); // Añade la clase CSS para mostrarlo
        }
    }

    // Función para CERRAR un modal
    function cerrarModal(modal) {
        if (modal) {
            modal.classList.remove("modal-open"); // Quita la clase CSS para ocultarlo
        }
    }

    // --- Asignar eventos (Qué hacer al hacer clic) ---

    // Abrir modal de historia
    if (btnHistoria && modalHistoria) {
        btnHistoria.addEventListener("click", function(event) {
            event.preventDefault(); // Evita que la página salte (por el href="#")
            abrirModal(modalHistoria);
        });
    }

    // Abrir modal de formación
    if (btnFormacion && modalFormacion) {
        btnFormacion.addEventListener("click", function(event) {
            event.preventDefault();
            abrirModal(modalFormacion);
        });
    }

    // Asignar evento de cierre a CADA botón "x"
    closeButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            // Busca el modal "padre" más cercano y lo cierra
            cerrarModal(button.closest(".modal"));
        });
    });

    // Opcional: Cerrar el modal si se hace clic FUERA del contenido
    window.addEventListener("click", function(event) {
        // Si el elemento en el que se hizo clic ES el fondo del modal (la clase .modal)
        if (event.target.classList.contains("modal-open")) {
            cerrarModal(event.target);
        }
    });

    // --- 3. NUEVO: CERRAR MODAL CON TECLA ESCAPE ---
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            // Buscar si hay algun modal abierto
            const modalAbierto = document.querySelector(".modal.modal-open");
            if (modalAbierto) {
                cerrarModal(modalAbierto);
            }
        }
    });

    // --- 4. NUEVO: MANEJO DEL MENÚ MÓVIL (HAMBURGUESA) ---
    const btnMenu = document.getElementById("menu-toggle-btn");
    const navMenu = document.getElementById("nav-menu");

    if (btnMenu && navMenu) {
        btnMenu.addEventListener("click", function() {
            // Alternar la clase 'nav-open' en el menú
            navMenu.classList.toggle("nav-open");
            
            // Alternar la clase 'active' en el botón
            btnMenu.classList.toggle("active");

            // Actualizar ARIA para accesibilidad
            const estaAbierto = navMenu.classList.contains("nav-open");
            btnMenu.setAttribute("aria-expanded", estaAbierto);
            
            if (estaAbierto) {
                btnMenu.setAttribute("aria-label", "Cerrar menú");
            } else {
                btnMenu.setAttribute("aria-label", "Abrir menú");
            }
        });

        // CERRAR MENÚ AL HACER CLIC EN UN ENLACE
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('nav-open');
                btnMenu.classList.remove('active');
                btnMenu.setAttribute("aria-expanded", false);
            });
        });
    }

    // --- 5. CARRUSEL DE TESTIMONIOS ---
    const track = document.querySelector('.carousel-track');
    // Si no existe la track, salimos para evitar errores en otras páginas
    if (!track) return;

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button--right');
    const prevButton = document.querySelector('.carousel-button--left');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        // En un carrusel de fade/opacity, simplemente cambiamos la clase
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    };

    // Click botón derecha
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling || slides[0]; // Si no hay siguiente, vuelve al primero
        const currentDot = dotsNav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling || dots[0];

        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
        resetAutoSlide();
    });

    // Click botón izquierda
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1]; // Si no hay anterior, va al último
        const currentDot = dotsNav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling || dots[dots.length - 1];

        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
        resetAutoSlide();
    });

    // Click en los puntos indicadores
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');

        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        resetAutoSlide();
    });

    // Auto-play (cambia cada 6 segundos)
    let slideInterval;
    
    const startAutoSlide = () => {
        slideInterval = setInterval(() => {
            nextButton.click();
        }, 6000);
    };

    const resetAutoSlide = () => {
        clearInterval(slideInterval);
        startAutoSlide();
    };

    // Iniciar auto-play
    startAutoSlide();

    // Pausar si el ratón está encima del carrusel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

});