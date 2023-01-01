class Dealer {
  constructor(deck) {
    this.deck = deck;
  }

  dealCard(hand) {
    let removedCard = this.deck.takeCard();
    hand.addCard(removedCard);
  }
}

module.exports = { Dealer };
