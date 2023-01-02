import Deck from "./deck.js";

export default class Dealer {
  constructor() {
    this.deck = new Deck();
  }

  dealCard(hand) {
    let removedCard = this.deck.takeCard();
    hand.addCard(removedCard);
  }
}
