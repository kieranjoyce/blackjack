import Player from "./player.js";

export default class SimulatedPlayer extends Player {
  constructor(name) {
    super(`Bot ${name}`);
  }

  chooseAction() {
    if (this.hand.score >= 17) {
      this.stand();
    }
  }
}
