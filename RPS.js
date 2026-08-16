function getComputerChoice() {
    let computerChoice = Math.floor(Math.random() * 3) + 1;
    return (computerChoice === 3) ? "Rock" :
           (computerChoice === 2) ? "Paper":
           "Scissor";
}

function getHumanChoice() {
    let humanChoice = prompt("Choose Your move!", "");
     if (humanChoice === null || humanChoice.trim() === "") return false;
    
    humanChoice = humanChoice.at(0).toUpperCase() + humanChoice.slice(1).toLowerCase();
    if (humanChoice === "Rock" || humanChoice === "Paper" || humanChoice === "Scissor") {
        return humanChoice;
    } else {
        return false;
    }
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;
    let round = 1;

    function playRound(humanChoice, computerChoice) {
        let roundString = `Round ${round}: You: ${humanChoice} - Computer: ${computerChoice}`;
        let loseString = `You lose! ${computerChoice} beats ${humanChoice}`;
        let winString = `You win! ${humanChoice} beats ${computerChoice}`;
        let roundScore = `Your Score: ${humanScore} - Computer Score: ${computerScore}`;

        if (humanChoice == false) {
            return false;
        } else if (humanChoice === computerChoice){
            console.log(roundString);
            console.log("Tie! Play again.");   
            roundScore = `No Points awarded! Your Score: ${humanScore} - Computer Score: ${computerScore}`;
        } else{
            console.log(roundString);
            switch (humanChoice) {
                case "Rock":
                    if (computerChoice === "Paper") {
                        ++computerScore;
                        console.log(loseString);
                    } else{
                        ++humanScore;
                        console.log(winString);
                    }
                break;
                case "Paper": 
                    if (computerChoice === 'Scissor') {
                        ++computerScore;
                        console.log(loseString);
                    } else{
                        ++humanScore;
                        console.log(winString);
                    }
                break;
                case "Scissor":
                    if (computerChoice === "Rock") {
                        ++computerScore;
                        console.log(loseString);
                    } else{
                        ++humanScore;
                        console.log(winString);
                    }
                break;
            }
            roundScore = `Your Score: ${humanScore} - Computer Score: ${computerScore}`;
        }

        ++round;
        console.log(roundScore);
    }

    for (let i = 0; i < 5; i++) {                
        if (playRound(getHumanChoice(), getComputerChoice()) == false) {
            console.log("Invalid Input! (Allowed input: 'Rock', 'Paper', 'Scissor')");
            --i;            
        }     
        console.log("");  
    }

    let finalScore = `Final Score = You: ${humanScore} - Computer: ${computerScore}`;
    console.log(finalScore);
    
    (humanScore === computerScore) ? console.log("Even Point! No One Won!") :
    (humanScore > computerScore) ? console.log("You Won the Game!!🎉🥳") :
    console.log("Game Over! You lost the Game😵‍💫🫠");
}

// playGame();