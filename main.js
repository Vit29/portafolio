const toggle = document.getElementById('toggle') ;
const nav = document.querySelector('.nav');


toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    
})

nav.addEventListener('click', () => {
    document.getElementById('home-input').classList.toggle('nav-close');
    nav.classList.remove('active')
})