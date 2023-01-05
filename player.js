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
    return this.isStood || this.hand.isBust || this.hand.score === 21;
  }
}
