import inquirer from "inquirer";
import Game from "./game.js";
import {
  displayWelcomeMessage,
  displayHand,
  displayResult,
} from "./gameDisplay.js";

// global variables that inquirer answers will be assigned to
let playerName;
let simulatedPlayerCount;
let hitOrStand;

await askPlayerName();

displayWelcomeMessage(playerName);

await askNumberOfOpponents();

console.clear();

let game = new Game(playerName, simulatedPlayerCount);

while (!game.isGameOver) {
  await playRound();
}

let result = game.calculateResult();

console.clear();
displayHand(game.mainPlayer);
displayResult(result, game.maxSimulatedPlayerScore, playerName);

// inquirer questions and gameplay organised into named functions to make main control flow clear
async function askPlayerName() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "playerName",
      message: "What would you like to be called?",
      default: "Player",
      validate: function (input) {
        if (input.length > 30) {
          return "Please enter a name containing 30 characters or less";
        }

        if (!/^[\w\s]+$/.test(input)) {
          return "Please use only letters, numbers and spaces";
        }

        return true;
      },
    },
  ]);

  playerName = answers.playerName;
}

async function askNumberOfOpponents() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "simulatedPlayerCount",
      message: "How many opponents would you like to face?",
      choices: [0, 1, 2, 3, 4, 5, 6, 7, new inquirer.Separator()],
      default: 1,
    },
  ]);

  simulatedPlayerCount = answers.simulatedPlayerCount;
}

async function askHitOrStand() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "hitOrStand",
      message: "Would you like to hit or stand",
      choices: ["hit", "stand"],
    },
  ]);

  hitOrStand = answers.hitOrStand;
}

async function playRound() {
  game.playSimulatedPlayersRound();

  if (!game.mainPlayer.isPlayerFinished()) {
    displayHand(game.mainPlayer);
    await askHitOrStand();
    game.playMainPlayerRound(hitOrStand);
  }

  game.checkGameOver();

  console.clear();
}
