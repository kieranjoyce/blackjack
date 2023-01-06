import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

import Dealer from "./dealer.js";
import Player from "./player.js";
import SimulatedPlayer from "./simulatedPlayer.js";

// global variables that will need to be accessed throughout the program
let playerName;
let mainPlayer;
let simulatedPlayersCount;
let simulatedPlayers = [];
let dealer;
let isGameOver = false;

console.log("welcome to blackjack");
// log greeting and explanation of game?
await askPlayerName();
console.log(`welcome ${playerName}`);

await askNumberOfOpponents();

setupGame();

while (!isGameOver) {
  await playRound();
  checkGameOver();
}

displayResult();

// organised into named functions to make main control flow clear
async function askPlayerName() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "playerName",
      message: "What would you like to be called?",
      default: "player",
    },
  ]);

  playerName = answers.playerName;
}

async function askNumberOfOpponents() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "simulatedPlayersCount",
      message: "How many opponents would you like to face?",
      choices: [0, 1, 2, 3, 4, 5, 6, 7],
      default: 1,
    },
  ]);

  simulatedPlayersCount = answers.simulatedPlayersCount;
}

function setupGame() {
  console.clear();

  // create dealer
  dealer = new Dealer();

  // create player with given name
  mainPlayer = new Player(playerName);

  // create requested number of simulated players
  for (let i = 0; i < simulatedPlayersCount; i++) {
    simulatedPlayers.push(new SimulatedPlayer());
  }

  // deal 2 cards to all players hands
  dealer.dealCard(mainPlayer.hand);
  dealer.dealCard(mainPlayer.hand);

  for (let player of simulatedPlayers) {
    dealer.dealCard(player.hand);
    dealer.dealCard(player.hand);
  }
}

async function playRound() {
  // simulated players choose to hit or stand
  // logs here instead of inside chooseAction to separate concerns
  for (let player of simulatedPlayers) {
    if (!player.isPlayerFinished()) {
      player.chooseAction();

      if (!player.isStood) {
        dealer.dealCard(player.hand);
        console.log(`${player.name} hits`);
      } else {
        console.log(`${player.name} stands`);
      }
    }
  }

  // user's turn
  if (!mainPlayer.isPlayerFinished()) {
    displayCards();

    await askHitOrStand();

    if (!mainPlayer.isStood) {
      dealer.dealCard(mainPlayer.hand);
    }
  }

  console.clear();
}

function displayCards() {
  console.log("\nHand:");

  console.group();
  for (let card of mainPlayer.hand.cards) {
    console.log(` ${card.suit} ${card.value} `);
  }
  console.groupEnd();

  console.log(`\nScore: ${mainPlayer.getHandScore()}\n`);
}

async function askHitOrStand() {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "hitOrStand",
      message: "Would you like to hit or stand",
      choices: ["hit", "stand"],
    },
  ]);

  if (answer.hitOrStand === "stand") {
    mainPlayer.stand();
  }
}

function checkGameOver() {
  let mainPlayerFinished = mainPlayer.isPlayerFinished();

  let allSimulatedPlayersFinished = simulatedPlayers.every((player) =>
    player.isPlayerFinished()
  );

  isGameOver = mainPlayerFinished && allSimulatedPlayersFinished;
}

function displayResult() {
  console.clear();
  displayCards();

  let mainPlayerScore = mainPlayer.getHandScore();
  let isSoloGame = simulatedPlayersCount === 0;

  let winnerMessage = chalk.green(
    figlet.textSync("WINNER WINNER\nCHICKEN DINNER!!", {
      verticalLayout: "full",
    })
  );
  let bustMessage = chalk.red(
    figlet.textSync("BUST!!", {
      font: "Big Money-ne",
    })
  );

  if (mainPlayer.hand.isBust) {
    console.log(bustMessage);
  }

  // no other scores to compare so automatic win if not bust
  else if (isSoloGame) {
    console.log(winnerMessage);
  }

  // compares scores to determine result
  else {
    //converts scores of bust players to 0 so they cannot be maximum value
    let simulatedPlayerScores = simulatedPlayers.map((player) => {
      return !player.hand.isBust ? player.getHandScore() : 0;
    });

    let maxSimulatedPlayerScore = Math.max(...simulatedPlayerScores);

    // if all simulated player busts maxSimulatedPlayerScore will be 0
    // using || operator will log bust if it is 0 (meaning all simulated players bust)
    // or log the highest non-bust score achieved if not
    console.log(
      `Highest other player score was ${maxSimulatedPlayerScore || "bust"}`
    );

    // win
    if (mainPlayerScore > maxSimulatedPlayerScore) {
      console.log(winnerMessage);
    }

    // loss
    else if (mainPlayerScore < maxSimulatedPlayerScore) {
      console.log(chalk.bgRed.bold("LOSS!!"));
    }

    // tie
    else {
      console.log(chalk.bgBlue("TIE!!"));
    }
  }
}
