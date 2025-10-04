function initMouseEffects() {
    const follower = document.querySelector('.follow-mouse');
    const layers = document.querySelectorAll('.parallax-layer, .parallax-layer-map, .parallax-layer-about');
    const bigTitle = document.querySelector('.parallax-big-title');

    const followerW = follower ? follower.offsetWidth : 0;
    const followerH = follower ? follower.offsetHeight : 0;

    let mouseX = 0, mouseY = 0;
    let ticking = false;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    });

    function update() {
        // followMouse
        if (follower) {
            follower.style.transform =
                `translate(${mouseX - followerW / 2}px, ${mouseY - followerH / 2}px)`;
        }

        // parallax (layers)
        const normX = (mouseX / window.innerWidth - 0.5) * 2;
        const normY = (mouseY / window.innerHeight - 0.5) * 2;
        layers.forEach(layer => {
            const depth = parseFloat(layer.dataset.depth || 0);
            layer.style.transform = `translate(${normX * depth * 50}px, ${normY * depth * 50}px)`;
        });

        // textParallax (big title bg position)
        if (bigTitle) {
            const percX = (mouseX / window.innerWidth) * 100;
            const percY = (mouseY / window.innerHeight) * 100;
            bigTitle.style.backgroundPosition = `${percX}% ${percY}%`;
        }

        ticking = false;
    }
}

const music = document.querySelector('#music')
function loading() {
    window.addEventListener("load", function() {
        
        initMouseEffects()

        const loadvid = document.querySelector('#loadvid')
        const load_src = this.document.querySelector('#loadvid source') 
        const hehihart = document.querySelector('.parallax-big-title')
        const sectionNums = document.querySelector('.section-nums')

        const roll = getRandomIntInclusive(1, 5)
        if (roll == 1) load_src.src = "/assets/videos/firstlogotest.webm"
        if (roll == 2) load_src.src = "/assets/videos/forthelogo.webm"
        if (roll == 3) load_src.src = "/assets/videos/lenlogo.webm"
        if (roll == 4) load_src.src = "/assets/videos/loadscreen.webm"
        if (roll == 5) load_src.src = "/assets/videos/newintroanimation.webm"
        loadvid.load()
        
        const loadscreen = document.querySelector('.loadscreen')
        const popup = document.querySelector('.popup-wrapper')

        const skip = document.querySelector('.skip')
        skip.addEventListener("click", () => {
            loadvid.currentTime = 100
        })
        
        loadvid.addEventListener('ended', () => {
            loadscreen.classList.add('fade-out')
            popup.classList.add('hidden')
            sectionNums.classList.add('animate')
            hehihart.style.animationName = 'to-left-new'
            music.volume = 0.25
            music.play()
        })
    })
}
loading()

function sectIndicator() {
    const sections = document.querySelectorAll('section')

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.id
            const indicator = document.querySelector(`.section-indicator .${id}`)
            const navLink = document.querySelector(`.nav-links a.${id}-nav`)
            const num = document.querySelector(`.section-nums .${id}-num`)
            const label = document.querySelector(`.section-indicator .${id}-label`)
            const thumb = document.querySelector('.thumb')

            if (entry.isIntersecting) {
                indicator.classList.add('active')
                navLink.classList.add('active')
                num.classList.add('active')
                label.classList.add('active')
                thumb.classList.add(`${id}-point`)
            } else {
                indicator.classList.remove('active')
                navLink.classList.remove('active')
                num.classList.remove('active')
                label.classList.remove('active')
                thumb.classList.remove(`${id}-point`)
            }
        })
    },{
        threshold: 0.55
    })
    sections.forEach(section => observer.observe(section))
}
sectIndicator()

const oc = document.querySelector('.oc')
function about_oc() {
    oc.addEventListener('click', () => {
        function neutral() {
            oc.classList.remove('talking')
        }
        if (!oc.classList.contains('talking')) {
            oc.classList.add('talking')
            setTimeout(neutral, 5000)
        }
    })
}
about_oc()

const tris = document.querySelectorAll('.tri')
const descs = document.querySelectorAll('.about-desc')
const tri_polys = document.querySelectorAll('.tri polygon')
function about_desc() {
    tris.forEach(tria => {
        tria.addEventListener('click', () => {
            descs.forEach(desc => {
                desc.classList.remove('active')
            })
            const id = tria.dataset.tri
            const partner = document.querySelector(`.about-desc.for-${id}`)
            partner.classList.add('active')

        })
    })
    tri_polys.forEach(poly => {
        poly.addEventListener('click', () => {
            if (poly.classList.contains('select')) {
            poly.classList.remove('select');
            } else {
            tri_polys.forEach(p => p.classList.remove('select'));
            poly.classList.add('select');
            }
        });
    });
}
about_desc()

