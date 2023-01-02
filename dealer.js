import Deck from "./deck";

export default class Dealer {
  constructor() {
    this.deck = new Deck();
  }

  dealCard(hand) {
    let removedCard = this.deck.takeCard();
    hand.addCard(removedCard);
  }
}
