import Hand from "./hand";

export default class Player {
  constructor(name) {
    this.name = name;
    this.hand = new Hand();
    this.isStood = false;
    this.wins = 0;
  }

  stand() {
    this.isStood = true;
  }

  addWin() {
    this.wins++;
  }
}
