// scripts.js

// Variable para el índice de la diapositiva actual
let currentSlide = 0;

/**
 * Muestra la diapositiva en el índice especificado.
 * @param {number} index - Índice de la diapositiva a mostrar.
 */
function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    const newTransformValue = -currentSlide * 100;
    document.querySelector('.carousel-container').style.transform = `translateX(${newTransformValue}%)`;
}

/**
 * Muestra la siguiente diapositiva.
 */
function nextSlide() {
    showSlide(currentSlide + 1);
}

/**
 * Muestra la diapositiva anterior.
 */
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Cambio automático de diapositiva cada 3 segundos
setInterval(() => {
    nextSlide();
}, 3000);