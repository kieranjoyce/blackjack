#!/usr/bin/env node

import inquirer from "inquirer";
import Dealer from "./dealer.js";
import Player from "./player.js";

let playerName;
let player;
let dealer;
let gameOver = false;

console.log("welcome to blackjack");
async function askPlayerName() {
  let answer = await inquirer.prompt([
    {
      type: "input",
      name: "playerName",
      message: "What would you like to be called?",
      default: "Player",
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

await askPlayerName();
// log greeting and explanation of game?
console.log(`welcome ${playerName}`);

setupGame();

// show cards to player (text form at first)
// hit or stand once
