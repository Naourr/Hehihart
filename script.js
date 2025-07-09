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

function closeimage() {
    const closecard = document.querySelector('.close');
    const radios = document.querySelectorAll("input[type='radio']");
    radios.forEach(radio => 
        radio.addEventListener('change', () => {
            if (radio.checked) {
                closecard.classList.add('active');
            } else {
                closecard.classList.remove('active');
            }
        })
    );
    closecard.addEventListener('click', () => {
        radios.forEach(radio => radio.checked = false);
        closecard.classList.toggle('active');
    });
    window.addEventListener('scroll', () => {
        let anyChecked = false;
        radios.forEach(radio => {
            if (radio.checked) {
                radio.checked = false;
                anyChecked = true;
            }
        });
        if (anyChecked) {
            closecard.classList.remove('active');
        }
    });
}
closeimage();

let clickedRadio = null;
let originalHeight = null;

document.querySelectorAll('.dnd-card label').forEach(label => {
    label.addEventListener('pointerdown', () => {
        const wrapper = label.closest('.dnd-card-wrapper');
        const holder = wrapper.querySelector('.dnd-card-holder');
        originalHeight = holder.offsetHeight;
        clickedRadio = wrapper.querySelector('.dnd-card-radio');
    });
});

document.querySelectorAll('.dnd-card-radio').forEach(radio => {
    radio.addEventListener('change', () => {
        document.querySelectorAll('.dnd-card-wrapper').forEach(wrapper => {
            const holder = wrapper.querySelector('.dnd-card img');
            if (wrapper.contains(radio) && radio.checked && radio === clickedRadio) {
                wrapper.style.height = originalHeight + 'px';
            } else {
                const h = holder.offsetHeight;
                wrapper.style.height = h + 'px';
            }
        });
    });
});




