const score = {
    wins: 0,
    losses: 0,
    ties : 0
};

window.addEventListener('storage', updateScores(), true);
//Generate the computer using a random number
//Compare it with the user move 
function GenrateComputerMove(userMove){

    const randomNumber = Math.random();
    let computerMove = '';
    if(randomNumber>=0 && randomNumber < 1/3){
        computerMove = 'Rock';
    } else if(randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove = 'Paper';
    } else if(randomNumber >= 2/3 && randomNumber < 1){
        computerMove = 'Scissors';
    }
    console.log(`Random value: ${randomNumber} -- Computer move: ${computerMove} -- User move: ${userMove}`);

    compareChoices(computerMove, userMove);
}

    function compareChoices(computerChoice, userChoice){
        let theResult = '';
        if(computerChoice === userChoice){
            theResult = 'Tie.';
        } else if(computerChoice === 'Rock' && userChoice === 'Paper'){
            theResult = 'You win.';   
        } else if(computerChoice === 'Rock' && userChoice === 'Scissors'){
            theResult = 'You lose.';
        }  else if(computerChoice === 'paper' && userChoice === 'Rock'){
            theResult = 'You lose.';
        } else if(computerChoice === 'Paper' && userChoice === 'Scissor'){
            theResult = 'You win.';
        } else if(computerChoice === 'Scissors' && userChoice === 'Paper'){
            theResult = 'You lose.';
        } else if(computerChoice === 'Scissors' && userChoice === 'Rock'){
            theResult = 'You win.';
        }

        //Updating the scores
        if(theResult === 'You win.'){
            score.wins += 1;
        } else if(theResult === 'You lose.') {
            score.losses += 1;
        } else if(theResult === 'Tie.'){
            score.ties += 1;
        }

        //Storing the updated scores in the local storage object
        //Since local storage works with strings only 

        localStorage.setItem('score', JSON.stringify(score));         

        //Dislay the result
        displayResults(theResult, computerChoice, userChoice);
        
    }

    function resetCounters(){
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        //Deleting the saved data from the local storage
        localStorage.removeItem('score');
        displayResults();
     
        //alert(`The score has been reset.\nWins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
    }

    //Update the score using the local storage
    function updateScores(e){
        //getting the date from the local storage and converting it back into a javascript object
        let newScore = JSON.parse(localStorage.getItem('score'));
        //Checking the newScore if it is not null
        if(newScore === null){
            alert("There is no score available.");
        } else {
            alert("Saved score available.");
            //Updating the scores
            score.wins = newScore.wins;
            score.losses = newScore.losses;
            score.ties = newScore.ties;
        }
    }

    function displayResults(result='New Game', computer='No Moves', user='No Moves')

{

// Dsiplaying the result

// Starting by locating the paragraphs

let theResultDisplay = document.querySelector('.jsResult');

let theMovesDisplay = document.querySelector('.jsMoves');

let theScoreDisplay = document.querySelector('.jsScore');



// Populating the paragraphs with the text

theResultDisplay.innerHTML = result;

theMovesDisplay.innerHTML = ` You
<img src="images/${user}Final.png" class="moveIcon">
<img src="images/${computer}Final.png" class="moveIcon">
Computer`;

theScoreDisplay.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;

}