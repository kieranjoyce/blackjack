#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

import Dealer from "./dealer.js";
import Player from "./player.js";
import SimulatedPlayer from "./simulatedPlayer.js";

let playerName;
let mainPlayer;
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

function setupGame() {
  // create dealer
  dealer = new Dealer();
  // create player with given name
  mainPlayer = new Player(playerName);
  simulatedPlayers.push(new SimulatedPlayer("Simone"));
  // deal 2 cards to all players hands
  dealer.dealCard(mainPlayer.hand);
  dealer.dealCard(mainPlayer.hand);

  for (let player of simulatedPlayers) {
    dealer.dealCard(player.hand);
    dealer.dealCard(player.hand);
  }
}

async function playGame() {
  // show cards to player (text form at first)
  if (!isPlayerFinished(mainPlayer)) {
    displayCards();

    // hit or stand once
    await hitOrStand();

    if (!mainPlayer.isStood) {
      dealer.dealCard(mainPlayer.hand);

      console.clear();
    }
  }

  for (let player of simulatedPlayers) {
    player.chooseAction();
    if (!player.isStood && !player.hand.isBust) {
      dealer.dealCard(player.hand);
      console.log(`simPlayer hits`);
    }
  }

  checkGameOver();
}

function displayCards() {
  console.log("Your cards:");
  for (let card of mainPlayer.hand.cards) {
    console.log(`${card.suit} ${card.value}`);
  }
  console.log(`Your score: ${mainPlayer.hand.score}`);
}

async function hitOrStand() {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "hitOrStand",
      message: "would you like to hit or stand",
      choices: ["hit", "stand"],
    },
  ]);

  if (answer.hitOrStand === "stand") {
    mainPlayer.stand();
    console.log("stood");
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

  if (mainPlayer.isStood) {
    console.log(`you stood at ${mainPlayer.hand.score}`);

    let maxSimulatedPlayerScore = Math.max(
      simulatedPlayers.map((player) =>
        !player.hand.isBust ? player.hand.score : 0
      )
    );

    // if all simulated player busts maxSimulatedPlayerScore will be 0
    // using || operator will print the number unless it is 0
    // in which case it will print bust
    console.log(
      `highest other player score was ${maxSimulatedPlayerScore || "bust"}`
    );

    console.log(
      mainPlayer.hand.score > maxSimulatedPlayerScore
        ? chalk.bgGreen.bold("winner, winner, chicken dinner")
        : mainPlayer.hand.score < maxSimulatedPlayerScore
        ? chalk.bgRed.bold("you lose")
        : chalk.bgBlue("you tie")
    );
  }

  if (mainPlayer.hand.isBust) {
    console.log("you are bust so you lose");
  }
}

//beginning of execution
console.log("welcome to blackjack");

await askPlayerName();
// log greeting and explanation of game?
console.log(`welcome ${playerName}`);

setupGame();

while (!isGameOver) {
  await playGame();
}

displayResult();
