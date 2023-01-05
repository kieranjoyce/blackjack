#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

import Dealer from "./dealer.js";
import Player from "./player.js";
import SimulatedPlayer from "./simulatedPlayer.js";

let playerName;
let mainPlayer;
let simulatedPlayersCount;
let simulatedPlayers = [];
let dealer;
let isGameOver = false;

async function askPlayerName() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "playerName",
      message: "What would you like to be called?",
      default: "player",
    },
  ]);

  playerName = answer.playerName;
}

async function askNumberOfOpponents() {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "simulatedPlayersCount",
      message: "How many opponents would you like to face?",
      choices: [0, 1, 2, 3, 4, 5, 6, 7],
      default: 1,
    },
  ]);

  simulatedPlayersCount = answer.simulatedPlayersCount;
}

function setupGame() {
  console.clear();

  // create dealer
  dealer = new Dealer();
  // create player with given name
  mainPlayer = new Player(playerName);

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
  // show cards to player (text form at first)
  for (let player of simulatedPlayers) {
    player.chooseAction();
    if (!player.isStood && !player.hand.isBust) {
      dealer.dealCard(player.hand);
    }
  }

  if (!isPlayerFinished(mainPlayer)) {
    displayCards();

    // hit or stand once
    await hitOrStand();

    if (!mainPlayer.isStood) {
      dealer.dealCard(mainPlayer.hand);
    }
  }

  console.clear();
  checkGameOver();
}

function displayCards() {
  console.log("\nHand:");

  console.group();
  for (let card of mainPlayer.hand.cards) {
    console.log(` ${card.suit} ${card.value} `);
  }
  console.groupEnd();

  console.log(`\nScore: ${mainPlayer.hand.score}\n`);
}

async function hitOrStand() {
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

function isPlayerFinished(player) {
  return player.isStood || player.hand.isBust || player.hand.score === 21;
}

function checkGameOver() {
  let mainPlayerFinished = isPlayerFinished(mainPlayer);

  let allSimulatedPlayersFinished = simulatedPlayers.every((player) =>
    isPlayerFinished(player)
  );

  isGameOver = mainPlayerFinished && allSimulatedPlayersFinished;
}

function displayResult() {
  console.clear();
  displayCards();

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
    return;
  }

  if (isSoloGame) {
    console.log(winnerMessage);
    return;
  }

  if (mainPlayer.isStood || mainPlayer.hand.score === 21) {
    let maxSimulatedPlayerScore = Math.max(
      ...simulatedPlayers.map((player) => {
        return !player.hand.isBust ? player.hand.score : 0;
      })
    );

    // if all simulated player busts maxSimulatedPlayerScore will be 0
    // using || operator will log bust if it is 0 (meaning all simulated players bust)
    // or log the highest non-bust score achieved if not
    console.log(
      `Highest other player score was ${maxSimulatedPlayerScore || "bust"}`
    );

    console.log(
      mainPlayer.hand.score > maxSimulatedPlayerScore
        ? winnerMessage
        : mainPlayer.hand.score < maxSimulatedPlayerScore
        ? chalk.bgRed.bold("LOSS!!")
        : chalk.bgBlue("TIE!!")
    );
  }
}

//beginning of execution
console.log("welcome to blackjack");
// log greeting and explanation of game?
await askPlayerName();
console.log(`welcome ${playerName}`);

await askNumberOfOpponents();

setupGame();

while (!isGameOver) {
  await playRound();
}

displayResult();