const hamburger = document.querySelector('.hamburger')
const navWrapper = document.querySelector('.nav-wrapper')
hamburger.addEventListener('click', () => {
    navWrapper.classList.toggle('hidden')
})
function moveChibi(selector, farLeft, farRight) {
    const chibi = document.querySelector(selector)
    const chibi_img = chibi.querySelector('img')

    const idle = "assets/images/about/looktoviewer.png"
    const walk = "assets/images/about/walk.png"

    if (chibi_img.src.includes("walk.png")) {
        chibi_img.src = idle
    } else {
        chibi_img.src = walk

        if (chibi.style.left === farLeft) {
            chibi.style.left = farRight
            chibi_img.style.transform = "scaleX(1)"  // face right
        } else {
            chibi.style.left = farLeft
            chibi_img.style.transform = "scaleX(-1)" // face left
        }
    }
}

setInterval(() => moveChibi(".chibi", "35%", "80%"), 2000)
setInterval(() => moveChibi(".chibi1", "40%", "85%"), 2500)



function menuClick() {
    const menuBtn = document.querySelector('.menu-btn')
    const menu = document.querySelector('.menu')
    const menuBg = document.querySelector('.menu-bg')
    const menuVid = document.querySelector('.menu-vid video')
    menuBtn.addEventListener('click', () => {
        menuVid.playbackRate = 1.2
        menuVid.pause()
        menuVid.currentTime = 0
        menuVid.play()
        menuBg.classList.toggle('active')
        menu.classList.toggle('active')
        const open = document.querySelector('#menu-open')
        const close = document.querySelector('#menu-close')
        if (menu.classList.contains('active')) {
            close.play()
        } else {
            open.play()
        }
    })
}
menuClick()

document.addEventListener('DOMContentLoaded', () => {
    hoverPoints()
})

function hoverPoints() {
    const points = document.querySelectorAll('.point');
    const textbox = document.querySelector('.menu-textbox');

    points.forEach(point => {
        point.addEventListener('mouseenter', () => {
            textbox.textContent = point.dataset.desc;
            sect = point.textContent
            let section = document.querySelector(`.${sect}-hover`)
            section.classList.add('active')
        });

        point.addEventListener('mouseleave', () => {
            textbox.textContent = "Hover over an item to see description";
            sect = point.textContent
            let section = document.querySelector(`.${sect}-hover`)
            section.classList.remove('active')
        });
  });
}

const playMusic = document.querySelector('.play-music')
const musicIcon = document.querySelector('.music-icon')
const pauseIcon = document.querySelector('.pause-icon')
musicIcon.classList.add('active')
playMusic.addEventListener('click', () => {
    if (music.paused) {
        music.play()
        pauseIcon.classList.add('active')
        musicIcon.classList.remove('active')
    } else {
        music.pause()
        musicIcon.classList.add('active')
        pauseIcon.classList.remove('active')
    }
})

const images = [
    "aka feet thumbs up.webp",
    "illustration46.webp",
    "Illustration82 suji reference sheet.webp",
    "comp main ggolden ratio.webp",
    "Illustration49.webp",
    "Illustration83nothte blender thingy.webp",
    "dayum.webp",
    "Illustration57 cropped.webp",
    "Illustration85  for ai.webp",
    "illust 80 separated.webp",
    "Illustration60jpegfor vgen.webp",
    "Illustration86.webp",
    "Illustration18 VER 2.webp",
    "Illustration63.webp",
    "illustration88.webp",
    "Illustration32.webp",
    "Illustration66.webp",
    "Illustration8 que pro.webp",
    "Illustration34.webp",
    "illustration67.webp",
    "Illustration90.webp",
    "Illustration35.webp",
    "Illustration71.webp",
    "Illustration92.webp",
    "Illustration38.webp",
    "Illustration72 comms test.webp",
    "Illustration practice 1 actual.webp",
    "Illustration39 ver 2.webp",
    "Illustration75 flipped.webp",
    "Illustration practice 6.webp",
    "Illustration41.webp",
    "illustration 80 my oc test rig.webp"
];

const galleryHolder = document.querySelector(".gallery-holder")

images.forEach(name => {
    const div = document.createElement("div")
    div.classList.add('img-holder')

    const img = document.createElement("img")
    img.src = "/assets/images/other/" + name
    img.loading = "lazy"

    div.appendChild(img)
    galleryHolder.appendChild(div)
})

const gallery_left = document.querySelector(".gallery-left")
const gallery_right = document.querySelector(".gallery-right")
gallery_left.addEventListener("click", () => {
    galleryHolder.scrollBy(-1, 0)
})
gallery_right.addEventListener("click", () => {
    galleryHolder.scrollBy(1, 0)
})

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}