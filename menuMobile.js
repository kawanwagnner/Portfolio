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