document.querySelectorAll('section').forEach(section => section.loading = 'preload');
const music = document.querySelector('#music');
const playMusic = document.querySelector('.play-music');

function loading() {
    const loadvid = document.querySelector('#loadvid');
    const overlays = document.querySelector('.overlays');

    window.addEventListener("load", function() {
        loadvid.addEventListener('ended', () => {
            overlays.classList.add('animate');
            music.play();
        })
        //overlays.classList.add('animate');
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

const hamburger = document.querySelector('.hamburger');
const navWrapper = document.querySelector('.nav-wrapper');
hamburger.addEventListener('click', () => {
    navWrapper.classList.toggle('hidden');
});

function sectIndicator() {
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.id
            const indicator = document.querySelector(`.section-indicator .${id}`);
            const navLink = document.querySelector(`.nav-links a.${id}-nav`);
            const num = document.querySelector(`.overlays .${id}-num`);

            if (entry.isIntersecting) {
                indicator.classList.add('active')
                navLink.classList.add('active')
                num.classList.add('active')
            } else {
                indicator.classList.remove('active');
                navLink.classList.remove('active')
                num.classList.remove('active')
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

function followMouse() {
    const follower = document.querySelector('.follow-mouse');
    const height = follower.offsetHeight;
    const width = follower.offsetWidth;

    window.addEventListener('mousemove', (event) => {
        follower.style.transform = `translate(${event.clientX - width / 2}px, ${event.clientY - height / 2}px)`;
    });
}
followMouse();

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

function customScrollbar() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const footer = document.querySelector('footer');
        const footerHeight = footer.offsetHeight;
        const canScroll = document.documentElement.scrollHeight - window.innerHeight - footerHeight;
        
        const scrollRatio = scrolled / canScroll;

        const track = document.querySelector('.track');
        
        track.style.height = `${scrollRatio * 100}%`
    })
}
customScrollbar();

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


