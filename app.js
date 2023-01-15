const userScoreElem = document.getElementById('user-score');
const comScoreElem = document.getElementById('com-score');
const resultElem = document.getElementById('result');

const rock = document.getElementsByClassName('rock')[0];
const paper = document.getElementsByClassName('paper')[0];
const scissors = document.getElementsByClassName('scissors')[0];

const playerBadge = document.getElementById('user-badge');
const comBadge = document.getElementById('com-badge');

const choicePicked = document.getElementById('choice-picked');

let userScore = 0;
let comScore = 0;

function getComChoice() {
    // r > s > p > r
    const choices = ['r', 'p', 's'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function win() {
    userScore++;
    userScoreElem.innerHTML = userScore;

    const winMsg = "You Won!";
    resultElem.innerHTML = winMsg;
    resultElem.style.color = "#2FDEB6";
    resultElem.style.fontSize = "40px";

    playerBadge.style.backgroundColor = "#2FDEB6";

    setTimeout(() => {
        playerBadge.style.backgroundColor = "#171923";
        resultElem.style.color = "#FFFFFF";
        resultElem.style.fontSize = "35px";
    }, 1000)
}

function lose() {
    comScore++;
    comScoreElem.innerHTML = comScore;

    const loseMsg = "You Lost!";
    resultElem.innerHTML = loseMsg;
    resultElem.style.color = "#F44D4D";
    resultElem.style.fontSize = "40px";

    comBadge.style.backgroundColor = "#F44D4D";

    setTimeout(() => {
        comBadge.style.backgroundColor = "#171923";
        resultElem.style.color = "#FFFFFF";
        resultElem.style.fontSize = "35px";
    }, 1000)
}

function draw() {
    const drawMsg = "Draw!"
    resultElem.innerHTML = drawMsg;

    resultElem.style.color = "#0FACF5";
    resultElem.style.fontSize = "40px";

    setTimeout(() => {
        resultElem.style.color = "#FFFFFF";
        resultElem.style.fontSize = "35px";
    }, 1000)
}

function comChoicePicked(comChoice) {
    if (comChoice == 'r'){
        comChoice = "Rock";
    } else if (comChoice == 's') {
        comChoice = "Scissors";
    } else if (comChoice == 'p') {
        comChoice = "Paper";
    } else {
        comChoice = "Internal Error";
    }

    choicePicked.innerHTML = "Computer picked: " + comChoice;
}

function winCheck(userChoice) {
    const comChoice = getComChoice();

    
    switch (userChoice + comChoice) {
        case 'rs':
        case 'sp':
        case 'pr':
            win()
            comChoicePicked(comChoice)
            break;
        case 'sr':
        case 'ps':
        case 'rp':
            lose()
            comChoicePicked(comChoice)
            break;
        case 'rr':
        case 'ss':
        case 'pp':
            draw()
            comChoicePicked(comChoice)
            break;
    }
}

function main() {
    rock.addEventListener('click', () => {
        winCheck('r');
    })

    paper.addEventListener('click', () => {
        winCheck('p');
    })

    scissors.addEventListener('click', () => {
        winCheck('s');
    })
}

main();