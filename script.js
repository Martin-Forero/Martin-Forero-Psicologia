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
    }

});