const toggle = document.getElementById('toggle') ;
const nav = document.querySelector('.nav');
const cards = document.querySelectorAll('.skills__container button');

const selected = new Audio('./skills/sounds/duck-toy.mp3');
const fail = new Audio('./skills/sounds/roblox.mp3');
const correct = new Audio('./skills/sounds/plankton-correct.mp3');
const winnerSound = new Audio('./skills/sounds/chipi-chapa.mp3');

toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
})

nav.addEventListener('click', () => {
    nav.classList.remove('active')
})

const GAMEOVER = 12;
const MOBILE_SCREEN_WIDTH = 758;
const ANIMATION_DURATION = 12000;

let count = 0;
let cardOne = null
let cardTwo = null
let resultOne = null;
let resultTwo = null;
let SUCCESSES = 0;
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12];

numbers = numbers.sort(()=> {
    return Math.random() - 0.5
})

cards.forEach( card => {
     card.addEventListener('click', () => {
        const id =  card.id
        showCard(id);
    })
});

function scaleAnimation (cardOne) {
    cardOne.classList.add('scaleAnimate');
    setTimeout(()=> {
        cardOne.classList.remove('scaleAnimate');
    },500)
}

function failSoundAnimate (one,two) {
    one.classList.add('shakeAnimation');
    two.classList.add('shakeAnimation');
    setTimeout(()=> {
        one.classList.remove('shakeAnimation');
        two.classList.remove('shakeAnimation');
    },1000)
}

function correctAnswerAnimate (cardOne, cardTwo) {
    cardOne.classList.add('correctAnimation');
    cardTwo.classList.add('correctAnimation');
}

function winner () {
    winnerSound.play();
    cards.forEach((card) => {
        card.classList.add('winAnimation');
        setTimeout(() => {
            card.classList.remove('winAnimation')
        },ANIMATION_DURATION)
    })
    const end = Date.now() + ANIMATION_DURATION
    document.body.clientWidth < MOBILE_SCREEN_WIDTH
    ? animationWinnerMovil(end)
    : animationWinner(end)
}

function successes () {
    count = 0;
    SUCCESSES++;
    correct.play();
    correctAnswerAnimate(cardOne,cardTwo);
    cardOne.style.border = 'solid 1px green';
    cardOne.style.boxShadow = '0 0 10px 1px green';
    cardTwo.style.border = 'solid 1px green';
    cardTwo.style.boxShadow = '0 0 10px 1px green';
    if (SUCCESSES == GAMEOVER) {
        winner()
    }
}

function showCardOne (id) {
    cardOne = document.getElementById(id);
    resultOne = numbers[id];
    cardOne.innerHTML = `<img src="skills/img/${resultOne}.png">`;
    cardOne.disabled = true;
    cardOne.style.border = 'solid 1px yellow';
    cardOne.style.boxShadow = '0 0 10px 1px yellow';
    selected.play()
    scaleAnimation(cardOne)
}

function showCardTwo (id) {
    cardTwo = document.getElementById(id);
    resultTwo = numbers[id];
    cardTwo.innerHTML = `<img src="skills/img/${resultTwo}.png">`;
    cardTwo.disabled = true;
    cardTwo.style.border = 'border 1px yellow';
    cardTwo.style.boxShadow = '0 0 10px 1px yellow';
}

function cleanCards () {
    cardOne.style.border = 'solid 1px red';
    cardTwo.style.border = 'solid 1px red';
    cardOne.style.boxShadow = '0 0 10px 1px red';
    cardTwo.style.boxShadow = '0 0 10px 1px red';
    fail.play()
    failSoundAnimate(cardOne,cardTwo)
    setTimeout(()=> {
        cardOne.innerHTML = '';
        cardTwo.innerHTML = '';
        cardOne.disabled = false;
        cardTwo.disabled = false;
        count = 0;
        cardOne.style.border = 'dashed 3px white';
        cardTwo.style.border = 'dashed 3px white';
        cardOne.style.boxShadow = 'none';
        cardTwo.style.boxShadow = 'none';
    },1000)
}

function showCard (id) {
    count++;
    if ( count == 1) {
        showCardOne(id)
    } 
    if (count == 2) {
        showCardTwo(id)
        resultOne == resultTwo
        ? successes()
        : cleanCards()
    }
}


function animationWinner(end) {
    (function frame() {
    confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8}
    });
    confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 , y: 0.8}
    });

    if (Date.now() < end) {
        requestAnimationFrame(frame);
    }
    }());
}

function animationWinnerMovil (end) {
    (function frame() {
    confetti({
        particleCount: 7,
        spread: 55,
        origin: { x: 0.5, y: 0.7}
    });

    if (Date.now() < end) {
        requestAnimationFrame(frame);
    }
    }());
} 
