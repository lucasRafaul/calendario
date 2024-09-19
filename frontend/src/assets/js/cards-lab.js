document.querySelectorAll('.carousel-lab .card').forEach(card => {
    card.addEventListener('click', function(event) {
        // Evitar que el clic afecte la navegación del carousel
        event.stopPropagation();

        // Alternar la clase 'active' en la card actual
        this.classList.toggle('active');

        // Ocultar la información adicional en otras cards
        document.querySelectorAll('.carousel-lab .card').forEach(otherCard => {
            if (otherCard !== this) {
                otherCard.classList.remove('active');
            }
        });
    });
});
