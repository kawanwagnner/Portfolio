/* Menu Navegation; */

const btn = document.querySelector('#btn-menu');

btn.addEventListener('click', () => {
    const navbar = document.querySelector('#navbar');
    const linksNavBar = document.querySelector('#list-navbar a[href^="#"]');

    navbar.classList.toggle('active');
    if (btn.innerHTML == '<i class="fa-solid fa-x"></i>') {
        btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.body.style.overflowX = 'auto';
    } else {
        btn.innerHTML = '<i class="fa-solid fa-x"></i>';
        document.body.style.overflowX = 'hidden';
    } 
    
    if (linksNavBar.addEventListener('click')) {
        const navbarActive = document.querySelector('#navbar.active')
        navbarActive.classList.remove('active')
        btn.innerHTML = '<i class="fa-solid fa-bars"></i>'
    }
})

/* Scroll Reveal; */

// window.sr = ScrollReveal({ reset: true });

// sr.reveal('#titulo', { 
//     rotate: {x: 5, y: 20, z: 0}, duration: 1000 
// })

// sr.reveal('.text-welcome', { rotate: {x: 5, y: 20, z: 0}, duration: 1000 });

// sr.reveal('#container-icons', { rotate: {x: 5, y: 20, z: 0}, duration: 1000 });

// sr.reveal('.form_submit_email', { rotate: {x: 5, y: 20, z: 0}, duration: 1000 });

// sr.reveal('#navbar', { duration: 1000 });