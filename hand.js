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
      newScore += isPictureCard ? 10 : parseInt(card.value);
    }

    this.score = newScore;
  }
}

module.exports = { Hand };
