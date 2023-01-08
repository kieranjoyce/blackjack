import { uniqueNamesGenerator, names } from "unique-names-generator";

import Player from "./player.js";

export default class SimulatedPlayer extends Player {
  constructor() {
    // allows simple creation of multiple simulated players with unique names
    const name = uniqueNamesGenerator({ dictionaries: [names] });

    super(`Bot ${name}`);
  }

  // stands with 17 or above emulating standard dealer behaviour
  // checking isStood prevents unnecessary extra this.stand() calls
  chooseAction() {
    if (this.getHandScore() >= 17 && this.isStood === false) {
      this.stand();
    }
  }
}
