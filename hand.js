import Card from "./card.js";

export default class Hand {
  constructor() {
    this.cards = [];
    this.score = 0;
    this.isBust = false;
  }

  addCard(card) {
    if (!(card instanceof Card)) {
      throw new Error("attempted to add non-card items to a cards array");
    }

    this.cards.push(card);
  }

  // runs checkBust method inside to avoid an invalid hand not being recognised as bust
  evaluateScore() {
    let newScore = 0;

    for (let card of this.cards) {
      let isPictureCard = ["J", "Q", "K"].includes(card.value);
      let isAce = card.value === "A";

      if (isAce) {
        newScore += newScore + 11 < 22 ? 11 : 1;
      } else {
        newScore += isPictureCard ? 10 : parseInt(card.value);
      }
    }

    this.score = newScore;

    this.checkBust();
  }

  checkBust() {
    if (this.score > 21) {
      this.isBust = true;
    }
  }
}
