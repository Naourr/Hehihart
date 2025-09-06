
const music = document.querySelector('#music');
const playMusic = document.querySelector('.play-music');

function loading() {
    window.addEventListener("load", function() {
        const loadvid = document.querySelector('#loadvid');
        const load_src = this.document.querySelector('#loadvid source'); 
        const hehihart = document.querySelector('.parallax-big-title');
        const sectionNums = document.querySelector('.section-nums');

        const roll = getRandomIntInclusive(1, 5);
        if (roll == 1) load_src.src = "/assets/videos/firstlogotest.webm";
        if (roll == 2) load_src.src = "/assets/videos/forthelogo.webm";
        if (roll == 3) load_src.src = "/assets/videos/lenlogo.webm";
        if (roll == 4) load_src.src = "/assets/videos/loadscreen.webm";
        if (roll == 5) load_src.src = "/assets/videos/newintroanimation.webm";
        loadvid.load();

        const loadscreen = document.querySelector('.loadscreen');
        loadvid.addEventListener('ended', () => {
            loadscreen.classList.add('fade-out');
            sectionNums.classList.add('animate');
            hehihart.style.animationName = 'to-left-new';
            music.play();
        })
        // sectionNums.classList.add('animate');
        // hehihart.style.animationName = 'to-left-new';
    });
}
loading();

playMusic.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        playMusic.textContent = "⏸"
    } else {
        music.pause()
        playMusic.textContent = "♪"
    }
})

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const hamburger = document.querySelector('.hamburger');
const navWrapper = document.querySelector('.nav-wrapper');
hamburger.addEventListener('click', () => {
    navWrapper.classList.toggle('hidden');
});

function menuClick() {
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
    const menuBg = document.querySelector('.menu-bg');
    const menuVid = document.querySelector('.menu-vid video');
    menuBtn.addEventListener('click', () => {
        menuVid.playBackRate = 1.2;
        menuVid.play();
        menuBg.classList.toggle('active');
        menu.classList.toggle('active');
        const open = document.querySelector('#menu-open');
        const close = document.querySelector('#menu-close');
        if (menu.classList.contains('active')) {
            close.play();
        } else {
            open.play();
        }
    })
}
menuClick();

function sectIndicator() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.id
            const indicator = document.querySelector(`.section-indicator .${id}`);
            const navLink = document.querySelector(`.nav-links a.${id}-nav`);
            const num = document.querySelector(`.section-nums .${id}-num`);
            const label = document.querySelector(`.section-labels .${id}-label`);
            const thumb = document.querySelector('.thumb');

            if (entry.isIntersecting) {
                indicator.classList.add('active');
                navLink.classList.add('active');
                num.classList.add('active');
                label.classList.add('active');
                thumb.classList.add(`${id}-point`)
            } else {
                indicator.classList.remove('active');
                navLink.classList.remove('active');
                num.classList.remove('active');
                label.classList.remove('active');
                thumb.classList.remove(`${id}-point`)
            }
        })
    },{
        threshold: 0.55
    });
    sections.forEach(section => observer.observe(section));
}
sectIndicator();

function textParallax() {
    const layer = document.querySelector('.parallax-big-title');
    document.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
    
        layer.style.backgroundPosition = `${x}% ${y}%`;
    });
}
textParallax();



function mapParallax() {
    const layers = document.querySelectorAll('.parallax-layer-map');
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
mapParallax();
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

// function customScrollbar() {
//     window.addEventListener('scroll', () => {
//         const scrolled = window.scrollY;
//         const footer = document.querySelector('footer');
//         const footerHeight = footer.offsetHeight;
//         const canScroll = document.documentElement.scrollHeight - window.innerHeight - footerHeight;
        
//         const scrollRatio = scrolled / canScroll;

//         const track = document.querySelector('.track');
        
//         track.style.height = `${scrollRatio * 100}%`
//     })
// }
// customScrollbar();

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
            const reversed = '/assets/videos/animated_menu_reversed.webm';
            const normal = '/assets/videos/animated_menu.webm';
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

function imageplaceholder() {
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
}
imageplaceholder();

function followMouse() {
    const follower = document.querySelector('.follow-mouse');
    const height = follower.offsetHeight;
    const width = follower.offsetWidth;

    window.addEventListener('mousemove', (event) => {
        follower.style.transform = `translate(${event.clientX - width / 2}px, ${event.clientY - height / 2}px)`;
    });
}
followMouse();

