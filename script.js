// Verificación en consola
console.log("Portafolio de Abel: JavaScript activo.");

// Cambio de color del navbar al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mensaje de prueba.
alert("¡JavaScript cargado! Desliza hacia abajo para ver el cambio de color en el menú.");