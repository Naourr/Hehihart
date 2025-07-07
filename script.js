function loading() {
    const loadscreen = document.querySelector('.loadscreen');
    const loading = document.querySelector('.loading');
    window.addEventListener("load", function() {
        loading.style.display = "none";
        loadscreen.classList.toggle('fade-out');
        loadscreen.addEventListener('animationend', function() {
            loadscreen.style.display = 'none';
        });
    });
}
loading();

function parallax() {
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
}
parallax();

function menubar_slidein() {
    const menuarea = document.querySelector('.menu-area');
    const menuvid = document.querySelector('#menu-vid');
    const menuvidsrc = document.querySelector('#menu-vidsrc');
    const menulinks = document.querySelector('.menu-links');
    const menubar_bg = document.querySelector('.menubar-bg');
    const menubar_wrapper = document.querySelector('.menubar-wrapper');
    const menubar = document.querySelector('#menubar');
    if (menuarea && menuvid && menuvidsrc && menulinks) {
        menuarea.addEventListener('click', () => {
            menuvid.play();
            menubar_bg.classList.toggle('active');
            menubar_wrapper.classList.toggle('active')
            menulinks.classList.toggle('active');
        });
        menuvid.addEventListener('playing', () => {
            menuarea.style.pointerEvents = 'none';
        });
        menuvid.addEventListener('ended', () => {
            changemenuvid();
            menuvid.load();
            menuarea.style.pointerEvents = 'all';
        });
        function changemenuvid() {
            const reversed = '/ken/animated_menu_reversed.webm';
            const normal = '/ken/animated_menu.webm';
            const current = menuvidsrc.getAttribute('src');
            menuvidsrc.setAttribute('src',
                current === normal ? reversed : normal
            );
        }
    }
}
menubar_slidein();
