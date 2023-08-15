const toggle = document.getElementById('toggle') ;
const nav = document.querySelector('.nav');


toggle.addEventListener('click', () => {
    document.getElementById('toggle').classList.toggle('active');
    nav.classList.toggle('active');
})