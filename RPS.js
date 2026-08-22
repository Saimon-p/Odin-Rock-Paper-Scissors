let buttons = document.querySelectorAll('.move-button');
let userCounter = document.querySelector('.user-counter');
let cpuCounter = document.querySelector('.cpu-counter');
let drawsCounter = document.querySelector('.draws-counter');
let chosenMovebox = document.querySelectorAll('.chosen-move-box');
let moveContainerTitleh3 = document.querySelector('.title-wrapper h3');
let moveContainerTitle = document.querySelector('.title-wrapper');
let gameDisplayWrapper = document.querySelector('.game-display-wrapper');

let humanChoice = '';
let computerChoice = '';
let humanScore = 0;
let computerScore = 0;
let draws = 0;

let resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', () =>{
    window.location.reload();
})

buttons.forEach(btn => {
    btn.addEventListener('click', (e) =>{
        humanChoice = e.currentTarget.value;
        humanChoice = humanChoice.at(0).toUpperCase() + humanChoice.slice(1).toLowerCase();
        playGame(humanChoice);
    })
})

let keydownListenerStatus = true;

document.addEventListener('keydown', (e) => {
    if(!keydownListenerStatus) return;

    humanChoice = (e.key.toLowerCase() === 'r') ? 'Rock' :
                  (e.key.toLowerCase() === 'p') ? 'Paper': 
                  (e.key.toLowerCase() === 's') ? 'Scissors' : null;
    if(humanChoice !== null) {
        playGame(humanChoice);
        keydownListenerStatus = false;
    }
})

function playGame(humanChoice) {
    computerChoice = getComputerChoice();
    return UpdateUI(playRound(humanChoice, computerChoice));
}

function getComputerChoice() {
    let computerChoice = Math.floor(Math.random() * 3) + 1;
    return (computerChoice === 3) ? "Rock" :
           (computerChoice === 2) ? "Paper":
           "Scissors";
}

function playRound(humanChoice, computerChoice) {
    let verdict;
    if (humanChoice === computerChoice) {
        ++draws;
        return "Its a Draw!";
    } else {
        switch (humanChoice) {
            case "Rock":
                if (computerChoice === "Paper") {
                    ++computerScore;
                    verdict = false;    
                } else {
                    ++humanScore;
                    verdict = true
                }
            break;
            case "Paper": 
                
                if (computerChoice === "Scissors") {
                    ++computerScore;
                    verdict = false;    
                } else {
                    ++humanScore;
                    verdict = true
                }
            break;
            case "Scissors":
                
                if (computerChoice === "Rock") {
                    ++computerScore;
                    verdict = false;    
                } else {
                    ++humanScore;
                    verdict = true
                }
            break;
        }
    }

    return (verdict === true) ? "You Win!🎉" : "You Lose";
}




function UpdateUI(result) {
    let chosenMoveboxSpan = document.querySelectorAll(".chosen-move-box span")
    chosenMovebox.forEach(el => el.classList.add('animated'));
    buttons.forEach(el => {
        el.disabled = true;
        el.style.cursor = 'not-allowed';
    });

    chosenMoveboxSpan.forEach(el => el.textContent = '✊');

    gameDisplayWrapper.addEventListener('animationend', function reload() {
        chosenMovebox.forEach(el => el.classList.remove('animated'));

        chosenMoveboxSpan[0].textContent = (humanChoice === 'Rock') ? "✊" : (humanChoice === 'Paper') ? "✋" : "✌️";
        chosenMoveboxSpan[1].textContent = (computerChoice === 'Rock') ? "✊" : (computerChoice === 'Paper') ? "✋" : "✌️";
        gameDisplayWrapper.removeEventListener('animationend', reload);
    })

    titleAnimation(result);
}

function titleAnimation(result) {
    const text = ['Rock!', 'Paper!', 'Scissors!', 'Shoot!'];
    let index = 0;
    let flowing = true
    moveContainerTitleh3.textContent = text[index];
    moveContainerTitleh3.classList.add('animated');


        moveContainerTitleh3.addEventListener('animationend', function next() {
            moveContainerTitleh3.classList.remove('animated');

            if (index === text.length - 1) {
                moveContainerTitleh3.removeEventListener('animationend', next);

                moveContainerTitleh3.textContent = result

                userCounter.textContent = humanScore;
                cpuCounter.textContent = computerScore;
                drawsCounter.textContent = draws + ' Draws';

                if (humanScore > computerScore) {
                userCounter.style.color = 'yellowgreen';
                cpuCounter.style.color = 'white';
                } else if (computerScore > humanScore){
                userCounter.style.color = 'white';
                cpuCounter.style.color = 'yellowgreen';
                } else{
                    userCounter.style.color = 'white';
                    cpuCounter.style.color = 'white';
                }

                buttons.forEach(el => {
                    el.disabled = false;
                    el.style.cursor = 'pointer';
                });

                keydownListenerStatus = true;
                return;
            } 

            index++;

            void moveContainerTitleh3.offsetWidth;

            moveContainerTitleh3.textContent = text[index];
            moveContainerTitleh3.classList.add('animated');
        });
}
