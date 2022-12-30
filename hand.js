class Hand {
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
        newScore += newScore + 11 < 21 ? 11 : 1;
      } else {
        newScore += isPictureCard ? 10 : parseInt(card.value);
      }
    }

    this.score = newScore;
  }
}

module.exports = { Hand };
