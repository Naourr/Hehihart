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

const menuarea = document.querySelector('.menu-area');
const menuvid = document.querySelector('#menu-vid');
const menuvidsrc = document.querySelector('#menu-vidsrc');


// let firstmenuclick = true; // Use let if you want to change its value

menuarea.addEventListener('click', menuvidclicked);

function menuvidclicked() {
    // firstmenuclick = false;
    menuvid.play();
}

if (menuvid) {
    menuvid.addEventListener('ended', function() {
        changemenuvid();
        menuvid.load();
    });
}

function changemenuvid() {
    // Use .getAttribute('src') for comparison, as .src returns absolute URL
    if (menuvidsrc.getAttribute('src') === '/ken/animated_menu_reversed.webm') {
        menuvidsrc.setAttribute('src', '/ken/animated_menu.webm');
    } else {
        menuvidsrc.setAttribute('src', '/ken/animated_menu_reversed.webm');
    }
}

