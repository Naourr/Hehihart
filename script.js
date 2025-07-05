// const menu = document.querySelector('.menu-icon');
// const menulinks = document.querySelector('.menu-links');
// menu.addEventListener('click', function() {
//     menulinks.classList.toggle('active');
// });

const loadscreen = document.querySelector('.loadscreen');
window.addEventListener("load", function() {
  	document.querySelector(".loading").style.display = "none";
    loadscreen.classList.toggle('fade-out');
    loadscreen.addEventListener('animationend', function() {
        loadscreen.style.display = 'none';
    });
});

const layers = document.querySelectorAll('.parallax-layer');
document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    layers.forEach(layer => {
        const depth = layer.dataset.depth;
        const translateX = x * depth * 50;
        const translateY = y * depth * 50;

        layer.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
});