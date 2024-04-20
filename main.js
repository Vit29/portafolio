const toggle = document.getElementById('toggle') ;
const nav = document.querySelector('.nav');
const cards = document.querySelectorAll('.skills__container button');

const selected = new Audio('./skills/sounds/duck-toy.mp3')
const fail = new Audio('./skills/sounds/roblox.mp3')
const correct = new Audio('./skills/sounds/plankton-correct.mp3')
const winner = new Audio('./skills/sounds/chipi-chapa.mp3')

toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
})

nav.addEventListener('click', () => {
    nav.classList.remove('active')
})

let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12]; 
numbers = numbers.sort(()=> {
    return Math.random() - 0.5
})

cards.forEach(element => {
    element.addEventListener('click',()=> {
        const id = element.id
        showCard(element,id)
    })
});

let count = 0;
let cardOne = null
let cardTwo = null
let resultOne = null;
let resultTwo = null;
let successes = 0;

function showCard (element,id) {
    count++;
    if ( count == 1) {
        cardOne = document.getElementById(id);
        resultOne = numbers[id];
        cardOne.innerHTML = `<img src="skills/img/${resultOne}.png">`;
        cardOne.disabled = true;
        //color border 
        cardOne.style.border = 'solid 1px yellow';
        // color shadow 
        cardOne.style.boxShadow = '0 0 10px 1px yellow';
        selected.play()
        duckSoundAnimate(cardOne)
    } else if (count == 2) {
        cardTwo = document.getElementById(id);
        resultTwo = numbers[id];
        cardTwo.innerHTML = `<img src="skills/img/${resultTwo}.png">`;
        cardTwo.disabled = true;
        //color border
        cardTwo.style.border = 'border 1px yellow';
        // color shadow
        cardTwo.style.boxShadow = '0 0 10px 1px yellow';
        if (resultOne == resultTwo) {
            count = 0;
            // color borde
            cardOne.style.border = 'solid 1px green';
            cardTwo.style.border = 'solid 1px green';
            // color sombra
            cardOne.style.boxShadow = '0 0 10px 1px green';
            cardTwo.style.boxShadow = '0 0 10px 1px green';
            correct.play();
            correctSoundAnimate(cardOne,cardTwo);
            successes++;

            if (successes == 12) {
                winner.play();
                confetti(
                    {
                        particleCount: 150,
                        spread: 180
                    }
                );
            }
        } else {
            //color border
            cardOne.style.border = 'solid 1px red';
            cardTwo.style.border = 'solid 1px red';
            //color shadow
            cardOne.style.boxShadow = '0 0 10px 1px red';
            cardTwo.style.boxShadow = '0 0 10px 1px red';
            //audio
            fail.play()
            failSoundAnimate(cardOne,cardTwo)
            setTimeout(()=> {
                cardOne.innerHTML = '';
                cardTwo.innerHTML = '';
                cardOne.disabled = false;
                cardTwo.disabled = false;
                count = 0;
                // colocar cielueta 
                cardOne.style.border = 'dashed 3px white';
                cardTwo.style.border = 'dashed 3px white';
                // remover sombra
                cardOne.style.boxShadow = 'none';
                cardTwo.style.boxShadow = 'none';
                // element.classList.remove('animate');
            },1000)
        }
    }
}

function duckSoundAnimate (element) {
    element.classList.add('animate');
    setTimeout(()=> {
        element.classList.remove('animate')
    },1000)
}

function failSoundAnimate (one,two) {
    one.classList.add('shake');
    two.classList.add('shake');
    setTimeout(()=> {
        one.classList.remove('shake');
        two.classList.remove('shake');
    },1000)
}

function correctSoundAnimate (cardOne, cardTwo) {
    cardOne.classList.add('correct');
    cardTwo.classList.add('correct');
}
