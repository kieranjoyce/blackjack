import chalk from "chalk";
import figlet from "figlet";

export default class GameDisplay {
  static displayWelcomeMessage(playerName) {
    console.log(`
Welcome to Blackjack, ${playerName}

  How to play
  - Every card has a score corresponding to their face value
    2-9: points equal to the number on the card
    10, J, Q, K: 10 points
    A: 11 or 1 points (your choice)
  - Your objective is to get cards with a total score as close as possible to BUT not greater than 21
  - You will be dealt an opening hand of two cards
  - You then have the option to 'hit' (take another card) or 'stand' (take no more cards)
  - If your score totals 22 or more you 'bust' and lose the game
  - If you do not bust and have the highest scoring hand you win
`);
  }

  static displayHand(player) {
    console.log("\nHand:");

    console.group();
    for (let card of player.hand.cards) {
      console.log(` ${card.suit} ${card.value} `);
    }
    console.groupEnd();

    console.log(`\nScore: ${player.getHandScore()}\n`);
  }

  static displayResult(result, maxSimulatedPlayerScore, playerName) {
    if (typeof maxSimulatedPlayerScore === "number") {
      // if all simulated player busts maxSimulatedPlayerScore will be 0
      // using || operator will log bust if it is 0 (meaning all simulated players bust)
      // or log the highest non-bust score achieved if not
      console.log(
        `Highest other player score is ${maxSimulatedPlayerScore || "bust"}\n`
      );
    }

    if (result === "win") {
      let winMessage = chalk.green(
        figlet.textSync("WINNER WINNER\nCHICKEN DINNER!!", {
          verticalLayout: "full",
        }),
        `\nCongratulations, ${playerName}\n`
      );

      console.log(winMessage);
    } else if (result === "bust") {
      let bustMessage = chalk.red(
        figlet.textSync("BUST!!", {
          font: "Big Money-ne",
        }),
        `\nUnlucky, ${playerName}\n`
      );

      console.log(bustMessage);
    } else if (result === "loss") {
      let lossMessage = chalk.red(
        figlet.textSync("LOSS!!", {
          font: "Big Money-ne",
        }),
        `\nUnlucky, ${playerName}\n`
      );

      console.log(lossMessage);
    } else if (result === "tie") {
      let tieMessage = chalk.blue(
        figlet.textSync("TIE!", {
          font: "Big Money-ne",
        }),
        `\n So close\n`
      );

      console.log(tieMessage);
    }
  }
}
