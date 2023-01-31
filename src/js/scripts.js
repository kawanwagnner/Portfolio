/* Menu Navegation; */

const btn = document.querySelector('#btn-menu');

btn.addEventListener('click', () => {
    const navbar = document.querySelector('#navbar');
    const linksNavBar = document.querySelectorAll('li a[href^="#"]');

    navbar.classList.toggle('active');
    if (btn.innerHTML == '<i class="fa-solid fa-x"></i>') {
        btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.body.style.overflowX = 'hidden';
        btn.style.top = '10px';
    } else {
        btn.innerHTML = '<i class="fa-solid fa-x"></i>';
        document.body.style.overflowX = 'hidden';
        btn.style.top = '20px'
    }
    
    function removeMenu() {
        const navbarActive = document.querySelector('#navbar.active')
        navbarActive.classList.remove('active')
        btn.innerHTML = '<i class="fa-solid fa-bars"></i>'
    };

    linksNavBar[0].addEventListener('click', e => removeMenu());
    linksNavBar[1].addEventListener('click', e => removeMenu());
    linksNavBar[2].addEventListener('click', e => removeMenu());
    linksNavBar[3].addEventListener('click', e => removeMenu());
    linksNavBar[4].addEventListener('click', e => removeMenu());
})

/* Scroll Reveal; */

window.sr = ScrollReveal({ reset: true });

sr.reveal('#titulo', { 
    rotate: {x: 5, y: 20, z: 0}, duration: 2000 
})

sr.reveal('#logo', { duration: 2000 });

sr.reveal('.text-welcome', { rotate: {x: 5, y: 20, z: 0}, duration: 2000 });

sr.reveal('#container-icons', { rotate: {x: 5, y: 20, z: 0}, duration: 2000 });

sr.reveal('#container-text-iam', { rotate: {x: 5, y: 20, z: 0}, duration: 2000 });

sr.reveal('.card', { rotate: {x: 5, y: 20, z: 0}, duration: 1000 });

sr.reveal('#photo', { duration: 2000 });