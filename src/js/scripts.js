const btn = document.querySelector('#btn-menu'); 

btn.addEventListener('click', () => {
    const navbar = document.querySelector('#navbar'); 

    navbar.classList.toggle('active'); 
    if (btn.innerHTML == 'X') {
        btn.innerHTML = '<i class="fa-solid fa-bars"></i>'; 
        document.body.style.overflow = 'auto'
    } else {
        btn.innerHTML = 'X'; 
        document.body.style.overflow = 'hidden'
    }
})

/* Scroll Reveal; */

window.sr = ScrollReveal({ reset: true });

sr.reveal('#titulo', { 
    rotate: {x: 5, y: 20, z: 0}, duration: 1000 
})

sr.reveal('.text-welcome', { rotate: {x: 5, y: 20, z: 0}, duration: 1000 });

sr.reveal('#container-icons', { rotate: {x: 5, y: 20, z: 0}, duration: 1000 });

sr.reveal('.form_submit_email', { rotate: {x: 5, y: 20, z: 0}, duration: 1000 });

sr.reveal('#navbar', { duration: 1000 });