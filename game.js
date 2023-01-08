import Dealer from "./dealer.js";
import Player from "./player.js";
import SimulatedPlayer from "./simulatedPlayer.js";

export default class Game {
  constructor(mainPlayerName, simulatedPlayerCount) {
    this.isGameOver = false;

    this.dealer = new Dealer();
    this.mainPlayer = new Player(mainPlayerName);

    this.simulatedPlayers = [];
    for (let i = 0; i < simulatedPlayerCount; i++) {
      this.simulatedPlayers.push(new SimulatedPlayer());
    }
    this.maxSimulatedPlayerScore;

    this.dealOpeningHand();
  }

  dealOpeningHand() {
    this.dealer.dealCard(this.mainPlayer.hand);
    this.dealer.dealCard(this.mainPlayer.hand);

    for (let player of this.simulatedPlayers) {
      this.dealer.dealCard(player.hand);
      this.dealer.dealCard(player.hand);
    }
  }

  playSimulatedPlayersRound() {
    for (let player of this.simulatedPlayers) {
      if (!player.isPlayerFinished()) {
        player.chooseAction();

        if (!player.isStood) {
          this.dealer.dealCard(player.hand);
          console.log(`${player.name} hits`);
        } else {
          console.log(`${player.name} stands`);
        }
      }
    }
  }

  playMainPlayerRound(playerChoice) {
    if (playerChoice !== "hit" && playerChoice !== "stand") {
      throw new Error(
        "attempted to play round without a valid choice to hit or stand"
      );
    }

    if (!this.mainPlayer.isPlayerFinished()) {
      if (playerChoice === "hit") {
        this.dealer.dealCard(this.mainPlayer.hand);
      }
    }
  }

  checkGameOver() {
    let mainPlayerFinished = this.mainPlayer.isPlayerFinished();

    let allSimulatedPlayersFinished = this.simulatedPlayers.every((player) =>
      player.isPlayerFinished()
    );

    if (mainPlayerFinished && allSimulatedPlayersFinished)
      this.isGameOver = true;
  }

  calculateResult() {
    if (this.mainPlayer.hand.isBust) {
      return "bust";
    }

    if (this.simulatedPlayers.length === 0) {
      return "win";
    }

    let mainPlayerScore = this.mainPlayer.getHandScore();

    let simulatedPlayerScores = this.simulatedPlayers.map((player) => {
      return !player.hand.isBust ? player.getHandScore() : 0;
    });

    this.maxSimulatedPlayerScore = Math.max(...simulatedPlayerScores);

    if (mainPlayerScore > this.maxSimulatedPlayerScore) {
      return "win";
    }

    if (mainPlayerScore < this.maxSimulatedPlayerScore) {
      return "loss";
    }

    return "tie";
  }
}
