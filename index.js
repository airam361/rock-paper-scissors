let gameObj = {
  instructions: {
    initial: "Choose your destiny!",
    animation: "Who will win ???",
  },
  images: {
    player: {
      rock: "./images/rock-player.jpg",
      paper: "./images/paper-player.jpg",
      scissors: "./images/scissors-player.jpg",
    },
    computer: {
      rock: "./images/rock-computer.jpg",
      paper: "./images/paper-computer.jpg",
      scissors: "./images/scissors-computer.jpg",
    },
  },
  computerChoices: ["rock", "paper", "scissors"],
  rock: {
    rock: ["Draw!", ""],
    paper: ["You lose!", "Paper covers Rock"],
    scissors: ["You win!", "Rock smashes Scissors"],
  },
  paper: {
    rock: ["You win!", "Paper covers Rock"],
    paper: ["Draw!", ""],
    scissors: ["You lose!", "Scissors cuts Paper"],
  },
  scissors: {
    rock: ["You lose!", "Rock smashes Scissors"],
    paper: ["You win!", "Scissors cuts Paper"],
    scissors: ["Draw!", ""],
  },
  score: {
    games: 0,
    wins: 0,
    losses: 0,
    draws: 0,
  },
};

let resultsContainer = document.querySelector(".results-container");
let animationContainer = document.querySelector(".animation-container");
let choiceContainer = document.querySelector(".choice-container");
let instructions = document.querySelector(".instructions .first");
let comment = document.querySelector(".instructions .second");

let games = document.getElementById("games");
let wins = document.getElementById("wins");
let losses = document.getElementById("losses");
let draws = document.getElementById("draws");

let playerResultImg = document.querySelector("#player img");
let computerResultImg = document.querySelector("#computer img");

let btnAgain = document.querySelector("button");

let choices = document.querySelectorAll(".choice-container figure");

function hideElement(element) {
  element.classList.add("hidden");
}
function showElement(element) {
  element.classList.remove("hidden");
}
function randomComputerChoice() {
  let choice = Math.floor(Math.random() * 3);
  return gameObj.computerChoices[choice];
}

function displayScore() {
  games.innerHTML = `Played Games: ${gameObj.score.games}`;
  wins.innerHTML = `You: ${gameObj.score.wins}`;
  losses.innerHTML = `Computer: ${gameObj.score.losses}`;
  draws.innerHTML = `Draws: ${gameObj.score.draws}`;
}

function game(playerChoice) {
  let computerChoice = randomComputerChoice();
  gameObj.score.games++;
  instructions.innerHTML = gameObj[playerChoice][computerChoice][0];
  comment.innerHTML = gameObj[playerChoice][computerChoice][1];
  switch (instructions.innerHTML) {
    case "You win!":
      gameObj.score.wins++;
      break;
    case "You lose!":
      gameObj.score.losses++;
      break;
    case "Draw!":
      gameObj.score.draws++;
      break;
  }
  playerResultImg.src = gameObj.images.player[playerChoice];
  computerResultImg.src = gameObj.images.computer[computerChoice];
}

function resetHandler() {
  hideElement(resultsContainer);
  showElement(choiceContainer);
  hideElement(comment);
  instructions.innerHTML = gameObj.instructions.initial;
}

function startHandler(event) {
  let playerChoice = event.currentTarget.id;
  hideElement(choiceContainer);

  instructions.innerHTML = gameObj.instructions.animation;
  showElement(animationContainer);

  setTimeout(() => {
    hideElement(animationContainer);
    showElement(resultsContainer);
    showElement(comment);
    game(playerChoice);
    displayScore();
    showElement(btnAgain);
  }, 2500);
}

choices.forEach((item) => item.addEventListener("click", startHandler));

btnAgain.addEventListener("click", resetHandler);
