import { uniqueNamesGenerator, names } from "unique-names-generator";

import Player from "./player.js";

export default class SimulatedPlayer extends Player {
  constructor() {
    const name = uniqueNamesGenerator({ dictionaries: [names] });

    super(`Bot ${name}`);
  }

  chooseAction() {
    if (this.hand.score >= 17 && this.isStood === false) {
      this.stand();
    }
  }
}
