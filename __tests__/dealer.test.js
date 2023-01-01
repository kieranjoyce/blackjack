const { Dealer } = require("../dealer");
const { Deck } = require("../deck");
const { Hand } = require("../hand");
const { Card } = require("../card");

let dealer;
let deck;
let playersHand;

beforeEach(() => {
  deck = new Deck();
  dealer = new Dealer(deck);
  playersHand = new Hand();
});

describe("Dealer class", () => {
  describe("dealCard method", () => {
    test("should remove a card from dealer's deck and add one to the given hand", () => {
      dealer.dealCard(playersHand);

      expect(dealer.deck.cards.length).toBe(51);
      expect(playersHand.cards.length).toBe(1);

      let dealtCard = playersHand.cards[0];

      expect(dealtCard instanceof Card).toBe(true);
    });

    test("card added to the hand and removed from the deck should be the same", () => {
      let takeCardMock = jest.spyOn(deck, "takeCard");

      dealer.dealCard(playersHand);
      let dealtCard = playersHand.cards[0];

      expect(takeCardMock).toHaveReturnedWith(dealtCard);
    });
  });
});
