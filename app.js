document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.choice');
    const userScoreElement = document.getElementById('user-score');
    const comScoreElement = document.getElementById('com-score');
    const resultElement = document.getElementById('result');

    let userScore = 0;
    let computerScore = 0;

    function formatScore(score) {
        return score < 10 ? `0${score}` : `${score}`;
    }

    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }

    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) return 'Tie!';
        
        const winningCombos = {
            rock: 'scissors',
            paper: 'rock',
            scissors: 'paper'
        };

        return winningCombos[userChoice] === computerChoice ? 'You Win!' : 'Computer Wins!';
    }

    function animateScore(scoreElement, result) {
        // Remove previous color classes
        scoreElement.classList.remove('user-win', 'computer-win');
        
        // Add animation
        scoreElement.classList.add('animate');
        
        // Add color based on result
        if (result === 'You Win!') {
            scoreElement.classList.add('user-win');
        } else if (result === 'Computer Wins!') {
            scoreElement.classList.add('computer-win');
        }
        
        // Remove classes after animation
        setTimeout(() => {
            scoreElement.classList.remove('animate', 'user-win', 'computer-win');
        }, 500);
    }

    function updateResultText(message) {
        const resultElement = document.getElementById('result');
        
        // Fade out
        resultElement.style.opacity = '0';
        
        // Wait for fade out, then update text and fade in
        setTimeout(() => {
            resultElement.textContent = message;
            resultElement.style.opacity = '1';
        }, 300);
    }

    function updateScores(result) {
        if (result === 'You Win!') {
            userScore++;
            userScoreElement.textContent = formatScore(userScore);
            animateScore(userScoreElement, result);
        } else if (result === 'Computer Wins!') {
            computerScore++;
            comScoreElement.textContent = formatScore(computerScore);
            animateScore(comScoreElement, result);
        }
    }

    function playRound(userChoice) {
        const computerChoice = getComputerChoice();
        const result = determineWinner(userChoice, computerChoice);

        // Create result message
        const resultMessages = {
            'Tie!': `Tie! Computer picked ${computerChoice}.`,
            'You Win!': `You Win! Computer picked ${computerChoice}.`,
            'Computer Wins!': `Computer Wins! Computer picked ${computerChoice}.`
        };

        updateResultText(resultMessages[result]);
        updateScores(result);

        // Trigger visual feedback for the chosen button
        const choiceElement = document.querySelector(`.choice[data-choice="${userChoice}"]`);
        if (choiceElement) {
            choiceElement.classList.add('selected');
            setTimeout(() => choiceElement.classList.remove('selected'), 500);
        }
    }

    // Add event listeners to choices
    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const userChoice = choice.getAttribute('data-choice');
            playRound(userChoice);
        });
    });

    // Keyboard event listener
    document.addEventListener('keydown', (event) => {
        let userChoice;
        switch(event.key) {
            case '1':
                userChoice = 'rock';
                break;
            case '2':
                userChoice = 'paper';
                break;
            case '3':
                userChoice = 'scissors';
                break;
            default:
                return; // Exit if not 1, 2, or 3
        }

        // Trigger the round with the corresponding choice
        playRound(userChoice);
    });

    // Initialize scores with 00
    userScoreElement.textContent = '00';
    comScoreElement.textContent = '00';
});