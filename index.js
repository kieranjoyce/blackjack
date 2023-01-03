#!/usr/bin/env node

import inquirer from "inquirer";
import Dealer from "./dealer.js";
import Player from "./player.js";

let playerName;
let player;
let dealer;

console.log("welcome to blackjack");
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
  player = new Player(playerName);
  // deal 2 cards to players hand
  dealer.dealCard(player.hand);
  dealer.dealCard(player.hand);
}

function displayCards() {
  console.log("Your cards:");
  for (let card of player.hand.cards) {
    console.log(`${card.suit} ${card.value}`);
  }
  console.log(`Your score: ${player.hand.score}`);
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
    player.stand();
    console.log("stood");
  }
}

function displayResult() {
  displayCards();

  if (player.isStood) {
    console.log(`you stood at ${player.hand.score}`);
  }

  if (player.hand.isBust) {
    console.log("you are bust");
  }

  if (player.hand.score === 21) {
    console.log("winner, winner, chicken dinner");
  }
}

await askPlayerName();
// log greeting and explanation of game?
console.log(`welcome ${playerName}`);

setupGame();

while (!player.isStood && !player.hand.isBust && player.hand.score !== 21) {
  // show cards to player (text form at first)
  displayCards();

  // hit or stand once
  await hitOrStand();

  if (!player.isStood) {
    dealer.dealCard(player.hand);

    console.clear();
  }
}

displayResult();
