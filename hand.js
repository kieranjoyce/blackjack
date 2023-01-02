export default class Hand {
  constructor() {
    this.cards = [];
    this.score = 0;
    this.isBust = false;
  }

  addCard(card) {
    this.cards.push(card);
  }

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
