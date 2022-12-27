const { Card } = require("./card");

class Deck {
  constructor() {
    this.cards = [];

    this.fillDeck();
  }

  // called when new instance initialised to add all cards to deck
  fillDeck() {
    const suits = ["♥", "♦", "♠", "♣"];
    const values = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];

    for (let suit of suits) {
      for (let value of values) {
        this.cards.push(new Card(suit, value));
      }
    }
  }
}

module.exports = { Deck };
