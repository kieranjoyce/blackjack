import Hand from "./hand.js";

export default class Player {
  constructor(name) {
    this.name = name;
    this.hand = new Hand();
    this.isStood = false;
  }

  stand() {
    this.isStood = true;
  }

  isPlayerFinished() {
    return this.isStood || this.hand.isBust || this.getHandScore() === 21;
  }

  // reduces accessing a nested property and makes more clear
  getHandScore() {
    return this.hand.score;
  }
}
