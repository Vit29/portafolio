const toggle = document.getElementById('toggle') ;
const nav = document.querySelector('.nav');


toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    
})

nav.addEventListener('click', () => {
    nav.classList.remove('active')
})