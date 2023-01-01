const { Hand } = require("./hand");

class Player {
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

module.exports = { Player };
